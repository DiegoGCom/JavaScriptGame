


class ImageManager {

    constructor() {

        this.ctx;
        this.imageSize = 128;


        //Carga de imagenes

        this.image = new Image();
        this.image.src = "../Assets/Dibujos/Textures/parchmentFolded.png";
        this.backImageLoaded = false;
        this.image.onload = () => {
            this.backImageLoaded = true;
        };

        this.spriteSheet = new Image();
        this.spriteSheetLoaded = false;
        this.spriteSheet.src = '../Assets/Dibujos/Spritesheet/spritesheet_retina.png';
        this.spriteSheet.onload = () => {

            this.spriteSheetLoaded = true;

        }

        this.monigoteSheet = new Image();
        this.monigoteLoaded = false;
        this.monigoteSheet.src ="../Assets/Dibujos/Spritesheet/monigote.png";
        this.monigoteSheet.onload = () => {

            this.monigoteLoaded = true;
            console.log("Monigote image loaded: "+ this.monigoteLoaded)

        }

        this.objects = {

            mountain: {
                mountain0: { nombre: "rocks.png", x: "384", y: "1024" },
                mountain1: { nombre: "rocksA.png", x: "384", y: "896" },
                mountain2: { nombre: "rocksB.png", x: "384", y: "768" },
                mountain3: { nombre: "rocksMountain.png", x: "384", y: "640" },
                mountain4: { nombre: "rocksTall.png", x: "384", y: "512" }
            },
            tree: {
                tree0: { x: "256", y: "0" },
                tree1: { x: "128", y: "1152" },
                tree2: { x: "128", y: "1024" },
                tree3: { x: "0", y: "1152" }

            },

            bush: {
                bush0: { x: "896", y: "1152" }

            },
            monigote: {
                monigote0: { x: "0", y: "0", width: "124", height: "204" },
                monigote1: { x: "124", y: "0", width: "124", height: "204" },
                monigote2: { x: "248", y: "0", width: "124", height: "204" },
                monigote3: { x: "372", y: "0", width: "124", height: "204" },
                monigote4: { x: "496", y: "0", width: "124", height: "204" },
                monigote5: { x: "620", y: "0", width: "124", height: "204" },
                monigote6: { x: "744", y: "0", width: "124", height: "204" }
            }
        };




    }

    setContext(ctx) {

        this.ctx = ctx;

    }


    drawBackground(ctx,x, y) {
        if (this.backImageLoaded) ctx.drawImage(this.image, x, y);
    }


    drawImage(ctx, type, x, y, size, index) {

        if (this.spriteSheetLoaded && index != null) {

            const objectKey = `${type}${index}`;
            const object = this.objects[type][objectKey];

            if (object) {

                ctx.drawImage(
                    this.spriteSheet,
                    object.x,
                    object.y,
                    this.imageSize,
                    this.imageSize,
                    x, y, size, size

                )

            }




        }

    }
    drawCharacter(ctx, type, x, y, size, index) {

        if (this.monigoteLoaded) {

            const objectKey = `${type}${index}`;
            const object = this.objects[type][objectKey];
            if (object) {
                ctx.drawImage(
                    this.monigoteSheet,
                    object.x,
                    object.y,
                    object.width,
                    object.height,
                    x, y, size, size
                )
            }
        }

    }
    drawMirroredCharacter(ctx, type, x, y, size, index) {
        if (this.monigoteLoaded) {
            const objectKey = `${type}${index}`;
            const object = this.objects[type][objectKey];

            if (object) {
                ctx.save();
                ctx.translate(x + size, y);
                ctx.scale(-1, 1);
                ctx.drawImage(
                    this.monigoteSheet,
                    object.x,
                    object.y,
                    object.width,
                    object.height,
                    0, 0, size, size
                );
                ctx.restore();
            }
        }
    }

}
export { ImageManager }