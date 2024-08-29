import { ImageManager } from "../controler/ImageManager.mjs";
import { BaseCanvas } from "./BaseCanvas.mjs";



class DragYDropCanvas extends BaseCanvas{

    constructor(canvasId, tileSize){

        super(canvasId, tileSize);
        this.smallWorlInfo=ImageManager.getWorldMapInfo('smallInfo');
        this.mapaMundiWorldInfo=ImageManager.getWorldMapInfo('mapaMundi');
        
        this.objectX=0;
        this.objectY=0;
        this.objectWidth=400;
        this.spriteSize=800;
        this.objectWidth=400;
        

        
    }


    drawObject(x,y,size){
        this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
        this.ctx.drawImage(this.smallWorlInfo.spriteSheet,0,0,800,800,x,y,size*4,size*4);
  
    }
    resetCanvas(){
        this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
    }


}
export {DragYDropCanvas}