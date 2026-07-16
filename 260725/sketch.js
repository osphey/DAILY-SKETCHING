function setup() {
  createCanvas(800, 800, WEBGL);
}

const a=10

function draw() {
  background(0);

  beginShape();
  vertex(0,a);
  vertex(2*a,0);
  vertex(0,-a);
  vertex(-2*a,0);
  endShape(CLOSE);

  beginShape();
  vertex(0, -2 * a);
  vertex(0, -a);
  vertex(-2 * a, 0);
  vertex(-2 * a, -a);
  endShape(CLOSE);
}
