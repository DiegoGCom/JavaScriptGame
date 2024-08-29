import { ImageManager } from "../controler/ImageManager.mjs";
import { SkyCycle } from "../model/SkyCycle.mjs";
import { BaseCanvas } from "./BaseCanvas.mjs";


class SunsetCanvas extends BaseCanvas {

    constructor(canvasId, tileSize, mapWidth) {

        super(canvasId, tileSize);

        this.skyImage = ImageManager.getImage('greySky');

        // Estado inicial para el color del sol y del cielo
        this.sunColor = { r: 250, g: 255, b: 255, alpha: 1 }; // Empieza con tonos anaranjados
        this.skyColor = { r: 255, g: 94, b: 77 }; // Empieza con tonos rojizos
        this.mapWidth = 150;
        // Posición y tamaño del sol
        this.moonPosition = { x: 0, y:0, radius: 150 };
        this.moonColor = { r: 255, g: 255, b: 255, alpha: 1 };
        this.sunPosition = { x: -200, y:500, radius: 100, };
        this.sunHalo = 600;
        this.moonHalo = 200;
        this.noche = false;
        this.framePosition = 1;
        // Variables para animación del color
        this.state = 'day';
        this.red = 0;
        this.green = 190;
        this.blue = 255;
        this.alpha = 0.4;

        //console.log(mapWidth);
        this.totalCycle = 2 * this.mapWidth * this.tileSize;
    }


