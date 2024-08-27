import { CharacterCanvas } from "../graphics/CharacterCanvas.mjs";
import { MapCanvas } from "../graphics/MapCanvas.mjs";
import { ImageManager } from "./ImageManager.mjs";

class UIManager {

    constructor(canvasGroup) {

        /**@type {MapCanvas} */
        this.mapCanvas = canvasGroup.mapCanvas;
        /**@type {CharacterCanvas} */
        this.characterCanvas = canvasGroup.characterCanvas;

        this.selectedTilesList = canvasGroup.selectedTilesList;

        this.dropDownMenuSandbox = document.getElementById('dropdownMenuSandbox');
        this.dropDownMenuCharacter = document.getElementById('dropdownMenuCharacter');

        this.setupListeners();
        this.addCharactersToMenu();
        this.addMenuItems();
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
            this.dropDownMenuCharacter.style.display = this.dropDownMenuCharacter.style.display === 'flex' ? 'none' : 'flex';

        });
        //------DESPLEGA EL MENU DEL MODO SANDBOX
        imageButtonSandbox.addEventListener('click', (e) => {

            e.stopPropagation();
            this.dropDownMenuSandbox.style.display = this.dropDownMenuSandbox.style.display === 'flex' ? 'none' : 'flex';
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

        this.characterCanvas.characters.forEach((character) => {

            const characterDiv = document.createElement('div');
            const textAreaTargetX = document.createElement('input');
            const textAreaTargetY = document.createElement('input');
            const targetButton = document.createElement('button');
            

            textAreaTargetX.placeholder = 'X: '
            textAreaTargetY.placeholder = 'Y: '
            targetButton.textContent = 'GO!!'

            characterDiv.textContent = character.name;
            characterDiv.appendChild(textAreaTargetX);
            characterDiv.appendChild(textAreaTargetY);
            characterDiv.appendChild(targetButton);

            targetButton.addEventListener('click', () => {
                if (textAreaTargetX.value) {
                    let tileTarget= this.mapCanvas.map[parseInt(textAreaTargetY.value)][parseInt(textAreaTargetX.value)];
                    character.setTarget(tileTarget.canvasX,tileTarget.canvasY);
                } else {
                    textAreaTargetX.placeholder = 'Introduce un número > que 0';
                }
                textAreaTargetX.value='';
                textAreaTargetY.value='';
            });

            characterDiv.addEventListener('click', (e) => { e.stopPropagation() });
            this.dropDownMenuCharacter.appendChild(characterDiv);
            
        });

    }

    //----TEMPORALMENTE----Introduciendo texto podemos cambiar la imagen en la casilla seleccionada
    addMenuItems() {

        const imageIconDiv= document.createElement('div');
        const textAreaType = document.getElementById('textTypeArea')
        const textAreaObectKey = document.getElementById('textIndexArea')
        const okButtonM = document.getElementById('okButtonDropM');
        const reset = document.getElementById('resetButtonDropM');
        const imageMap = ImageManager.getImageMap();

        okButtonM.addEventListener('click', (e) => {
            e.stopPropagation();
            let tileType = textAreaType.value;
            let tileObjectKey = textAreaObectKey.value;
            let worldMapInfo =  ImageManager.getWorldMapInfo('smallArea'); //this.mapCanvas.mapaMundi.worldInfo.spriteData[tileType];

            if (worldMapInfo) {
                this.selectedTilesList.forEach((tile) => {
                    tile.setType(worldMapInfo.spriteData[tileType][tileObjectKey]);
                    console.log('Exito al cambiar de imagen');
                    this.quitTileSelection();
                    tile.render(tile.x, tile.y, this.mapCanvas.tileSize);
                });
            } else {
                textAreaType.value = 'Objeto no encontrado'
            }
            this.mapCanvas.draw();

        });

        reset.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectedTilesList.forEach((tile) => {
                tile.isSelected = false;
                console.log('Éxito al deseleccionar los tiles');
                tile.render(tile.canvasX, tile.canvasY, this.mapCanvas.tileSize);
            });
            this.selectedTilesList.clear();

        });

        textAreaType.addEventListener('click', (e) => e.stopPropagation());
        textAreaObectKey.addEventListener('click', (e) => e.stopPropagation());

        this.dropDownMenuSandbox.appendChild(textAreaType);
        this.dropDownMenuSandbox.appendChild(textAreaObectKey);
        this.dropDownMenuSandbox.appendChild(okButtonM);
        this.dropDownMenuSandbox.appendChild(reset);

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