

import { CanvasGroupControler } from "./CanvasGroupControler.mjs";
import { GameTimer } from "../Utils/GameTimer.mjs";
import { Character } from "../model/Character.mjs";
import { MapCanvas } from "../graphics/MapCanvas.mjs";
import { CharacterCanvas } from "../graphics/CharacterCanvas.mjs";
import { SunsetCanvas } from "../graphics/SunsetCanvas.mjs";


class GameManager {

    /** 
     *  @param {CanvasGroupControler} canvasGroup; 
     *  
     */

    constructor(canvasGroup) {

        /**@type {CanvasGroupControler} */
        this.canvasGroupControler= canvasGroup;

        /** @type {MapCanvas} */
        this.mapCanvas = canvasGroup.mapCanvas;
        /**
         * @type {CharacterCanvas}
         */
        this.characterCanvas = canvasGroup.characterCanvas;

        /**@type {Character} */
        this.character = this.characterCanvas.characters.get('Pepe');

        /**@type {SunsetCanvas} */
        this.sunsetCanvas = canvasGroup.sunsetCanvas;

        this.selectedTileList = canvasGroup.selectedTilesList;

        /**@type {GameTimer}  */
        this.gameTimer = GameTimer.getInstance();

        // this.gameTimer.setGameInterval(this.checkCurrentTile.bind(this),100);
        //  this.gameTimer.setGameInterval(this.sunsetCanvas.update.bind(this.sunsetCanvas),1);

    }

    update() {
        this.gameTimer.update();
        this.canvasGroupControler.update();
    }

    checkCurrentTile() {

        this.gridX = Math.floor((this.character.x + (this.mapCanvas.tileSize)) / this.mapCanvas.tileSize);
        this.gridY = Math.floor((this.character.y + (this.mapCanvas.tileSize)) / this.mapCanvas.tileSize);
        this.currentTile = this.mapCanvas.map[this.gridY][this.gridX];
        this.character.currentTile = this.currentTile;
        //   console.log(this.currentTile.objectData);
    }
    
}

export { GameManager }