    draw() {

        //  this.skyCycle.draw();
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        this.ctx.drawImage(this.skyImage, 0, 0);

        this.skyAnimation();

        if (this.state === "day") {
            this.drawSun();
        } else {
            this.drawMoon();
        }

    }
    skyAnimation() {
        // Aquí puedes cambiar los valores para simular la transición del color del cielo
        //  this.red = Math.min(this.red + 1, 255); // Cambiar gradualmente a un color más rojizo
        //  this.green = Math.max(this.green - 1, 100); // Hacer el verde menos dominante
        const { r, g, b } = this.skyColor;

        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawSun() {
        // Crear un gradiente radial para el sol
        const gradient = this.ctx.createRadialGradient(
            this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, 0, // Centro del sol
            this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, this.sunHalo// Extremo del gradiente
        );

        // Crear el gradiente con un bucle para hacerlo más gradual y amplio
        const numStops = 10; // Número de paradas en el gradiente
        for (let i = 0; i <= numStops; i++) {
            const stop = i / numStops;
            const opacity = 1 - stop; // Decrece la opacidad gradualmente
            const r = 255;
            const g = Math.floor(223 + (255 - 223) * stop); // De amarillo brillante a casi blanco
            const b = Math.floor(0 + (255 - 0) * stop); // De amarillo a casi blanco
            gradient.addColorStop(stop, `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`);
        }
        // Dibujar el halo del sol
        this.ctx.beginPath();
        this.ctx.arc(
            this.sunPosition.x - this.offsetX,
            this.sunPosition.y - this.offsetY,
            this.sunHalo, // Radio del halo, más grande que el sol
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.ctx.closePath();

        // Dibujar el sol 
        const sunGradient = this.ctx.createRadialGradient(
            this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, 0,
            this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, this.sunPosition.radius
        );
        sunGradient.addColorStop(0, `rgba(${this.sunColor.r},${this.sunColor.g},${this.sunColor.b},${this.sunColor.alpha})`);
         sunGradient.addColorStop(1, 'rgba(255, 165, 0, 0.7)');

        this.ctx.beginPath();
        this.ctx.arc(this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, this.sunPosition.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = sunGradient;
        this.ctx.fill();
        this.ctx.closePath();
    }
    updateSunScale(scaleFactor) {

        this.sunPosition.x = this.sunPosition.x * scaleFactor;
        this.sunPosition.y = this.sunPosition.y * scaleFactor;
        this.sunPosition.radius = this.sunPosition.radius * scaleFactor;
        this.moonPosition.x *= scaleFactor;
        this.moonPosition.y *= scaleFactor;
        this.moonPosition.radius *= scaleFactor;

    }
    update() {

        this.framePosition += 1;

        if (this.framePosition > this.totalCycle) {
            this.framePosition = 0; // Reiniciar ciclo
            this.state = this.state === "day" ? "night" : "day"; // Alternar entre día y noche
        }

        // Calcular el factor `t` como una proporción lineal de `framePosition` dentro de `totalDay`
        let t = this.framePosition / this.totalCycle;
        this.updateSunMoonPosition(t);

        this.updateSkyColor(t);

        this.draw();
    }
    updateSunMoonPosition(t) {
        if (this.state === "day") {
            // El sol se mueve a lo largo del ciclo de día
            this.sunPosition.x = this.mapWidth * this.tileSize * t;
        } else {
            // La luna se mueve a lo largo del ciclo de noche
            this.moonPosition.x = this.mapWidth * this.tileSize * t;
        }
    }

    updateSkyColor(t) {
        if (this.state === "day") {
            if (t < 0.25) {
                // Amanecer: Rojo a Azul Celeste
                this.skyColor = this.interpolateColor({ r: 255, g: 94, b: 77 }, { r: 135, g: 206, b: 235 }, t / 0.25);
            } else if (t < 0.75) {
                // Día: Azul Celeste constante
                this.skyColor = { r: 135, g: 206, b: 235 };
            } else {
                // Atardecer: Azul Celeste a Rojo
                this.skyColor = this.interpolateColor({ r: 135, g: 206, b: 235 }, { r: 255, g: 94, b: 77 }, (t - 0.75) / 0.25);
            }
        } else if (this.state === "night") {
            if (t < 0.25) {
                // Anochecer: Rojo a Morado Oscuro
                this.skyColor = this.interpolateColor({ r: 255, g: 94, b: 77 }, { r: 72, g: 61, b: 139 }, t / 0.25);
            } else if (t < 0.75) {
                // Noche: Morado Oscuro constante
                this.skyColor = { r: 72, g: 61, b: 139 };
            } else {
                // Amanecer de la Luna: Morado Oscuro a Rojo
                this.skyColor = this.interpolateColor({ r: 72, g: 61, b: 139 }, { r: 255, g: 94, b: 77 }, (t - 0.75) / 0.25);
            }
        }
    }

    drawMoon() {
        const gradient = this.ctx.createRadialGradient(
            this.moonPosition.x - this.offsetX, this.moonPosition.y - this.offsetY, 0, // Centro del sol
            this.moonPosition.x - this.offsetX, this.moonPosition.y - this.offsetY, this.moonHalo// Extremo del gradiente
        );

        // Crear el gradiente con un bucle para hacerlo más gradual y amplio
        const numStops = 10; // Número de paradas en el gradiente
        for (let i = 0; i <= numStops; i++) {
            const stop = i / numStops;
            const opacity = 1 - stop; // Decrece la opacidad gradualmente
            const r = 255;
            const g = 255;/* Math.floor(0 + (255 -0) * stop) */ // De amarillo brillante a casi blanco
            const b = 255; /* Math.floor(0 + (255 - 0) * stop); */ // De amarillo a casi blanco
            gradient.addColorStop(stop, `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`);
        }
        // Dibujar el halo del sol
        this.ctx.beginPath();
        this.ctx.arc(
            this.moonPosition.x - this.offsetX,
            this.moonPosition.y - this.offsetY,
            this.moonHalo, // Radio del halo, más grande que el sol
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.ctx.closePath();
        const moonGradient = this.ctx.createRadialGradient(
            this.moonPosition.x - this.offsetX, this.moonPosition.y - this.offsetY, 0,
            this.moonPosition.x - this.offsetX, this.moonPosition.y - this.offsetY, this.moonPosition.radius
        );
        moonGradient.addColorStop(0, `rgba(${this.moonColor.r},${this.moonColor.g},${this.moonColor.b},${this.moonColor.alpha})`);
        moonGradient.addColorStop(1, `rgba(255, 255, 255, 0.7)`);

        this.ctx.beginPath();
        this.ctx.arc(this.moonPosition.x - this.offsetX, this.moonPosition.y - this.offsetY, this.moonPosition.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = moonGradient;
        this.ctx.fill();
        this.ctx.closePath();
    }
    // Función para interpolar entre dos colores
    interpolateColor(color1, color2, factor) {
        // Interpolación y ajuste de valores dentro del rango [0, 255]
        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

        return {
            r: clamp(Math.floor(color1.r + (color2.r - color1.r) * factor), 0, 255),
            g: clamp(Math.floor(color1.g + (color2.g - color1.g) * factor), 0, 255),
            b: clamp(Math.floor(color1.b + (color2.b - color1.b) * factor), 0, 255)
        };
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