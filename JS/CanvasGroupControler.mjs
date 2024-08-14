import { MapCanvas } from "./MapCanvas.mjs";
import { CharacterCanvas } from "./CharacterCanvas.mjs";
import { Tile } from "./Tile.mjs";
import { Character } from "./Character.mjs";
import { GameTimer } from "./Utils/GameTimer.mjs";



class CanvasGroupControler {

    constructor() {

        this.mapCanvas = new MapCanvas('gameCanvas', 100);
        this.characterCanvas = new CharacterCanvas('characterCanvas', 100);
        this.isDragging = false;
        this.startX;
        this.startY;
        this.selectTile = false;

        this.selectedTile = this.mapCanvas.map[0][0];

        this.selectedTilesList = new Map();

        this.setupListeners();

        this.characterCanvas.setMapSize(this.mapCanvas.bigMap.mapWidth, this.mapCanvas.bigMap.mapHeight);

        onload = () => {

            this.mapCanvas.draw();

        };

        this.character = this.characterCanvas.characters.get('Pepe');
        this.gridX = Math.floor((this.character.x) / this.mapCanvas.tileSize);
        this.gridY = Math.floor((this.character.y) / this.mapCanvas.tileSize);
        this.currentTile = this.mapCanvas.map[this.gridX][this.gridY];
    }

    setupListeners() {

        const container = document.getElementById('canvasContainer');

        //-----CALCULO DEL PUNTO DESDE EL QUE SE ARRASTRA
        container.addEventListener("mousedown", (e) => {
            this.mouseDown(e);
        });

        //-----ARRASTRE DEL MAPA

        container.addEventListener("mousemove", (e) => {
            this.mouseDragg(e);
            if(this.selectTile) this.infoMouse(e);
        });

        //------ZOOM-----------------------------
        container.addEventListener("wheel", (e) => {
            this.zoom(e);
            e.preventDefault();
        });

        container.addEventListener("mouseup", () => {
            this.isDragging = false;
        });

        container.addEventListener("mouseleave", () => {
            this.isDragging = false;
        });


        container.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });


        //------EVENTO CLIC EN LOS CANVAS--------------------

        container.addEventListener('click', (e) => {
                this.selectTile=this.selectTile? false:true;
                console.log (this.selectTile); 
        });

        container.addEventListener('dblclick', (e) => {

            this.clic(e);
    
        });
    }


    //-----LISTENERS----------------------

    //---Guarda el punto del mapa donde se hace clic y comienza el efecto de arrastre
    mouseDown(e) {
        this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        if (e.button === 2) {
            this.isDragging = true;
            this.startX = e.offsetX + this.mapCanvas.offsetX;
            this.startY = e.offsetY + this.mapCanvas.offsetY;
        }
    }

    //--Al arrastrar se recalcula la distancia desde el punto donde empieza el arrastre
    //---calculando un nuevo offset(diferencia entre el tamaño del mapa y el canvas)
    mouseDragg(e) {
        this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);
        if (this.isDragging) {
            let offsetX = this.startX - e.offsetX;
            let offsetY = this.startY - e.offsetY;

            offsetX = Math.max(0, offsetX);
            offsetY = Math.max(0, offsetY);;

            this.mapCanvas.setOffset(offsetX, offsetY);
            this.characterCanvas.setOffset(offsetX, offsetY);
        }
    }
    //--Zoom in y zoom out se lleva a cabo en la zona donde está el ratón
    zoom(e) {

        this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);

        const wheelDelta = e.deltaY < 0 ? 1.1 : 0.9;
        const rect = this.mapCanvas.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const oldTileSize = this.mapCanvas.tileSize;
        const newTileSize = Math.floor(this.mapCanvas.tileSize * wheelDelta);

        if (newTileSize < this.mapCanvas.zoomUpLimit && newTileSize > this.mapCanvas.zoomDownLimit) {

            this.mapCanvas.tileSize = newTileSize;
            this.characterCanvas.tileSize = newTileSize;

            //Obtenemos el tile concreto en el que se encuentra el ratón
            const mouseGridX = Math.floor((this.mapCanvas.offsetX + mouseX) / oldTileSize);
            const mouseGridY = Math.floor((this.mapCanvas.offsetY + mouseY) / oldTileSize);

            //Calculamos los offsets en base al ratón para que el efecto zoom in y zoomout se acerquen o alejen del puntero
            const offsetX = mouseGridX * newTileSize - mouseX;
            const offsetY = mouseGridY * newTileSize - mouseY;



            //El factor de escalado es la diferencia entre el nuevo tamaño del tile y el viejo, se usa para modificar de forma coherente las coordenadas de los personajes 

            this.characterCanvas.updateCharacterScale(newTileSize / oldTileSize);

            this.mapCanvas.setOffset(offsetX, offsetY);
            this.characterCanvas.setOffset(offsetX, offsetY);
        }
    }

    //-----El evento clic accede a un nuevo mapa si estamos en el mapa grande

    clic(e) {

        this.characterCanvas.setMapSize(this.mapCanvas.mapWidth, this.mapCanvas.mapHeight);

        /**@type  {Tile}     */

        if (this.mapCanvas.bigMapSelected) {
            //se obtiene el rectangulo que forma el canvas
            //coordenada del ratón absoluta a la que se resta la diferencia entre la ventana y el canvas, posición del ratón relativa al canvas
            const rect = this.mapCanvas.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            /*OffsetX representa cuan desplazado está el canvas de la malla,
             aquí obtenemos el ratón con respecto a la malla
            */

            const gridX = Math.floor((this.mapCanvas.offsetX + mouseX) / this.mapCanvas.tileSize);
            const gridY = Math.floor((this.mapCanvas.offsetY + mouseY) / this.mapCanvas.tileSize);

            //Calculamos el indice de la casilla sobre la que se hace clic para crear o acceder a un nuevo mapa y 
            //    que el indice sirva de key en el objeto Map() en el que se guarda.


            //  this.mapCanvas.ressetOffests();

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
        console.log(this.selectedTile.x, this.selectedTile.y);
    }
   
    //--------selecciona las casillas por las que pasa el raton----
    infoMouse(e) {

        const rect = this.mapCanvas.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const gridX = Math.floor((this.mapCanvas.offsetX + mouseX) / this.mapCanvas.tileSize);
        const gridY = Math.floor((this.mapCanvas.offsetY + mouseY) / this.mapCanvas.tileSize);

        // console.log(`Mouse Pixel Position: (${mouseX}px, ${mouseY}px), Grid Position: (${gridX}, ${gridY})`);

        /**@type {Tile} */
        this.selectedTile = this.mapCanvas.map[gridY][gridX];
        this.selectedTile.selected(true);
        this.selectedTilesList.set(this.selectedTile.tileIndex,this.selectedTile);
        // console.log(this.selectedTile.x + ", " + this.selectedTile.y);
        this.mapCanvas.draw();

    }


}

export { CanvasGroupControler };