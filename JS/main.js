import { UIManager } from "./UIManager.mjs"; 
import { CanvasGroupControler } from "./CanvasGroupControler.mjs";
import { ImageManager } from "./ImageManager.mjs";


document.addEventListener("DOMContentLoaded", function () {

    ImageManager.loadImage('spriteSheet', '../Assets/Dibujos/Spritesheet/spritesheet_retina.png');
    ImageManager.loadImage('backgroundImage',  "../Assets/Dibujos/Textures/cesped_prueba1.png");
    ImageManager.loadImage('bigMapBackGround',  "../Assets/Dibujos/Textures/parchmentAncient.png");
    ImageManager.loadImage('casa_128',  "../Assets/Dibujos/PNG/Pruebas/casa_128.png");
    ImageManager.loadImage('enano_128',  "../Assets/Dibujos/PNG/Pruebas/enano_128.png");
    ImageManager.loadImage('pepe',  "../Assets/Dibujos/PNG/Pruebas/pepito16_64.png");


    const canvasGroup= new CanvasGroupControler();
    const uiManager = new UIManager();

    //uiManager.addNewCharacter(characterCanvas.characters[1]);


    function update(){

        canvasGroup.update();

        requestAnimationFrame(update);
    }

    update();

    
});





