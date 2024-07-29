
class CanvasControler {

    constructor(mapCanvas, characterCanvas) {

        this.mapCanvas = mapCanvas;
        this.characterCanvas = characterCanvas;

        this.originalWidth = mapCanvas.width;
        this.originalHeight = mapCanvas.height;
        this.originalTileSize = mapCanvas.tileSize;

        this.setupListeners();

        onload = () => {

            mapCanvas.draw();
            characterCanvas.draw();
        };


    }

    setupListeners() {

        const container = document.getElementById('canvasContainer');
        const imageButtonCharacter = document.getElementById('imageButtonCharacter');
        const imageButtonMap = document.getElementById('imageButtonMap');
        const dropdownMenu = document.getElementById('dropdownMenu');


        let isDragging = false;
        let startX, startY;

        imageButtonMap.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("Boton pulsado");
            this.mapCanvas.bigMapSelected = true;
            this.characterCanvas.clearRect = false;
            this.characterCanvas.draw();
            this.mapCanvas.draw();

        });


        //------CLIC EN EL BOTON PARANDO LOS EVENTOS EN EL CANVAS CONTAINER

        imageButtonCharacter.addEventListener('click', (e) => {

            console.log("Boton pulsado");
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        //-----CALCULO DEL PUNTO DESDE EL QUE SE ARRASTRA
        container.addEventListener("mousedown", (e) => {

            if (e.button === 2) {
                isDragging = true;
                startX = e.offsetX + this.mapCanvas.offsetX;
                startY = e.offsetY + this.mapCanvas.offsetY;
            }
        });

        //-----ARRASTRE DEL MAPA

        container.addEventListener("mousemove", (e) => {
            if (isDragging) {
                let offsetX = startX - e.offsetX;
                let offsetY = startY - e.offsetY;

                offsetX = Math.max(0, offsetX);
                offsetY = Math.max(0, offsetY);;

                this.mapCanvas.setOffset(offsetX, offsetY);
                this.characterCanvas.setOffset(offsetX, offsetY);
            }
        });

        //------ZOOM-----------------------------
        container.addEventListener("wheel", (e) => {

            const wheelDelta = e.deltaY < 0 ? 1.1 : 0.9;
            const rect = this.mapCanvas.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const oldTileSize = this.mapCanvas.tileSize;
            const newTileSize = Math.floor(this.mapCanvas.tileSize * wheelDelta);

            if (newTileSize <= this.mapCanvas.zoomUpLimit && newTileSize >= this.mapCanvas.zoomDownLimit) {

                this.mapCanvas.tileSize = newTileSize;
                this.characterCanvas.tileSize = newTileSize;

                //Con esto obtenemos el tile concreto en el que se encuentra el ratón
                const mouseGridX = Math.floor((this.mapCanvas.offsetX + mouseX) / oldTileSize);
                const mouseGridY = Math.floor((this.mapCanvas.offsetY + mouseY) / oldTileSize);

                //Calculamos los offsets en base al ratón para que el efecto zoom in y zoomout se acerquen o alejen del puntero
                const offsetX = mouseGridX * newTileSize - mouseX;
                const offsetY = mouseGridY * newTileSize - mouseY;

                //El factor de escalado es la diferencia entre el nuevo tamaño del tile y el viejo, se usa para modificar de forma coherente las coordenadas de los personajes 
                this.characterCanvas.updateTarjetPosition(newTileSize / oldTileSize);
                this.characterCanvas.updateCharacterScale(newTileSize / oldTileSize);

                this.mapCanvas.setOffset(offsetX, offsetY);
                this.characterCanvas.setOffset(offsetX, offsetY);




            }


            e.preventDefault();


        });



        container.addEventListener("mouseup", () => {
            isDragging = false;

        });

        container.addEventListener("mouseleave", () => {
            isDragging = false;

        });


        container.addEventListener("contextmenu", (e) => {

            e.preventDefault();

        });

        //------EVENTO CLIC EN LOS CANVAS--------------------

        container.addEventListener('click', (e) => {

            if (this.mapCanvas.bigMapSelected) {
                //se obtiene el rectangulo que forma el canvas
                //coordenada del ratón absoluta a la que se resta la diferencia entre la ventana y el canvas, posición del ratón relativa al canvas
                const rect = this.mapCanvas.canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                dropdownMenu.style.display = 'none';

                /*OffsetX representa cuan desplazado está el canvas de la malla,
                 aquí obtenemos el ratón con respecto a la malla
                */

                const gridX = Math.floor((this.mapCanvas.offsetX + mouseX) / this.mapCanvas.tileSize);
                const gridY = Math.floor((this.mapCanvas.offsetY + mouseY) / this.mapCanvas.tileSize);

                let selectedTile = this.mapCanvas.map[gridY][gridX];
                console.log(selectedTile.x + ", " + selectedTile.y);

                if (gridX >= 0 && gridX < this.mapCanvas.mapWidth && gridY >= 0 && gridY < this.mapCanvas.mapHeight) {
                    for (let row of this.mapCanvas.map) {
                        for (let tile of row) {
                            tile.selected(false);
                        }
                    }
                    this.mapCanvas.tileIndex = this.mapCanvas.map[gridY][gridX].index;

                    this.characterCanvas.clearRect = true;

                    this.mapCanvas.map[gridY][gridX].selected(true);

                    //  this.characterCanvas.setTarget(mouseX, mouseY);


                }
                this.mapCanvas.bigMapSelected = false;

            }
            this.mapCanvas.draw();

        });
        /*   window.addEventListener('resize', (e) => {
   
               this.resizeCanvas();
               // Redibujar el contenido del canvas con los nuevos offsets
               this.mapCanvas.draw();
               this.characterCanvas.draw();
               console.log(`AnchoVentana: ${window.innerWidth}, AltoVentana: ${window.innerHeight}`);
   
           });*/




    }

    resizeCanvas() {

        const screenWidth = screen.width;
        const screenHeight = screen.height;



    }


}



export { CanvasControler }