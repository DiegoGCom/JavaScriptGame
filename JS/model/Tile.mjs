
class Tile {

    constructor(ctx, tileIndex,gridX,gridY) {
        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.tileIndex = tileIndex;

        //---Coordenadas
        this.x = 0;
        this.y = 0;
        this.gridX=gridX;
        this.gridY=gridY;

        //--Opciones----
        this.isSelected = false;
        this.strokeOn = false;
        this.strokeColor = 'white';
        this.hasCollider = false;
        this.color = '';

        //----Carga de imagenes
        this.worldInfo = null;
        this.singleImage = null;
        this.backgroundOn = false;
        this.foregroundOn = false;
        this.backGround = {
            spriteSheet: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
        this.foreGround = {
            spriteSheet: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
        //----PathFinding----
        this.parent=null;
        this.g=0;
        this.h=0;
        this.f=0;

  
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
    setInfo(worldInfo) {
        this.worldInfo = worldInfo;
        this.spriteSheet = worldInfo.spriteSheet;
        this.spriteWidth = worldInfo.spriteWidth;
    }
    setSpriteSheet(obj, objX, objY) {
        this.foreGround.spriteSheet = obj.spriteSheet;
        this.foreGround.x = objX;
        this.foreGround.y = objY;
        this.foreGround.width = obj.frSize;
        this.foreGround.height = obj.frSize;
        this.foregroundOn = true;
    }
    setBackground(obj) {
        this.backGround.spriteSheet = obj.spriteSheet;
        this.backGround.x = obj.x;
        this.backGround.y = obj.y;
        this.backGround.width = obj.frSize;
        this.backGround.height = obj.frSize;
        this.backgroundOn = true;
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
    getColor(){
        return this.color;
    }
    setCollider(collider){
        this.hasCollider=collider;
    }

    //--------DIBUJADO--------

    fillColor(size) {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, size, size);
    }

    drawBackground(size) {
        if (!this.backgroundOn) return;
        this.ctx.drawImage(
            this.backGround.spriteSheet,
            this.backGround.x,
            this.backGround.y,
            this.backGround.width,
            this.backGround.height,
            this.x, this.y, size, size);
    }

    drawOverlay(size) {

        this.drawImage(size);
        
    }

    drawImage(size) {
        if (!this.foregroundOn) return;
        this.ctx.drawImage(
            this.foreGround.spriteSheet,
            this.foreGround.x,
            this.foreGround.y,
            this.foreGround.width,
            this.foreGround.height,
            this.x, this.y, size, size
        )

    }
    drawStroke(size) {
        if (this.strokeOn) {
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeStyle = 'black';
            this.ctx.strokeRect(this.x, this.y, size, size);
            this.ctx.font = `${size / 8}px Arial`;
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(this.gridY + ', ' + this.gridX, this.x, this.y+15);
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
        else {
            this.drawBackground(size);

            this.drawOverlay(size);

            this.drawSelection(size);
        }
        if (this.strokeOn) this.drawStroke(size);


    }
}

export { Tile };