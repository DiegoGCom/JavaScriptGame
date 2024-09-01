
import { DragYDropCanvas } from "../graphics/DragYDropCanvas.mjs";
import { Tile } from "../model/Tile.mjs";
import { MapCanvas } from "../graphics/MapCanvas.mjs";
import { CharacterCanvas } from "../graphics/CharacterCanvas.mjs";
import { SunsetCanvas } from "../graphics/SunsetCanvas.mjs";



class CanvasGroupControler {

    constructor() {

        this.mapCanvas = new MapCanvas('gameCanvas', 100);
        this.characterCanvas = new CharacterCanvas('characterCanvas', 100, this.mapCanvas);
        this.dragDropCanvas = new DragYDropCanvas('animationCanvas', 100);
        this.sunsetCanvas = new SunsetCanvas('sunsetCanvas', 100,);

        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;

        this.selectTile = false;
        this.selectedTile = this.mapCanvas.map[0][0];
        this.groupSelection = false;
        this.paint = false;
        this.selectedTilesList = new Map();

        this.objectToDraw=null;

        this.setupListeners();

        onload = () => {

            this.mapCanvas.draw();
            this.characterCanvas.draw();
            this.sunsetCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
            this.sunsetCanvas.setOffset(this.mapCanvas.offsetX, this.mapCanvas.offsetY);
            this.sunsetCanvas.draw();
        };
    }
    setObjectToDraw(obj){
        this.objectToDraw=obj;
    }

