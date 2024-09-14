import { ImageManager } from "../controler/ImageManager.mjs";
import { BaseCanvas } from "./BaseCanvas.mjs";


class SunsetCanvas extends BaseCanvas {

    constructor(canvasId, tileSize) {

        super(canvasId, tileSize);

        this.mapAreaInfo = ImageManager.getWorldMapInfo('smallAreaInfo');
        this.mapWidth = this.mapAreaInfo.mapWidth;
        //------Cielo--------
        this.skyImage = ImageManager.getImage('greySky');
        this.skyColor = { r: 255, g: 94, b: 77 }; 
        this.skyAlpha = 0.4;
        //------Sol----------
        this.sunPosition = { x: -200, y:500, radius: 100, };
        this.sunColor = { r: 250, g: 255, b: 255 }; 
        this.sunHalo = 600;
        //------Luna---------
        this.moonPosition = { x: 0, y: 500, radius: 150 };
        this.moonColor = { r: 255, g: 255, b: 255 };
        this.moonHalo = 200;

        //------Dia---------
        this.framePosition = 1;
        this.state = 'day';
        this.totalCycle = 2 * this.mapWidth * this.tileSize;

        //-----Nubes--------
        this.clouds= new Map();
        this.loadClouds();
        this.backGroundCloud=ImageManager.getImage('nube6');
        this.staticCloudData={key:'cloud6',x:0,y:2000,width:1920,heigth:1000}
        
        this.cloudsData=[
            {key:'cloud1',x:1850,y:600,width:331,heigth:127,speed:0.2},
            {key:'cloud2',x:2400,y:1200,width:225,heigth:65, speed:0.4},
            {key:'cloud3',x:-10,y:3000,width:586,heigth:105,speed:0.3},
            {key:'cloud4',x:5000,y:1950,width:325,heigth:128, speed:0.6},
            {key:'cloud5',x:930,y:500,width:224,heigth:65, speed:2},
        ]
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.ctx.drawImage(this.skyImage, 0, 0);
        this.skyAnimation();    ///------cambia el color del cielo
        this.checkDayNight();   ///------dibuja el sol o la luna
        this.drawClouds();
     
       
    }
    update() {
        this.framePosition += 1;
        if (this.framePosition > this.totalCycle) {
            this.framePosition = 0;
            this.state = this.state === "day" ? "night" : "day";
        }
        // Calcular el factor `t` como una proporción lineal de `framePosition` dentro de `totalDay`
        let t = this.framePosition / this.totalCycle;
        this.updateSunMoonPosition(t);
        this.updateSkyColor(t);
        this.updateClouds();
        this.draw();
    }


