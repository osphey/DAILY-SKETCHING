function setup() {
    createCanvas(800, 800,WEBGL);
}
  
const a=10
  
function draw() {

  background(0);

  for(let i=0;i<10;i++){
    for(let j=0;j<=i;j++){
      let p=-i*2*a+j*4*a;
      let q=-15*a+i*3*a;

      fill(255);

      beginShape();
      vertex(p,q);
      vertex(p+2*a,q+a);
      vertex(p,q+2*a);
      vertex(p-2*a,q+a);
      endShape(CLOSE);

      beginShape();
      vertex(p,q);
      vertex(p,q-2*a);
      vertex(p-2*a,q-a);
      vertex(p-2*a,q+a);
      endShape(CLOSE);

    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('260716', 'png');
  }
}
  