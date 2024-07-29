
import { Random } from "./Utils/Random.mjs";

class Tile {

    constructor(ctx, index) {

        this.ctx = ctx;
        this.x;
        this.y;
        this.index = index;
        this._type = "grass";
        this.isSelected = false;
        this.randomIndex = Random.getRandom(0, 5);
        this.bush = Random.getRandom(0, 100) < 20;

        //Carga de imagenes

        this.backgroundImage = new Image();
        this.backgroundImage.src = "../Assets/Dibujos/Textures/parchmentFolded.png";
        this.backImageLoaded = false;
        this.backgroundImage.onload = () => {
            this.backImageLoaded = true;
        };

        this.spriteSheet = new Image();
        this.spriteSheetLoaded = false;
        this.spriteSheet.src = '../Assets/Dibujos/Spritesheet/spritesheet_retina.png';
        this.spriteSheet.onload = () => {

            this.spriteSheetLoaded = true;

        }

        this.objects = {

            mountain: {
                mountain0: { nombre: "rocks.png", x: "384", y: "1024",width:"128" },
                mountain1: { nombre: "rocksA.png", x: "384", y: "896",width:"128" },
                mountain2: { nombre: "rocksB.png", x: "384", y: "768",width:"128" },
                mountain3: { nombre: "rocksMountain.png", x: "384", y: "640",width:"128" },
                mountain4: { nombre: "rocksTall.png", x: "384", y: "512",width:"128" }
            },
            tree: {
                tree0: { x: "256", y: "0",width:"128" },
                tree1: { x: "128", y: "1152",width:"128" },
                tree2: { x: "128", y: "1024",width:"128" },
                tree3: { x: "0", y: "1152",width:"128" }

            },

            bush: {
                bush0: { x: "896", y: "1152",width:"128" }

            }
        }

    }
    setPosition(x,y){
        this.x=x;
        this.y=y;

    }


    render(x, y, size) {

        if (this.backImageLoaded) this.ctx.drawImage(this.backgroundImage, x, y);

        this.chooseStyle(x, y, size);

        if (this.isSelected) {

            this.ctx.lineWidth = 4;
            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(x, y, size, size);


        }
    }

    /**
     * @param {any} newType
     */
    set type(newType) {

        this._type = newType;

    }

    chooseStyle(x, y, size) {

        switch (this._type) {

            case "mountain":

                this.drawImage('mountain', x, y, size, this.randomIndex);

                break;
            case "forest":

                this.drawImage('tree', x, y, size, this.randomIndex);

                break;
            case "grass":

                if (this.bush) this.drawImage('bush', x, y, size, 0);

                break;
            default:
                this.ctx.fillStyle = "lightgrey";
                break;
        }
    }
    drawImage(type, x, y, size, index) {

        if (this.spriteSheetLoaded && index != null) {

            const objectKey = `${type}${index}`;
            const object = this.objects[type][objectKey];

            if (object) {

                this.ctx.drawImage(
                    this.spriteSheet,
                    object.x,
                    object.y,
                    object.width,
                    object.width,
                    x, y, size, size

                )

            }




        }

    }

    /**
     * @param {boolean} selected
     */
    selected(selected) {

        this.isSelected = selected;

        this.render();
    }




}




export { Tile };