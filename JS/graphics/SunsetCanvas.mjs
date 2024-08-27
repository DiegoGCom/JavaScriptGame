import { ImageManager } from "../controler/ImageManager.mjs";
import { BaseCanvas } from "./BaseCanvas.mjs";


class SunsetCanvas extends BaseCanvas {

    constructor(canvasId, tileSize) {

        super(canvasId, tileSize);

        this.skyImage = ImageManager.getImage('greySky');

        // Posición y tamaño del sol
        this.sunPosition = {
            x: 150, // Centramos el sol en el medio
            y: 3500, // Inicialmente, en el centro
            radius: 100 // Radio del sol
        };
        // Variables para animación del color
        this.red = 0;
        this.green = 190;
        this.blue = 255;
        this.alpha = 0.3;

        // Velocidad del sol en la dirección X e Y
        this.sunSpeed = { x: 2, y: 1 };


    }


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        this.ctx.drawImage(this.skyImage, 0, 0);

        this.skyAnimation();

        this.drawSun();


       // this.drawTiles();
        //   console.log(this.offsetX+', '+ this.offsetY);

    }
    skyAnimation() {

        // Aquí puedes cambiar los valores para simular la transición del color del cielo
        this.red = Math.min(this.red + 1, 255); // Cambiar gradualmente a un color más rojizo
        this.green = Math.max(this.green - 1, 100); // Hacer el verde menos dominante

        this.ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSun() {
        // Crear un gradiente radial para el sol
        const gradient = this.ctx.createRadialGradient(
            this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, 0, // Centro del sol
            this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, this.sunPosition.radius // Extremo del gradiente
        );

        // Colores del gradiente
        gradient.addColorStop(0, 'rgba(255, 223, 230, 1)'); // Color central (amarillo brillante)
        gradient.addColorStop(1, 'rgba(255, 165, 20, 0.7)'); // Color en los bordes (naranja con más transparencia)

        // Dibujar el sol
        this.ctx.beginPath();
        this.ctx.arc(this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, this.sunPosition.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.ctx.closePath();
    }
    updateSunScale(scaleFactor) {

        this.sunPosition.x = this.sunPosition.x * scaleFactor;
        this.sunPosition.y = this.sunPosition.y* scaleFactor;
        this.sunPosition.radius = this.sunPosition.radius * scaleFactor;
        this.sunSpeed.x=this.sunSpeed.x*scaleFactor;
        this.sunSpeed.y=this.sunSpeed.y*scaleFactor;
        

    }
    
    update() {

        this.draw();
        // Mover el sol
        this.sunPosition.x += this.sunSpeed.x;
        this.sunPosition.y -= this.sunSpeed.y;

        

        // Cambiar el color del cielo en el método update
        this.skyAnimation();

        // Verificar límites del canvas y ajustar la dirección si es necesario
        if (this.sunPosition.x - this.sunPosition.radius < 0 || 
            this.sunPosition.x + this.sunPosition.radius > this.mapWidth*this.tileSize) {
            this.sunSpeed.x *= -1;
        }
        if (this.sunPosition.y - this.sunPosition.radius < 0 || 
            this.sunPosition.y + this.sunPosition.radius > this.mapHeight*this.tileSize) {
            this.sunSpeed.y *= -1;
        }
        
        // Redibujar el canvas con las nuevas posiciones
        this.draw();
    }
    drawTiles() {
        for (let row = 0; row < this.mapHeight; row++) {
            for (let col = 0; col < this.mapWidth; col++) {
                const x = col * this.tileSize - this.offsetX;
                const y = row * this.tileSize - this.offsetY;
                const index = row + col * this.tileSize;
                this.ctx.strokeStyle = 'black';
                this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);
            }
        }

    }

}

export { SunsetCanvas }