import { Tile } from "./Tile.mjs";

class Canvas {


    constructor(canvasId, tileSize, mapWidth, mapHeight, canvas) {


        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.scale = window.devicePixelRatio || 1;
        this.tileSize = tileSize;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.map = [];

        this.offsetX = 0;
        this.offsetY = 0;

        this.zoomUpLimit = 100;
        this.zoomDownLimit = 20;

        // Crear la malla

        this.initializeGameMap();
        this.setupCanvas();
        this.setupEventListeners();
        this.createGround();
        this.drawMap();


        console.log(this.scale);
    }

    //Creamos la malla 
    initializeGameMap() {

        for (let y = 0; y < this.mapHeight; y++) {
            let row = [];
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = new Tile(this.ctx, x + y * this.mapWidth)
                row.push(tile);
            }
            this.map.push(row);
        }

        this.map[0][0].selected(true);
    }

    /*
    Establecemos las dimensiones y escala del canvas con relación al 
    ratio de pixeles de la ventana(window.devicePixelRatio)
    */
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * this.scale;
        this.canvas.height = rect.height * this.scale;
        this.ctx.setTransform(this.scale, 0, 0, this.scale, 0, 0);
    }


    /*
    Dibujado de las casillas(Tiles)
    */


    drawMap() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                let drawX = x * this.tileSize - this.offsetX;
                let drawY = y * this.tileSize - this.offsetY;
                let tile = this.map[y][x];

                if (
                    drawX < this.canvas.width && drawX + this.tileSize > 0 &&
                    drawY < this.canvas.height && drawY + this.tileSize > 0
                ) {

                    tile.render(drawX, drawY, this.tileSize);

                }
            }
        }

    }

    //Listeners

    setupEventListeners() {

        let isDragging = false;
        let startX, startY;

        this.canvas.addEventListener("mousedown", (e) => {

            if (e.button === 2) {
                isDragging = true;
                startX = e.offsetX + this.offsetX;
                startY = e.offsetY + this.offsetY;
            }
        });

        this.canvas.addEventListener("mousemove", (e) => {
            if (isDragging) {
                this.offsetX = startX - e.offsetX;
                this.offsetY = startY - e.offsetY;

                this.offsetX = Math.max(0, Math.min(this.offsetX, this.mapWidth * this.tileSize - this.canvas.width / this.scale));
                this.offsetY = Math.max(0, Math.min(this.offsetY, this.mapHeight * this.tileSize - this.canvas.height / this.scale));
                this.drawMap();
            }
        });
        this.canvas.addEventListener("wheel", (e) => {

            e.preventDefault();
            const wheelDelta = e.deltaY < 0 ? 1.1 : 0.9;

            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;


            if (this.tileSize * wheelDelta < 100 && this.tileSize * wheelDelta > 20) {

                const newTileSize = this.tileSize * wheelDelta;

                const mouseGridX = (this.offsetX + mouseX) / this.tileSize;
                const mouseGridY = (this.offsetY + mouseY) / this.tileSize;

                this.tileSize = newTileSize;

                this.offsetX = mouseGridX * this.tileSize - mouseX;
                this.offsetY = mouseGridY * this.tileSize - mouseY;


                this.offsetX = Math.max(0, Math.min(this.offsetX, this.mapWidth * this.tileSize - this.canvas.width / this.scale));
                this.offsetY = Math.max(0, Math.min(this.offsetY, this.mapHeight * this.tileSize - this.canvas.height / this.scale));
                this.drawMap();
            }




        });

        this.canvas.addEventListener("mouseup", () => {
            isDragging = false;
        });

        this.canvas.addEventListener("mouseleave", () => {
            isDragging = false;

        });

        this.canvas.addEventListener("click", (e) => {

            //se obtiene el rectangulo que forma el canvas
            //coordenada del ratón absoluta a la que se resta la diferencia entre la ventana y el canvas, posición del ratón relativa al canvas
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            /*OffsetX representa cuan desplazado esta el canvas de la malla,
             aquí obtenemos el ratón con respecto a la malla
            */

            const gridX = Math.floor((this.offsetX + mouseX) / this.tileSize);
            const gridY = Math.floor((this.offsetY + mouseY) / this.tileSize);

            if (gridX >= 0 && gridX < this.mapWidth && gridY >= 0 && gridY < this.mapHeight) {
                for (let row of this.map) {
                    for (let tile of row) {
                        tile.selected(false);
                    }
                }
                this.map[gridY][gridX].selected(true);
                this.drawMap();
            }
            console.log(this.tileSize);
            console.log(`${mouseX + this.offsetX} , ${mouseY + this.offsetY}`);
            console.log(`${gridX} , ${gridY}`);

        });

        this.canvas.addEventListener("contextmenu", (e) => {

            e.preventDefault();

        });

        /*  this.canvas.addEventListener("mousemove", (e) => {
  
              const rect = this.canvas.getBoundingClientRect();
              const mouseX = e.clientX - rect.left;
              const mouseY = e.clientY - rect.top;
  
              console.log(`${mouseX},${mouseY}`);
  
  
          });*/
    }

    createGround() {

        for (let y = 0; y < this.mapHeight; y += 5) {
            for (let x = 0; x < this.mapWidth; x += 5) {

                this.buildPatchOfGround(x, y, this.groundType());

            }
        }
    }

    groundType() {

        const randomNumber = Math.random();

        if (randomNumber < 0.1) return "mountain";

        else if (randomNumber < 0.3) return "forest";

        else return "grass";


    }
    buildPatchOfGround(x, y, groundType) {

        let xIndex;
        let yIndex;

        for (xIndex = x; xIndex < x + 5; xIndex++) {
            for (yIndex = y; yIndex < y + 5; yIndex++) {

                const randomNumber = Math.random();

                const tile_type = randomNumber < 0.20 ? "grass" : groundType;

                const tile = this.map[xIndex][yIndex];

                tile.type = tile_type;

            }
        }


    }


}

export { Canvas }