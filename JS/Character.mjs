class Character {


    constructor(ctx,name, x, y) {

        this.name = name;
        this.ctx=ctx;
        this.bigMapX;
        this.bigMapY;
        this.x = x;
        this.y = y;
        this.speed=0.4;
        this.targetX;
        this.targetY;
        this.frameRate = 0;


        //Objeto monigote
        this.monigote = {
            x: 0,
            y: 0,
            width: 124,
            height: 204
        }


        //Carga de imagen
        this.monigoteSheet = new Image();
        this.monigoteLoaded = false;
        this.monigoteSheet.src = "../Assets/Dibujos/Spritesheet/monigote.png";
        this.monigoteSheet.onload = () => {

            this.monigoteLoaded = true;
           
        }

    }
    
    setTarget(targetX,targetY){
        this.targetX=targetX;
        this.targetY=targetY;
    }

    updateTarjetPosition(scaleFactor){
        this.targetX = Math.floor(this.targetX * scaleFactor);
        this.targetY = Math.floor(this.targetY * scaleFactor);
    }

    updateScale(scaleFactor){
        this.x = Math.floor(this.x * scaleFactor);
        this.y = Math.floor(this.y * scaleFactor);
    }

    move(){
        const deltaX = this.targetX - this.x;
        const deltaY = this.targetY - this.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance < this.speed ) {
            this.x = this.targetX;
            this.y = this.targetY;
        } else {
            this.x += (deltaX / distance) * this.speed;
            this.y += (deltaY / distance) * this.speed;
        }     
        
       
    }

    render(x,y,size) {
      
        this.animateSprite();
        
        this.ctx.drawImage(
            this.monigoteSheet,
            this.monigote.x,
            this.monigote.y,
            this.monigote.width,
            this.monigote.height,
            x, y, size, size);

    }
    renderMirror(x, y, size) {

        this.animateSprite();

        this.ctx.save();
        this.ctx.translate(x + size, y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
            this.monigoteSheet,
            this.monigote.x,
            this.monigote.y,
            this.monigote.width,
            this.monigote.height
            , 0, 0, size, size);
        this.ctx.restore();

    }
    animateSprite(){

        if (this.frameRate > 8) {
            this.monigote.x += this.monigote.width;
            if (this.monigote.x > this.monigoteSheet.width-this.monigote.width) {
                this.monigote.x = 0; // Resetea al inicio si sobrepasa el ancho total de la imagen
            } 
            this.frameRate = 0;
        } else {
            this.frameRate++;
        }

    }
   updateRender(x,y,size){

        if(this.targetX>=this.x) this.render(x,y,size);
        else this.renderMirror(x,y,size);
    }

}

export { Character }