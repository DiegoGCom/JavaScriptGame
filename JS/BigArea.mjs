import { ImageManager } from "./ImageManager.mjs";
import { Tile } from "./Tile.mjs";
import { TileMap } from "./TileMap.mjs";
import { Random } from "./Utils/Random.mjs";


class BigArea extends TileMap {

    constructor(tileSize, mapWidth, mapHeight) {

        super(tileSize, mapWidth, mapHeight);

        this.backGroundImage = ImageManager.getImage('backgroundImage');

        this.spriteSheet = ImageManager.getImage('spriteSheet');

        this.spriteSheetData = ImageManager.getSpriteData();

        this.initializeGameMap(this.backGroundImage, this.spriteSheet, this.spriteSheetData);

        this.createGround();

    }

    createGround() {

        for (let y = 0; y < this.mapHeight; y += 5) {
            for (let x = 0; x < this.mapWidth; x += 5) {

                this.buildPatchOfGround(x, y, this.groundType());

            }
        }
        this.drawHorizontalObjects('lake');

        this.map[2][7].setType(this.spriteSheetData['house'],'house0');
    
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

                tile.setType(this.spriteSheetData[tile_type], objectKey);

            }
        }

    }
    drawHorizontalObjects(objName) {

        for (let y = 0; y < 100; y += 5) {
            for (let x = 0; x < 100; x += 5) {
                let frecuency = Math.random();
                if (frecuency < 0.1) {
                    // Asegurarse de que randomY + 1 no excede el tamaño del mapa
                    if (x + 1 < this.map.length) {
                        /** @type {Tile} */
                        const tile0 = this.map[y][x];
                        /** @type {Tile} */
                        const tile1 = this.map[y][x + 1];
                        tile0.setType(this.spriteSheetData[objName], `${objName}${0}`);
                        tile1.setType(this.spriteSheetData[objName], `${objName}${1}`);
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


    drawTiles(offsetX, offsetY) {

        this.ctx.lineWidth = 0.5;
        this.ctx.font = `${this.tileSize / 8}px Arial`;

        for (let row = 0; row < this.mapWidth; row++) {
            for (let col = 0; col < this.mapHeight; col++) {
                const x = col * this.tileSize - offsetX;
                const y = row * this.tileSize - offsetY;
                const index = col + row * this.tileSize;
                this.ctx.strokeStyle = 'black';
                this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                this.ctx.fillText(index, x, y);
            }
        }
    }


}

export { BigArea }