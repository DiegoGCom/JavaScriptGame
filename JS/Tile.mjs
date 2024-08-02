
import { ImageManager } from "./ImageManager.mjs";
import { Random } from "./Utils/Random.mjs";

class Tile {

    constructor(ctx, tileIndex) {

        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.x;
        this.y;
        this.tileIndex = tileIndex;
        this._type = "grass";
        this.isSelected = false;
        this.randomIndex = Random.getRandom(0, 5);
        this.bush = Random.getRandom(0, 100) < 20;
        this.visibility = 'clear';

        //Carga de imagenes

        this.backgroundImage = ImageManager.getImage('backgroundImage');

        this.spriteSheet = ImageManager.getImage('spriteSheet')

        this.spriteData= ImageManager.getSpriteData();
        

    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;

    }
    getPositionX() {

        return this.x;
    }


    render(x, y, size) {

        this.setPosition(x, y);

        this.ctx.drawImage(this.backgroundImage, x, y, size, size);

        this.chooseStyle(x, y, size);

        if (this.isSelected) {

            this.selectTile(x, y, size);

        }
        //this.drawStroke(x, y, size);
        this.drawFog(x, y, size);
    }

    /**
     * @param {any} newType
     */
    set type(newType) {

        this._type = newType;

    }

    chooseStyle(x, y, size) {

        switch (this._type) {

            case "mountain":

                this.drawImage('mountain', x, y, size, this.randomIndex);

                break;
            case "forest":

                this.drawImage('tree', x, y, size, this.randomIndex);

                break;
            case "grass":

                if (this.bush) this.drawImage('bush', x, y, size, 0);

                break;
            default:
                this.ctx.fillStyle = "lightgrey";
                break;
        }
    }
    drawImage(type, x, y, size, index) {

        const objectKey = `${type}${index}`;
        const object = this.spriteData[type][objectKey];
       //const object= this.objects[type][objectKey];
    
        if (object) {

            console.log(`Drawing image: ${objectKey}`, object); // Log de depuración
            console.log(`spriteSheet:`, this.spriteSheet); // Log de depuración
            console.log(`Parameters for drawImage - sx: ${object.x}, sy: ${object.y}, sw: ${object.width}, sh: ${object.width}, dx: ${x}, dy: ${y}, dw: ${size}, dh: ${size}`);


            this.ctx.drawImage(
                this.spriteSheet,
                object.x,
                object.y,
                object.width,
                object.width,
                x, y, size, size
            )
        }else{
            console.log(`Failed to load object: ${objectKey}`); // Log de depuración
        }
    }

    /**
     * @param {boolean} selected
     */
    selected(selected) {

        this.isSelected = selected;

        this.render();
    }
    drawStroke(x, y, size) {
        this.ctx.lineWidth = 0.5;

        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(x, y, size, size);
        this.ctx.font = `${size / 8}px Arial`;
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.tileIndex, x, y + size);

    }

    drawFog(x, y, size) {

        let alpha;

        switch (this.visibility) {

            case 'none':
                alpha = 1.0;
                break;
            case 'fogged':
                alpha = 0.7;
                break;
            case 'clear':
                alpha = 0.0;
                break;



        }
        this.ctx.fillStyle = `rgba(0, 0, 0,${alpha})`; // Color negro grisáceo con transparencia
        this.ctx.fillRect(x, y, size, size);




    }

    selectTile(x, y, size) {

        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(x, y, size, size);

    }




}

export { Tile };