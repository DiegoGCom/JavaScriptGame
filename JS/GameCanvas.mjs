
import { BaseCanvas } from "./BaseCanvas.mjs";
import { BigMap } from "./BigMap.mjs";


class GameCanvas extends BaseCanvas {


    constructor(canvasId, tileSize, mapWidth, mapHeight) {

        super(canvasId, tileSize, mapWidth, mapHeight);

        this.map = [];

        this.bigMap = new BigMap(this.ctx, tileSize, mapWidth, mapHeight, this.canvas.width, this.canvas.height);

        this.mapAreas = new Map();

        this.bigMapSelected = true;

        this.loading=0;

        this.tileIndex=null;

        this.draw();


    }
    
    draw() {

        if (this.bigMapSelected) {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.map = this.bigMap.map;

            this.bigMap.render(this.tileSize, this.offsetX, this.offsetY);

        } else {

            this.drawArea();
            

        }

    }
    drawArea() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

       // console.log(`El area ${this.tileIndex} existe:  ${this.mapAreas.get(this.tileIndex)!=undefined}`);

        if (this.mapAreas.get(this.tileIndex) != undefined) {

            this.map=this.mapAreas.get(this.tileIndex).map;

            this.mapAreas.get(this.tileIndex).render(this.tileSize, this.offsetX, this.offsetY);

        } else {

            const newMapArea = new BigMap(this.ctx, this.tileSize, 100, 100, this.canvas.width, this.canvas.height);

            this.mapAreas.set(this.tileIndex, newMapArea);
            this.map=this.mapAreas.get(this.tileIndex).map;
        
            this.loading=0;

            console.log('Creando mapa en '+ this.tileIndex);
            console.log(this.mapAreas);
        }


    }

    update(){

        if (this.loading<50){
            console.log('redimensionando');
            this.draw();
            this.loading++;
        }
    }

}

export { GameCanvas }