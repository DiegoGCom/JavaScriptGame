
class Tile {

    constructor(ctx, tileIndex) {
        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.tileIndex = tileIndex;

        //---Coordenadas
        this.canvasX = 0;
        this.canvasY = 0;
        this.gridX = 0;
        this.gridY = 0;

        this.isSelected = false;
        this.visibility = 'clear';
        this.strokeOn = false;
        this.hasCollider = false;
        this.color = '';

        //----Carga de imagenes
        this.worldInfo = null;
        this.singleImage = null;
        this.objectData = { type: 'void', subtype: 'void0' };
        this.backgroundOn = false;

    }

    //------SETTERS------
    setInfo(worldInfo) {
        this.worldInfo = worldInfo;
    }
    setType(objectData) {
        this.objectData = objectData;
        this.hasCollider = objectData.hasCollider || false;
    }
    setGrid(x, y) {
        this.gridX = x;
        this.gridY = y;
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

    //--------DIBUJADO--------

    drawBackground(size) {
        if (this.worldInfo.backGroundImage) this.ctx.drawImage(this.worldInfo.backGroundImage, this.canvasX, this.canvasY, size, size);
    }

    fillColor(size) {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.canvasX, this.canvasY, size, size);
    }

    drawOverlay(size) {
        if (this.color) this.fillColor(size);
        this.drawImage(size);
        if (this.strokeOn) this.drawStroke(size);
    }

    drawSingleImage(size) {
        if (this.singleImage) this.ctx.drawImage(this.singleImage, this.canvasX, this.canvasY, size, size);
    }

    drawImage(size) {
        if (this.objectData) {
            this.ctx.drawImage(
                this.worldInfo.spriteSheet,
                this.objectData.x,
                this.objectData.y,
                this.worldInfo.spriteWidth,
                this.worldInfo.spriteHeight,
                this.canvasX, this.canvasY, size, size
            )
        } else {
            console.log(`No se pudo cargar el objeto: ${this.objectData}`)
        }
    }
    drawStroke(size) {
        if (this.strokeOn) {
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeStyle = 'black';
            this.ctx.strokeRect(this.canvasX, this.canvasY, size, size);
            this.ctx.font = `${size / 8}px Arial`;
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(this.tileIndex, this.canvasX, this.canvasY + size);
        }
    }
    drawSelection(size) {
        if (this.isSelected) {
            const gap = 5;
            this.ctx.lineWidth = gap;
            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(this.canvasX + gap, this.canvasY + gap, size - gap * 2, size - gap * 2);
        }
    }

    render(x, y, size) {

        this.setPosition(x, y);
        
        this.drawBackground(size);

        this.drawOverlay(size);

        this.drawStroke(size)

        this.drawSelection(size);

        this.drawSingleImage(size);

    }










}

export { Tile };