    setupListeners() {

        const container = document.getElementById('canvasContainer');

        //-----CALCULO DEL PUNTO DESDE EL QUE SE ARRASTRA
        container.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.mouseDown(e);

            if (e.button === 0) this.selectTile = true;
          //  if (e.button === 1) this.groupSelection = true;
            if (e.button === 2) {
                this.dragDropCanvas.resetCanvas(); 
                this.groupSelection=false
            }
        });

        //-----ARRASTRE DEL MAPA

        container.addEventListener("mousemove", (e) => {
            this.mouseDragg(e);
            if (this.selectTile) this.infoMouse(e);
            if (this.groupSelection) this.selectGroupOfTiles(e);

        });

        //------ZOOM-----------------------------
        container.addEventListener("wheel", (e) => {
            //Debouncing-> evita el efecto rebote de la rueda del ratón
            this.zoom(e);

            //setTimeout(() => this.zoom(e), 130);

        });

        container.addEventListener("mouseup", () => {
            this.isDragging = false;
            this.selectTile = false;
        });

        container.addEventListener("mouseleave", () => {
            this.isDragging = false;
            this.selectTile = false;
        });
        container.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        //------EVENTO CLIC EN LOS CANVAS--------------------
        container.addEventListener('click', (e) => {
            if (this.groupSelection) {
                this.drawObjects(e);
                this.groupSelection = false;
                this.dragDropCanvas.resetCanvas();
            }
            this.infoMouse(e);
        });

        container.addEventListener('dblclick', (e) => {

            this.clic(e);
        });
        window.addEventListener('keydown', (e) => {
            //this.moveMapWithKeyboard(e);
            this.moveCharacterWhithKey(e);
        });
    }


    //-----LISTENERS----------------------

    //---Guarda el punto del mapa donde se hace clic y comienza el efecto de arrastre
    mouseDown(e) {
        this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        this.sunsetCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        if (e.button === 2) {
            this.isDragging = true;
            this.startX = e.offsetX + this.mapCanvas.offsetX;
            this.startY = e.offsetY + this.mapCanvas.offsetY;
            this.quitTileSelection();
        }
    }

    //--Al arrastrar se recalcula la distancia desde el punto donde empieza el arrastre
    //---calculando un nuevo offset(diferencia entre el tamaño del mapa y el canvas)
    mouseDragg(e) {
        // this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        // this.sunsetCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        if (this.isDragging) {
            let offsetX = this.startX - e.offsetX;
            let offsetY = this.startY - e.offsetY;

            offsetX = Math.max(0, offsetX);
            offsetY = Math.max(0, offsetY);

            this.sunsetCanvas.setOffset(offsetX, offsetY);
            this.mapCanvas.setOffset(offsetX, offsetY);
            this.characterCanvas.setOffset(offsetX, offsetY);


        }
    }
    //--Zoom in y zoom out se lleva a cabo en la zona donde está el ratón
    zoom(e) {

        this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        this.sunsetCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        this.dragDropCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);

        const wheelDelta = e.deltaY < 0 ? 1.1 : 0.9;
        const oldTileSize = this.mapCanvas.tileSize;
        const newTileSize = Math.floor(this.mapCanvas.tileSize * wheelDelta);

        if (newTileSize < this.mapCanvas.zoomUpLimit && newTileSize > this.mapCanvas.zoomDownLimit) {

            const rect = this.mapCanvas.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const mouseGridX = Math.floor((this.mapCanvas.offsetX + mouseX) / oldTileSize);
            const mouseGridY = Math.floor((this.mapCanvas.offsetY + mouseY) / oldTileSize);

            //Calculamos los offsets en base al ratón para que el efecto zoom in y zoomout se acerquen o alejen del puntero
            const offsetX = mouseGridX * newTileSize - mouseX;
            const offsetY = mouseGridY * newTileSize - mouseY;

            this.mapCanvas.tileSize = newTileSize;
            this.characterCanvas.tileSize = newTileSize;
            this.sunsetCanvas.tileSize = newTileSize;
            this.dragDropCanvas.tileSize = newTileSize;

            let scaleFactor = newTileSize / oldTileSize;

            //El factor de escalado es la diferencia entre el nuevo tamaño del tile y el viejo, se usa para modificar de forma coherente las coordenadas de los personajes 
            this.characterCanvas.updateCharacterScale(scaleFactor);
            this.sunsetCanvas.updateSunScale(scaleFactor);
            this.mapCanvas.setOffset(offsetX, offsetY);
            this.characterCanvas.setOffset(offsetX, offsetY);
            this.sunsetCanvas.setOffset(offsetX, offsetY);

        }
    }

    //-----El evento clic accede a un nuevo mapa si estamos en el mapa grande

    clic(e) {

        //this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);

        /**@type  {Tile}     */

        if (this.mapCanvas.bigMapSelected) {

            let { gridX, gridY } = this.getGridCoordenates(e);

            //TODO: cambiar las coordenadas del personaje aquí para que aparecza correctamente en el area pequeña    
            this.characterCanvas.clearRect = true;

            this.selectedTile = this.mapCanvas.map[gridY][gridX];

            this.selectedTile.isSelected = this.selectedTile.isSelected ? false : true;

            this.mapCanvas.tileIndex = this.selectedTile.tileIndex;

            // this.characterCanvas.setTarget(e.clientX + this.mapCanvas.offsetX, e.clientY + this.mapCanvas.offsetY);

            if (!this.selectedTilesList.has(this.selectedTile.tileIndex)) {
                this.selectedTilesList.set(this.selectedTile.tileIndex, this.selectedTile);
            }
            else this.selectedTilesList.delete(this.selectedTile.tileIndex);

        }
        this.mapCanvas.bigMapSelected = false;
        this.mapCanvas.draw();
        // console.log(this.selectedTile.x, this.selectedTile.y);

    }

    //--------selecciona las casillas por las que pasa el raton----
    infoMouse(e) {

        // this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        const { gridX, gridY } = this.getGridCoordenates(e);

        // console.log(`Mouse Pixel Position: (${mouseX}px, ${mouseY}px), Grid Position: (${gridX}, ${gridY})`);

        /**@type {Tile} */
        this.selectedTile = this.mapCanvas.map[gridY][gridX];
        this.selectedTile.setSelected(true);
        this.characterCanvas.setTarget(this.selectedTile.canvasX, this.selectedTile.canvasY);
        this.selectedTilesList.set(this.selectedTile.tileIndex, this.selectedTile);
        this.selectedTilesList.forEach(tile => tile.render(tile.canvasX, tile.canvasY, this.mapCanvas.tileSize));

    }
    quitTileSelection() {
        this.selectedTilesList.forEach((tile) => {
            tile.setSelected(false);
        });
        this.mapCanvas.draw();
        this.selectedTilesList.clear();
    }
    moveCharacterWhithKey(e) {
        let x;
        let y;

        if (e.key === "a") {
            this.characterCanvas.characters.forEach(character => {
                x = character.x;
                y = character.y;
                x -= 30;
                console.log(x + ', ' + y);
            });
            this.characterCanvas.setTarget(x, y);
        }
        if (e.key === "d") {
            this.characterCanvas.characters.forEach(character => {
                x = character.x;
                y = character.y;
                x += 30;
                character.setTarget(x, y);
                console.log('Pulsado d');
            });
            this.characterCanvas.setTarget(x, y);
        }


    }
    /*     moveMapWithKeyboard(e) {
            let offsetX = this.mapCanvas.offsetX;
            let offsetY = this.mapCanvas.offsetY;
    
            if (e.key === 'a') {
    
                offsetX -= 20;
                this.mapCanvas.setOffset(offsetX, this.mapCanvas.offsetY);
                this.characterCanvas.setOffset(offsetX, this.mapCanvas.offsetY);
            }
            if (e.key === 'd') {
    
                offsetX += 20;
                this.mapCanvas.setOffset(offsetX, this.mapCanvas.offsetY);
                this.characterCanvas.setOffset(offsetX, this.mapCanvas.offsetY);
            }
            if (e.key === 'w') {
    
                offsetY -= 20;
                this.mapCanvas.setOffset(this.mapCanvas.offsetX, offsetY);
                this.characterCanvas.setOffset(this.mapCanvas.offsetX, offsetY);
            }
            if (e.key === 's') {
    
                offsetY += 20;
                this.mapCanvas.setOffset(this.mapCanvas.offsetX, offsetY);
                this.characterCanvas.setOffset(this.mapCanvas.offsetX, offsetY);
            }
    
        } */
    moveCharacter(e) {


        const { gridX, gridY } = this.getGridCoordenates(e);

        let tile = this.mapCanvas.map[gridX][gridY];

        console.log(tile);

        this.characterCanvas.setTarget(tile);

    }

    selectGroupOfTiles(e) {

        let { gridX, gridY } = this.getGridCoordenates(e);

        let tileSelected = this.mapCanvas.map[gridY][gridX];

        if (gridX > this.mapCanvas.mapWidth - 2) gridX = this.mapCanvas.mapWidth - 2;
        if (gridY > this.mapCanvas.mapHeight - 2) gridY = this.mapCanvas.mapHeight - 2;

        this.dragDropCanvas.drawObject(tileSelected.canvasX, tileSelected.canvasY, this.mapCanvas.tileSize);


    }
    drawObjects(e) {
        let { gridX, gridY } = this.getGridCoordenates(e);
        if (gridX > this.mapCanvas.mapWidth - 4) gridX = this.mapCanvas.mapWidth - 4;
        if (gridY > this.mapCanvas.mapHeight - 4) gridY = this.mapCanvas.mapHeight - 4;
        const mapArea = this.mapCanvas.mapAreas.get(510);
        mapArea.drawMultipleTileObject(this.objectToDraw, gridX, gridY);
        this.mapCanvas.draw();

    }

    getGridCoordenates(e) {

        const rect = this.mapCanvas.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        let gridX = Math.floor((this.mapCanvas.offsetX + mouseX) / this.mapCanvas.tileSize);
        let gridY = Math.floor((this.mapCanvas.offsetY + mouseY) / this.mapCanvas.tileSize);

        return { gridX, gridY }

    }



}

export { CanvasGroupControler };