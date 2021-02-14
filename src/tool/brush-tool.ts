import { Color, Point, Pointer, PointerEventListener } from "@wjheesen/glib";
import { Cube, Directions } from "../hexel/cube";
import { HexelGrid } from "../hexel/hexel-grid";
import { Settings } from "../toolbar/settings";

/** TODO: add support for undo/redo */
export class BrushTool extends PointerEventListener {

    private previous: Cube;

    constructor(private grid: HexelGrid, private settings: Settings) { 
        super(); 
    }

    wherePointer(p: Pointer) {
        return p.isDown && p.activePointers.length === 1;
    }

    onPointerDown(p: Pointer) {
        let cube = this.grid.cubeAtPoint(p.position).round();
        let index = this.grid.indexAtCube(cube);
        if (index !== -1) { 
            this.moveTo(cube);
            this.previous = cube;
            this.grid.hasHexelChanges = true;
        }
    }

    private moveTo(start: Cube) {
        this.grid.forEachHexelInRange(start, this.settings.brushRadius, hexel => {
            Color.blend(this.settings.color, hexel, hexel);
            this.grid.hasHexelChanges = true;
        });
    }

    onPointerMove(p: Pointer) {
        if (!this.previous) {
            return this.onPointerDown(p);
        }

        let current = this.grid.cubeAtPoint(p.position).round();
        if (!current.equals(this.previous)) {
            this.lineTo(current);
            this.previous = current;
            this.grid.hasHexelChanges = true;
        } 
    }

    private lineTo(end: Cube) {
        this.grid.forEachCubeInLine(this.previous, end, c => {
            this.appendHexagon(this.previous, c);
            this.previous = c;
        });
    }

    private appendHexagon(last: Cube, center: Cube) {
        let radius = this.settings.brushRadius;
        if (radius === 0) {
            // Check center
            let index = this.grid.indexAtCube(center);
            if (index !== -1 /* && !record.get(index) */) {
                let hexel = this.grid.hexels.at(index);
                Color.blend(this.settings.color, hexel, hexel);
                // record.set(index);
            }
        } else {
            // Get index d of direction(last, center)
            const d = last.getDirection(center);
            // Return if center is not a neighbor
            if (d === -1) { 
                return; 
            }
            // Move to first cube on outer ring:
            // cube = center + radius * direction(d > 0 ? d - 1 : 5) //(CW 1)
            let cube = new Cube();
            cube.add(Directions[d > 0 ? d - 1 : 5]); 
            cube.scale(radius)
            cube.add(center);
            // Check initial cube
            let index = this.grid.indexAtCube(cube);
            if (index !== -1  /* && !record.get(index) && this.hexels.moveToPosition(index) */) {
                let hexel = this.grid.hexels.at(index);
                Color.blend(this.settings.color, hexel, hexel);
            }
            // for each d+1 ≤ i < d+3: (CCW 1)
            for (let i = d + 1; i < d + 3; i++) {
                for (let j = 0; j < radius; j++) {
                    // Set cube to neighbor 
                    cube.getNeighbor(i % 6, cube) 
                    // Check cube
                    let index = this.grid.indexAtCube(cube);
                    if (index !== -1 /* && !record.get(index) && this.hexels.moveToPosition(index) */) {
                        let hexel = this.grid.hexels.at(index);
                        Color.blend(this.settings.color, hexel, hexel);
                        // record.set(index);
                    }
                }
            }
        }
    }

    onPointerUp() {
        // Add record to undo stack
        // if(this.record) addToUndoStack(this.record);
        // Release hold on previous point
        this.previous = null;
        // Release hold on record
        // this.record = null
    }
}
