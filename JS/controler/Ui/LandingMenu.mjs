import { MapCanvas } from "../../graphics/MapCanvas.mjs";
import { CanvasGroupControler } from "../CanvasGroupControler.mjs";
import { UIVisibilityControler } from "./UIVisibilityControler.mjs";

class LandingMenu {

    constructor(canvasGroup) {

        /**@type {CanvasGroupControler} */
        this.canvasGroup = canvasGroup;

        /**@type {MapCanvas} */
        this.mapCanvas = canvasGroup.mapCanvas;

        /**@type {UIVisibilityControler} */
       this.visibilityControler = canvasGroup.visibilityControler;


        //------LANDING MENU------------------
        this.landingMenuContainer = document.getElementById('landingMenuContainer');
        this.landingMenuButtons = Array.from(document.getElementsByClassName('landingMenuButtons'));

        //------MAP CREATOR MENU------------
        this.mapCreatorMenu = document.getElementById('mapCreatorMenu');
        this.mapNameCreator = document.getElementById('mapNameCreator');
        this.mapWidthTextInput = document.getElementById('mapWidthCreatorMenu');
        this.mapHeightTextInput = document.getElementById('mapHeightCreatorMenu');
        this.dialogParagraph = document.getElementById('dialogParagraphCreatorMenu');
        this.acceptButtonCreator = document.getElementById('acceptButtonCreator');
        this.cancelButtonCreator = document.getElementById('cancelButtonCreator');
        this.defaultButtonCreator = document.getElementById('defaultButtonCreator');
        this.strokeCheckBoxCreator = document.getElementById('strokeCheckBox');


        this.setupListeners();
    }

    setupListeners() {
        this.landingMenuContainer.addEventListener('contextmenu', (e) => e.preventDefault());

        this.landingMenuButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.landingMenuContainer.classList.toggle('slide-out', true);
                this.landingMenuContainer.classList.toggle('slide-in-reverse', false);

                if (button.innerHTML === 'MAPCREATOR') {
                    this.mapCreatorMenu.classList.toggle('slide-in', true);
                }
            });
        });

        //------MAP CREATOR MENU-----COMPORTAMIENTO
        this.acceptButtonCreator.addEventListener('click', () => {
            let mapKey = this.mapNameCreator.value;
            let mapWidth = parseInt(this.mapWidthTextInput.value);
            let mapHeight = parseInt(this.mapHeightTextInput.value);
            let stroke = this.strokeCheckBoxCreator.checked;
            console.log(stroke);
            if(!mapWidth || !mapHeight || !mapKey) {
                this.dialogParagraph.innerHTML = 'Introduce los datos';
                return};
            if (mapWidth < 10 || mapWidth > 200 || mapHeight < 10 || mapHeight > 200) {
                this.dialogParagraph.innerHTML = 'Los valores han de estar entre 10 y 200';
                return;
            } else {
                this.mapCanvas.setNewTileMap(mapKey, mapWidth, mapHeight, stroke);
               this.visibilityControler.activateMapCreator();
            }
        });

        this.cancelButtonCreator.addEventListener('click', () => {
            this.mapWidthTextInput.value = '';
            this.landingMenuContainer.classList.toggle('slide-in-reverse', true);
            this.landingMenuContainer.classList.toggle('slide-out', false);
            this.mapCreatorMenu.classList.toggle('slide-out-reverse', true);
            this.mapCreatorMenu.classList.toggle('slide-in', false);

        });
        this.defaultButtonCreator.addEventListener('click', () => {
           this.visibilityControler.activateMapCreator();
        });
    }

}
export { LandingMenu }