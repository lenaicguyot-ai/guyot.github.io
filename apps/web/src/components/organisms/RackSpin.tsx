import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

const START = -18; // angle de départ : on voit le flanc droit de la baie
const SPIN_MS = 5000; // durée de la rotation libre après un lancer

type Mode = 'idle' | 'drag' | 'wheel' | 'spin' | 'home';

/**
 * Case décor de l'accueil : mur rose, fenêtre, sol, et une baie serveur en 3D (CSS) qu'on fait tourner
 * à la souris, au doigt ou au trackpad (balayage horizontal). Lancée vers la gauche, elle tourne
 * 5 secondes à pleine vitesse, ralentit, s'arrête et revient face à nous.
 */
export function RackSpin({ className, children }: { className?: string; children?: ReactNode }) {
  const decorRef = useRef<HTMLDivElement>(null);
  const rackRef = useRef<HTMLDivElement>(null);
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const decor = decorRef.current;
    const rackEl = rackRef.current;
    if (!decor || !rackEl) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const now = () => performance.now();
    const rk = {
      a: START,
      drag: null as null | { id: number; x: number },
      hist: [] as Array<{ dx: number; t: number }>,
      mode: 'idle' as Mode,
      omega: 0,
      until: 0,
      wheelT: 0,
    };

    const note = (dx: number) => {
      const t = now();
      rk.hist.push({ dx, t });
      while (rk.hist.length && t - rk.hist[0].t > 120) rk.hist.shift();
    };
    // Vitesse en px/ms sur les 120 dernières ms (négatif = vers la gauche).
    const speed = () => {
      if (!rk.hist.length) return 0;
      const sum = rk.hist.reduce((s, h) => s + h.dx, 0);
      return sum / Math.max(30, now() - rk.hist[0].t);
    };
    const release = () => {
      const v = speed();
      rk.hist = [];
      if (v < -0.35 && !reduce) {
        rk.mode = 'spin';
        rk.omega = -Math.min(26, Math.max(8, -v * 9));
        rk.until = now() + SPIN_MS;
      } else rk.mode = 'home';
    };

    const onDown = (e: PointerEvent) => {
      rk.drag = { id: e.pointerId, x: e.clientX };
      rk.mode = 'drag';
      rk.hist = [];
      try {
        decor.setPointerCapture(e.pointerId);
      } catch {
        /* capture indisponible : on continue sans */
      }
      setGrabbing(true);
    };
    const onMove = (e: PointerEvent) => {
      const d = rk.drag;
      if (!d || d.id !== e.pointerId) return;
      const dx = e.clientX - d.x;
      d.x = e.clientX;
      rk.a += dx * 0.7;
      note(dx);
    };
    const onUp = (e: PointerEvent) => {
      if (!rk.drag || rk.drag.id !== e.pointerId) return;
      rk.drag = null;
      setGrabbing(false);
      release();
    };
    // Trackpad : balayage horizontal à deux doigts. Le défilement vertical de la page reste normal.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const dx = -e.deltaX * (e.deltaMode === 1 ? 16 : 1);
      if (rk.mode !== 'wheel') {
        rk.mode = 'wheel';
        rk.hist = [];
      }
      rk.a += dx * 0.5;
      note(dx);
      rk.wheelT = now();
    };

    let raf = 0;
    const tick = () => {
      if (rk.mode === 'wheel' && now() - rk.wheelT > 140) release();
      if (rk.mode === 'spin') {
        if (now() > rk.until) rk.omega *= 0.965; // après 5 s, elle ralentit…
        rk.a += rk.omega;
        if (now() > rk.until && Math.abs(rk.omega) < 1.2) rk.mode = 'home'; // …et s'arrête
      }
      if (rk.mode === 'home') {
        // Retour à la position de départ, par le plus court.
        const target = START + Math.round((rk.a - START) / 360) * 360;
        rk.a += (target - rk.a) * 0.12;
        if (Math.abs(target - rk.a) < 0.2) {
          rk.a = START;
          rk.mode = 'idle';
        }
      }
      rackEl.style.transform = `rotateX(-8deg) rotateY(${rk.a}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    decor.addEventListener('pointerdown', onDown);
    decor.addEventListener('pointermove', onMove);
    decor.addEventListener('pointerup', onUp);
    decor.addEventListener('pointercancel', onUp);
    decor.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(raf);
      decor.removeEventListener('pointerdown', onDown);
      decor.removeEventListener('pointermove', onMove);
      decor.removeEventListener('pointerup', onUp);
      decor.removeEventListener('pointercancel', onUp);
      decor.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div
      ref={decorRef}
      className={cx('baie-decor', grabbing && 'is-grabbing', className)}
      role="img"
      aria-label="Baie serveur à faire tourner : glisser vers la gauche"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 372" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <rect x="62" y="70" width="16" height="200" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2" />
        <rect x="322" y="70" width="16" height="200" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2" />
        <rect x="78" y="84" width="244" height="160" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" />
        <line x1="200" y1="84" x2="200" y2="244" stroke="var(--ink)" strokeWidth="2" />
        <line x1="78" y1="164" x2="322" y2="164" stroke="var(--ink)" strokeWidth="2" />
        <path d="M98 148 q0 -14 14 -14 q4 -12 18 -10 q10 -10 22 0 q14 0 14 14 z" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1" />
        <path d="M240 130 q0 -11 11 -11 q3 -9 14 -8 q8 -8 17 0 q11 0 11 11 z" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1" />
        <path d="M200 98 C196 70 214 52 268 40" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-[86px] border-t-plinthe border-baseboard bg-floor" aria-hidden="true" />

      <div className="baie-pos" aria-hidden="true">
        <div className="baie" ref={rackRef}>
          <div className="baie-face baie-back" />
          <div className="baie-face baie-left" />
          <div className="baie-face baie-right" />
          <div className="baie-face baie-top" />
          <div className="baie-face baie-front">
            {[['t'], ['t'], ['c', 't'], ['c']].map((leds, i) => (
              <div key={i} className="baie-tiroir">
                {leds.map((l, j) => (
                  <span key={j} className={cx('h-2.5 w-2.5 flex-none rounded-full', l === 't' ? 'bg-teal' : 'bg-coral')} />
                ))}
                <span className="ml-auto h-3 w-[58px] border-hair border-ink bg-blush" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {children}
      <span className="pointer-events-none absolute bottom-2.5 right-3 font-hand text-[19px] uppercase leading-none text-ink" aria-hidden="true">
        ← Lance la baie
      </span>
    </div>
  );
}
