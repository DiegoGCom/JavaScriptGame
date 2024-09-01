
import { TileMap } from "./TileMap.mjs";
import { Random } from "../utils/Random.mjs";
import { Tile } from "./Tile.mjs";
import { ImageManager } from "../controler/ImageManager.mjs";

class MapArea extends TileMap {

    constructor(wolrdInfo) {

        super(wolrdInfo);

        //this.multipleTileObject('house',5,5);

        this.sky = Math.floor(this.mapHeight * 0.8);
        this.ground = this.sky - 1;
        this.backGroundImage = ImageManager.getImage('greySky');

        this.setHorizontalMap();

        this.setTileBackground(40)
    }


    render(tileSize, offsetX, offsetY) {
        this.tileSize = tileSize;

        //    this.ctx.drawImage(this.backGroundImage,0,0);


        // console.log(`En renderizado de mapas: OffsetX: ${offsetX}, OffsetY: ${offsetY}`);

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

                }
            }
        }

    }

    drawMultipleTileObject(obj, x, y) {

        for (let dy = 0; dy < obj.fr; dy++) {
            for (let dx = 0; dx < obj.fr; dx++) {
                let gridX = x + dx;
                let gridY = y + dy;

                if (gridX > this.mapWidth - 1) gridX = this.mapWidth - 1;
                if (gridY > this.mapHeight - 1) gridY = this.mapHeight - 1;

                /**@type {Tile} */
                let tile = this.map[gridY][gridX];
                tile.setSpriteSheet(obj.spriteSheet,obj.frSize);
                tile.setType(dx * obj.frSize, dy * obj.frSize);

            }
        }
    }
    drawMapObjects(xIndex, yIndex, singleImage) {

        /** @type {Tile} tile */
        const tile = this.map[xIndex][yIndex];

        tile.singleImage = singleImage;

        tile.hasCollider = true;

    }

    getTileColor(row) {

        if (row < this.sky) {
            const maxIntensity = 130;
            const intensity = Math.floor((row / this.sky) * maxIntensity);
            return `rgb(${intensity},${intensity},255,0)`;

        }
        if (row == this.sky) {
            return "#228B22"; // Verde
        }
        return "#8B4513"; // Marrón

    }
    setHorizontalMap() {

        for (let row = 0; row < this.mapHeight; row++) {
            for (let col = 0; col < this.mapWidth; col++) {

                let color = this.getTileColor(row);
                this.map[row][col].setColor(color);

            }
        }

    }
    setTileBackground() {

        for (let y = 40; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = this.map[y][x];
                if (y == 40) tile.setBackground(true, Random.getRandomElements(600, 800, 1000, 1200, 1400), 0);
                if (y > 40 && y < 45) tile.setBackground(true, Random.getRandomElements(1200, 1400, 1600), 200);
                if (y == 45) tile.setBackground(true, Random.getRandomElements(600, 800, 1000), 200);
                if (y >= 46 && y < this.mapHeight) tile.setBackground(true, Random.getRandomElements(0, 200, 400), Random.getRandomElements(200, 400));
            }
        }
    }

}
export { MapArea }