let size=50;
let cols=10;
let rows=10;
let boxes=[];
let angle=0;

function setup() {
    pixelDensity(3);
    createCanvas(600,600,WEBGL);
    frameRate(144);
    angleMode(DEGREES);
    for(let i=0;i<cols;i++){
        boxes[i]=[];
        for(let j=0;j<rows;j++){
            boxes[i][j]=new Box(i * size - size * cols / 2 + size / 2, j * size - size * rows / 2 + size / 2,angle);
        }
    }
}

function draw() {
    background(220);
    

    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            boxes[i][j].display();
        }
    }
}

function keyPressed() {
    if (key === "v" || key === "V") {
        recordVideo(10);
    }
}


function recordVideo(seconds) {
    const canvas = document.querySelector("canvas");
    const stream = canvas.captureStream(144);
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
