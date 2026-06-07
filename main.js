/* ─── DOM ───────────────────────────────────────────── */
const question = document.querySelector('.question');
const gif      = document.querySelector('.gif');
const yesBtn   = document.querySelector('.yes-btn');
const noBtn    = document.querySelector('.no-btn');

/* ─── Helpers ───────────────────────────────────────── */
function setQuestion(text) {
  question.classList.add('changing');
  setTimeout(() => {
    question.textContent = text;
    question.classList.remove('changing');
  }, 280);
}

function setGif(src, w, h) {
  gif.style.opacity   = '0';
  gif.style.transform = 'scale(0.9)';
  setTimeout(() => {
    gif.src            = src;
    gif.style.width    = w || '200px';
    gif.style.height   = h || '200px';
    gif.style.opacity  = '1';
    gif.style.transform = 'scale(1)';
  }, 320);
}

function hideButtons() {
  yesBtn.classList.add('btn-hidden');
  noBtn.classList.add('btn-hidden');
  yesBtn.classList.remove('runaway-btn');
}

/* ═══════════════════════════════════════════════════════
   STEP 1 — "Tell me" / initial yes click
   ═══════════════════════════════════════════════════════ */

// Create the references first
let s1Yes, s1No, s2Yes, s2No, s3Yes, s3No, s4Yes, s4No, onFinalYes;

// Logic for accepting the apology
s2Yes = function() {
  yesBtn.removeEventListener('click', s2Yes);
  noBtn.removeEventListener('click', s2No);
  setQuestion("Hehehe!! I knew it, Love mo'ko 🥰");
  setGif('images/love.gif');
  hideButtons();
};

s3Yes = function() {
  yesBtn.removeEventListener('click', s3Yes);
  noBtn.removeEventListener('click', s3No);
  setQuestion("Hehehe!! I knew it, Love mo'ko 🥰");
  setGif('images/love.gif');
  hideButtons();
};

s4Yes = function() {
  yesBtn.removeEventListener('click', s4Yes);
  noBtn.removeEventListener('click', s4No);
  setQuestion("Hehehe!! I knew it, Love mo'ko 🥰");
  setGif('images/love.gif');
  hideButtons();
};

onFinalYes = function() {
  noBtn.removeEventListener('click', onFinalYes);
  setQuestion("Hehehe!! I knew it, Love mo'ko 🥰");
  setGif('images/love.gif');
  hideButtons();
};

// Logic for rejecting the apology
s1No = function() {
  noBtn.removeEventListener('click', s1No);
  yesBtn.removeEventListener('click', s1Yes);
  
  // Directly trigger step 2 no
  setQuestion('Think about it carefully!');
  setGif('images/download.gif');
  yesBtn.textContent = 'Okay, fine';
  noBtn.textContent  = 'No way';
  
  yesBtn.addEventListener('click', s3Yes);
  noBtn.addEventListener('click', s3No);
};

s2No = function() {
  noBtn.removeEventListener('click', s2No);
  yesBtn.removeEventListener('click', s2Yes);

  setQuestion('Think about it carefully!');
  setGif('images/download.gif');
  yesBtn.textContent = 'Okay, fine';
  noBtn.textContent  = 'No way';

  yesBtn.addEventListener('click', s3Yes);
  noBtn.addEventListener('click', s3No);
};

s3No = function() {
  noBtn.removeEventListener('click', s3No);
  yesBtn.removeEventListener('click', s3Yes);

  setQuestion('Think once again! 🥹');
  setGif('images/sadlife.gif');
  yesBtn.textContent = 'Okay, I forgive you';
  noBtn.textContent  = 'Final no';

  yesBtn.addEventListener('click', s4Yes);
  noBtn.addEventListener('click', s4No);
};

s4No = function() {
  noBtn.removeEventListener('click', s4No);
  yesBtn.removeEventListener('click', s4Yes);

  setQuestion("Come on, don't play hard to get! 😤");
  setGif('images/run.gif');

  /* Swap labels: the pink "yes" button now says "No"
     and runs away; the ghost "no" button says "Yes"
     and is the real accept button.                   */
  yesBtn.textContent = 'No';
  noBtn.textContent  = 'Yes';

  /* ── Capture size & position BEFORE DOM move ──── */
  const rect = yesBtn.getBoundingClientRect();
  const btnW = yesBtn.offsetWidth;
  const btnH = yesBtn.offsetHeight;

  /* ── Move to <body> so position:fixed is truly
        viewport-relative ──────── */
  document.body.appendChild(yesBtn);
  yesBtn.style.width  = btnW + 'px';
  yesBtn.style.height = btnH + 'px';
  yesBtn.classList.add('runaway-btn');
  /* Anchor to current visual spot first */
  yesBtn.style.left = rect.left + 'px';
  yesBtn.style.top  = rect.top  + 'px';

  /* ── Flee on hover (or touch on mobile) ──────────────────────────────── */
  function flee(e) {
    if (e && e.type === 'touchstart') {
      e.preventDefault(); // Prevent accidental click on touch
    }
    const margin = 70;
    const maxX   = window.innerWidth  - btnW - margin;
    const maxY   = window.innerHeight - btnH - margin;
    yesBtn.style.left = (margin + Math.floor(Math.random() * maxX)) + 'px';
    yesBtn.style.top  = (margin + Math.floor(Math.random() * maxY)) + 'px';
  }
  
  yesBtn.addEventListener('mouseover', flee);
  yesBtn.addEventListener('touchstart', flee, {passive: false});

  /* ── Ghost "Yes" button → happy ending ─────────── */
  noBtn.addEventListener('click', onFinalYes);
};

s1Yes = function() {
  yesBtn.removeEventListener('click', s1Yes);
  noBtn.removeEventListener('click', s1No);

  setQuestion("I'm so sorry 🥺");
  setGif('images/sorry.png', '320px', '260px');
  yesBtn.textContent = 'Okay, fine';
  noBtn.textContent  = 'No';

  yesBtn.addEventListener('click', s2Yes);
  noBtn.addEventListener('click', s2No);
};

// Start the sequence
yesBtn.addEventListener('click', s1Yes);
noBtn.addEventListener('click', s1No);
