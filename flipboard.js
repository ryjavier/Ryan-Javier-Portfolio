/* flipboard.js — True Solari split-flap.
   Tiles start BLANK. Character appears only once, via the flip.

   CROPPING MECHANISM:
   Each half-container is exactly 50% of the tile height (overflow:hidden).
   The span inside has line-height = full tile height, so the character is
   vertically centered in the full tile. The parent clips to its half:
     - top half:    span is bottom-anchored  → shows top crop
     - bottom half: span is top-anchored with translateY(-50%) → shows bottom crop
*/

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.,!- ';

function makeTile(isFinalSpace) {
  const wrap = document.createElement('div');
  wrap.className = isFinalSpace ? 'flip-tile tile-space' : 'flip-tile';
  if (isFinalSpace) return wrap;

  const tTop = document.createElement('div');
  tTop.className = 'tile-top';
  tTop.innerHTML = '<span>\u00A0</span>';  // blank

  const tBot = document.createElement('div');
  tBot.className = 'tile-bot';
  tBot.innerHTML = '<span>\u00A0</span>';  // blank

  const hinge = document.createElement('div');
  hinge.className = 'tile-hinge';

  wrap.appendChild(tTop);
  wrap.appendChild(tBot);
  wrap.appendChild(hinge);
  wrap._char = '';
  return wrap;
}

function flipTile(wrap, newCh, onDone) {
  if (!wrap || wrap.classList.contains('tile-space')) { onDone && onDone(); return; }

  const tTop  = wrap.querySelector('.tile-top');
  const tBot  = wrap.querySelector('.tile-bot');
  const oldCh = wrap._char || '\u00A0';

  // Remove any in-flight flaps
  wrap.querySelectorAll('.flap-top, .flap-bot').forEach(f => f.remove());

  // FlapA — old char top half, folds down to -90°
  const flapA = document.createElement('div');
  flapA.className = 'flap-top';
  flapA.innerHTML = `<span>${oldCh}</span>`;

  // FlapB — new char bottom half, starts at +90°, unfolds to 0°
  const flapB = document.createElement('div');
  flapB.className = 'flap-bot';
  flapB.innerHTML = `<span>${newCh}</span>`;

  // Update static halves (hidden behind flaps until they depart)
  tTop.innerHTML = `<span>${newCh}</span>`;
  tBot.innerHTML = `<span>${newCh}</span>`;
  wrap._char = newCh;

  wrap.appendChild(flapA);
  wrap.appendChild(flapB);

  void flapA.offsetWidth; // force reflow
  flapA.style.animation = 'flapFoldDown 0.16s ease-in forwards';

  setTimeout(() => {
    void flapB.offsetWidth;
    flapB.style.animation = 'flapUnfoldUp 0.16s ease-out forwards';
  }, 160);

  setTimeout(() => {
    flapA.remove();
    flapB.remove();
    onDone && onDone();
  }, 340);
}

function animateTile(wrap, finalCh, startDelay) {
  if (!wrap || wrap.classList.contains('tile-space')) return;
  const scrambles = Math.floor(Math.random() * 4) + 3;
  let step = 0;

  function next() {
    if (step >= scrambles) { flipTile(wrap, finalCh); return; }
    let r;
    do { r = CHARSET[Math.floor(Math.random() * CHARSET.length)]; } while (!r.trim());
    flipTile(wrap, r, () => { step++; setTimeout(next, 45 + Math.random() * 55); });
  }

  setTimeout(next, startDelay);
}

function buildRow(rowEl, text) {
  rowEl.innerHTML = '';
  const result = [];
  for (const ch of text.toUpperCase()) {
    const tile = makeTile(ch === ' ');
    rowEl.appendChild(tile);
    result.push({ tile, ch });
  }
  return result;
}

function setTileFinal(wrap, ch) {
  if (!wrap || wrap.classList.contains('tile-space')) return;
  const tTop = wrap.querySelector('.tile-top');
  const tBot = wrap.querySelector('.tile-bot');
  tTop.innerHTML = `<span>${ch}</span>`;
  tBot.innerHTML = `<span>${ch}</span>`;
  wrap._char = ch;
}

function runFlipboard() {
  const nameRow = document.getElementById('flip-name');
  const tag1Row = document.getElementById('flip-tagline-1');
  const tag2Row = document.getElementById('flip-tagline-2');
  if (!nameRow) return;

  const nameTiles = buildRow(nameRow, 'RYAN JAVIER');
  const t1Tiles   = buildRow(tag1Row, 'DESIGNING THE RIDE,');
  const t2Tiles   = buildRow(tag2Row, 'NOT JUST THE ROUTE');

  // Only animate on first load (hard refresh or direct visit).
  // When navigating back from a case study page, show the final text immediately.
  const hasVisited = sessionStorage.getItem('flipboard_seen');

  if (hasVisited) {
    // Already seen this session — show final state instantly, no animation
    nameTiles.forEach(({ tile, ch }) => setTileFinal(tile, ch));
    t1Tiles.forEach(({ tile, ch })   => setTileFinal(tile, ch));
    t2Tiles.forEach(({ tile, ch })   => setTileFinal(tile, ch));
  } else {
    // First visit this session — run the full animation, then mark as seen
    sessionStorage.setItem('flipboard_seen', '1');
    nameTiles.forEach(({ tile, ch }, i) => animateTile(tile, ch, 150 + i * 90));

    const afterName = 150 + nameTiles.length * 90 + 400;
    t1Tiles.forEach(({ tile, ch }, i) => animateTile(tile, ch, afterName + i * 55));

    const afterT1 = afterName + t1Tiles.length * 55 + 220;
    t2Tiles.forEach(({ tile, ch }, i) => animateTile(tile, ch, afterT1 + i * 55));
  }
}

document.addEventListener('DOMContentLoaded', runFlipboard);