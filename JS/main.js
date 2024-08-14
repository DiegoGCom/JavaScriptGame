import { UIManager } from "./UIManager.mjs"; 
import { CanvasGroupControler } from "./CanvasGroupControler.mjs";
import { ImageManager } from "./ImageManager.mjs";
import { GameManager } from "./GameManager.mjs";


document.addEventListener("DOMContentLoaded", function () {

    ImageManager.loadImagesFromDirectory();

    const canvasGroupControler= new CanvasGroupControler();
    const uiManager = new UIManager(canvasGroupControler);
    const gameManager= new GameManager(canvasGroupControler);


    function update(){
        gameManager.update();
        requestAnimationFrame(update);
    }

    update();

    
});





