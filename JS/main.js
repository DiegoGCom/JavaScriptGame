import { UIManager } from "./controler/UIManager.mjs"; 
import { CanvasGroupControler } from "./controler/CanvasGroupControler.mjs";
import { ImageManager } from "./controler/ImageManager.mjs";
import { GameManager } from "./controler/GameManager.mjs";


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





