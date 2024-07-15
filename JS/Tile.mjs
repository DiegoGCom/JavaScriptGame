class Tile {



    constructor(ctx, index) {

        // this.size = 50;
        this.ctx = ctx;
        this.index = index;
        this._type = "grass";
        this.isSelected = false;

    }

    render(x, y, size) {


        this.size = size;
        this.x = x;
        this.y = y;
        this.chooseStyle();
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
        this.ctx.fillStyle = "black";
        this.ctx.font = `${12}px Arial`;
        this.ctx.fillText(this.index, this.x + 2, this.y + 12);


        if (!this.isSelected) {
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "black";
            this.ctx.strokeRect(this.x, this.y, this.size, this.size);

        } else {
            this.ctx.lineWidth = 4;
            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(this.x, this.y, this.size, this.size);


        }



    }

    /**
     * @param {any} newType
     */
    set type(newType) {

        this._type = newType;

    }

    chooseStyle() {

        switch (this._type) {

            case "mountain":
                this.ctx.fillStyle = "lightgrey";
                break;
            case "forest":
                this.ctx.fillStyle = "darkgreen";
                break;
            case "grass":
                this.ctx.fillStyle = "lightgreen";
                break;
            default:
                this.ctx.fillStyle = "lightgrey";
                break;
        }
    }

    /**
     * @param {boolean} selected
     */
    selected(selected) {

        this.isSelected = selected;

    }







}

export { Tile };