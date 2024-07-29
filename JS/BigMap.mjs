import { Tile } from "./Tile.mjs";

class BigMap {

    constructor(ctx, tileSize, mapWidth, mapHeight, canvasWidth,canvasHeight) {

        this.ctx = ctx;
        this.canvasWidth=canvasWidth;
        this.canvasHeight= canvasHeight;
        this.tileSize = tileSize;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.offsetX = 0;
        this.offsetY = 0;
        this.map = [];

        this.initializeGameMap();

    }

    //Creamos la malla 
    initializeGameMap() {

        for (let y = 0; y < this.mapHeight; y++) {
            let row = [];
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = new Tile(this.ctx, x + y * this.mapWidth);
                row.push(tile);
            }
            this.map.push(row);
        }

        this.map[0][0].selected(true);
        this.createGround();

    }

    render(tileSize,offsetX,offsetY) {
        this.tileSize=tileSize;
        this.offsetX=offsetX;
        this.offsetY=offsetY;
       // console.log(`En renderizado de mapas: OffsetX: ${offsetX}, OffsetY: ${offsetY}`);

        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                let drawX = x * this.tileSize - this.offsetX;
                let drawY = y * this.tileSize - this.offsetY;
                let tile = this.map[y][x];

                if (
                    drawX < this.canvasWidth && drawX + this.tileSize > 0 &&
                    drawY < this.canvasHeight && drawY + this.tileSize > 0
                ) {

                    tile.render(drawX, drawY, this.tileSize);
                    tile.setPosition(drawX, drawY);

                }
            }
        }
    }

    //Se crean parches de terreno de 5x5 tiles, se elige de forma random el tipo de tile
    
    createGround() {

        for (let y = 0; y < this.mapHeight; y +=5) {
            for (let x = 0; x < this.mapWidth; x += 5) {

                this.buildPatchOfGround(x, y, this.groundType());

            }
        }
    }

    groundType() {

        const randomNumber = Math.random();

        if (randomNumber < 0.1) return "mountain";

        else if (randomNumber < 0.3) return "forest";

        else return "grass";


    }
    buildPatchOfGround(x, y, groundType) {

        let xIndex;
        let yIndex;

        for (yIndex = y; yIndex < y + 5; yIndex++) {
            for (xIndex = x; xIndex < x + 5; xIndex++) {

                const randomNumber = Math.random();

                const tile_type = randomNumber < 0.5 ? "grass" : groundType;

                const tile = this.map[xIndex][yIndex];

                tile.type = tile_type;

            }
        }


    }


}

export { BigMap }

