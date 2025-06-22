const orb = document.getElementById('orb');
const canvas = document.getElementById('explosionCanvas');
const ctx = canvas.getContext('2d');
const messageEl = document.getElementById('message');
const thankyou = document.getElementById('thankyou');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Countdown
let countdown = 3;
orb.textContent = countdown;
orb.style.opacity = 1;

let orbTimer = setInterval(() => {
  countdown--;
  if (countdown > 0) {
    orb.textContent = countdown;
  } else {
    clearInterval(orbTimer);
    orb.style.display = 'none';
    triggerExplosion();
  }
}, 1000);

// Particle FX
function triggerExplosion() {
  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: (Math.random() - 0.5) * 6,
      dy: (Math.random() - 0.5) * 6,
      radius: 3,
      alpha: 1
    });
  }

  let frames = 0;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.01;
      ctx.fillStyle = `rgba(0,255,0,${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    frames++;
    if (frames > 60) {
      clearInterval(interval);
      dropLetters();
    }
  }, 16);
}

// Quote Fall In
function dropLetters() {
  const text = "If they dressed in suits like bad guys in Die Hard and no name tags, it's prolly a drug club";
  messageEl.innerHTML = '';
  const chars = text.split('');
  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${i * 30}ms`;
    messageEl.appendChild(span);
  });

  // Fade out message and show Thank You
  setTimeout(() => {
    messageEl.style.transition = 'opacity 1s ease-in-out';
    messageEl.style.opacity = 0;
    flashThenThank();
  }, 10000);
}

// White flash + thank you burn
function flashThenThank() {
  document.body.style.backgroundColor = 'white';
  setTimeout(() => {
    document.body.style.backgroundColor = 'black';
    thankyou.style.opacity = 1;
  }, 150);
}