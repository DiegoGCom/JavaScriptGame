
class Tile {

    constructor(ctx, tileIndex) {
        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.tileIndex = tileIndex;

        //---Coordenadas
        this.canvasX = 0;
        this.canvasY = 0;

        this.isSelected = false;
        this.isArea = false;
        this.visibility = 'clear';
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
        this.canvasX = x;
        this.canvasY = y;
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

    //--------DIBUJADO--------

    fillColor(size) {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.canvasX, this.canvasY, size, size);
    }

    drawBackground(size) {
        if (!this.backgroundOn) return;
        this.ctx.drawImage(
            this.backGround.spriteSheet,
            this.backGround.x,
            this.backGround.y,
            this.backGround.width,
            this.backGround.height,
            this.canvasX, this.canvasY, size, size);
    }

    drawOverlay(size) {

        this.drawImage(size);
        if (this.strokeOn) this.drawStroke(size);
    }

    drawImage(size) {
        if (!this.foregroundOn) return;
        this.ctx.drawImage(
            this.foreGround.spriteSheet,
            this.foreGround.x,
            this.foreGround.y,
            this.foreGround.width,
            this.foreGround.height,
            this.canvasX, this.canvasY, size, size
        )

    }
    drawStroke(size) {
        if (this.strokeOn) {
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeStyle = 'black';
            this.ctx.strokeRect(this.canvasX, this.canvasY, size, size);
            this.ctx.font = `${size / 8}px Arial`;
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(this.gridX + ', ' + this.gridY, this.canvasX, this.canvasY);
        }
    }
    drawSelection(size) {
        if (this.isSelected || this.isArea) {
            const gap = 5;
            this.ctx.lineWidth = gap;
            this.ctx.strokeStyle = this.strokeColor;
            this.ctx.strokeRect(this.canvasX + gap, this.canvasY + gap, size - gap * 2, size - gap * 2);
        }
    }

    render(x, y, size) {

        this.setPosition(x, y);

        if (this.color) this.fillColor(size);

        this.drawBackground(size);

        this.drawOverlay(size);

        this.drawSelection(size);

    }
}

export { Tile };