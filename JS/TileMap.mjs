import { Tile } from "./Tile.mjs";
import { Random } from "./Utils/Random.mjs";    

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

        this.initializeGameMap(this.worldInfo.backGroundImage, this.worldInfo.spriteSheet, this.worldInfo.spriteData);

        this.createGround();


    }

    //Creamos la malla 
    initializeGameMap(backGroundImage, spriteSheet, spriteData) {

        for (let y = 0; y < this.mapHeight; y++) {
            let row = [];
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = new Tile(this.ctx, x + y * this.mapWidth, backGroundImage, spriteSheet, spriteData);
                row.push(tile);
            }
            this.map.push(row);
        }

        this.map[0][0].selected(true);
    }

    createGround() {

        for (let y = 0; y < this.mapHeight; y += 5) {
            for (let x = 0; x < this.mapWidth; x += 5) {

                this.buildPatchOfGround(x, y, this.groundType());

            }
        }
        this.drawHorizontalObjects('lake');

        this.map[2][7].setType(this.worldInfo.spriteData['house'], 'house0');

    }
    //---Selección del tipo de terreno por probabilidad
    groundType() {

        const randomNumber = Math.random();

        if (randomNumber < 0.1) return "mountain";

        else if (randomNumber < 0.3) return "tree";

        else if (randomNumber < 0.7) return "bush";

        else return 'void';


    }
    //---Construye parches de terreno de 5 tiles en base al tipo de terreno

    buildPatchOfGround(x, y, groundType) {

        let xIndex;
        let yIndex;

        for (yIndex = y; yIndex < y + 5; yIndex++) {
            for (xIndex = x; xIndex < x + 5; xIndex++) {

                const randomNumber = Math.random();

                const tile_type = randomNumber < 0.5 ? 'void' : groundType;

                /** @type {Tile} tile */
                const tile = this.map[xIndex][yIndex];

                /*Escogemos el tipo de tile a renderizar, el objeto con las coordenadas y el indice de la imagen*/
                const objectKey = `${tile_type}${this.getRandomObject(tile_type)}`;

                tile.setType(this.worldInfo.spriteData[tile_type], objectKey);

            }
        }

    }
    drawHorizontalObjects(objName) {

        for (let y = 0; y < this.worldInfo.mapHeight; y += 5) {
            for (let x = 0; x < this.worldInfo.mapWidth; x += 5) {
                let frecuency = Math.random();
                if (frecuency < 0.1) {
                    // Asegurarse de que randomY + 1 no excede el tamaño del mapa
                    if (x + 1 < this.map.length) {
                        /** @type {Tile} */
                        const tile0 = this.map[y][x];
                        /** @type {Tile} */
                        const tile1 = this.map[y][x + 1];
                        tile0.setType(this.worldInfo.spriteData[objName], `${objName}${0}`);
                        tile1.setType(this.worldInfo.spriteData[objName], `${objName}${1}`);
                    }
                }
            }
        }

    }
    getRandomObject(tile_type) {

        switch (tile_type) {

            case 'bush':
                return 0;
            case 'mountain':
                return Random.getRandom(0, 5);
            case 'tree':
                return Random.getRandom(0, 3);
            case 'void':
                return 0;

        }



    }
    drawMapObjects(xIndex, yIndex, singleImage) {

        /** @type {Tile} tile */
        const tile = this.map[xIndex][yIndex];

        tile.singleImage = singleImage;

    }

    render(tileSize, offsetX, offsetY) {
        this.tileSize = tileSize;

        // console.log(`En renderizado de mapas: OffsetX: ${offsetX}, OffsetY: ${offsetY}`);

        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                let drawX = x * this.tileSize - offsetX;
                let drawY = y * this.tileSize - offsetY;

                /**@type {Tile} */
                let tile = this.map[y][x];

                if (
                    drawX < this.canvas.width && drawX + this.tileSize > 0 &&
                    drawY < this.canvas.height && drawY + this.tileSize > 0
                ) {

                    tile.render(drawX, drawY, this.tileSize);

                }
            }
        }

    }


}

export { TileMap }

