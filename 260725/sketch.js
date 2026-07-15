function setup() {
    createCanvas(800, 600);
  }
  function draw() {
    background("yellow");
    // 在中心绘制一个直径为 100 的圆
// 当按下鼠标按键时，圆圈变为黑色
if (mouseIsPressed === true) {
    fill(0);
  } else {
    fill(255);
  }

  }