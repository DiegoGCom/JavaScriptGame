import { GameCanvas } from "./GameCanvas.mjs";
import { CharacterCanvas } from "./CharacterCanvas.mjs";
import { CanvasControler } from "./CanvasControler.mjs";
import { ImageManager } from "./ImageManager.mjs";


document.addEventListener("DOMContentLoaded", function () {

  

    const gameCanvas = new GameCanvas('gameCanvas', 100, 100, 100);

    const characterCanvas = new CharacterCanvas('characterCanvas', 100, 100, 100);

    const canvasContainer = new CanvasControler(gameCanvas, characterCanvas);

    //characterCanvas.setTargetPosition(1400,450);

    function update(){

        characterCanvas.update();


        requestAnimationFrame(update);
    }

    update();

    
});


  /*  document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                if (characterCanvas.characterY > 0) characterCanvas.moveCharacter('up');
                break;
            case "ArrowDown":
                if (characterCanvas.characterY < characterCanvas.mapHeight * characterCanvas.tileSize - characterCanvas.tileSize) characterCanvas.moveCharacter('down');
                break;
            case "ArrowLeft":
                if (characterCanvas.characterX > 0) characterCanvas.moveCharacter('left');
                break;
            case "ArrowRight":
                if (characterCanvas.characterX < characterCanvas.mapWidth * characterCanvas.tileSize - characterCanvas.tileSize) characterCanvas.moveCharacter('right');
                break;
        }
    });*/




