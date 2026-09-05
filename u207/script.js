// Toggle mega menu via click for touch/keyboard support
document.querySelectorAll('.main-nav > ul > li').forEach(li => {
  const trigger = li.querySelector(':scope > a');
  if (!li.querySelector('.mega')) return;
  trigger.addEventListener('click', () => {
    const isOpen = li.classList.contains('open');
    document.querySelectorAll('.main-nav > ul > li.open').forEach(other => {
      if (other !== li) other.classList.remove('open');
    });
    li.classList.toggle('open', !isOpen);
  });
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.main-nav')) {
    document.querySelectorAll('.main-nav > ul > li.open').forEach(li => li.classList.remove('open'));
  }
});

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Theme toggle (light/dark), persisted per-browser
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
try {
  const saved = localStorage.getItem('u207-theme');
  if (saved) root.setAttribute('data-theme', saved);
} catch (e) { /* storage unavailable */ }
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('u207-theme', next); } catch (e) {}
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Back to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 500));
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
