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
