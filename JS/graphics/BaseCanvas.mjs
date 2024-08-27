
/*Clase abstracta para coordinar las capas de canvas, la creo con el objetivo de tener varias 
capas de canvas pero que estas respondan igual a los eventos manteniendo la coherencia en las dimensiones*/

class BaseCanvas {

    constructor(canvasId, tileSize) {
        
        this.canvas = document.getElementById(canvasId);
        this.width=this.canvas.width;
        this.height=this.canvas.height;
        this.ctx = this.canvas.getContext("2d");
        this.scale = window.devicePixelRatio || 1;
        this.tileSize = tileSize;
        this.mapWidth=0;
        this.mapHeight=0;

        this.offsetX = 0;
        this.offsetY = 0;

        this.zoomUpLimit = 200;
        this.zoomDownLimit = 20;

        this.setupCanvas();

    }

    /*Actualizamos la diferencia entre en tamaño del canvas y el tamaño del mapa, se llama en los enventos de la clase controladora
    coordina los tamaños de las distintas capas*/


    setOffset(offsetX,offsetY){

        this.offsetX = Math.max(0, Math.min(offsetX, this.mapWidth * this.tileSize - this.canvas.width / this.scale));
        this.offsetY = Math.max(0, Math.min(offsetY, this.mapHeight * this.tileSize - (this.canvas.height-this.tileSize) / this.scale));
        this.draw();

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


    draw() {

        throw new Error("El método draw() debe ser implementado por las subclases");

    }

    setMapSize(mapWidth,mapHeight){
        this.mapHeight=mapHeight;
        this.mapWidth=mapWidth;
    }

    ressetOffests(){
        this.offsetX=0;
        this.offsetY=0;

    }

}
export{BaseCanvas}