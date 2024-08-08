
import { ImageManager } from "./ImageManager.mjs";
import { Random } from "./Utils/Random.mjs";

class Tile {

    constructor(ctx, tileIndex,backgroundImage,spriteSheet) {

        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.x= null;
        this.y= null;
        this.tileIndex = tileIndex;
        this.isSelected = false;
        this.randomIndex = Random.getRandom(0, 5);
        this.bush = Random.getRandom(0, 100) < 20;
        this.visibility = 'clear';
        this.strokeOnOff= true;
        

        //Carga de imagenes

        this.backgroundImage = backgroundImage;

        this.spriteSheet = spriteSheet;

        this.spriteData=null;

        this.objectKey=null;

        this.singleImage=null;

       // console.log(this.type);

    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;

    }

    setType(spriteData, objectKey){

        this.spriteData= spriteData;
        this.objectKey= objectKey;
    }
    
      
    render(x, y, size) {

        this.x= x;
        this.y=y;

        this.setPosition(x, y);

        this.ctx.drawImage(this.backgroundImage, x, y, size, size);

        if(this.singleImage) this.ctx.drawImage(this.singleImage, x, y, size, size);
       
        this.drawImage(x,y,size);
       

        if(this.strokeOnOff) this.drawStroke(x,y,size);
       
        if (this.isSelected) this.selectTile(x, y, size);
        
    }
    
 
    drawImage(x, y, size) {

        const object = this.spriteData[this.objectKey];
    
        if (object) {
/*             console.log(`Drawing image: ${objectKey}`, object); // Log de depuración
            console.log(`spriteSheet:`, this.spriteSheet); // Log de depuración
            console.log(`Parameters for drawImage - sx: ${object.x}, sy: ${object.y}, sw: ${object.width}, sh: ${object.width}, dx: ${x}, dy: ${y}, dw: ${size}, dh: ${size}`); */

            this.ctx.drawImage(
                this.spriteSheet,
                object.x,
                object.y,
                object.width,
                object.height,
                x, y, size, size
            )
        }else{
            console.log(`Failed to load object: ${this.objectKey}`); // Log de depuración
        }
    }



    /**
     * @param {boolean} selected
     */
    selected(selected) {

        this.isSelected = selected;

    }

    drawStroke(x, y, size) {
        this.ctx.lineWidth = 0.5;

        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(x, y, size, size);
        this.ctx.font = `${size / 8}px Arial`;
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.tileIndex, x, y + size);

    }

    selectTile(x, y, size) {

        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(x, y, size, size);

    }




}

export { Tile };