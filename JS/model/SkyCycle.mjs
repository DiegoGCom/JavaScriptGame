class SkyCycle {
    constructor(mapWidth, tileSize, ctx,offsetX,offsetY) {
        this.mapWidth = mapWidth;
        this.tileSize = tileSize;
        this.ctx = ctx;
        this.totalCycle = 2 * this.mapWidth * this.tileSize; // Ciclo completo (día + noche)
        this.framePosition = 0;
        this.state = "day"; // Empieza con el día
        this.sunPosition = { x: 0, y: 540, radius: 50 };
        this.moonPosition = { x: 0, y: 540, radius: 50 };
        this.sunColor = { r: 250, g: 165, b: 0, alpha: 1 };
        this.moonColor = { r: 255, g: 255, b: 255, alpha: 1 };
        this.skyColor = { r: 135, g: 206, b: 235 }; // Color inicial del cielo (azul celeste)
        this.offsetX=offsetX;
        this.offsetY=offsetY;
        this.mapWidth = mapWidth;
        
    }

    update() {
        this.framePosition += 1;

        if (this.framePosition > this.totalCycle) {
            this.framePosition = 0; // Reiniciar ciclo
            this.state = this.state === "day" ? "night" : "day"; // Alternar entre día y noche
        }

        let t = this.framePosition / this.totalCycle; // Valor normalizado entre [0, 1]
        this.updateSkyColor(t);
        this.updateSunMoonPosition(t);
        this.draw();
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

    updateSunMoonPosition(t) {
        if (this.state === "day") {
            // El sol se mueve a lo largo del ciclo de día
            this.sunPosition.x = this.mapWidth * this.tileSize * t;
        } else {
            // La luna se mueve a lo largo del ciclo de noche
            this.moonPosition.x = this.mapWidth * this.tileSize * t;
        }
    }

    draw() {
        // Dibujar el cielo
        this.ctx.fillStyle = `rgb(${this.skyColor.r},${this.skyColor.g},${this.skyColor.b})`;
        this.ctx.fillRect(0, 0, this.mapWidth * this.tileSize, 1080); // Tamaño del lienzo

        if (this.state === "day") {
            this.drawSun();
        } else {
            this.drawMoon();
        }
    }

    drawSun() {
/*         // Crear un gradiente radial para el sol
        const gradient = this.ctx.createRadialGradient(
            this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, 0, // Centro del sol
            this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, this.halo // Extremo del gradiente
        );

        // Crear el gradiente con un bucle para hacerlo más gradual y amplio
        const numStops = 10; // Número de paradas en el gradiente
        for (let i = 0; i <= numStops; i++) {
            const stop = i / numStops;
            const opacity = 1 - stop; // Decrece la opacidad gradualmente
            const r = 255;
            const g = Math.floor(22 + (255 - 223) * stop); // De amarillo brillante a casi blanco
            const b = Math.floor(0 + (255 - 0) * stop); // De amarillo a casi blanco
            gradient.addColorStop(stop, `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`);
        }
        // Dibujar el halo del sol
        this.ctx.beginPath();
        this.ctx.arc(
            this.sunPosition.x - this.offsetX,
            this.sunPosition.y - this.offsetY,
            this.halo, // Radio del halo, más grande que el sol
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.ctx.closePath(); */

        const sunGradient = this.ctx.createRadialGradient(
            this.sunPosition.x, this.sunPosition.y, 0,
            this.sunPosition.x, this.sunPosition.y, this.sunPosition.radius
        );
        sunGradient.addColorStop(0, `rgba(${this.sunColor.r},${this.sunColor.g},${this.sunColor.b},${this.sunColor.alpha})`);
        sunGradient.addColorStop(1, `rgba(255, 223, 0, 0.7)`);

        this.ctx.beginPath();
        this.ctx.arc(this.sunPosition.x, this.sunPosition.y, this.sunPosition.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = sunGradient;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawMoon() {
        const moonGradient = this.ctx.createRadialGradient(
            this.moonPosition.x, this.moonPosition.y, 0,
            this.moonPosition.x, this.moonPosition.y, this.moonPosition.radius
        );
        moonGradient.addColorStop(0, `rgba(${this.moonColor.r},${this.moonColor.g},${this.moonColor.b},${this.moonColor.alpha})`);
        moonGradient.addColorStop(1, `rgba(255, 255, 255, 0.7)`);

        this.ctx.beginPath();
        this.ctx.arc(this.moonPosition.x, this.moonPosition.y, this.moonPosition.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = moonGradient;
        this.ctx.fill();
        this.ctx.closePath();
    }

    interpolateColor(color1, color2, factor) {
        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
        return {
            r: clamp(Math.floor(color1.r + (color2.r - color1.r) * factor), 0, 255),
            g: clamp(Math.floor(color1.g + (color2.g - color1.g) * factor), 0, 255),
            b: clamp(Math.floor(color1.b + (color2.b - color1.b) * factor), 0, 255)
        };
    }
}

export { SkyCycle }