    //---------ANIMACIÓN DEL CIELO-------------------
    skyAnimation() {
        // Aquí puedes cambiar los valores para simular la transición del color del cielo
        const { r, g, b } = this.skyColor;
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.skyAlpha})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    updateSkyColor(t) {
        if (this.state === "day") {
            if (t < 0.25) {
                // Amanecer: Rojo a Azul Celeste
                this.skyColor = this.interpolateColor({ r: 255, g: 94, b: 77 }, { r: 135, g: 206, b: 235 }, t / 0.25);
                this.sunColor = this.interpolateColor({ r: 255, g: 100, b: 0 }, { r: 255, g: 225, b: 225}, t / 0.25);
                this.moonHalo = 200;
            } else if (t < 0.75) {
                // Día: Azul Celeste constante
                this.skyColor = { r: 135, g: 206, b: 235 };
                this.sunColor = { r: 255, g: 225, b: 225, alpha: 1 };
            } else {
                // Atardecer: Azul Celeste a Rojo
                this.skyColor = this.interpolateColor({ r: 135, g: 206, b: 235 }, { r: 255, g: 94, b: 77 }, (t - 0.75) / 0.25);
                this.sunColor = this.interpolateColor({  r: 255, g: 225, b: 225 }, {  r: 255, g: 100, b: 0 }, (t - 0.75) / 0.25);
                this.sunHalo  =  this.sunHalo <=0.8 ? 0 : this.sunHalo-0.8;  //-----Hace pequeño el halo al anochecer
            }
        } else if (this.state === "night") {
            if (t < 0.25) {
                // Anochecer: Rojo a Morado Oscuro
                this.skyColor = this.interpolateColor({ r: 255, g: 94, b: 77 }, { r: 72, g: 61, b: 139 }, t / 0.25);
                this.sunHalo = 600;
                this.skyAlpha=this.skyAlpha<0.7 ? this.skyAlpha+=0.005:this.skyAlpha=0.7; //por la noche se oscurece el cielo
            } else if (t < 0.75) {
                // Noche: Morado Oscuro constante
                this.skyColor = { r: 72, g: 61, b: 139 };
            } else {
                // Amanecer de la Luna: Morado Oscuro a Rojo
                this.skyAlpha=this.skyAlpha>0.4 ? this.skyAlpha-=0.005:this.skyAlpha=0.4;
                this.skyColor = this.interpolateColor({ r: 72, g: 61, b: 139 }, { r: 255, g: 94, b: 77 }, (t - 0.75) / 0.25);
                this.moonHalo  =  this.moonHalo <=0.2 ? 0 : this.moonHalo-0.2; 
            }
        }
    }

    //-----------ANIMACIÓN DE SOL Y LUNA-----------------------

    updateSunScale(scaleFactor) {
        this.sunPosition.x = this.sunPosition.x * scaleFactor;
        this.sunPosition.y = this.sunPosition.y * scaleFactor;
        this.sunPosition.radius = this.sunPosition.radius * scaleFactor;
        this.moonPosition.x *= scaleFactor;
        this.moonPosition.y *= scaleFactor;
        this.moonPosition.radius *= scaleFactor;
        this.updateCloudsScale(scaleFactor);
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
        sunGradient.addColorStop(0, `rgba(${this.sunColor.r},${this.sunColor.g},${this.sunColor.b},${1})`);
       // sunGradient.addColorStop(1, 'rgba(255, 165, 0, 0.7)');

        this.ctx.beginPath();
        this.ctx.arc(this.sunPosition.x - this.offsetX, this.sunPosition.y - this.offsetY, this.sunPosition.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = sunGradient;
        this.ctx.fill();
        this.ctx.closePath();
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
        moonGradient.addColorStop(0, `rgba(${this.moonColor.r},${this.moonColor.g},${this.moonColor.b},${1})`);
        moonGradient.addColorStop(1, `rgba(255, 255, 255, 0.7)`);

        this.ctx.beginPath();
        this.ctx.arc(this.moonPosition.x - this.offsetX, this.moonPosition.y - this.offsetY, this.moonPosition.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = moonGradient;
        this.ctx.fill();
        this.ctx.closePath();
    }
    checkDayNight(){
        if (this.state === "day") {
            this.drawSun();
        } else {
            this.drawMoon();
        }

    }


    //---------FUNCIONES DE UTILIDAD----------------------

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

    //-------------ANIMACIÓN NUBES-------
    loadClouds(){
        for(let i=1;i<6;i++){
            let nube= ImageManager.getImage(`nube${i}`)
            this.clouds.set(`cloud${i}`,nube);
        }
    }
    drawClouds(){
     
        this.cloudsData.forEach(cloud =>{
            /**@type {CanvasImageSource} */
            const img= this.clouds.get(cloud.key);
            this.ctx.drawImage(img,cloud.x-this.offsetX,cloud.y-this.offsetY,cloud.width,cloud.heigth);
        });
/*         this.ctx.drawImage(
            this.backGroundCloud,
            this.staticCloudData.x,
            this.staticCloudData.y,
            this.staticCloudData.width,
            this.staticCloudData.heigth  
        )
 */
    }
    updateClouds(){

        this.cloudsData.forEach(cloud =>{
            cloud.x+=cloud.speed;
            /* if(cloud.x>this.canvas.clientWidth) cloud.x=-800; */
            if(cloud.x>this.mapWidth*this.tileSize) cloud.x=-800;
           
        });
    }
    updateCloudsScale(scaleFactor){
        this.cloudsData.forEach(cloud=>{
            cloud.x*=scaleFactor;
            cloud.y*=scaleFactor;
            cloud.speed*=scaleFactor;
            cloud.width*=scaleFactor;
            cloud.heigth*=scaleFactor;
        });
    }

}

export { SunsetCanvas }