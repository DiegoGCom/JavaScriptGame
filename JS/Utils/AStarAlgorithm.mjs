import { Tile } from "../model/Tile.mjs";
import { PriorityQueue } from "./PriorityQueue.mjs";

class AStarAlgorithm {

    constructor(grid) {
        /**@type {Tile} */
        this.startTile = null;
        this.goalTile = null;
        this.grid = grid;

        //-----Listas de tiles por comprobar y comprobados
        this.openList = new PriorityQueue();
        this.closedList = new Set();

    }
    run() {
        this.closedList.clear();
        this.resetGrid();

        while (!this.openList.isEmpty()) {
            //console.log('Calculando ruta');
            //---dequeue elimina el elemento de prioridad más baja y lo devuelve
            /**@type {Tile} */
            const currentTile = this.openList.deQueue().element;
            let neighbors = [];

            //---Llegada al punto, reconstrucción del camino devolviendo el parent de cada tile
            if (currentTile === this.goalTile) {
               // console.log('Ruta calculada')
                return this.reconstructPath(currentTile);

            }
            //---Casilla comprobada
            this.closedList.add(currentTile);

            neighbors = this.getNeighbors(currentTile, this.grid);

            for (const neighbor of neighbors) {
                if (this.closedList.has(neighbor)) continue;
                const tentativeG = currentTile.g + this.distance(currentTile, neighbor);

                if (!this.openList.items.some(item => item.element === neighbor) || tentativeG < neighbor.g) {
                    neighbor.g = tentativeG;
                    neighbor.h = this.heuristic(neighbor, this.goalTile);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = currentTile;
                    if (!this.openList.items.some(item => item.element === neighbor)) {
                        this.openList.enQueue(neighbor, neighbor.f);
                    }
                }
              //  console.log('Comprobando vecinos')
            }

        }
        return null;
    }
    setTiles(startTile, goalTile) {
        this.openList.clearQueue();
        this.startTile = startTile;
        this.goalTile = goalTile;
        //-----Inicialización de costo(g), heurísitca(h) y la mejor estimación(f)
        this.startTile.g = 0;
        this.startTile.h = this.heuristic(startTile, goalTile);
        this.startTile.f = this.startTile.g + this.startTile.h;
        //console.log('Tiles seleccionados');
        this.openList.enQueue(this.startTile, this.startTile.f)
    }

    getNeighbors(tile, grid) {
        const neighbors = [];
        const x = tile.gridX; // Columna
        const y = tile.gridY; // Fila

        // Vecinos ortogonales (arriba, abajo, izquierda, derecha)
        if (grid[y - 1] && grid[y - 1][x] && !grid[y - 1][x].hasCollider) neighbors.push(grid[y - 1][x]); // Arriba
        if (grid[y + 1] && grid[y + 1][x] && !grid[y + 1][x].hasCollider) neighbors.push(grid[y + 1][x]); // Abajo
        if (grid[y][x - 1] && !grid[y][x - 1].hasCollider) neighbors.push(grid[y][x - 1]); // Izquierda
        if (grid[y][x + 1] && !grid[y][x + 1].hasCollider) neighbors.push(grid[y][x + 1]); // Derecha

        // Vecinos diagonales con chequeo de colisiones ortogonales
        if (grid[y - 1] && grid[y][x - 1] && !grid[y - 1][x].hasCollider && !grid[y][x - 1].hasCollider) {
            if (!grid[y - 1][x - 1].hasCollider) neighbors.push(grid[y - 1][x - 1]); // Noroeste
        }
        if (grid[y - 1] && grid[y][x + 1] && !grid[y - 1][x].hasCollider && !grid[y][x + 1].hasCollider) {
            if (!grid[y - 1][x + 1].hasCollider) neighbors.push(grid[y - 1][x + 1]); // Noreste
        }
        if (grid[y + 1] && grid[y][x - 1] && !grid[y + 1][x].hasCollider && !grid[y][x - 1].hasCollider) {
            if (!grid[y + 1][x - 1].hasCollider) neighbors.push(grid[y + 1][x - 1]); // Suroeste
        }
        if (grid[y + 1] && grid[y][x + 1] && !grid[y + 1][x].hasCollider && !grid[y][x + 1].hasCollider) {
            if (!grid[y + 1][x + 1].hasCollider) neighbors.push(grid[y + 1][x + 1]); // Sureste
        }

        return neighbors;
    }

    heuristic(tileA, tileB) {
        const dx = Math.abs(tileA.gridX - tileB.gridX);
        const dy = Math.abs(tileA.gridY - tileB.gridY);
        return Math.max(dx, dy);

    }
    distance(tileA, tileB) {
        const dx = Math.abs(tileA.x - tileB.x);
        const dy = Math.abs(tileA.y - tileB.y);

        // Si es un movimiento en diagonal
        if (dx === 1 && dy === 1) {
            return Math.SQRT2;  // √2 ≈ 1.41
        }
        // Si es un movimiento en línea recta
        return 1;
    }

    reconstructPath(tile) {
        const path = [];
        let current = tile;

        while (current) {
            path.push(current);
            current = current.parent;
        }

        return path.reverse(); // Invertir el camino para que vaya del inicio al objetivo
    }
    resetGrid(){
        for (let row of this.grid) {
            for (let tile of row) {
                tile.parent = null; // Eliminar referencias a otros tiles
                tile.g = 0;
                tile.h = 0;
                tile.f = 0;
            }
        }
    }



}
export { AStarAlgorithm }