// ── BACKGROUND AUDIO + MUSIC TOGGLE BUTTON ──
const bgAudio    = document.getElementById('bg-audio');
const musicBtn   = document.getElementById('music-btn');
const musicIcon  = document.getElementById('music-icon');
const musicLabel = document.getElementById('music-label');
let musicStarted = false;

function setPlaying(isPlaying) {
  if (isPlaying) {
    musicIcon.textContent  = '■';
    musicLabel.textContent = 'Pause';
    musicBtn.classList.add('playing');
  } else {
    musicIcon.textContent  = '▶';
    musicLabel.textContent = 'Music';
    musicBtn.classList.remove('playing');
  }
}

musicBtn.addEventListener('click', () => {
  if (!bgAudio) return;
  if (!musicStarted) {
    bgAudio.volume = 0.3;
    bgAudio.play().then(() => {
      musicStarted = true;
      setPlaying(true);
    }).catch(() => {});
  } else if (bgAudio.paused) {
    bgAudio.play();
    setPlaying(true);
  } else {
    bgAudio.pause();
    setPlaying(false);
  }
});

// Auto-pause music when a video starts
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    if (!bgAudio.paused) {
      bgAudio.pause();
      setPlaying(false);
    }
  });
});

// ── VIDEO PLAY BUTTONS ──
document.querySelectorAll('.video-thumb').forEach(thumb => {
  const btn   = thumb.querySelector('.play-btn');
  const video = thumb.querySelector('video');
  if (!btn || !video) return;

  btn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      btn.style.opacity = '0';
    } else {
      video.pause();
      btn.style.opacity = '1';
    }
  });

  video.addEventListener('pause', () => { btn.style.opacity = '1'; });
  video.addEventListener('ended', () => { btn.style.opacity = '1'; });
});
