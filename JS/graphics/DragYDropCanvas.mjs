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

        this.obj=null;
             
    }
    setObj(obj){
        this.obj=obj;
    }

    drawObject(x,y,size){
        if(this.obj==null) return;
        this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
        this.ctx.drawImage(this.obj.spriteSheet,this.obj.x,this.obj.y,this.obj.spriteWidth,this.obj.spriteHeight,x,y,size*this.obj.fr,size*this.obj.fr);
    }
    resetCanvas(){
        this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
    }


}
export {DragYDropCanvas}