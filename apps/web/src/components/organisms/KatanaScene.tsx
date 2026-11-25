import * as PIXI from 'pixi.js';
import { useEffect, useRef, type RefObject } from 'react';

interface KatanaSceneProps {
  /** La pièce (section d'accueil) : le canvas la recouvre entièrement. */
  roomRef: RefObject<HTMLElement>;
  /** Le sol : l'estrade est posée juste au-dessus. */
  floorRef: RefObject<HTMLElement>;
  /** Change de valeur quand on clique « Tout remettre en place ». */
  resetKey: number;
  /** Appelé au premier coup de katana (affiche le bouton de remise en place). */
  onCut: () => void;
}

type Pt = { x: number; y: number };
type VPt = Pt & { px: number; py: number };
interface Chunk {
  c: PIXI.Container;
  poly: Pt[];
  bowl: Pt[];
  plant: Pt[];
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  vr: number;
  still: boolean;
  rest: number;
  cool: number;
  dead?: boolean;
}
interface Drag {
  id: number;
  t: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  ux: number;
  uy: number;
}

/** Lit une couleur de tokens.css pour que la scène suive la palette. */
const token = (name: string, repli: string) =>
  new PIXI.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim() || repli).toNumber();

/* ---------- géométrie ---------- */
const rot = (x: number, y: number, a: number, px: number, py: number): [number, number] => [
  x + px * Math.cos(a) - py * Math.sin(a),
  y + px * Math.sin(a) + py * Math.cos(a),
];
/** Contour du pot, origine au centre du fond. */
const BOWL: Pt[] = (() => {
  const pts: Pt[] = [];
  const n = 10;
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    pts.push({ x: 40 - 22 * u * u, y: -58 + 58 * u });
  }
  for (let i = n; i >= 0; i--) {
    const u = i / n;
    pts.push({ x: -(40 - 22 * u * u), y: -58 + 58 * u });
  }
  return pts;
})();
/** Contour (approximatif) du feuillage. */
const PLANT: Pt[] = Array.from({ length: 24 }, (_, i) => {
  const t = (i / 24) * Math.PI * 2;
  return { x: 72 * Math.cos(t), y: -150 + 96 * Math.sin(t) };
});
/** Masque d'un pot entier. */
const FULL: Pt[] = [
  { x: -200, y: -320 },
  { x: 200, y: -320 },
  { x: 200, y: 60 },
  { x: -200, y: 60 },
];
/** Coupe un polygone convexe par un demi-plan. */
function clip(poly: Pt[], P: Pt, N: Pt, side: number): Pt[] {
  const out: Pt[] = [];
  const d = (q: Pt) => side * ((q.x - P.x) * N.x + (q.y - P.y) * N.y);
  for (let i = 0; i < poly.length; i++) {
    const a = poly[(i + poly.length - 1) % poly.length];
    const b = poly[i];
    const da = d(a);
    const db = d(b);
    const cut = () => {
      const t = da / (da - db);
      return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
    };
    if (db >= 0) {
      if (da < 0) out.push(cut());
      out.push(b);
    } else if (da >= 0) out.push(cut());
  }
  return out;
}
function inPoly(p: Pt, poly: Pt[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) c = !c;
  }
  return c;
}
const centroid = (pts: Pt[]): Pt => {
  let x = 0;
  let y = 0;
  for (const p of pts) {
    x += p.x;
    y += p.y;
  }
  return { x: x / pts.length, y: y / pts.length };
};
const area = (pts: Pt[]) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % pts.length];
    a += p.x * q.y - q.x * p.y;
  }
  return Math.abs(a) / 2;
};

/**
 * Scène PixiJS au pied de l'accueil : une estrade, deux pots de fleurs et un katana sur son support.
 * On attrape le katana, on le lâche ou on le balance sur un pot : le pot se coupe le long de la lame,
 * encore et encore. Le canvas laisse passer les clics (pointer-events: none) ; seuls les gestes qui
 * commencent sur la lame sont interceptés.
 */
