import { ImageManager } from "../controler/ImageManager.mjs";
import { BaseCanvas } from "./BaseCanvas.mjs";



class DragYDropCanvas extends BaseCanvas {

    constructor(canvasId, tileSize) {

        super(canvasId, tileSize);
        this.smallWorlInfo = ImageManager.getWorldMapInfo('smallInfo');
        this.mapaMundiWorldInfo = ImageManager.getWorldMapInfo('mapaMundi');

        this.objToDraw = null;
        this.rotation = 0;
        this.x=0;
        this.y=0;
        this.size=0;

    }
    setCoordenates(x,y,size){
        this.x=x;
        this.y=y;
        this.size=size;
     
    }
    rotate(degrees) {
        this.rotation = (this.rotation + degrees) % 360;
    }

    setObj(obj) {
        this.objToDraw = obj;
    }
    setSpriteToDraw(obj, objX, objY) {

        this.objToDraw.spriteSheet = obj.spriteSheet;
        this.objToDraw.x = objX;
        this.objToDraw.y = objY;
        this.objToDraw.spriteWidth = obj.frSize;
        this.objToDraw.spriteHeight = obj.frSize;
        this.objToDraw.cols = 1;
        this.objToDraw.rows = 1;
    }

    drawObject(rotation=0) {
        if (this.objToDraw == null) return console.log('Objeto nulo');
        if (this.objToDraw.type=='block') rotation=0;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        this.ctx.rotate(rotation * Math.PI / 180);

        this.ctx.drawImage(
            this.objToDraw.spriteSheet,
            this.objToDraw.x, this.objToDraw.y,
            this.objToDraw.spriteWidth,
            this.objToDraw.spriteHeight
            , -this.size / 2, -this.size / 2,
            this.size * this.objToDraw.rows,
            this.size * this.objToDraw.cols
        );
        this.ctx.restore();

    }

    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }


}
export { DragYDropCanvas }