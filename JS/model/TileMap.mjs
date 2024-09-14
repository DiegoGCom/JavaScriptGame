import { Tile } from "./Tile.mjs";


class TileMap {

    constructor(mapWidth, mapHeight, tileSize) {

        /**@type {HTMLCanvasElement} canvas */
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext("2d");
        this.tileSize = tileSize;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.strokeOn = false;
        this.backgroundColor='';

        this.drawX=0;
        this.drawY=0;

     

        this.backgrounColor = null;

        this.map = [];

        this.initializeGameMap();

    }
    setStroke(stroke) {
        this.strokeOn = stroke;
    }
    setBackgroundColor(color){
        this.backgrounColor=color;
    }
    
   
    //Creamos la malla 
    initializeGameMap() {

        for (let y = 0; y < this.mapHeight; y++) {
            let row = [];
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = new Tile(this.ctx, x + y * this.mapWidth, x, y);
                tile.setPosition(x, y);
                row.push(tile);
            }
            this.map.push(row);
        }

    }

    render(tileSize, offsetX, offsetY, centeringOffsetX=0,centeringOffsetY=0) {

        this.tileSize = tileSize;

        this.ctx.fillStyle=this.backgrounColor;
        this.ctx.fillRect(0,0,this.mapWidth*tileSize, this.mapHeight*tileSize);

        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                 this.drawX = (x * this.tileSize - offsetX)+centeringOffsetX;
                 this.drawY = (y * this.tileSize - offsetY)+centeringOffsetY;

                /**@type {Tile} */
                let tile = this.map[y][x];

                if (
                    this.drawX <= this.canvas.width && this.drawX + this.tileSize >= 0 &&
                    this.drawY <= this.canvas.height && this.drawY + this.tileSize >= 0
                ) {
                    tile.render(this.drawX, this.drawY, this.tileSize);
                    tile.strokeOn = this.strokeOn;
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
                if (obj.zIndex == 0) tile.setBackground(obj);

                if (obj.zIndex == 1) {
                    if (obj.rows > 1) tile.setSpriteSheet(obj, dx * obj.frSize, dy * obj.frSize);
                    else tile.setSpriteSheet(obj, obj.x, obj.y);
                }
            }
        }
    }
}

export { TileMap }

