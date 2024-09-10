import { CanvasGroupControler } from "../controler/CanvasGroupControler.mjs";
import { ImageManager } from "../controler/ImageManager.mjs";
import { BaseCanvas } from "../graphics/BaseCanvas.mjs";
import { DragYDropCanvas } from "../graphics/DragYDropCanvas.mjs";
import { TileMap } from "../model/TileMap.mjs";

class MapCreator extends BaseCanvas {

    constructor(canvasGroup) {

        super('mapCreatorCanvas', 100);
        /**@type {HTMLCanvasElement} */
        this.canvas = document.getElementById('mapCreatorCanvas');
        /**@type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext('2d');
        /**@type {CanvasGroupControler} */
        this.canvasGroup = canvasGroup;
        /**@type {DragYDropCanvas} */
        this.dragDropCanvas = canvasGroup.dragDropCanvas;

        this.spriteToDraw={
            key:'',
            type:'',
            zIndex:0,
            spriteSheet:null,
            src:'',
            x:0,y:0,
            spriteWidth:0,
            spriteHeight:0,
            cols:1,
            rows:1,
            frSize:0,
            hasCollider:false

        };

        this.obj = null;

        this.setupListeners();

    }
    setCanvasVisible(visible){
        this.canvas.style.zIndex= visible ? 3:-5;
    }
    draw(img, obj) {
        this.obj = obj;
        let tileWidth = this.canvas.width / this.obj.cols;
        let tileHeight = this.canvas.height / this.obj.rows;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            img, obj.x, obj.y, obj.spriteWidth, obj.spriteHeight,
            0 - this.offsetX, 0 - this.offsetY, obj.cols *  tileWidth, obj.rows * tileHeight);
        //  console.log('Dibujando: ' + obj.key);
        this.drawTiles(tileHeight);
    }
    drawTiles(tileHeight) {

        let tileWidth = this.canvas.width / this.obj.cols;
        this.ctx.strokeStyle = 'black';
        const gap = 2;
        // console.log('tilesize '+this.tileSize);

        for (let row = 0; row < this.obj.rows; row++) {
            for (let col = 0; col < this.obj.cols; col++) {
                const x = col * tileWidth - this.offsetX;
                const y = row * tileHeight - this.offsetY;
                this.ctx.strokeRect(x + gap, y + gap, tileWidth - gap, tileHeight - gap);
            }
        }
    }
    setupListeners() {

        this.canvas.addEventListener('click', (e) => {
            e.stopPropagation();
            let { spriteX, spriteY } = this.getGridCoordenates(e);
            this.chooseObjectToDraw(spriteX, spriteY);

        });
       
    }
    getGridCoordenates(e) {

        if (this.obj == null) return console.log('Objeto nulo');
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calcular la posición en el sprite sheet escalado
        const scaledX = Math.floor(mouseX * (this.obj.spriteWidth / this.canvas.width));
        const scaledY = Math.floor(mouseY * (this.obj.spriteHeight / this.canvas.height));

        // Calcular la fila y columna del sprite en el que se encuentra el ratón
        const column = Math.floor(scaledX / this.obj.frSize);
        const row = Math.floor(scaledY / this.obj.frSize);

        // Calcular las coordenadas (0,0) del sprite en el sprite sheet
        const spriteX = column * this.obj.frSize;
        const spriteY = row * this.obj.frSize;

       // console.log(`Sprite origin coordinates: (${spriteX}, ${spriteY})`);

        return { spriteX, spriteY };
    }
    chooseObjectToDraw(spriteX, spriteY) {
        switch (this.obj.type) {
            case 'block':
                this.canvasGroup.setObjectToDraw(this.obj);
                this.canvasGroup.setGroupSelection(this.obj.cols, this.obj.rows);
                this.dragDropCanvas.setObj(this.obj);
                break;
            case 'sprite':
                spriteX+=this.obj.x;
                spriteY+=this.obj.y;
                this.setSpriteToDraw(this.obj, spriteX, spriteY)
                this.dragDropCanvas.setObj(this.spriteToDraw);
                this.canvasGroup.setObjectToDraw(this.spriteToDraw);
                this.canvasGroup.setGroupSelection(1, 1);
                break;
        }

    }
    setSpriteToDraw(obj,objX,objY){
        this.spriteToDraw.key=obj.key;
        this.spriteToDraw.zIndex=obj.zIndex;
        this.spriteToDraw.spriteSheet=obj.spriteSheet;
        this.spriteToDraw.src=obj.src;
        this.spriteToDraw.x=objX;
        this.spriteToDraw.y=objY;
        this.spriteToDraw.spriteWidth=obj.frSize;
        this.spriteToDraw.spriteHeight=obj.frSize;
        this.spriteToDraw.frSize=obj.frSize;
        this.spriteToDraw.hasCollider=obj.hasCollider;

        console.log(objX,objY);
        
    }


}

export { MapCreator }