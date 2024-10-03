import { TileMap } from "../model/TileMap.mjs";
import { Tile } from "../model/Tile.mjs";

class SaveLoadManager {

    constructor(tileMap) {
        this.tileMap = tileMap;
    }
    setTileMap(tileMap) {
        this.tileMap = tileMap;
    }

    async saveGame() {
        if (!this.tileMap) {
            console.error('No tileMap set.')
            return;
        }
        const mapData = JSON.stringify(this.tileMap);
        const blob = new Blob([mapData],{type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href=url;
        a.download='savegame.json';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log("Juego guardado");
    }
    loadMap(mapData){
        const newTileMap= new TileMap(mapData.key,mapData.mapWidth, mapData.mapHeight,mapData.tileSize);

        for(let y=0;y<newTileMap.mapHeight;y++){
            for(let x=0;x<newTileMap.mapWidth;x++){
                const tileData = mapData.tiles[y][x];
                /**@type {Tile} */
                const tile = newTileMap.map[y][x];
                
                tile.fromJSON(tileData);
            }
        }
        return newTileMap;
    }
    
}
export { SaveLoadManager }