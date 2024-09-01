import { CharacterCanvas } from "../graphics/CharacterCanvas.mjs";
import { DragYDropCanvas } from "../graphics/DragYDropCanvas.mjs";
import { MapCanvas } from "../graphics/MapCanvas.mjs";
import { CanvasGroupControler } from "./CanvasGroupControler.mjs";
import { ImageManager } from "./ImageManager.mjs";

class UIManager {

    constructor(canvasGroup) {
        /**@type {CanvasGroupControler} */
        this.canvasGroup=canvasGroup;
        /**@type {MapCanvas} */
        this.mapCanvas = canvasGroup.mapCanvas;
        /**@type {CharacterCanvas} */
        this.characterCanvas = canvasGroup.characterCanvas;
        /**@type {DragYDropCanvas} */
        this.dragDropCanvas = canvasGroup.dragDropCanvas;

        this.selectedTilesList = canvasGroup.selectedTilesList;

        this.dropDownMenuSandbox = document.getElementById('dropdownMenuSandbox');
        this.dropDownMenuCharacter = document.getElementById('dropdownMenuCharacter');

        this.objectsToDraw= new Map();

        this.objectsToDraw.set('appleHouse',ImageManager.getWorldMapInfo('appleHouse'));
        this.objectsToDraw.set('ruins',ImageManager.getWorldMapInfo('ruins'));

        this.setupListeners();
        this.addCharactersToMenu();
        this.addMenuItems(this.objectsToDraw.get('appleHouse'));
        this.addMenuItems(this.objectsToDraw.get('ruins'));
    }

    setupListeners() {

        const imageButtonCharacter = document.getElementById('imageButtonCharacter');
        const imageButtonMap = document.getElementById('imageButtonMap');
        const imageButtonSandbox = document.getElementById('imageButtonSandbox');
        const dropDownMenus= document.getElementsByClassName('dropdown-menu');

        for(let menu of dropDownMenus){
            menu.addEventListener('click',(e)=>{
                e.stopPropagation();
            });
            menu.addEventListener('mousemove',(e)=>{
               e.stopPropagation();
            });
        }
        imageButtonMap.addEventListener('click', (e) => {
             e.stopPropagation();
            console.log("Boton pulsado");

            setTimeout(()=>{
                this.quitTileSelection();   
                this.buttonMapClic();
            },300);
        });
        //------CLIC EN EL BOTON DEL PERSONAJE PARA LOS EVENTOS EN EL CANVAS CONTAINER
        imageButtonCharacter.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dropDownMenuSandbox.style.display = this.dropDownMenuSandbox.style.display = 'none';
            this.dropDownMenuCharacter.style.display = this.dropDownMenuCharacter.style.display === 'block' ? 'none' : 'block';

        });
        //------DESPLEGA EL MENU DEL MODO SANDBOX
        imageButtonSandbox.addEventListener('click', (e) => {

            e.stopPropagation();
            this.dropDownMenuSandbox.style.display = this.dropDownMenuSandbox.style.display === 'block' ? 'none' : 'block';
            this.dropDownMenuCharacter.style.display = this.dropDownMenuCharacter.style.display = 'none';


        });
        window.addEventListener('keydown', (e) => {

            if (e.key === 'Escape') {
                this.dropDownMenuSandbox.style.display = 'none';
                this.dropDownMenuCharacter.style.display = 'none';
            }
        });


    }
    //---Devuelve el contexto al mapa grande
    buttonMapClic() {

        this.mapCanvas.setMapSize(this.mapCanvas.mapaMundi.mapWidth, this.mapCanvas.mapaMundi.mapHeight);
        this.characterCanvas.setMapSize(this.mapCanvas.mapaMundi.mapWidth, this.mapCanvas.mapaMundi.mapHeight);
        this.mapCanvas.bigMapSelected = this.mapCanvas.bigMapSelected == true ? false : true;
       // this.mapCanvas.ressetOffests();
        this.characterCanvas.clearRect = this.characterCanvas.clearRect==true ? false :true;
        this.mapCanvas.draw();

    }

    addCharactersToMenu() {

    }

    //----TEMPORALMENTE----Introduciendo texto podemos cambiar la imagen en la casilla seleccionada
    addMenuItems(obj) {

        const gridContainerSandbox = document.getElementById('gridContainerSandbox');
        const button=document.createElement('button');
        const image=document.createElement('img');
        image.src=obj.src;
        button.appendChild(image);
        gridContainerSandbox.appendChild(button);

        button.addEventListener('click', ()=>{
            this.dragDropCanvas.setObj(obj);
            this.canvasGroup.setObjectToDraw(obj);
            this.canvasGroup.groupSelection=true;
            this.dropDownMenuSandbox.style.display = 'none';
        });
    }
    quitTileSelection(){
        this.selectedTilesList.forEach((tile) => {
            tile.isSelected=false;
            tile.render(tile.canvasX,tile.canvasY,this.mapCanvas.tileSize);    
        });
        this.selectedTilesList.clear();     
    }


}

export { UIManager };