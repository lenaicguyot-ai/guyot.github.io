import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RackArt } from '../atoms/Illustrations';

/** Lit une couleur de la maquette (tokens.css) pour que la 3D suive la palette. */
const token = (name: string) =>
  new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#341e4d');

/**
 * Baie serveur en 3D, dessinée « au trait » comme le reste de la planche :
 * aplats sans lumière ni ombre (MeshBasicMaterial) et arêtes à l'encre.
 * Tourne doucement et suit la souris. Image fixe si « réduire les animations ».
 * Si WebGL est indisponible, on affiche l'illustration SVG de la baie.
 */
export default function RackScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.4, 8.5);

    const ink = token('--ink');
    const lignes = new THREE.LineBasicMaterial({ color: ink });
    const disposables: Array<{ dispose: () => void }> = [lignes];

    /** Boîte en aplats + arêtes à l'encre. Faces : +x, -x, +y, -y, +z (avant), -z. */
    const boite = (w: number, h: number, d: number, faces: THREE.Color[]) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mats = faces.map((color) => new THREE.MeshBasicMaterial({ color }));
      const mesh = new THREE.Mesh(geo, mats);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), lignes);
      mesh.add(edges);
      disposables.push(geo, edges.geometry, ...mats);
      return mesh;
    };

    const floor = token('--floor');
    const baseboard = token('--baseboard');
    const panel = token('--panel');
    const paper = token('--paper');
    const coral = token('--coral');
    const teal = token('--teal');

    const rack = new THREE.Group();
    scene.add(rack);

    // Caisson : côtés plinthe, dessus blanc, façade sol.
    rack.add(boite(1.8, 3, 1.4, [baseboard, baseboard, panel, baseboard, floor, floor]));

    // Tiroirs (serveurs) en façade, avec voyants.
    const leds: THREE.Mesh[] = [];
    const ledGeo = new THREE.CircleGeometry(0.06, 16);
    disposables.push(ledGeo);
    for (let i = 0; i < 4; i++) {
      const y = 1.05 - i * 0.7;
      const tiroir = boite(1.5, 0.5, 0.1, [panel, panel, panel, panel, panel, panel]);
      tiroir.position.set(0, y, 0.75);
      rack.add(tiroir);
      const slot = boite(0.55, 0.12, 0.02, [paper, paper, paper, paper, paper, paper]);
      slot.position.set(0.35, y, 0.81);
      rack.add(slot);
      [coral, teal].forEach((c, j) => {
        const mat = new THREE.MeshBasicMaterial({ color: c });
        disposables.push(mat);
        const led = new THREE.Mesh(ledGeo, mat);
        led.position.set(-0.55 + j * 0.2, y, 0.81);
        rack.add(led);
        leds.push(led);
      });
    }

    // Câbles au trait qui sortent du haut.
    const cable = new THREE.BufferGeometry().setFromPoints(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.5, 1.5, 0),
        new THREE.Vector3(0.6, 2.1, 0.2),
        new THREE.Vector3(1.4, 2.3, 0.1),
      ]).getPoints(20),
    );
    disposables.push(cable);
    rack.add(new THREE.Line(cable, lignes));

    rack.rotation.set(0.08, -0.5, 0);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Suivi de la souris (parallaxe légère).
    const cible = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      cible.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      cible.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };

    let raf = 0;
    const horloge = new THREE.Clock();
    const tick = () => {
      const t = horloge.getElapsedTime();
      rack.rotation.y += (-0.5 + Math.sin(t * 0.4) * 0.45 + cible.x - rack.rotation.y) * 0.05;
      rack.rotation.x += (0.08 + cible.y - rack.rotation.x) * 0.05;
      rack.position.y = Math.sin(t * 1.2) * 0.05;
      // Voyants qui clignotent à des rythmes différents.
      leds.forEach((led, i) => {
        led.visible = Math.sin(t * (2 + i * 0.37) + i) > -0.6;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (!reduce) {
      window.addEventListener('pointermove', onMove);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  if (failed) return <RackArt className="h-full w-full p-10" />;
  return <div ref={ref} className="h-full w-full" aria-hidden="true" />;
}
