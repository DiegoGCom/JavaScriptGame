import { CanvasGroupControler } from "../CanvasGroupControler.mjs";

class UIVisibilityControler {

    constructor(canvasGroup) {

        /**@type {CanvasGroupControler} */
        this.canvasGroup = canvasGroup;
        /**@type {MapCanvas} */
        this.mapCanvas = canvasGroup.mapCanvas;
        /**@type {CharacterCanvas} */
        this.characterCanvas = canvasGroup.characterCanvas;
        /**@type {DragYDropCanvas} */
        this.dragDropCanvas = canvasGroup.dragDropCanvas;
        /**@type {MapCreator} */
        this.creatorCanvas = canvasGroup.creatorCanvas;
        /**@type {SunsetCanvas}*/
        this.sunsetCanvas = canvasGroup.sunsetCanvas;
        this.mapCreatorMenu= document.getElementById('mapCreatorMenu');
        this.asideMenuCreator=document.getElementById('asideMapCreatorMenu');

    }
    debug(message){
        console.log(message);
    }
    showMenu(menu){
        menu.style.display='flex';
    }
    hideMenu(menu){
        menu.style.display='none';
    }

    showElementCanvas(element) {
        element.canvas.style.display = 'block';
    }

    hideElementCanvas(element) {
        element.canvas.style.display = 'none';
    }
    toggleElementCanvas(element){
        element.canvas.style.display= element.canvas.style.display=='block'? 'none':'block';
    }

    // Método para cambiar la visibilidad de un canvas o elemento específico
    toggleCanvasVisibility(element, isVisible) {
        if (isVisible) {
            this.showElementCanvas(element);
        } else {
            this.hideElementCanvas(element);
        }
    }
    // Método para activar el landing menu y desactivar los otros elementos
    activateLandingMenu() {
        this.showElementCanvas(this.sunsetCanvas);
        this.showElementCanvas(this.landingMenu);

        this.hideElementCanvas(this.mapCanvas);
        this.hideElementCanvas(this.creatorCanvas);
        this.hideMenu(this.mapCreatorMenu);
        this.hideMenu(this.asideMenuCreator);
    }

    // Método para activar el modo creador de mapas
    activateMapCreator() {
        this.hideElementCanvas(this.sunsetCanvas);  
        this.hideElementCanvas(this.characterCanvas);
        this.showElementCanvas(this.mapCanvas);
        this.showElementCanvas(this.creatorCanvas);
        this.hideMenu(this.mapCreatorMenu);
        this.showMenu(this.asideMenuCreator);
    }
}

export {UIVisibilityControler}