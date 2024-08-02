import { UIManager } from "./UIManager.mjs"; 
import { CanvasGroupControler } from "./CanvasGroupControler.mjs";
import { ImageManager } from "./ImageManager.mjs";


document.addEventListener("DOMContentLoaded", function () {

    ImageManager.loadImage('spriteSheet', '../Assets/Dibujos/Spritesheet/spritesheet_retina.png');
    ImageManager.loadImage('backgroundImage',  "../Assets/Dibujos/Textures/cesped_prueba2.png");


    const canvasGroup= new CanvasGroupControler();
    const uiManager = new UIManager();

   // uiManager.addNewCharacter(characterCanvas.characters[1]);

    window.addEventListener('resize', ()=>{

        gameCanvas.loading=0;

    });


    function update(){

        canvasGroup.update();

        requestAnimationFrame(update);
    }

    update();

    
});





