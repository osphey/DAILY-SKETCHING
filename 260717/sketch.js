function setup() {
    pixelDensity(2);
    createCanvas(1000, 1000);
}

function draw() {
    background(255);

    const cellSize = 50;
    const offset = cellSize / 4;
    noStroke();

    for (let x = 0; x < width; x += cellSize) {
        for (let y = 0; y < height; y += cellSize) {
            const column = x / cellSize;
            const row = y / cellSize;

            if ((column + row) % 2) {

                fill(255, 150, 0);
                square(x + offset, y + offset, cellSize);

                fill(0, 150, 255);
                square(x - offset, y - offset, cellSize);

                push();
                translate(x + cellSize / 2, y + cellSize / 2);
                rotate(PI / 4);
                rectMode(CENTER);
                fill(0);
                square(0, 0, cellSize);
                pop();
            }
        }
    }
}
function keyPressed() {
    if (key === 's' || key === 'S') {
        saveCanvas('260716', 'png');
    }
}