import { ImageManager } from "../controler/ImageManager.mjs";
import { BaseCanvas } from "./BaseCanvas.mjs";



class DragYDropCanvas extends BaseCanvas{

    constructor(canvasId, tileSize){

        super(canvasId, tileSize);
        this.smallWorlInfo=ImageManager.getWorldMapInfo('smallInfo');
        this.mapaMundiWorldInfo=ImageManager.getWorldMapInfo('mapaMundi');
        
        this.objToDraw=null;
        
             
    }
    setObj(obj){
        this.objToDraw=obj;
    }
    setSpriteToDraw(obj,objX,objY){
        
        this.objToDraw.spriteSheet=obj.spriteSheet;
        this.objToDraw.x=objX;
        this.objToDraw.y=objY;
        this.objToDraw.spriteWidth=obj.frSize;
        this.objToDraw.spriteHeight=obj.frSize;
        this.objToDraw.cols=1;
        this.objToDraw.rows=1;
    }

    drawObject(x,y,size){
        if(this.objToDraw==null) return console.log('Objeto nulo');
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.drawImage(this.objToDraw.spriteSheet,this.objToDraw.x,this.objToDraw.y,this.objToDraw.spriteWidth,this.objToDraw.spriteHeight,x,y,size*this.objToDraw.rows,size*this.objToDraw.cols);
    
    }

    resetCanvas(){
        this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
    }


}
export {DragYDropCanvas}