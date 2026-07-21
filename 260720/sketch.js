let isRecording = false;

function setup() {
    pixelDensity(1);
    createCanvas(1080, 1080);
    frameRate(15);
}


function draw() {
    background(255);

    for (let i = 0; i < 10; i++) {
        noStroke();
        fill(random(0, 255), random(0, 255), random(0, 255));
        triangle(random(0, 1080), random(0, 1080), random(0, 1080), random(0, 1080), random(0, 1080), random(0, 1080));
    }
}

function keyPressed() {
    if ((key === "v" || key === "V") && !isRecording) {
        recordVideo(3);
    }
}


function recordVideo(seconds) {
    const canvas = document.querySelector("canvas");
    const stream = canvas.captureStream(15);
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
        link.download = `260720.${extension}`;
        link.click();
        URL.revokeObjectURL(link.href);
        stream.getTracks().forEach(track => track.stop());
        isRecording = false;
    };

    isRecording = true;
    recorder.start();
    setTimeout(() => recorder.stop(), seconds * 1000);
}

