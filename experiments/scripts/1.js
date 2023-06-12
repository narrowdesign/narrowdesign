let logo = document.querySelector('.js-logo path');

function setup() {
  w = 800;
  h = 800;
  halfW = h / 2;
  halfH = w / 2;
  createCanvas(w, h);
  createCanvas(w, h);
  pos = createVector(halfW, halfH);
  reset();
  document.body.classList.add('is-in');
}

function reset() {
  mass = Math.random() * 120 + 50;
  radius = Math.random() * 100 + 150
  tick = 1;
  resetCount = 0;
  // needed something to randomly scale the colors for variation
  rS = Math.random() * 255;
  gS = Math.random() * 255;
  bS = Math.random() * 255;
  bgR = Math.random() * 55;
  bgG = Math.random() * 55;
  bgB = Math.random() * 55;
  blendMode(BLEND) // have to reset this since it's currently set to SCREEN and I want to clear it
  background(bgR, bgG, bgB);
  document.body.style.background = `rgb(${bgR}, ${bgG}, ${bgB})`;
}

function draw() {
  let batch = Math.min(120, Math.ceil(tick / 100));
  for (let i = 0; i < batch; i++){
    tick++;
    let r = Math.sin(pos.x / 200) * rS;
    let g = Math.sin(pos.y / 200) * gS;
    let b = Math.sin(pos.y / 200) * bS;
    mass += .0025;
    pos.x = Math.sin(tick / 60) * radius + halfW;
    pos.y = Math.cos(tick / 60) * radius + halfH;
    fill(0, 0, 0, 0); // no fill
    strokeWeight(3);
    stroke(r, g, b, 7);
    blendMode(SCREEN); // additive color so it gets lighter each drawing
    ellipse(pos.x, pos.y, noise(g / 80) * mass);
  }
  if (tick > 20000) {
    resetCount++;
    bgOpacity = resetCount;
    blendMode(BLEND) // have to reset this since it's currently set to SCREEN and I want to clear it
    background(bgR, bgG, bgB, bgOpacity * 3);
    if (bgOpacity >= 105) {
      reset()
    }
  }
}
