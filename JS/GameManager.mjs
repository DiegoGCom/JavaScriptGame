import { MapCanvas } from "./MapCanvas.mjs";
import { CharacterCanvas } from "./CharacterCanvas.mjs";
import { CanvasGroupControler } from "./CanvasGroupControler.mjs";
import { GameTimer } from "./Utils/GameTimer.mjs";
import { Character } from "./Character.mjs";

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

        /**@type {Character} */
        this.character= this.characterCanvas.characters.get('Pepe');

        this.selectedTileList = canvasGroup.selectedTilesList;

        /**@type {GameTimer}  */
        this.gameTimer = GameTimer.getInstance();

       // this.gameTimer.setGameInterval(this.checkCurrentTile.bind(this),100);


    }

    update() {

        this.characterCanvas.update();
        this.mapCanvas.update();
        this.gameTimer.update();

    }

    checkCurrentTile() {

        this.gridX = Math.floor((this.character.x + (this.mapCanvas.tileSize)) / this.mapCanvas.tileSize);
        this.gridY = Math.floor((this.character.y + (this.mapCanvas.tileSize)) / this.mapCanvas.tileSize);
        this.currentTile = this.mapCanvas.map[this.gridY][this.gridX];
        this.character.currentTile=this.currentTile;
     //   console.log(this.currentTile.objectData);

    }
}

export { GameManager }