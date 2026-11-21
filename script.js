// Chaque bloc vérifie que ses éléments existent : le script est partagé entre plusieurs pages.
const root = document.documentElement;
const $ = id => document.getElementById(id);

// Thème clair/sombre mémorisé (valeur contrôlée : seulement "light" ou "dark")
try {
  const t = localStorage.getItem('theme');
  if (t === 'light' || t === 'dark') root.dataset.theme = t;
} catch (e) {}

if ($('theme')) $('theme').addEventListener('click', () => {
  const dark = getComputedStyle(root).getPropertyValue('--bg').trim() === '#0b0e1a';
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Menu mobile
const menu = $('menu');
if (menu && $('burger')) {
  $('burger').addEventListener('click', () => menu.classList.toggle('open'));
  menu.addEventListener('click', () => menu.classList.remove('open'));
}

// Filtre des projets E5 / E6
document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const f = tab.dataset.f;
  document.querySelectorAll('.project').forEach(p => {
    p.style.display = (f === 'all' || p.dataset.t === f) ? '' : 'none';
  });
}));

// Bouton d'impression du tableau de synthèse (remplace l'ancien onclick inline, bloqué par la CSP)
if ($('print')) $('print').addEventListener('click', () => window.print());
