import { Tile } from "./Tile.mjs";


class TileMap {

    constructor(worldInfo) {

        /**@type {HTMLCanvasElement} canvas */
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext("2d");

        this.worldInfo = worldInfo;

        this.tileSize = this.worldInfo.tileSize;
        this.mapWidth = this.worldInfo.mapWidth;
        this.mapHeight = this.worldInfo.mapHeight;

        this.map = [];

        this.initializeGameMap();

    }

    //Creamos la malla 
    initializeGameMap() {

        for (let y = 0; y < this.mapHeight; y++) {
            let row = [];
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = new Tile(this.ctx, x + y * this.mapWidth);
                tile.setInfo(this.worldInfo);
                tile.setPosition(x,y); 
                row.push(tile);
            }
            this.map.push(row);
        }

    }

    render(tileSize, offsetX, offsetY) {
       
        throw new Error("El método render() debe ser implementado por las subclases");

    }
    drawMapObjects(xIndex, yIndex, singleImage) {

        /** @type {Tile} tile */
        const tile = this.map[xIndex][yIndex];

        tile.singleImage = singleImage;

    }
}

export { TileMap }

