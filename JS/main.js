import { GameCanvas } from "./GameCanvas.mjs";
import { CharacterCanvas } from "./CharacterCanvas.mjs";
import { CanvasControler } from "./CanvasControler.mjs";
import { UIManager } from "./UIManager.mjs"; 


document.addEventListener("DOMContentLoaded", function () {

  

    const gameCanvas = new GameCanvas('gameCanvas',100,80, 80);

    const characterCanvas = new CharacterCanvas('characterCanvas', 100, 80, 80);

    const canvasControler = new CanvasControler(gameCanvas, characterCanvas);

    const uiManager = new UIManager();

    uiManager.addNewCharacter(characterCanvas.characters[1]);


    function update(){

        gameCanvas.update();

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




