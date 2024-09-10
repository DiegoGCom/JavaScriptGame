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
        this.strokeOn=false;

        this.map = [];

        this.initializeGameMap();

    }
    setStroke(stroke){
        this.strokeOn=stroke;
    }


    //Creamos la malla 
    initializeGameMap() {

        for (let y = 0; y < this.mapHeight; y++) {
            let row = [];
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = new Tile(this.ctx, x + y * this.mapWidth,x,y);
                tile.setInfo(this.worldInfo);
                tile.setPosition(x,y); 
                row.push(tile);
            }
            this.map.push(row);
        }

    }

    render(tileSize, offsetX, offsetY) {
       
     this.tileSize = tileSize;

        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                let drawX = x * this.tileSize - offsetX;
                let drawY = y * this.tileSize - offsetY;

                /**@type {Tile} */
                let tile = this.map[y][x];

                if (
                    drawX <= this.canvas.width && drawX + this.tileSize >= 0 &&
                    drawY <= this.canvas.height && drawY + this.tileSize >= 0
                ) {
                    
                    tile.render(drawX, drawY, this.tileSize);
                    tile.strokeOn=this.strokeOn;
                }
            }
        } 

    }

    drawMultipleTileObject(obj, x, y) {

        for (let dy = 0; dy < obj.rows; dy++) {
            for (let dx = 0; dx < obj.cols; dx++) {
                let gridX = x + dx;
                let gridY = y + dy;

                if (gridX > this.mapWidth - 1) gridX = this.mapWidth - 1;
                if (gridY > this.mapHeight - 1) gridY = this.mapHeight - 1;

                /**@type {Tile} */
                let tile = this.map[gridY][gridX];
                tile.setCollider(obj.hasCollider);
                console.log(obj.hasCollider);
                if(obj.zIndex==0) tile.setBackground(obj);
                
                if(obj.zIndex==1) {
                    if(obj.rows>1) tile.setSpriteSheet(obj,dx*obj.frSize,dy*obj.frSize);
                    else tile.setSpriteSheet(obj,obj.x,obj.y);
                }
            }
        }
    }

    drawMapObjects(xIndex, yIndex, singleImage) {

        /** @type {Tile} tile */
        const tile = this.map[xIndex][yIndex];

        tile.singleImage = singleImage;

    }

}

export { TileMap }

