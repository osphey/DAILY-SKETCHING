let gradientShader;
let isRecording = false;

async function setup() {
    //pixelDensity(1);
    createCanvas(800, 800, WEBGL);
    noStroke();
    gradientShader = await loadShader("shader.vert", "shader.frag");
    frameRate(30);
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
    if ((key === "v" || key === "V") && !isRecording) {
        recordVideo(3);
    }
}

function recordVideo(seconds) {
    const canvas = document.querySelector("canvas");
    const stream = canvas.captureStream(30);
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
        link.download = `260719.${extension}`;
        link.click();
        URL.revokeObjectURL(link.href);
        stream.getTracks().forEach(track => track.stop());
        isRecording = false;
    };

    isRecording = true;
    recorder.start();
    setTimeout(() => recorder.stop(), seconds * 1000);
}
