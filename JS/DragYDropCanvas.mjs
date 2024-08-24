import { BaseCanvas } from "./BaseCanvas.mjs";
import { ImageManager } from "./ImageManager.mjs";

class DragYDropCanvas extends BaseCanvas{

    constructor(canvasId, tileSize){

        super(canvasId, tileSize);
        this.smallWorlInfo=ImageManager.getWorldMapInfo('smallInfo');
        this.mapaMundiWorldInfo=ImageManager.getWorldMapInfo('mapaMundi');
        
    }


    drawObject(x,y,size){
        this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
        this.ctx.drawImage(this.smallWorlInfo.spriteSheet,0,0,200,200,x,y,size*2,size*2);
  
    }
    resetCanvas(){
        this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
    }


}
export {DragYDropCanvas}