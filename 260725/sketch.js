function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  const cols = 4;
  const rows = 4;
  const cell = width / cols;
  const d = 32;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(255);
      circle(i * cell + cell / 2, j * cell + cell / 2, d);
    }
  }
}
