// Simple flicker pulse
setInterval(() => {
  const text = document.querySelector('.line3');
  if (text) {
    text.style.opacity = Math.random() > 0.96 ? '0.7' : '1';
  }
}, 200);
