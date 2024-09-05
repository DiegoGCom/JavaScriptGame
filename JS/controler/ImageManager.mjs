
class ImageManager {

    static images = new Map();

    static spriteData = {

        mountain: {
            mountain0: { nombre: "rocks.png", x: "384", y: "1024", hasCollider: true },
            mountain1: { nombre: "rocksA.png", x: "384", y: "896", hasCollider: true },
            mountain2: { nombre: "rocksB.png", x: "384", y: "768", hasCollider: true },
            mountain3: { nombre: "rocksMountain.png", x: "384", y: "640", hasCollider: true },
            mountain4: { nombre: "rocksTall.png", x: "384", y: "512", hasCollider: true }
        },
        tree: {
            tree0: { x: "256", y: "0", hasCollider: true },
            tree1: { x: "128", y: "1152", hasCollider: true },
            tree2: { x: "128", y: "1024", hasCollider: true },
            tree3: { x: "0", y: "1152", hasCollider: true },

        },

        bush: {
            bush0: { x: "896", y: "1152", hasCollider: true }

        },
        lake: {
            lake0: { x: "0", y: "395", hasCollider: true },
            lake1: { x: "128", y: "395", hasCollider: true },

        },

        house: {
            house0: { x: '0', y: '0', hasCollider: true },

        },
        void: {
            void0: { x: '-500', y: '-500', hasCollider: false }
        }
    }
    static backGroundData = {

        ground: {
            0: { x: 0, y: 200 },
            0: { x: 200, y: 400 },
            0: { x: 400, y: 200 }

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
    static getImageMap() {

        return ImageManager.images;

    }
    static getWorldMapInfo(mapType) {

        const mapInfo = {

            mapaMundiInfo: {
                backGroundImage: ImageManager.getImage('bigMapBackGround'),
                spriteSheet: ImageManager.getImage('spriteSheetRetina'),
                spriteData: ImageManager.getSpriteData(),
                mapWidth: 100,
                mapHeight: 100,
                spriteWidth: '128',
                spriteHeight: '128',
                tileSize: 100
            },
            smallAreaInfo: {
                backGroundImage: ImageManager.getImage('smallAreaBackground'),
                spriteSheet: ImageManager.getImage('spriteHouse'),
                spriteData: ImageManager.getSpriteData(),
                mapWidth: 100,
                mapHeight: 50,
                spriteWidth: '200',
                spriteHeight: '200',
                tileSize: 100
            }
        }
        return mapInfo[mapType];


    }
    static getObjects(objectName) {

        const object = {
            appleHouse: {
                key: 'appleHouse',
                type: 'block',
                zIndex: 1,
                spriteSheet: ImageManager.getImage('spriteHouse'),
                src: '../Assets/Dibujos/Spritesheet/casa_800.png',
                x: 0,
                y: 0,
                spriteWidth: 800,
                spriteHeight: 800,
                cols: 4 ,            //numero de fracciones ->> tiles que ocupa el sprite
                rows: 4,            //numero de fracciones ->> tiles que ocupa el sprite
                frSize: 200        //tamaño de la fracción
            },
            ruins: {
                key: 'ruins',
                type: 'sprite',
                zIndex: 1,
                spriteSheet: ImageManager.getImage('spriteSheetRetina'),
                src: '../Assets/Dibujos/PNG/Default/ruins.png',
                x: 0,
                y: 0,
                spriteWidth: 1280,
                spriteHeight: 1280,
                cols: 10,
                rows: 10,
                frSize: 128
            },
            suelo0: {
                key: 'suelo',
                type: 'sprite',
                zIndex: 0,
                spriteSheet: ImageManager.getImage('suelo'),
                src: '../Assets/Dibujos/PNG/Default/ruins.png',
                x: 0,
                y: 0,
                spriteWidth: 1200,
                spriteHeight: 800,
                cols:6,
                rows:4,
                frSize: 200
            },
            suelo1: {
                key: 'suelo',
                type: 'sprite',
                zIndex: 0,
                spriteSheet: ImageManager.getImage('suelo'),
                src: '../Assets/Dibujos/PNG/Default/ruins.png',
                x: 1200,
                y: 0,
                spriteWidth: 1200,
                spriteHeight: 800,
                cols:6,
                rows:4,
                frSize: 200
            },
            suelo2: {
                key: 'suelo',
                type: 'sprite',
                zIndex: 0,
                spriteSheet: ImageManager.getImage('suelo'),
                src: '../Assets/Dibujos/PNG/Default/ruins.png',
                x: 2400,
                y: 0,
                spriteWidth: 1200,
                spriteHeight: 800,
                cols:6,
                rows:4,
                frSize: 200
            }
    
    }

        return object[objectName];
    }

    static loadImagesFromDirectory() {

    const imagesToLoad = [
        { key: 'spriteSheetRetina', src: '../Assets/Dibujos/Spritesheet/spritesheet_retina.png' },
        { key: 'smallAreaBackground', src: "../Assets/Dibujos/Textures/tile_cesped_1.png" },
        { key: 'bigMapBackGround', src: "../Assets/Dibujos/Textures/parchmentAncient.png" },
        { key: 'spriteHouse', src: '../Assets/Dibujos/Spritesheet/casa_800.png' },
        { key: 'ruins', src: '../Assets/Dibujos/PNG/Retina/ruins.png' },
        { key: 'greySky', src: '../Assets/Dibujos/Textures/cielo.png' },
        { key: 'suelo', src: '../Assets/Dibujos/Textures/tile_cesped_doble.png' },
    ]

    imagesToLoad.forEach(image => ImageManager.loadImage(image.key, image.src));

}






}
export { ImageManager }