let gradientShader;

async function setup() {
    pixelDensity(2);
    createCanvas(800, 800, WEBGL);
    noStroke();
    gradientShader = await loadShader("shader.vert", "shader.frag");
}

function draw() {
    if (!gradientShader) {
        return;
    }

    shader(gradientShader);

    gradientShader.setUniform("uResolution", [width, height]);
    gradientShader.setUniform("uTime", millis() / 1000);
    gradientShader.setUniform("uMouse", [
        mouseX / width,
        mouseY / height
    ]);

    plane(width, height);
}

function keyPressed() {
    if (key === 's' || key === 'S') {
        saveCanvas('260716', 'png');
    }
}
