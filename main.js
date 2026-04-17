/* main.js — Navbar, timeline navigation */

const workData = {
  'chinese-ceramics': {
    page: 'pages/chinese-ceramics.html'
  },
  'travel-posters': {
    page: 'pages/travel-posters.html'
  },
  'card-redesign': {
    page: 'pages/card-redesign.html'
  },
  'book-cover': {
    page: 'pages/book-cover.html'
  },
  'persuasive-posters': {
    page: 'pages/persuasive-posters.html'
  },
  'capstone-website': {
    page: 'pages/capstone-Website.html'
  },
  'aptatic-analytics': {
    page: 'pages/aptatic-analytics.html'
  },
  'auroworld': {
    page: 'pages/auroworld.html'
  },
  'course-registration': {
    page: 'pages/course-registration.html'
  },
  'lingua': {
    page: 'pages/lingua.html'
  }
};

// ── NAVBAR ──────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const heroEl = document.getElementById('hero');

function updateNavbar() {
  if (!heroEl) return;
  const bottom = heroEl.getBoundingClientRect().bottom;
  if (bottom < 60) {
    navbar.classList.remove('hidden');
    navbar.classList.add('visible');
  } else {
    navbar.classList.add('hidden');
    navbar.classList.remove('visible');
  }
}

function updateActiveNav() {
  let current = '';
  ['about','work','contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 100) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', () => { updateNavbar(); updateActiveNav(); }, { passive: true });

// ── TIMELINE STOPS: navigate directly to project page ───────
document.querySelectorAll('.timeline-stop.clickable').forEach(stop => {
  const key = stop.dataset.work;
  if (!key) return;

  const d = workData[key];
  if (!d) return;

  stop.setAttribute('role', 'button');
  stop.setAttribute('tabindex', '0');
  stop.style.cursor = 'pointer';

  stop.addEventListener('click', () => { window.location.href = d.page; });
  stop.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') window.location.href = d.page;
  });
});