class Box {
    constructor(x, y,angle) {
        this.x = x;
        this.y = y;
        this.angle=angle;
    }

    display() {
        rotateX(this.angle);
        rotateY(this.angle);
        push();
        translate(this.x,this.y);
        rotateX(this.angle);
        rotateY(this.angle);
        box(size-1/3*size);
        pop();
        this.angle+=0.1;
    }
}