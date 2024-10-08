import { Tile } from "./Tile.mjs";


class TileMap {

    constructor(key,mapWidth, mapHeight, tileSize) {

        /**@type {HTMLCanvasElement} canvas */
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext("2d");
        this.key=key;
        this.tileSize = tileSize;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.strokeOn = true;
        /* this.backgroundColor='#FCE8B1 '; */
        this.backgroundColor = '#FCE8B1';

        this.drawX = 0;
        this.drawY = 0;

        this.map = [];

        this.initializeGameMap();

    }
    setStroke(strokeOn) {
        this.strokeOn = strokeOn;
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                this.map[y][x].strokeOn = strokeOn;
            }
        }
    }

    setBackgroundColor(color) {
        this.backgrounColor = color;
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

    render(tileSize, offsetX, offsetY, centeringOffsetX = 0, centeringOffsetY = 0) {

        this.tileSize = tileSize;

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(centeringOffsetX, centeringOffsetY, this.mapWidth * tileSize, this.mapHeight * tileSize);

        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                this.drawX = (x * this.tileSize - offsetX) + centeringOffsetX;
                this.drawY = (y * this.tileSize - offsetY) + centeringOffsetY;

                /**@type {Tile} */
                let tile = this.map[y][x];

                if (
                    this.drawX <= this.canvas.width && this.drawX + this.tileSize >= 0 &&
                    this.drawY <= this.canvas.height && this.drawY + this.tileSize >= 0
                ) {
                    tile.render(this.drawX, this.drawY, this.tileSize);

                }
            }
        }

    }

    drawMultipleTileObject(obj, x, y, degrees) {

        for (let dy = 0; dy < obj.rows; dy++) {
            for (let dx = 0; dx < obj.cols; dx++) {
                let gridX = x + dx;
                let gridY = y + dy;

                if (gridX > this.mapWidth - 1) gridX = this.mapWidth - 1;
                if (gridY > this.mapHeight - 1) gridY = this.mapHeight - 1;

                /**@type {Tile} */
                let tile = this.map[gridY][gridX];

                if (obj.zIndex == 0) tile.rotateBackGround(degrees);
                if (obj.zIndex == 1) tile.rotateForeGround(degrees);

                tile.setCollider(obj.hasCollider);
                
                if (obj.zIndex == 0) tile.setBackground(obj);

                if (obj.zIndex == 1) {
                    if (obj.rows > 1) tile.setSpriteSheet(obj, dx * obj.frSize, dy * obj.frSize);
                    else tile.setSpriteSheet(obj, obj.x, obj.y);
                }
            }
        }
    }
 
    toJSON(){
        const mapData= {
            key: this.key,
            mapWidth: this.mapWidth,
            mapHeight: this.mapHeight,
            tileSize:this.tileSize,
            tiles:[]
        };
        for(let y=0; y<this.mapHeight;y++){
            let row=[];
            for(let x=0; x<this.mapWidth;x++){
                row.push(this.map[y][x].toJSON());
            }
            mapData.tiles.push(row);
        }
        return mapData;
    }

}

export { TileMap }

