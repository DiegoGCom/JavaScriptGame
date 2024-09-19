
import { ImageManager } from "../controler/ImageManager.mjs";
import { MapaMundi } from "../model/MapaMundi.mjs";
import { MapArea } from "../model/MapArea.mjs";
import { TileMap } from "../model/TileMap.mjs";
import { BaseCanvas } from "./BaseCanvas.mjs";


class MapCanvas extends BaseCanvas {


    constructor(canvasId, tileSize) {

        super(canvasId, tileSize);

        this.map = [];

        this.defaultTileMap= new TileMap(100,100,100);
        this.defaultTileMap.setStroke(true);
    
        /**@type {TileMap} */
        this.tileMap= null;

        this.tileMap=this.defaultTileMap;

        this.mapAreas = new Map();

        this.mapAreas.set('default',this.defaultTileMap);

        this.scene = 'default';
        this.centeringOffsetX=0;
        this.centeringOffsetY=0;

        this.draw();
    }
    setTileMap(key,mapWidth,mapHeight,stroke){
        let tileMap = new TileMap(mapWidth,mapHeight,100);
        if(mapWidth<80) this.centeringOffsetX=0;
        this.mapAreas.set(key,tileMap);
        tileMap.setStroke(stroke);
        this.setScene(key);
        this.draw();
    }
    setScene(scene){
        this.scene=scene;
    }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.tileMap=this.mapAreas.get(this.scene);
        this.map = this.tileMap.map;
        this.setMapSize(this.tileMap.mapWidth, this.tileMap.mapHeight);
        this.tileMap.render(this.tileSize, this.offsetX, this.offsetY,this.centeringOffsetX,this.centeringOffsetY);
    }

    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
 
}

export { MapCanvas }