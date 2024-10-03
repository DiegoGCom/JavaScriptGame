
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
            monigote: {
                key: 'monigote',
                type: 'sprite',
                zIndex: 1,
                spriteSheet: ImageManager.getImage('monigote'),
                src: '../Assets/Dibujos/PNG/Spritesheet/monigote.png',
                x: 0,
                y: 0,
                spriteWidth: 871,
                spriteHeight: 204,
                cols:7,
                rows:1,
                frSize: 204,
                hasCollider:true
            },
            arbol1:{
                key:'arbol1',
                type:'block',
                zIndex:1,
                spriteSheet: ImageManager.getImage('arbol1'),
                src: '../Assets/Dibujos/Spritesheet/arbol1.png',
                x: 0,
                y: 0,
                spriteWidth: 400,
                spriteHeight: 400,
                cols:2,
                rows:2,
                frSize: 200,
                hasCollider:true
                
            },
            arbol2:{
                key:'arbol2',
                type:'block',
                zIndex:1,
                spriteSheet: ImageManager.getImage('arbol2'),
                src: '../Assets/Dibujos/Spritesheet/arbol2.png',
                x: 0,
                y: 0,
                spriteWidth: 400,
                spriteHeight: 400,
                cols:2,
                rows:2,
                frSize: 200,
                hasCollider:true
            },
            terreno:{
                key:'terreno',
                type:'sprite',
                zIndex:0,
                spriteSheet: ImageManager.getImage('terreno'),
                src: '../Assets/Dibujos/Spritesheet/tileset_terreno.png',
                x: 0,
                y: 0,
                spriteWidth: 1200,
                spriteHeight:1200,
                cols:6,
                rows:6,
                frSize: 200,
                hasCollider:false
            }

    
    
    }

        return object[objectName];
    }

    static loadImagesFromDirectory() {

    const imagesToLoad = [
        
        { key: 'greySky', src: '../Assets/Dibujos/Textures/cielo.png' },
        { key: 'monigote', src: '../Assets/Dibujos/Spritesheet/monigote.png' },
        { key: 'arbol1', src: '../Assets/Dibujos/Spritesheet/arbol1.png' },
        { key: 'arbol2', src: '../Assets/Dibujos/Spritesheet/arbol2.png' },
        { key: 'hojas', src: '../Assets/Dibujos/Spritesheet/hojas.png' },
        { key: 'nube1', src: '../Assets/Dibujos/PNG/nube_1.png' },
        { key: 'nube2', src: '../Assets/Dibujos/PNG/nube_2.png' },
        { key: 'nube3', src: '../Assets/Dibujos/PNG/nube_3.png' },
        { key: 'nube4', src: '../Assets/Dibujos/PNG/nube_4.png' },
        { key: 'nube5', src: '../Assets/Dibujos/PNG/nube_5.png' },
        { key: 'nube6', src: '../Assets/Dibujos/PNG/nube_frontal.png' },
        { key: 'terreno', src: '../Assets/Dibujos/Spritesheet/tileset_terreno.png'}
    ]

    imagesToLoad.forEach(image => ImageManager.loadImage(image.key, image.src));

}






}
export { ImageManager }