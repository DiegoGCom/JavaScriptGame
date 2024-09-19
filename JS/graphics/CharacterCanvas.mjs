import { Character } from "../model/Character.mjs";
import { BaseCanvas } from "./BaseCanvas.mjs";
import { MapCanvas } from "./MapCanvas.mjs";



class CharacterCanvas extends BaseCanvas {

    constructor(canvasId, tileSize, canvas) {

        super(canvasId, tileSize);

        /**@type {MapCanvas} */
        this.mapCanvas = canvas;

        this.clearRect = false;
        this.scaleFactor = 1;
        this.dragging = false;
        this.offsetY = 0;
        this.characters = new Map();

        this.path = [];

        this.createNewCharacter("Pepe", 400, 400);

    }

    //TODO: cambiar el metodo para hacer spawn 

    createNewCharacter(name, positionX, positionY) {
        let character = new Character(this.ctx, name, this.mapCanvas.map[0][0]);
        character.setTarget(0,0, this.offsetX, this.offsetY);
        this.characters.set(character.name, character);

    }

    draw() {
        this.characters.forEach(character => { character.updateRender(character.x - this.offsetX, character.y - this.offsetY, this.tileSize); });
    }

    update() {

        if (!this.clearRect) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.characters.forEach(character => { character.move() });
            this.characters.forEach(character => { character.updateRender(character.x - this.offsetX, character.y - this.offsetY, this.tileSize); });
        } else {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.characters.forEach(character => { character.move(); });

        }
    }

    updateCharacterScale(scaleFactor) {

        this.characters.forEach(character => { character.updateScale(scaleFactor); });

        this.characters.forEach(character => { character.updateTarjetPosition(scaleFactor, this.offsetX, this.offsetY); });

    }

    setTarget(targetX, targetY) {

        this.characters.forEach(character => { character.setTarget(targetX, targetY, this.offsetX, this.offsetY); });

    }
    setPath(path) {
        this.path = path;
        this.characters.forEach(character => {
            character.setOffset(this.offsetX, this.offsetY);
            character.setPath(this.path);

        });
    }
    updatePath() {
        if (this.path != null) {
            for (let tile of this.path) {
                tile = this.mapCanvas.map[tile.gridY][tile.gridX];
            }
            this.setPath(this.path);
        }
    }

    //Dibuja la cuadricula del canvas de personaje
    drawTiles() {
        for (let row = 0; row < this.mapHeight; row++) {
            for (let col = 0; col < this.mapWidth; col++) {
                const x = col * this.tileSize - this.offsetX;
                const y = row * this.tileSize - this.offsetY;
                const index = row + col * this.tileSize;
                this.ctx.strokeStyle = 'black';
                this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);
            }
        }

    }



























    /*drawMonigote(ctx, x, y) {
    // Cabeza
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, true); // Círculo
    ctx.closePath();
    ctx.stroke();

    // Cuerpo
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x, y + 70);
    ctx.stroke();

    // Brazos
    ctx.beginPath();
    ctx.moveTo(x, y + 30);
    ctx.lineTo(x - 30, y + 50);
    ctx.moveTo(x, y + 30);
    ctx.lineTo(x + 30, y + 50);
    ctx.stroke();

    // Piernas
    ctx.beginPath();
    ctx.moveTo(x, y + 70);
    ctx.lineTo(x - 20, y + 110);
    ctx.moveTo(x, y + 70);
    ctx.lineTo(x + 20, y + 110);
    ctx.stroke();
}*/



}


export { CharacterCanvas }