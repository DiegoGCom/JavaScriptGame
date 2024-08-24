
import { BaseCanvas } from "./BaseCanvas.mjs";
import { ImageManager } from "./ImageManager.mjs";
import { MapaMundi } from "./MapaMundi.mjs";
import { MapArea } from "./MapArea.mjs";
import { TileMap } from "./TileMap.mjs";
import { GameTimer } from "./Utils/GameTimer.mjs";


class MapCanvas extends BaseCanvas {


    constructor(canvasId, tileSize) {

        super(canvasId, tileSize);

        this.map = [];

        this.mapaMundiInfo = ImageManager.getWorldMapInfo('mapaMundi');

        this.mapaMundi = new MapaMundi(this.mapaMundiInfo);

        this.mapAreas = new Map();

        this.mapAreaGround=0;

        this.bigMapSelected =false;

        this.loading = 50;

        this.offsetY=3500;

        this.tileIndex = 510;

        this.draw();
    }

    draw() {

        if (this.bigMapSelected) {

           this.drawMapaMundi();

        } else {

            this.drawArea();

        }

    }

    drawMapaMundi(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.map = this.mapaMundi.map;

        this.mapaMundi.render(this.tileSize, this.offsetX, this.offsetY);

    }

    drawArea() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.mapAreas.get(this.tileIndex) != undefined) {

            /**@type {MapArea} */
            let mapArea = this.mapAreas.get(this.tileIndex);

            this.mapAreaGround=mapArea.ground;  

            this.map = mapArea.map;

            this.setMapSize(mapArea.mapWidth, mapArea.mapHeight);

          //  mapArea.drawMapObjects(5,5,ImageManager.getImage('spriteHouse'))
            let houseTile = mapArea.map[5][4];

         /*    console.log('Gridx: '+houseTile.gridX+', GridY: '+houseTile.gridY); */
          
/*             mapArea.map[mapArea.ground-1][4].setType(mapArea.worldInfo.spriteData['house']['house0']);
            mapArea.map[mapArea.ground-1][5].setType(mapArea.worldInfo.spriteData['house']['house1']);
            mapArea.map[mapArea.ground][4].setType(mapArea.worldInfo.spriteData['house']['house2']);
            mapArea.map[mapArea.ground][5].setType(mapArea.worldInfo.spriteData['house']['house3']); */

            mapArea.drawMultipleTileObject('house',6,38);
            
            mapArea.render(this.tileSize, this.offsetX, this.offsetY);

        } else {
            const smallAreaInfo = ImageManager.getWorldMapInfo('smallArea');

            const newMapArea = new MapArea(smallAreaInfo);

            this.mapAreaGround=newMapArea.ground;

            this.mapAreas.set(this.tileIndex, newMapArea);

            this.map = newMapArea.map;

            this.loading = 0;
        }

    }
    clearRect(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    update(){

        if(this.loading<=50){
            this.draw();
            this.loading++; 
           
        }


    }

}

export { MapCanvas }