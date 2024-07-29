import { BaseCanvas } from "./BaseCanvas.mjs"
import { Character } from "./Character.mjs";
import { Random } from "./Utils/Random.mjs";

class CharacterCanvas extends BaseCanvas {

    constructor(canvasId, tileSize, mapWidth, mapHeight) {

        super(canvasId, tileSize, mapWidth, mapHeight);
        this.tarjetX = null;
        this.tarjetY = null;
        this.mapAbsoluteWidth = this.mapWidth * tileSize;
        this.mapAbsoluteHeight = this.mapHeight * tileSize;
        this.monigoteIndex = 0;
        this.speed = 2;
        this.clearRect = false;

        this.characters = [];
        this.createNewCharacter();


    }

    //TODO: cambiar el metodo para hacer spawn 

    createNewCharacter() {
        let positionX = 0;
        let positionY = 0;
        for (let i = 0; i < 6; i++) {
            positionX = Random.getRandom(0, 1000);
            positionY = Random.getRandom(0, 1000);
            let character = new Character("Pepe", positionX, positionY);
            character.setTarget(Random.getRandom(0, 600), Random.getRandom(0, 600));
            this.characters.push(character);
        }
    }

    draw() {

    }

    update() {
        if (!this.clearRect) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.characters.forEach(character => { character.move()});
            this.characters.forEach(character => { character.updateRender(this.ctx, character.x - this.offsetX, character.y - this.offsetY, this.tileSize / 2); });

            this.draw();
        }else{

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.characters.forEach(character => { character.move();});
        }
    }


    //Escalado de la posicion target y de la posición del personaje tras los eventos de zoom
    updateTarjetPosition(scaleFactor) {
        this.characters.forEach(character => { character.updateTarjetPosition(scaleFactor); });
    }

    updateCharacterScale(scaleFactor) {
        this.characters.forEach(character => { character.updateScale(scaleFactor); });
    }



    setTarget(targetX, targetY) {

        this.characters.forEach(character => { character.setTarget(targetX += 20, targetY += 20); });

    }


    //Dibuja la cuadricula del canvas de personaje
    drawTiles() {
        for (let row = 0; row < this.mapWidth; row++) {
            for (let col = 0; col < this.mapHeight; col++) {
                const x = col * this.tileSize - this.offsetX;
                const y = row * this.tileSize - this.offsetY;
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