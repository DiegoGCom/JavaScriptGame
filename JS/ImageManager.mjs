
class ImageManager {

    static images = new Map();

    static spriteData = {

        mountain: {
            mountain0: { nombre: "rocks.png", x: "384", y: "1024", width: "128", height: "128" },
            mountain1: { nombre: "rocksA.png", x: "384", y: "896", width: "128", height: "128" },
            mountain2: { nombre: "rocksB.png", x: "384", y: "768", width: "128", height: "128" },
            mountain3: { nombre: "rocksMountain.png", x: "384", y: "640", width: "128", height: "128" },
            mountain4: { nombre: "rocksTall.png", x: "384", y: "512", width: "128", height: "128" }
        },
        tree: {
            tree0: { x: "256", y: "0", width: "128", height: "128" },
            tree1: { x: "128", y: "1152", width: "128", height: "128" },
            tree2: { x: "128", y: "1024", width: "128", height: "128" },
            tree3: { x: "0", y: "1152", width: "128", height: "128" },

        },

        bush: {
            bush0: { x: "896", y: "1152", width: "128", height: "128" }

        },
        monigote: {
            monigote0: { x: "0", y: "0", width: "124", height: "128" },
            monigote1: { x: "124", y: "0", width: "124", height: "128" },
            monigote2: { x: "248", y: "0", width: "124", height: "128" },
            monigote3: { x: "372", y: "0", width: "124", height: "128" },
            monigote4: { x: "496", y: "0", width: "124", height: "128" },
            monigote5: { x: "620", y: "0", width: "124", height: "128" },
            monigote6: { x: "744", y: "0", width: "124", height: "128" }
        },
        lake: {
            lake0: { x: "0", y: "395", width: "128", height: "128" },
            lake1: { x: "128", y: "395", width: "128", height: "128" },

        },
        house: {
            house0: { x: "640", y: "896", width: "128", height: "128" },
        },
        void: {
            void0: { x: '0', y: '0', width: '0', height: '0' }
        }
    }



    static loadImage(key, src) {
        const img = new Image();
        img.src = src;
        ImageManager.images.set(key, img);
    }

    static getImage(key) {
        return ImageManager.images.get(key);
    }

    static getSpriteData() {

        const data = ImageManager.spriteData;
        return data;

    }
    static getWorldMapInfo(mapType) {

        const mapaMundiInfo ={
            backGroundImage: ImageManager.getImage('bigMapBackGround'),
            spriteSheet: ImageManager.getImage('spriteSheetRetina'),
            spriteData: ImageManager.getSpriteData(),
            mapWidth: 100,
            mapHeight:100,
            tileSize: 100
        }
        const smallAreaInfo ={
            backGroundImage: ImageManager.getImage('smallAreaBackground'),
            spriteSheet: ImageManager.getImage('spriteSheetRetina'),
            spriteData: ImageManager.getSpriteData(),
            mapWidth: 50,
            mapHeight: 50,
            tileSize: 100
        }

        return mapType== 'mapaMundi' ? mapaMundiInfo : smallAreaInfo;
    }

    static loadImagesFromDirectory() {

        const imagesToLoad = [
            { key: 'spriteSheetRetina', src: '../Assets/Dibujos/Spritesheet/spritesheet_retina.png' },
            { key: 'smallAreaBackground', src: "../Assets/Dibujos/Textures/cesped_1.png" },
            { key: 'bigMapBackGround', src: "../Assets/Dibujos/Textures/parchmentAncient.png" },
        ]

        imagesToLoad.forEach(image => ImageManager.loadImage(image.key, image.src));

    }






}
export { ImageManager }