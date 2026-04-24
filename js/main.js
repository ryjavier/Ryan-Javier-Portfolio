/* main.js — Navbar, timeline navigation, LED ticker */

/* ── LED TICKER ─────────────────────────────────────────────
   To update the message, edit LED_TICKER_TEXT below.
   Segments are auto-duplicated for a seamless infinite loop.
   Speed auto-scales with text length (~0.28s per character). */
const LED_TICKER_TEXT =
  '2026 CUXD Design-A-Thon Participant (Results under review forever)' +
  '  \u2022  Design consultant for Lehigh CSE capstones' +
  '  \u2022  Built brand, product, and UX for real clients' +
  '  \u2022  Traveled to 13 countries & 28 states' +
  '  \u2022  Collecting stamps and shipping pixels';

(function initLedTicker() {
  const track = document.getElementById('ledTickerTrack');
  if (!track) return;

  // Two identical segments = seamless loop via translateX(-50%)
  for (let i = 0; i < 2; i++) {
    const seg = document.createElement('span');
    seg.className = 'led-ticker-segment';
    if (i === 1) seg.setAttribute('aria-hidden', 'true');
    seg.textContent = LED_TICKER_TEXT;
    track.appendChild(seg);
  }

  // Scale duration with text length so speed stays consistent
  const duration = Math.max(18, LED_TICKER_TEXT.length * 0.18);
  track.closest('.led-ticker-wrap').style.setProperty('--ticker-duration', duration + 's');
})();

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
