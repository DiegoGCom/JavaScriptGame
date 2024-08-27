
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
            0: { x: 0, y: 200},
            0: { x: 200, y: 400},
            0: { x: 400, y: 200}
            
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

        const mapaMundiInfo = {
            backGroundImage: ImageManager.getImage('bigMapBackGround'),
            spriteSheet: ImageManager.getImage('spriteSheetRetina'),
            spriteData: ImageManager.getSpriteData(),
            mapWidth: 100,
            mapHeight: 100,
            spriteWidth: '128',
            spriteHeight: '128',
            tileSize: 100
        }
        const smallAreaInfo = {
            backGroundImage: ImageManager.getImage('smallAreaBackground'),
            spriteSheet: ImageManager.getImage('spriteHouse'),
            spriteData: ImageManager.getSpriteData(),
            mapWidth: 150,
            mapHeight: 50,
            spriteWidth: '200',
            spriteHeight: '200',
            tileSize: 100
        }

        return mapType == 'mapaMundi' ? mapaMundiInfo : smallAreaInfo;
    }

    static loadImagesFromDirectory() {

        const imagesToLoad = [
            { key: 'spriteSheetRetina', src: '../Assets/Dibujos/Spritesheet/spritesheet_retina.png' },
            { key: 'smallAreaBackground', src: "../Assets/Dibujos/Textures/tile_cesped.png" }, 
            { key: 'bigMapBackGround', src: "../Assets/Dibujos/Textures/parchmentAncient.png" },
            { key: 'spriteHouse', src: '../Assets/Dibujos/Spritesheet/casa_800.png' },
            { key: 'ruins', src: '../Assets/Dibujos/PNG/Default/ruins.png' },
            { key: 'greySky', src: '../Assets/Dibujos/Textures/cielo_oscuro.png' }
        ]

        imagesToLoad.forEach(image => ImageManager.loadImage(image.key, image.src));

    }






}
export { ImageManager }