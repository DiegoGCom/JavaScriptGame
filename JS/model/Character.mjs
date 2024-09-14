import { Tile } from "./Tile.mjs";

class Character {


    constructor(ctx, name, x, y) {

        this.name = name;
        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.bigMapX;
        this.bigMapY;
        this.x = x;
        this.y = y;
        this.speed = 3;
        this.targetX;
        this.targetY;
        this.frameRate = 0;
        this.currentTile = null;
        this.contador = 1;

        this.offsetX = 0;
        this.offsetY = 0;

        this.tileSize = 100;

        this.path = [];

        //Objeto monigote
        this.monigote = {
            x: 0,
            y: 0,
            width: 200,
            height: 200
        }

        //Carga de imagen
        this.monigoteSheet = new Image();
        this.monigoteLoaded = false;
        this.monigoteSheet.src = "../Assets/Dibujos/Spritesheet/gnomo.png";
        this.monigoteSheet.onload = () => {

            this.monigoteLoaded = true;

        }
        

    }
    setOffset(offsetX, offsetY) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    setPath(path) {
        this.path = path;
    }

    /*Al target hay que sumarle también el offset para que esté coordinado */

    setTarget(targetX, targetY, offsetX, offsetY) {
        this.targetX = targetX + offsetX;
        this.targetY = targetY + offsetY
    }

    updateTarjetPosition(scaleFactor) {
        this.targetX = this.targetX * scaleFactor;
        this.targetY = this.targetY * scaleFactor;
        this.speed *= scaleFactor
    }


    updateScale(scaleFactor) {
        this.x = this.x * scaleFactor;
        this.y = this.y * scaleFactor;
        this.tileSize*=scaleFactor; 
    }
    move() {
        const deltaX = this.targetX - this.x;
        const deltaY = this.targetY - this.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance < this.speed) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.followPath();
        } else {
            this.x += (deltaX / distance) * this.speed;
            this.y += (deltaY / distance) * this.speed;
        }
    }

    render(x, y, size) {
        //this.animateSprite();
        this.tileSize = size;
        this.ctx.drawImage(
            this.monigoteSheet,
            this.monigote.x,
            this.monigote.y,
            this.monigote.width,
            this.monigote.height,
            x, y, size, size);          
    }
    //----MÉTODO QUE MUEVE AL PERSONAJE 
    updateRender(x, y, size) {

        if (this.targetX >= this.x) this.render(x, y, size);
        else this.renderMirror(x, y, size);
    }

    renderMirror(x, y, size) {
        //this.animateSprite();
        this.tileSize = size;
        this.ctx.save();
        this.ctx.translate(x + size, y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
            this.monigoteSheet,
            this.monigote.x,
            this.monigote.y,
            this.monigote.width,
            this.monigote.height
            , 0, 0, size, size);
        this.ctx.restore();

    }
    animateSprite() {

        if (this.frameRate > 8) {
            this.monigote.x += this.monigote.width;
            if (this.monigote.x > this.monigoteSheet.width - this.monigote.width) {
                this.monigote.x = 0; // Resetea al inicio si sobrepasa el ancho total de la imagen
            }
            this.frameRate = 0;
        } else {
            this.frameRate++;
        }

    }
    followPath() {

        if (this.path.length === 0) {
            this.contador = 0;
            return
        }
        //  console.log('Llegada al tile ' + this.contador);
        const nextTile = this.path.shift();
        this.targetX = nextTile.x + this.offsetX;
        this.targetY = nextTile.y + this.offsetY;

        this.contador++;

    }
    getGridCoordenates() {

        /*calculamos la casilla en la que se encuentra el personaje tomando
        como referencia el punto central del tile(this.x+this.tileSize/2) para evitar posibles errores 
        en el escalado*/
        let gridX=Math.floor((this.x+this.tileSize/2)/this.tileSize);
        let gridY=Math.floor((this.y+this.tileSize/2)/this.tileSize);

        return {gridX,gridY};
    }


}

export { Character }