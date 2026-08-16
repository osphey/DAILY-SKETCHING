let cols=10;
let rows=10;
let size=90;
const LOOP_DURATION = 1200;
const RECORD_LOOPS = 3;
const POSTER_COLORS = {
    background: "#F2B705",
    horizontal: "#E63B2E",
    vertical: "#1646A0"
};

let canvas;
let animationStart;
let recordButton;

function setup() {
    // 小红书竖屏视频尺寸：1080 × 1920
    canvas = createCanvas(1080, 1920);
    pixelDensity(1);
    frameRate(60);
    animationStart = millis();

    recordButton = document.createElement("button");
    recordButton.textContent = "录制三个循环";
    recordButton.className = "record-button";
    recordButton.addEventListener("click", recordThreeLoops);
    document.body.appendChild(recordButton);
}

function draw() {
    background(POSTER_COLORS.background);

    const gridWidth = (cols - 1) * size;
    const gridHeight = (rows - 1) * size;
    translate((width - gridWidth) / 2, (height - gridHeight) / 2);
    noStroke();

    const ballSize = size / 2;
    const progress = ((millis() - animationStart) % LOOP_DURATION) / LOOP_DURATION;
    const offset = lerp(-size / 2, size / 2, progress);

    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            const cellX = i * size;
            const cellY = j * size;
            let x = cellX;
            let y = cellY;
            const movesHorizontally = i % 2 === j % 2;

            if(movesHorizontally){
                // 第一行奇数列、第二行偶数列，依次交错：从左向右
                x += offset;
            }else{
                // 其他格子：从上向下
                y += offset;
            }

            fill(
                movesHorizontally
                    ? POSTER_COLORS.horizontal
                    : POSTER_COLORS.vertical
            );

            // 将绘制区域限制在当前单元格，超出部分不会显示
            drawingContext.save();
            drawingContext.beginPath();
            drawingContext.rect(
                cellX - size / 2,
                cellY - size / 2,
                size,
                size
            );
            drawingContext.clip();
            circle(x,y,ballSize);

            // 越过一侧的部分，同时从单元格另一侧出现
            if(movesHorizontally){
                circle(x - size,y,ballSize);
                circle(x + size,y,ballSize);
            }else{
                circle(x,y - size,ballSize);
                circle(x,y + size,ballSize);
            }

            drawingContext.restore();
        }
    }
}

function recordThreeLoops() {
    if(!canvas.elt.captureStream || typeof MediaRecorder === "undefined"){
        alert("当前浏览器不支持画布录屏，请使用最新版 Chrome 或 Edge。");
        return;
    }

    const mimeTypes = [
        "video/mp4;codecs=avc1.42E01E",
        "video/mp4;codecs=avc1.42001E",
        "video/mp4"
    ];
    const mimeType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type));

    if(!mimeType){
        alert("当前浏览器不支持直接录制 MP4，请升级到最新版 Chrome 或 Edge。");
        return;
    }

    const stream = canvas.elt.captureStream(60);
    const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 12000000
    });
    const chunks = [];

    recorder.addEventListener("dataavailable", event => {
        if(event.data.size > 0){
            chunks.push(event.data);
        }
    });

    recorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: recorder.mimeType });
        const url = URL.createObjectURL(blob);
        const download = document.createElement("a");
        download.href = url;
        download.download = "grid-3-loops.mp4";
        download.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);

        stream.getTracks().forEach(track => track.stop());
        recordButton.disabled = false;
        recordButton.textContent = "录制三个循环";
    });

    recordButton.disabled = true;
    recordButton.textContent = "正在录制…";
    animationStart = millis();
    recorder.start();
    setTimeout(() => recorder.stop(), LOOP_DURATION * RECORD_LOOPS);
}
