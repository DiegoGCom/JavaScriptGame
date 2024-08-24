import { Tile } from "./Tile.mjs";
import { TileMap } from "./TileMap.mjs";
import { Random } from "./Utils/Random.mjs";

class MapaMundi extends TileMap{

    constructor(worldInfo){

        super(worldInfo);

        this.createGround();
      
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



    createGround() {

        for (let y = 0; y < this.mapHeight; y += 5) {
            for (let x = 0; x < this.mapWidth; x += 5) {

                this.buildPatchOfGround(x, y, this.groundType());

            }
        }
  
        this.drawHorizontalObjects('lake');

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
                const objectKey = this.getRandomObject(tile_type);

                const objectData=this.worldInfo.spriteData[tile_type][`${tile_type}${objectKey}`]

                tile.setType(objectData);

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
            
                        tile0.setType(this.worldInfo.spriteData[objName][`${objName}${0}`]);
                        tile1.setType(this.worldInfo.spriteData[objName][`${objName}${1}`]);

                    }
                }
            }

        }
    }
    multipleTileObject(objName, x, y, width = 2, height = 2) {

        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
                const gridX = x + dx;
                const gridY = y + dy;

                if (gridX + width > this.map.length || gridY + height > this.map[0].length) {

                    console.warn('El objeto se sale del mapa');
                    continue;
                }
                /**@type {Tile} */
                let tile = this.map[gridY][gridX];
                const tileIndex = dy * width + dx;

                tile.setType(this.worldInfo.spriteData[objName][`${objName}${tileIndex}`]);
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



}

export{MapaMundi}