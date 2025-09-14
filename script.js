// Clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Dock icons
const dockIcons = document.querySelectorAll('.dock-icon');
const appWindow = document.getElementById('appWindow');
const appIframe = appWindow.querySelector('iframe');
const minecraftWindow = document.getElementById('minecraftWindow');

dockIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const app = icon.dataset.app;
    if(app === 'minecraft') {
      minecraftWindow.style.display = 'block';
    } else {
      appIframe.src = app;
      appWindow.style.display = 'block';
    }
  });
});

// Close buttons
document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.parentElement.style.display = 'none';
  });
});

// Simple 2D Minecraft clone
const canvas = document.getElementById('minecraftCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 570;

let player = {x: 50, y: 50, size: 20};
let blocks = [];

document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowUp') player.y -= 10;
  if(e.key === 'ArrowDown') player.y += 10;
  if(e.key === 'ArrowLeft') player.x -= 10;
  if(e.key === 'ArrowRight') player.x += 10;
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  blocks.push({x: e.clientX - rect.left, y: e.clientY - rect.top, size: 20});
});

function draw() {
  ctx.fillStyle = '#87ceeb';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  blocks.forEach(b => {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(b.x,b.y,b.size,b.size);
  });

  ctx.fillStyle = '#FF0000';
  ctx.fillRect(player.x, player.y, player.size, player.size);

  requestAnimationFrame(draw);
}
draw();
