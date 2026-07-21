let blocks = [];
let cols;
let rows;
let size = 20;
let distMouse = 40;
let offset=8;
let isRecording = false;

function setup() {
    pixelDensity(4);
    frameRate(60);
    createCanvas(800, 800);
    noCursor();
    rectMode(CENTER);
    angleMode(DEGREES);
    cols = width/size;
    rows = height/size;

    for (let i = 0; i < cols; i++) {
        blocks[i]=[];
        for (let j = 0; j < rows; j++) {
            blocks[i][j]=new Block(size/2+i*size, size/2+j*size);
        }
    }
}

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            blocks[i][j].move();
            blocks[i][j].display();
        }
    }

    drawCanvasCursor();
}

function drawCanvasCursor() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return;
    }

    push();
    fill(0);
    stroke(255);
    strokeWeight(1);
    circle(mouseX, mouseY, 12);
    line(mouseX - 8, mouseY, mouseX + 8, mouseY);
    line(mouseX, mouseY - 8, mouseX, mouseY + 8);
    pop();
}


function keyPressed() {
    if ((key === "v" || key === "V") && !isRecording) {
        recordVideo(3);
    }
}


function recordVideo(seconds) {
    const canvas = document.querySelector("canvas");
    const stream = canvas.captureStream(60);
    const mimeTypes = [
        "video/mp4;codecs=avc1",
        "video/mp4",
        "video/webm;codecs=vp9",
        "video/webm"
    ];
    const mimeType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type));
    const options = { videoBitsPerSecond: 8_000_000 };
    if (mimeType) {
        options.mimeType = mimeType;
    }
    const recorder = new MediaRecorder(stream, options);
    const chunks = [];

    recorder.ondataavailable = event => {
        if (event.data.size > 0) {
            chunks.push(event.data);
        }
    };

    recorder.onstop = () => {
        const extension = recorder.mimeType.includes("mp4") ? "mp4" : "webm";
        const blob = new Blob(chunks, { type: recorder.mimeType });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = `260721.${extension}`;
        link.click();
        URL.revokeObjectURL(link.href);
        stream.getTracks().forEach(track => track.stop());
        isRecording = false;
    };

    isRecording = true;
    recorder.start();
    setTimeout(() => recorder.stop(), seconds * 1000);
}

