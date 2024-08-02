
class ImageManager {

    static images = new Map();

   
    static spriteData = {

        mountain: {
            mountain0: { nombre: "rocks.png", x: "384", y: "1024", width: "128" },
            mountain1: { nombre: "rocksA.png", x: "384", y: "896", width: "128" },
            mountain2: { nombre: "rocksB.png", x: "384", y: "768", width: "128" },
            mountain3: { nombre: "rocksMountain.png", x: "384", y: "640", width: "128" },
            mountain4: { nombre: "rocksTall.png", x: "384", y: "512", width: "128" }
        },
        tree: {
            tree0: { x: "256", y: "0", width: "128" },
            tree1: { x: "128", y: "1152", width: "128" },
            tree2: { x: "128", y: "1024", width: "128" },
            tree3: { x: "0", y: "1152", width: "128" },
            tree4: { x: "0", y: "1152", width: "128" }

        },

        bush: {
            bush0: { x: "896", y: "1152", width: "128" }

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

    static loadImage(key, src) {
        const img = new Image();
        img.src = src;
        ImageManager.images.set(key, img);
    }

    static getImage(key) {
        return ImageManager.images.get(key);
    }

    static getSpriteData(){

        const data = ImageManager.spriteData;
        return data;

    }






}
export { ImageManager }