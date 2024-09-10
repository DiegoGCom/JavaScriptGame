import { CharacterCanvas } from "../graphics/CharacterCanvas.mjs";
import { DragYDropCanvas } from "../graphics/DragYDropCanvas.mjs";
import { MapCanvas } from "../graphics/MapCanvas.mjs";
import { MapCreator } from "../utils/MapCreator.mjs";
import { CanvasGroupControler } from "./CanvasGroupControler.mjs";
import { ImageManager } from "./ImageManager.mjs";

class UIManager {

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

        this.selectedTilesList = canvasGroup.selectedTilesList;

        this.dropDownMenus = document.getElementsByClassName('dropdown-menu');

        this.dropDownMenuSandbox = document.getElementById('dropdownMenuSandbox');
        this.dropDownMenuCharacter = document.getElementById('dropdownMenuCharacter');
        this.dropDownMenuCreator = document.getElementById('dropdownMenuCreator');
        /**@type {Array} */
        this.creatorInfoButtons = [...document.getElementsByClassName('creatorInfo')];

        this.objectsToDraw = new Map();

        this.objectsToDraw.set('appleHouse', ImageManager.getObjects('appleHouse'));
        this.objectsToDraw.set('ruins', ImageManager.getObjects('ruins'));

        this.setupListeners();
        this.addCharactersToMenu();
        this.addMenuItems(this.objectsToDraw.get('appleHouse'));
        this.addMenuItems(this.objectsToDraw.get('ruins'));
    }

    setupListeners() {

        const imageButtonCharacter = document.getElementById('imageButtonCharacter');
        const imageButtonMap = document.getElementById('imageButtonMap');
        const imageButtonSandbox = document.getElementById('imageButtonSandbox');
        const imageButtonCreator = document.getElementById('imageButtonCreator');
        const dropDownMenus = document.getElementsByClassName('dropdown-menu');

        this.stopPropagation();

        imageButtonMap.addEventListener('click', (e) => {
            e.stopPropagation();
            this.quitTileSelection();
            this.buttonMapClic();
        });
        //------CLIC EN EL BOTON DEL PERSONAJE PARA LOS EVENTOS EN EL CANVAS CONTAINER
        imageButtonCharacter.addEventListener('click', (e) => {
            e.stopPropagation();
            this.disableMapCreator();
            this.dropDownMenuSandbox.style.display = 'none';
            this.dropDownMenuCharacter.style.display = this.dropDownMenuCharacter.style.display === 'block' ? 'none' : 'block';
        });
        //------DESPLEGA EL MENU DEL MODO SANDBOX
        imageButtonSandbox.addEventListener('click', (e) => {

            e.stopPropagation();
            this.dropDownMenuSandbox.style.display = this.dropDownMenuSandbox.style.display === 'block' ? 'none' : 'block';
            this.dropDownMenuCharacter.style.display = 'none';
            this.disableMapCreator()
        });
        imageButtonCreator.addEventListener('click', (e) => {

            e.stopPropagation();
            this.dropDownMenuSandbox.style.display = 'none';
            this.dropDownMenuCharacter.style.display = 'none';
            this.dropDownMenuCreator.style.display = this.dropDownMenuCreator.style.display === 'flex' ? 'none' : 'flex';
            this.creatorCanvas.setCanvasVisible(false);
        });
        window.addEventListener('keydown', (e) => {

            if (e.key === 'Escape') {
                this.dropDownMenuSandbox.style.display = 'none';
                this.dropDownMenuCharacter.style.display = 'none';
            }
        });

        this.creatorInfoButtons.forEach((button) => {
            button.addEventListener('mouseover', () => {
                let info = button.innerHTML;
                this.creatorCanvas.setCanvasVisible(true);
                let obj = ImageManager.getObjects(info);
                this.creatorCanvas.draw(obj.spriteSheet, obj);

            });
        });


    }
    stopPropagation() {
        const events = ['click', 'mousemove', 'wheel'];
        for (let menu of this.dropDownMenus) {
            for (let event of events) {
                menu.addEventListener(event, (e) => e.stopPropagation());
            }
        }
    }

    //---Devuelve el contexto al mapa grande
    buttonMapClic() {

        this.mapCanvas.setMapSize(this.mapCanvas.mapaMundi.mapWidth, this.mapCanvas.mapaMundi.mapHeight);
        this.characterCanvas.setMapSize(this.mapCanvas.mapaMundi.mapWidth, this.mapCanvas.mapaMundi.mapHeight);
        this.mapCanvas.scene = this.mapCanvas.scene == 'mapaMundi' ? 'smallArea' : 'mapaMundi';
        this.characterCanvas.clearRect = this.characterCanvas.clearRect == true ? false : true;
        if (this.mapCanvas.bigMapSelected) this.mapCanvas.offsetY = 0;
        else this.mapCanvas.offsetY = 3500;
        this.canvasGroup.updateOffsets();
        this.mapCanvas.draw();

    }

    addCharactersToMenu() {

    }


    addMenuItems(obj) {

        const gridContainerSandbox = document.getElementById('gridContainerSandbox');
        const button = document.createElement('button');
        const image = document.createElement('img');
        image.src = obj.src;
        button.appendChild(image);
        gridContainerSandbox.appendChild(button);

        button.addEventListener('click', () => {
            this.dragDropCanvas.setObj(obj);
            this.canvasGroup.setObjectToDraw(obj);
            this.canvasGroup.setGroupSelection(obj.cols, obj.rows);
            this.dropDownMenuSandbox.style.display = 'none';

        });

    }
    quitTileSelection() {
        this.selectedTilesList.forEach((tile) => {
            tile.isSelected = false;
            tile.render(tile.canvasX, tile.canvasY, this.mapCanvas.tileSize);
        });
        this.selectedTilesList.clear();
    }
    disableMapCreator() {
        this.dropDownMenuCreator.style.display = 'none';
        this.creatorCanvas.setCanvasVisible(false);
    }


}

export { UIManager };