import { MapCanvas } from "./MapCanvas.mjs";
import { CharacterCanvas } from "./CharacterCanvas.mjs";
import { CanvasGroupControler } from "./CanvasGroupControler.mjs";
import { GameTimer } from "./Utils/GameTimer.mjs";

class GameManager {

    /** 
     *  @param {CanvasGroupControler} canvasGroup; 
     *  
     */

    constructor(canvasGroup) {

        /** @type {MapCanvas} */
        this.mapCanvas = canvasGroup.mapCanvas;
        /**
         * @type {CharacterCanvas}
         */
        this.characterCanvas = canvasGroup.characterCanvas;

        this.character= this.characterCanvas.characters.get('Pepe');

        this.selectedTileList = canvasGroup.selectedTilesList;

        /**@type {GameTimer}  */
        this.gameTimer = GameTimer.getInstance();

        this.gameTimer.setGameInterval(this.checkCurrentTile.bind(this),4000);


    }

    update() {

        this.characterCanvas.update();
        this.mapCanvas.update();
        this.gameTimer.update();

    }

    checkCurrentTile() {

        this.gridX = Math.floor((this.character.x + (this.mapCanvas.tileSize / 2)) / this.mapCanvas.tileSize);
        this.gridY = Math.floor((this.character.y + (this.mapCanvas.tileSize / 3)) / this.mapCanvas.tileSize);
        this.currentTile = this.mapCanvas.map[this.gridY][this.gridX];
        console.log(this.currentTile.objectKey);

    }
}

export { GameManager }