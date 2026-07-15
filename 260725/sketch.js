function setup() {
  createCanvas(800, 800);
  colorMode(RGB, 255);
  noStroke();
}

function draw() {
  background(255);
  const cols = 4;
  const rows = 4;
  const cell = width / cols;
  const d = 32;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * cell + cell / 2;
      const y = j * cell + cell / 2;
      // 画布坐标归一到 0–255，作为 RGB
      const r = map(x, 0, width, 0, 255);
      const g = map(y, 0, height, 0, 255);
      const b = map(x + y, 0, width + height, 0, 255);
      fill(r, g, b);
      circle(x, y, d);
    }
  }
}