export default function KatanaScene({ roomRef, floorRef, resetKey, onCut }: KatanaSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<() => void>();
  const onCutRef = useRef(onCut);
  onCutRef.current = onCut;

  useEffect(() => {
    const room = roomRef.current;
    const floorEl = floorRef.current;
    const host = hostRef.current;
    if (!room || !floorEl || !host) return;

    const C = {
      ink: token('--ink', '#341e4d'),
      soft: token('--ink-soft', '#5a4c70'),
      coral: token('--coral', '#f78181'),
      teal: token('--teal', '#3b9aad'),
      base: token('--baseboard', '#c9b9bc'),
      white: token('--panel', '#ffffff'),
    };

    const app = new PIXI.Application({
      width: room.clientWidth,
      height: room.clientHeight,
      backgroundAlpha: 0,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
    });
    const canvas = app.view as HTMLCanvasElement;
    canvas.style.display = 'block';
    host.appendChild(canvas);

    const G = 0.6; // gravité (px/image²)
    const SUB = 4; // sous-pas de physique
    let W = 0;
    let S = 1;
    let groundY = 0;
    let layers: Record<'back' | 'pots' | 'soil' | 'kat' | 'fx', PIXI.Container>;
    let chunks: Chunk[] = [];
    let soil: Array<{ g: PIXI.Graphics; vx: number; vy: number; done: boolean }> = [];
    let fx: Array<{ c: PIXI.Container; age: number }> = [];
    let kat: null | { c: PIXI.Container; L: number; asleep: boolean; drag: Drag | null; A: VPt; B: VPt } = null;
    let stand: Pt = { x: 0, y: 0 };

    /* ---------- dessin ---------- */
    function leaf(g: PIXI.Graphics, x: number, y: number, a: number, len: number) {
      const w = len * 0.38;
      const p = (u: number, v: number) => rot(x, y, a, u, v);
      g.lineStyle(1.5, C.ink, 1);
      g.beginFill(C.coral);
      g.moveTo(...p(0, 0));
      g.quadraticCurveTo(...p(len * 0.5, -w), ...p(len, 0));
      g.quadraticCurveTo(...p(len * 0.5, w), ...p(0, 0));
      g.endFill();
      g.lineStyle(1, C.ink, 1);
      g.moveTo(...p(2, 0));
      g.lineTo(...p(len * 0.78, 0));
    }
    function drawPotArt(g: PIXI.Graphics) {
      g.lineStyle(3, C.ink, 1);
      g.moveTo(0, -58);
      g.bezierCurveTo(-6, -110, 8, -170, 2, -236);
      const br = [
        [-2, -95, -50, -122],
        [2, -122, 48, -150],
        [4, -160, -44, -188],
        [5, -192, 42, -214],
      ];
      for (const [x1, y1, x2, y2] of br) {
        g.lineStyle(2.5, C.ink, 1);
        g.moveTo(x1, y1);
        g.quadraticCurveTo((x1 + x2) / 2, y1 - 4, x2, y2);
      }
      for (const [x1, y1, x2, y2] of br) {
        const a = Math.atan2(y2 - y1, x2 - x1);
        leaf(g, x2, y2, a - 0.7, 26);
        leaf(g, x2, y2, a, 30);
        leaf(g, x2, y2, a + 0.7, 26);
      }
      leaf(g, 2, -236, -Math.PI / 2, 30);
      leaf(g, 2, -236, -Math.PI / 2 - 0.75, 26);
      leaf(g, 2, -236, -Math.PI / 2 + 0.75, 26);
      leaf(g, -1, -140, Math.PI + 0.5, 22);
      leaf(g, 3, -205, -0.4, 22);
      g.lineStyle(2, C.ink, 1);
      g.beginFill(C.soft);
      g.drawPolygon(BOWL.flatMap((p) => [p.x, p.y]));
      g.endFill();
      g.beginFill(C.soft);
      g.drawRect(-43, -63, 86, 9);
      g.endFill();
    }
    /** Katana dessiné à plat, de -180 (pommeau) à +180 (pointe). */
    function drawKatana(g: PIXI.Graphics) {
      g.lineStyle(1.5, C.ink, 1);
      g.beginFill(C.white);
      g.moveTo(-66, -4);
      g.quadraticCurveTo(60, -7, 180, -16);
      g.quadraticCurveTo(166, -6, 146, -3);
      g.quadraticCurveTo(60, 5, -66, 4);
      g.endFill();
      g.lineStyle(1, C.soft, 0.6);
      g.moveTo(-60, 1);
      g.quadraticCurveTo(60, -1, 150, -7);
      g.lineStyle(1.5, C.ink, 1);
      g.beginFill(C.base);
      g.drawRect(-74, -5, 9, 10);
      g.endFill();
      g.beginFill(C.teal);
      g.drawEllipse(-78, 0, 4, 13);
      g.endFill();
      g.beginFill(C.soft);
      g.drawRect(-176, -7, 96, 14);
      g.endFill();
      g.beginFill(C.ink);
      g.drawRect(-182, -7, 6, 14);
      g.endFill();
      g.lineStyle(1, C.ink, 1);
      for (let x = -168; x <= -92; x += 12) {
        g.beginFill(C.coral);
        g.drawPolygon([x - 4, 0, x, -4, x + 4, 0, x, 4]);
        g.endFill();
      }
    }

    /* ---------- morceaux de pot : dessin complet masqué par un polygone convexe ---------- */
    function addChunk(o: {
      poly: Pt[];
      bowl: Pt[];
      plant: Pt[];
      x0?: number;
      y0?: number;
      world?: Pt;
      rot?: number;
      vx?: number;
      vy?: number;
      vr?: number;
      still?: boolean;
      cool?: number;
    }) {
      const c0 = centroid(o.bowl.concat(o.plant));
      const c = new PIXI.Container();
      c.scale.set(S);
      c.pivot.set(c0.x, c0.y);
      if (o.world) c.position.set(o.world.x, o.world.y);
      else c.position.set((o.x0 ?? 0) + c0.x * S, (o.y0 ?? 0) + c0.y * S);
      c.rotation = o.rot ?? 0;
      const art = new PIXI.Graphics();
      drawPotArt(art);
      c.addChild(art);
      if (o.poly !== FULL) {
        const m = new PIXI.Graphics();
        m.beginFill(0xffffff);
        m.drawPolygon(o.poly.flatMap((p) => [p.x, p.y]));
        m.endFill();
        c.addChild(m);
        art.mask = m;
      }
      layers.pots.addChild(c);
      const ch: Chunk = {
        c,
        poly: o.poly,
        bowl: o.bowl,
        plant: o.plant,
        cx: c0.x,
        cy: c0.y,
        vx: o.vx ?? 0,
        vy: o.vy ?? 0,
        vr: o.vr ?? 0,
        still: !!o.still,
        rest: 0,
        cool: o.cool ?? 0,
      };
      chunks.push(ch);
      return ch;
    }
    /** Point monde → repère du pot. */
    const toLocal = (ch: Chunk, x: number, y: number): Pt => {
      const dx = (x - ch.c.x) / S;
      const dy = (y - ch.c.y) / S;
      const co = Math.cos(-ch.c.rotation);
      const si = Math.sin(-ch.c.rotation);
      return { x: dx * co - dy * si + ch.cx, y: dx * si + dy * co + ch.cy };
    };
    const toWorld = (ch: Chunk, p: Pt): Pt => {
      const dx = (p.x - ch.cx) * S;
      const dy = (p.y - ch.cy) * S;
      const co = Math.cos(ch.c.rotation);
      const si = Math.sin(ch.c.rotation);
      return { x: ch.c.x + dx * co - dy * si, y: ch.c.y + dx * si + dy * co };
    };

    /* ---------- construction de la scène ---------- */
    function build() {
      W = room!.clientWidth;
      app.renderer.resize(W, room!.clientHeight);
      app.stage.removeChildren().forEach((c) => c.destroy({ children: true }));
      chunks = [];
      soil = [];
      fx = [];
      S = Math.max(0.58, Math.min(1, W / 1280));
      const LH = 46 * S;
      groundY = floorEl!.offsetTop - LH;
      layers = {
        back: new PIXI.Container(),
        pots: new PIXI.Container(),
        soil: new PIXI.Container(),
        kat: new PIXI.Container(),
        fx: new PIXI.Container(),
      };
      Object.values(layers).forEach((l) => app.stage.addChild(l));

      // Estrade : bande plinthe sur toute la largeur, partie centrale corail.
      const g = new PIXI.Graphics();
      g.lineStyle(2, C.ink, 1);
      g.beginFill(C.base);
      g.drawRect(-4, groundY, W + 8, LH);
      g.endFill();
      const pw = Math.min(W * 0.48, 620 * S);
      g.beginFill(C.coral);
      g.drawRect((W - pw) / 2, groundY, pw, LH);
      g.endFill();
      layers.back.addChild(g);

      // Support du katana.
      const st = new PIXI.Container();
      st.position.set(W / 2, groundY);
      st.scale.set(S);
      const sg = new PIXI.Graphics();
      sg.lineStyle(2, C.ink, 1);
      sg.beginFill(C.base);
      sg.moveTo(-130, 0);
      sg.bezierCurveTo(-130, -30, -100, -34, -70, -30);
      sg.bezierCurveTo(-40, -22, 40, -22, 70, -30);
      sg.bezierCurveTo(100, -34, 130, -30, 130, 0);
      sg.closePath();
      sg.endFill();
      sg.beginFill(C.teal);
      sg.drawRect(-11, -14, 22, 6);
      sg.endFill();
      for (const x of [-92, 92]) {
        sg.beginFill(C.base);
        sg.drawRect(x - 5, -96, 10, 72);
        sg.endFill();
      }
      sg.lineStyle(1.5, C.ink, 1);
      sg.beginFill(C.soft);
      sg.drawRoundedRect(-150, -58, 300, 13, 6);
      sg.endFill();
      sg.beginFill(C.teal);
      sg.drawRect(-118, -59, 7, 15);
      sg.drawRect(84, -59, 7, 15);
      sg.endFill();
      st.addChild(sg);
      layers.back.addChild(st);
      stand = { x: W / 2, y: groundY - 100 * S };

      // Deux pots, chacun recoupable à volonté.
      const margin = Math.max(80 * S, W * 0.1);
      for (const x of [margin, W - margin]) addChunk({ poly: FULL, bowl: BOWL, plant: PLANT, x0: x, y0: groundY, still: true });

      // Katana.
      const kc = new PIXI.Container();
      kc.scale.set(S);
      const kg = new PIXI.Graphics();
      drawKatana(kg);
      kc.addChild(kg);
      layers.kat.addChild(kc);
      kat = { c: kc, L: 360 * S, asleep: true, drag: null, A: { x: 0, y: 0, px: 0, py: 0 }, B: { x: 0, y: 0, px: 0, py: 0 } };
      restKatana();
      host!.style.visibility = 'visible';
    }
    buildRef.current = build;

    function restKatana() {
      if (!kat) return;
      const L = kat.L;
      const y = stand.y;
      kat.A = { x: stand.x - L / 2, y, px: stand.x - L / 2, py: y };
      kat.B = { x: stand.x + L / 2, y, px: stand.x + L / 2, py: y };
      kat.asleep = true;
      kat.drag = null;
      syncKatana();
    }
    function syncKatana() {
      if (!kat) return;
      const { A, B, c } = kat;
      c.position.set((A.x + B.x) / 2, (A.y + B.y) / 2);
      c.rotation = Math.atan2(B.y - A.y, B.x - A.x);
    }

    /* ---------- katana : tenu en main il reste rigide ; lâché, il tombe (Verlet à deux points) ---------- */
    function katanaStep() {
      if (!kat) return;
      const { A, B, L } = kat;
      const gs = G / (SUB * SUB);
      const R = 5 * S;
      const d = kat.drag;
      for (let s = 1; s <= SUB; s++) {
        if (d) {
          const tx = d.fromX + ((d.toX - d.fromX) * s) / SUB;
          const ty = d.fromY + ((d.toY - d.fromY) * s) / SUB;
          let ax = tx - d.t * L * d.ux;
          let ay = ty - d.t * L * d.uy;
          const bx = ax + L * d.ux;
          let by = ay + L * d.uy;
          const over = Math.max(ay, by) - (groundY - R);
          if (over > 0) {
            ay -= over;
            by -= over;
          }
          A.px = A.x;
          A.py = A.y;
          B.px = B.x;
          B.py = B.y;
          A.x = ax;
          A.y = ay;
          B.x = bx;
          B.y = by;
        } else {
          for (const p of [A, B]) {
            let vx = (p.x - p.px) * 0.998;
            let vy = (p.y - p.py) * 0.998;
            const sp = Math.hypot(vx, vy);
            const max = 60 / SUB;
            if (sp > max) {
              vx *= max / sp;
              vy *= max / sp;
            }
            p.px = p.x;
            p.py = p.y;
            p.x += vx;
            p.y += vy + gs;
          }
          for (let it = 0; it < 3; it++) {
            const dx = B.x - A.x;
            const dy = B.y - A.y;
            const dist = Math.hypot(dx, dy) || 1;
            const k = (dist - L) / dist / 2;
            A.x += dx * k;
            A.y += dy * k;
            B.x -= dx * k;
            B.y -= dy * k;
          }
          for (const p of [A, B]) {
            if (p.y > groundY - R) {
              const vy = p.y - p.py;
              const vx = p.x - p.px;
              p.y = groundY - R;
              p.py = p.y + vy * 0.25;
              p.px = p.x - vx * 0.82;
            }
            if (p.x < R) {
              p.x = R;
              p.px = p.x + (p.x - p.px) * 0.3;
            }
            if (p.x > W - R) {
              p.x = W - R;
              p.px = p.x + (p.x - p.px) * 0.3;
            }
          }
          // Une lame posée debout bascule : légère poussée sur le point le plus haut.
          const low = A.y > B.y ? A : B;
          const high = low === A ? B : A;
          if (low.y >= groundY - R - 0.5 && Math.abs(high.x - low.x) < L * 0.35) high.x += (high.x >= low.x ? 1 : -1) * 0.04;
        }
        checkCuts();
      }
      if (d) {
        d.fromX = d.toX;
        d.fromY = d.toY;
      }
      syncKatana();
    }

    /** La lame traverse un morceau assez vite : il se coupe le long de la lame. */
    function checkCuts() {
      if (!kat) return;
      const { A, B } = kat;
      const len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
      const ux = (B.x - A.x) / len;
      const uy = (B.y - A.y) / len;
      for (const ch of chunks.slice()) {
        if (ch.cool > 0 || ch.dead) continue;
        for (let t = 0.32; t <= 1.001; t += 0.06) {
          const qx = A.x + t * (B.x - A.x);
          const qy = A.y + t * (B.y - A.y);
          const ox = A.px + t * (B.px - A.px);
          const oy = A.py + t * (B.py - A.py);
          const speed = Math.hypot(qx - ox - ch.vx / SUB, qy - oy - ch.vy / SUB) * SUB;
          if (speed < 4.5) continue;
          const lp = toLocal(ch, qx, qy);
          if (!inPoly(lp, ch.poly)) continue;
          const inPlant = (lp.x / 72) ** 2 + ((lp.y + 150) / 96) ** 2 < 1;
          if (!(inPoly(lp, BOWL) || inPlant)) continue;
          const co = Math.cos(-ch.c.rotation);
          const si = Math.sin(-ch.c.rotation);
          if (cutChunk(ch, lp, { x: ux * co - uy * si, y: ux * si + uy * co }, qx, qy) && !kat.drag) {
            for (const p of [A, B]) {
              p.px = p.x - (p.x - p.px) * 0.8;
              p.py = p.y - (p.y - p.py) * 0.8;
            }
          }
          break;
        }
      }
    }

    function cutChunk(ch: Chunk, P: Pt, D: Pt, wx: number, wy: number) {
      if (chunks.length > 70) return false;
      const N = { x: -D.y, y: D.x };
      const kids: Array<{ side: number; poly: Pt[]; bowl: Pt[]; plant: Pt[]; w?: Pt }> = [];
      for (const side of [1, -1]) {
        const poly = clip(ch.poly, P, N, side);
        const bowl = ch.bowl.length >= 3 ? clip(ch.bowl, P, N, side) : [];
        const plant = ch.plant.length >= 3 ? clip(ch.plant, P, N, side) : [];
        const b = bowl.length >= 3 ? bowl : [];
        const pl = plant.length >= 3 ? plant : [];
        if (area(b) + area(pl) < 40) continue; // trop petit : ce bout disparaît
        kids.push({ side, poly, bowl: b, plant: pl });
      }
      if (!kids.length) return false;
      const rotc = ch.c.rotation;
      const co = Math.cos(rotc);
      const si = Math.sin(rotc);
      const nwx = N.x * co - N.y * si;
      const nwy = N.x * si + N.y * co;
      for (const k of kids) k.w = toWorld(ch, centroid(k.bowl.concat(k.plant)));
      layers.pots.removeChild(ch.c);
      ch.c.destroy({ children: true });
      ch.dead = true;
      chunks.splice(chunks.indexOf(ch), 1);
      for (const k of kids) {
        addChunk({
          poly: k.poly,
          bowl: k.bowl,
          plant: k.plant,
          world: k.w,
          rot: rotc,
          vx: ch.vx + nwx * k.side * (0.8 + Math.random() * 0.6),
          vy: ch.vy + nwy * k.side * 1.2 - 1.4,
          vr: ch.vr + k.side * (0.02 + Math.random() * 0.03),
          cool: 14,
        });
      }
      for (let i = 0; i < 12; i++) {
        const g = new PIXI.Graphics();
        g.beginFill(i % 3 ? C.soft : C.ink);
        g.drawCircle(0, 0, (1.5 + Math.random() * 2.5) * S);
        g.endFill();
        g.position.set(wx, wy);
        layers.soil.addChild(g);
        soil.push({ g, vx: (Math.random() - 0.5) * 7, vy: -Math.random() * 6 - 1, done: false });
      }
      if (soil.length > 260) {
        soil.splice(0, soil.length - 260).forEach((s) => {
          layers.soil.removeChild(s.g);
          s.g.destroy();
        });
      }
      crac(wx, wy);
      onCutRef.current();
      return true;
    }

    function crac(x: number, y: number) {
      const c = new PIXI.Container();
      c.position.set(x, y - 40 * S);
      const b = new PIXI.Graphics();
      b.lineStyle(2, C.ink, 1);
      b.beginFill(C.white);
      const pts: number[] = [];
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        const r = i % 2 ? 34 : 54;
        pts.push(Math.cos(a) * r * 1.5, Math.sin(a) * r);
      }
      b.drawPolygon(pts);
      b.endFill();
      const t = new PIXI.Text('CRAC !', { fontFamily: '"Patrick Hand", Lato, sans-serif', fontSize: 34, fill: C.ink });
      t.anchor.set(0.5);
      c.addChild(b, t);
      c.scale.set(0.2 * S);
      layers.fx.addChild(c);
      fx.push({ c, age: 0 });
    }

    function piecesStep() {
      for (const p of chunks) {
        if (p.cool > 0) p.cool--;
        if (p.still || p.rest > 90) continue;
        p.vy += G;
        p.c.x += p.vx;
        p.c.y += p.vy;
        p.c.rotation += p.vr;
        let maxY = -Infinity;
        let lowX = 0;
        for (const q of p.bowl.concat(p.plant)) {
          const w = toWorld(p, q);
          if (w.y > maxY) {
            maxY = w.y;
            lowX = w.x;
          }
        }
        if (maxY > groundY) {
          p.c.y -= maxY - groundY;
          if (p.vy > 0) p.vy = -p.vy * 0.2;
          p.vx *= 0.82;
          p.vr += p.c.x < lowX - 0.5 ? -0.006 : p.c.x > lowX + 0.5 ? 0.006 : 0;
          p.vr *= 0.9;
          if (Math.abs(p.vy) < 0.6 && Math.abs(p.vx) < 0.15 && Math.abs(p.vr) < 0.004) p.rest++;
          else p.rest = 0;
          if (p.rest > 90) {
            p.vx = 0;
            p.vy = 0;
            p.vr = 0;
          }
        }
        if (p.c.x < 0 || p.c.x > W) {
          p.vx = -p.vx * 0.5;
          p.c.x = Math.max(0, Math.min(W, p.c.x));
        }
      }
      for (const s of soil) {
        if (s.done) continue;
        s.vy += G;
        s.g.x += s.vx;
        s.g.y += s.vy;
        if (s.g.y > groundY - 2) {
          s.g.y = groundY - 2;
          s.vx *= 0.5;
          s.vy = 0;
          if (Math.abs(s.vx) < 0.1) s.done = true;
        }
      }
      for (const f of fx) {
        f.age++;
        f.c.scale.set((0.2 + 0.8 * Math.min(1, f.age / 8)) * S);
        if (f.age > 50) f.c.alpha = Math.max(0, 1 - (f.age - 50) / 25);
      }
      fx = fx.filter((f) => {
        if (f.age <= 76) return true;
        layers.fx.removeChild(f.c);
        f.c.destroy({ children: true });
        return false;
      });
    }

    app.ticker.add(() => {
      if (!kat) return;
      if (!kat.asleep) katanaStep();
      piecesStep();
    });

    /* ---------- attraper le katana : écoute en capture sur la pièce ---------- */
    const local = (e: { clientX: number; clientY: number }) => {
      const r = room.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    function hitKatana(p: Pt) {
      if (!kat) return -1;
      const { A, B } = kat;
      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const l2 = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((p.x - A.x) * dx + (p.y - A.y) * dy) / l2));
      return Math.hypot(p.x - (A.x + t * dx), p.y - (A.y + t * dy)) < Math.max(14, 18 * S) ? t : -1;
    }
    const onDown = (e: PointerEvent) => {
      if (!kat || (e.target as Element | null)?.closest('a,button')) return;
      const p = local(e);
      const t = hitKatana(p);
      if (t < 0) return;
      e.preventDefault();
      e.stopPropagation();
      kat.asleep = false;
      const len = Math.hypot(kat.B.x - kat.A.x, kat.B.y - kat.A.y) || 1;
      kat.drag = { id: e.pointerId, t, fromX: p.x, fromY: p.y, toX: p.x, toY: p.y, ux: (kat.B.x - kat.A.x) / len, uy: (kat.B.y - kat.A.y) / len };
      try {
        room.setPointerCapture(e.pointerId);
      } catch {
        /* capture indisponible : on continue sans */
      }
      room.style.cursor = 'grabbing';
    };
    // Sur écran tactile, un geste qui commence sur la lame ne fait pas défiler la page.
    const onTouchStart = (e: TouchEvent) => {
      const t0 = e.touches[0];
      if (t0 && hitKatana(local(t0)) >= 0) e.preventDefault();
    };
    const onMove = (e: PointerEvent) => {
      if (!kat) return;
      const p = local(e);
      if (kat.drag && kat.drag.id === e.pointerId) {
        kat.drag.toX = p.x;
        kat.drag.toY = p.y;
        return;
      }
      if (e.pointerType === 'mouse') room.style.cursor = hitKatana(p) >= 0 ? 'grab' : '';
    };
    const onUp = (e: PointerEvent) => {
      if (kat?.drag && kat.drag.id === e.pointerId) {
        kat.drag = null;
        room.style.cursor = '';
      }
    };
    room.addEventListener('pointerdown', onDown, true);
    room.addEventListener('touchstart', onTouchStart, { capture: true, passive: false });
    room.addEventListener('pointermove', onMove);
    room.addEventListener('pointerup', onUp);
    room.addEventListener('pointercancel', onUp);

    // Redimensionnement : on repose la scène.
    let lastW = 0;
    let lastH = 0;
    let timer = 0;
    const ro = new ResizeObserver(() => {
      if (!kat) return;
      if (Math.abs(room.clientWidth - lastW) < 2 && Math.abs(room.clientHeight - lastH) < 2) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        lastW = room.clientWidth;
        lastH = room.clientHeight;
        build();
      }, 120);
    });
    ro.observe(room);

    // Démarrage : on attend les polices (elles changent la hauteur de la page) pour poser la scène au bon endroit.
    let alive = true;
    host.style.visibility = 'hidden';
    const start = () => {
      if (!alive || kat) return;
      lastW = room.clientWidth;
      lastH = room.clientHeight;
      build();
    };
    Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => window.setTimeout(r, 1500))]).then(() =>
      requestAnimationFrame(start),
    );

    return () => {
      alive = false;
      buildRef.current = undefined;
      window.clearTimeout(timer);
      ro.disconnect();
      room.removeEventListener('pointerdown', onDown, true);
      room.removeEventListener('touchstart', onTouchStart, { capture: true });
      room.removeEventListener('pointermove', onMove);
      room.removeEventListener('pointerup', onUp);
      room.removeEventListener('pointercancel', onUp);
      room.style.cursor = '';
      app.destroy(true, { children: true });
    };
  }, [roomRef, floorRef]);

  // « Tout remettre en place ».
  useEffect(() => {
    if (resetKey > 0) buildRef.current?.();
  }, [resetKey]);

  return <div ref={hostRef} className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true" />;
}
