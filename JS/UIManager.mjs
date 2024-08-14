import { CharacterCanvas } from "./CharacterCanvas.mjs";
import { MapCanvas } from "./MapCanvas.mjs";

class UIManager {

    constructor(canvasGroup) {

        /**@type {MapCanvas} */
        this.mapCanvas = canvasGroup.mapCanvas;
        /**@type {CharacterCanvas} */
        this.characterCanvas = canvasGroup.characterCanvas;

        this.selectedTilesList=canvasGroup.selectedTilesList;

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


        imageButtonMap.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("Boton pulsado");

            this.buttonMapClic();

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


    }
        //---Devuelve el contexto al mapa grande
        buttonMapClic() {

            this.mapCanvas.setMapSize(this.mapCanvas.bigMap.mapWidth, this.mapCanvas.bigMap.mapHeight);
            this.characterCanvas.setMapSize(this.mapCanvas.bigMap.mapWidth, this.mapCanvas.bigMap.mapHeight);
            this.mapCanvas.bigMapSelected = this.mapCanvas.bigMapSelected==true  ?  false:true;
            this.mapCanvas.ressetOffests();
            this.characterCanvas.clearRect = false;
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
                if (parseInt(textAreaTargetX.value) && parseInt(textAreaTargetY.value)) {
                    character.setTarget(parseInt(textAreaTargetX.value), parseInt(textAreaTargetY.value));
                } else {
                    textAreaTargetX.placeholder = 'Introduce un número > que 0';
                }
            });

            characterDiv.addEventListener('click', (e) => { e.stopPropagation() });
            this.dropDownMenuCharacter.appendChild(characterDiv);


        });

    }
    //----TEMPORALMENTE----Introduciendo texto podemos cambiar la imagen en la casilla seleccionada
    addMenuItems() {

        const textAreaType = document.getElementById('textTypeArea')
        const textAreaObectKey = document.getElementById('textIndexArea')
        const okButtonM = document.getElementById('okButtonDropM');
        const reset = document.getElementById('resetButtonDropM');

        okButtonM.addEventListener('click', (e) => {
            e.stopPropagation();
            let tileType = textAreaType.value;
            let tileObjectKey = textAreaObectKey.value;
            let spriteData = this.mapCanvas.bigMap.worldInfo.spriteData[tileType];

            if (spriteData) {
                this.selectedTilesList.forEach((tile) => {
                    tile.setType(spriteData, `${tileType}${tileObjectKey}`);
                    console.log('Exito al cambiar de imagen');
                    tile.render(tile.x,tile.y,this.mapCanvas.tileSize);
                });
            } else {
                textAreaType.value = 'Objeto no encontrado'
            }

        });

        reset.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectedTilesList.forEach((tile) => {
                tile.isSelected = false;
                console.log('Éxito al deseleccionar los tiles');
                tile.render(tile.x,tile.y,this.mapCanvas.tileSize);
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


}

export { UIManager };