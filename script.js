// ── BACKGROUND AUDIO ──
// Once you add a src to the <audio> tag in index.html, this will auto-play it
// and handle the loop. Browsers require a user interaction before audio can play,
// so we start it on the first click anywhere on the page.

const bgAudio = document.getElementById('bg-audio');

if (bgAudio && bgAudio.querySelector('source').src) {
  bgAudio.volume = 0.3; // adjust volume here (0.0 - 1.0)

  document.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play().catch(() => {});
    }
  }, { once: true });
}

// ── VIDEO PLAY BUTTONS ──
// Clicking the play button overlay starts the video in-place
document.querySelectorAll('.video-thumb').forEach(thumb => {
  const btn = thumb.querySelector('.play-btn');
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
