import { MapCanvas } from "./MapCanvas.mjs";
import { CharacterCanvas } from "./CharacterCanvas.mjs";
import { CanvasGroupControler } from "./CanvasGroupControler.mjs";

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
    }


}