import { ImageManager } from "../controler/ImageManager.mjs";

class Tile {

    constructor(ctx, tileIndex, gridX, gridY) {
        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.tileIndex = tileIndex;

        //---Coordenadas
        this.x = 0;
        this.y = 0;
        this.gridX = gridX;
        this.gridY = gridY;

        //--Opciones----
        this.isSelected = false;
        this.strokeOn = false;
        this.strokeColor = 'white';
        this.hasCollider = false;
        this.color = '';

        //----Carga de imagenes
        this.backGroundOn = false;
        this.foreGroundOn = false;
        this.backGround = {
            key:'',
            spriteSheet: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
        this.foreGround = {
            key:'',
            spriteSheet: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
        //----PathFinding----
        this.parent = null;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        //----Rotation------
        this.backGroundRotation = 0;
        this.foreGroundRotation = 0;

    }
    rotateBackGround(degrees) {
        this.backGroundRotation = degrees;
    }
    rotateForeGround(degrees) {
        this.foreGroundRotation = degrees;
    }


    setObjectToDraw(obj) {
        switch (obj.zIndex) {
            case 0:
                this.setBackground(obj);
                break;
            case 1:
                this.setSpriteSheet(obj);
                break;
        }
    }

    //------SETTERS------

    setSpriteSheet(obj, objX, objY) {
        this.foreGround.key=obj.key;
        this.foreGround.spriteSheet = obj.spriteSheet;
        this.foreGround.x = objX;
        this.foreGround.y = objY;
        this.foreGround.width = obj.frSize;
        this.foreGround.height = obj.frSize;
        this.foreGroundOn = true;
    }
    setBackground(obj) {
        this.backGround.key=obj.key;
        this.backGround.spriteSheet = obj.spriteSheet;
        this.backGround.x = obj.x;
        this.backGround.y = obj.y;
        this.backGround.width = obj.frSize;
        this.backGround.height = obj.frSize;
        this.backGroundOn = true;
    }
    clear() {
        this.foreGroundOn = false;
        this.backGroundOn = false;
        this.setColor('');
        this.setSelected(false);
        this.setCollider(false);
        this.backGroundRotation = 0;
        this.foreGroundRotation = 0;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    setSelected(selected) {
        this.isSelected = selected;
    }
    setColor(color) {
        this.color = color;
    }
    setStroke(color) {
        this.isArea = true;
        this.strokeColor = color;
    }
    getColor() {
        return this.color;
    }
    setCollider(collider) {
        this.hasCollider = collider;
    }

    //--------DIBUJADO--------

    fillColor(size) {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, size, size);
    }

    drawBackground(size) {
        if (!this.backGroundOn) return;

        const centerX = this.x + size / 2;
        const centerY = this.y + size / 2;

        this.ctx.save(); // Guardar el estado del contexto actual
        this.ctx.translate(centerX, centerY);  // Mover el canvas al centro del tile
        this.ctx.rotate((this.backGroundRotation * Math.PI) / 180);  // Aplicar la rotación en radianes
        this.ctx.translate(-centerX, -centerY);  // Volver al origen

        this.ctx.drawImage(
            this.backGround.spriteSheet,
            this.backGround.x,
            this.backGround.y,
            this.backGround.width,
            this.backGround.height,
            this.x, this.y, size, size
        );
        this.ctx.restore();
    }

    drawOverlay(size) {

        this.drawImage(size);

    }

    drawImage(size) {
        if (!this.foreGroundOn) return;

        const centerX = this.x + size / 2;
        const centerY = this.y + size / 2;

        this.ctx.save(); // Guardar el estado del contexto actual
        this.ctx.translate(centerX, centerY);  // Mover el canvas al centro del tile
        this.ctx.rotate((this.foreGroundRotation * Math.PI) / 180);  // Aplicar la rotación en radianes
        this.ctx.translate(-centerX, -centerY);  // Volver al origen

        this.ctx.drawImage(
            this.foreGround.spriteSheet,
            this.foreGround.x,
            this.foreGround.y,
            this.foreGround.width,
            this.foreGround.height,
            this.x, this.y, size, size
        )
        this.ctx.restore();
    }
    drawStroke(size) {
        if (this.strokeOn) {
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeStyle = 'black';
            this.ctx.strokeRect(this.x, this.y, size, size);
            this.ctx.font = `${size / 8}px Arial`;
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(this.gridY + ', ' + this.gridX, this.x, this.y + 15);
        }
    }
    drawSelection(size) {
        if (this.isSelected || this.isArea) {
            const gap = 5;
            this.ctx.lineWidth = gap;
            this.ctx.strokeStyle = this.strokeColor;
            this.ctx.strokeRect(this.x + gap, this.y + gap, size - gap * 2, size - gap * 2);
        }
    }

    render(x, y, size) {

        this.setPosition(x, y);

        if (this.color) this.fillColor(size);

        this.drawBackground(size);

        this.drawOverlay(size);

        this.drawSelection(size);

        if (this.strokeOn) this.drawStroke(size);


    }
  
    toJSON(){
        return{
            tileIndex:this.tileIndex,
            gridX:this.gridX,
            gridY:this.gridY,
            x:this.x,
            y:this.y,
            isSelected:this.isSelected,
            strokeOn:this.strokeOn,
            strokeColor:this.strokeColor,
            hasCollider:this.hasCollider,
            color:this.color,
            backGroundOn: this.backGroundOn,
            foreGroundOn: this.foreGroundOn,
            backGround:{
                key:this.backGround.key,
                x: this.backGround.x,
                y: this.backGround.y,
                width: this.backGround.width,
                height: this.backGround.height
            },
            foreGround:{
                key: this.foreGround.key,
                x: this.foreGround.x,
                y: this.foreGround.y,
                width: this.foreGround.width,
                height: this.foreGround.height
            },
            backGroundRotation: this.backGroundRotation,
            foreGroundRotation: this.foreGroundRotation,
        };
    }
    fromJSON(tileData){
        this.tileIndex=tileData.tileIndex;
        this.gridX=tileData.gridX;
        this.gridY=tileData.gridY;
        this.x=tileData.x;
        this.y=tileData.y;
        this.isSelected=tileData.isSelected;
        this.strokeOn=tileData.strokeOn;
        this.strokeColor=tileData.strokeColor;
        this.hasCollider=tileData.hasCollider;
        this.color=tileData.color;
        this.backGroundOn=tileData.backGroundOn;
        this.foreGroundOn=tileData.foreGroundOn;
        this.backGround={
            key: tileData.backGround.key,
            spriteSheet: tileData.backGround.key!='' ? ImageManager.getImage(tileData.backGround.key):null,
            x: tileData.backGround.x,
            y: tileData.backGround.y,
            width: tileData.backGround.width,
            height: tileData.backGround.height,
        }
        this.foreGround={
            key:tileData.foreGround.key,
            spriteSheet: tileData.foreGround.key!='' ? ImageManager.getImage(tileData.foreGround.key):null,
            x: tileData.foreGround.x,
            y: tileData.foreGround.y,
            width: tileData.foreGround.width,
            height: tileData.foreGround.height,
        }
        this.backGroundRotation=tileData.backGroundRotation;
        this.foreGroundRotation=tileData.foreGroundRotation;
    }
}

export { Tile };