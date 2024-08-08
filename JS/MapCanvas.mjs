
import { BaseCanvas } from "./BaseCanvas.mjs";
import { BigArea } from "./BigArea.mjs";
import { TileMap } from "./TileMap.mjs";


class MapCanvas extends BaseCanvas {


    constructor(canvasId, tileSize) {

        super(canvasId, tileSize);

        this.map = [];

        this.bigMap = new BigArea(100, 100, 100);

        this.mapWidth = this.bigMap.mapWidth;
        this.mapHeight = this.bigMap.mapHeight;

        this.mapAreas = new Map();

        this.bigMapSelected = true;

        this.loading = 50;

        this.offsetX=0;
        this.offsetY=0;

        this.bigMap.map[50][50].visibility= 'clear';

        this.tileIndex = null;

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

        //  console.log(`El area ${this.tileIndex} existe:  ${this.mapAreas.get(this.tileIndex)!=undefined}`);

        if (this.mapAreas.get(this.tileIndex) != undefined) {

            let mapArea = this.mapAreas.get(this.tileIndex);

            this.map = mapArea.map;

            this.setMapSize(mapArea.mapWidth, mapArea.mapHeight);

            mapArea.render(this.tileSize, this.offsetX, this.offsetY);

        } else {

            const newMapArea = new BigArea(this.tileSize, 50, 50);

            this.mapAreas.set(this.tileIndex, newMapArea);

            this.map = newMapArea.map;

            this.loading = 0;
            
            console.log('Creando mapa en ' + this.tileIndex);
            console.log(this.mapAreas);
        }


    }

    update() {

        if (this.loading < 50) {
           //console.log('redimensionando');
            this.loading++;
            this.draw();
           // console.log(this.loading);
        }
    }

}

export { MapCanvas }