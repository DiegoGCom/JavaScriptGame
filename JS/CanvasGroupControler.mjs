import { MapCanvas } from "./MapCanvas.mjs";
import { CharacterCanvas } from "./CharacterCanvas.mjs";



class CanvasGroupControler {

    constructor() {

        this.mapCanvas = new MapCanvas('gameCanvas', 100);
        this.characterCanvas = new CharacterCanvas('characterCanvas', 100);
        this.isDragging = false;
        this.startX;
        this.startY;

        this.setupListeners();

        onload = () => {

            this.mapCanvas.draw();
        }; 


    }
    setupListeners() {

        const container = document.getElementById('canvasContainer');
        const imageButtonCharacter = document.getElementById('imageButtonCharacter');
        const imageButtonMap = document.getElementById('imageButtonMap');
        const dropdownMenu = document.getElementById('dropdownMenu');

        imageButtonMap.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("Boton pulsado");

            this.buttonMapClic();

        });


        //------CLIC EN EL BOTON DEL PERSONAJE PARA LOS EVENTOS EN EL CANVAS CONTAINER

        imageButtonCharacter.addEventListener('click', (e) => {

            console.log("Boton pulsado");
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';

        });

        //-----CALCULO DEL PUNTO DESDE EL QUE SE ARRASTRA
        container.addEventListener("mousedown", (e) => {
            
            this.mouseDown(e);

        });

        //-----ARRASTRE DEL MAPA

        container.addEventListener("mousemove", (e) => {

            this.mouseDragg(e);
           // this.infoMouse(e);


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
            this.isDragging= false;


        });


        container.addEventListener("contextmenu", (e) => {

            e.preventDefault();

        });


        //------EVENTO CLIC EN LOS CANVAS--------------------

        container.addEventListener('click', (e) => {

            dropdownMenu.style.display = 'none';

            this.clic(e);

        });


    }

    draw() {
        this.mapCanvas.draw();
    }
    update(){

        this.characterCanvas.update();
        this.mapCanvas.update();

    }



    //-----LISTENERS----------------------

    //---Devuelve el contexto al mapa grande
    buttonMapClic() {

        this.mapCanvas.setMapSize(this.mapCanvas.bigMap.mapWidth, this.mapCanvas.bigMap.mapHeight);
        this.characterCanvas.setMapSize(this.mapCanvas.bigMap.mapWidth, this.mapCanvas.bigMap.mapHeight);

        this.mapCanvas.bigMapSelected = true;
        this.characterCanvas.clearRect = false;

        this.characterCanvas.draw();
        this.mapCanvas.draw();
    }

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

            //Con esto obtenemos el tile concreto en el que se encuentra el ratón
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
        let selectedTile;

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

            //let selectedTile = this.mapCanvas.map[gridY][gridX];
            // console.log(selectedTile.x + ", " + selectedTile.y);

            if (gridX >= 0 && gridX <= this.mapCanvas.mapWidth && gridY >= 0 && gridY <= this.mapCanvas.mapHeight) {
                for (let row of this.mapCanvas.map) {
                    for (let tile of row) {
                        tile.selected(false);
                    }
                }

                //Calculamos el indice de la casilla sobre la que se hace clic para crear o acceder a un nuevo mapa y 
                //    que el indice sirva de key en el objeto Map() en el que se guarda.
                this.mapCanvas.tileIndex = this.mapCanvas.map[gridY][gridX].index;
                this.mapCanvas.ressetOffests();


                //TODO: cambiar las coordenadas del personaje aquí para que aparecza correctamente en el area pequeña    
                this.characterCanvas.clearRect = true;

                selectedTile = this.mapCanvas.map[gridY][gridX];

                selectedTile.selected(true);

                console.log(selectedTile.tileIndex);

                this.characterCanvas.setTarget(selectedTile.x, selectedTile.y);


            }
            this.mapCanvas.bigMapSelected = false;

        }
        this.mapCanvas.draw(selectedTile.tileIndex);

    }

    //--------selecciona las casillas por las que pasa el raton----
    infoMouse(e) {


        const rect = this.mapCanvas.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const gridX = Math.floor((this.mapCanvas.offsetX + mouseX) / this.mapCanvas.tileSize);
        const gridY = Math.floor((this.mapCanvas.offsetY + mouseY) / this.mapCanvas.tileSize);

        // console.log(`Mouse Pixel Position: (${mouseX}px, ${mouseY}px), Grid Position: (${gridX}, ${gridY})`);

        if (gridX >= 0 && gridX <= this.mapCanvas.mapWidth && gridY >= 0 && gridY <= this.mapCanvas.mapHeight) {
            for (let row of this.mapCanvas.map) {
                for (let tile of row) {
                    tile.selected(false);
                }
            }
        }
        this.mapCanvas.map[gridY][gridX].selected(true);
        console.log(this.mapCanvas.map[gridY][gridX].tileIndex);

        this.mapCanvas.draw();

    }

}

export { CanvasGroupControler };