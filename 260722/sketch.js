let x;
let y;
let p=[];
let q=[];
let angle=0;
let r=150;
let shiftingAngle=[];
let numAxis=10;

function setup() {
    createCanvas(800, 800);
    pixelDensity(3);
    angleMode(DEGREES);
    for(let i=0;i<numAxis;i++){
        shiftingAngle[i]=i*90/numAxis;
    }
}

function draw() {
    //angle=map(mouseX,0,width,0,360);
    background("#6405fb");
    noStroke();
    x=r*cos(angle);
    y=r*sin(angle);

    translate(width/2, height/2);

    fill("#0000ff");
    ellipse(0,0,r*2,r*2);



    for(let i=0;i<numAxis;i++){
        p[i]=r*cos(angle+shiftingAngle[i]);
        q[i]=r*sin(angle+shiftingAngle[i]);

        push();
        rotate(-shiftingAngle[i]);

        // line(-r,0,r,0);
        // line(0,-r,0,r);
    
        fill("#fe0000");
        ellipse(p[i],0,20,20);
        ellipse(0,q[i],20,20);
        pop();
    }


    translate(x/2,y/2);

    fill("#fe0000");
    ellipse(0,0,r,r);

    for(let i=0;i<numAxis;i++){
        p[i]=r/2*cos(angle+shiftingAngle[i]);
        q[i]=r/2*sin(angle+shiftingAngle[i]);

        push();
        rotate(-shiftingAngle[i]);

        // line(-r,0,r,0);
        // line(0,-r,0,r);
    
        fill("#ffff00");
        ellipse(p[i],0,10,10);
        ellipse(0,q[i],10,10);
        pop();
    }
    translate(x/4,y/4);
    fill("#ffff00");
    ellipse(0,0,r/2,r/2);

    angle++;

}

function keyPressed() {
    if (key === "v" || key === "V") {
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


