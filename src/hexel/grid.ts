import { Hex, Directions } from './hex';
import { BinaryImage, createBitArray } from '../graphics/bit'      
import { Shape } from '../graphics/shape'
import { Ellipse } from '../graphics/ellipse'
import { getRgba, setRgba } from '../graphics/struct/color'
import * as Color from '../graphics/struct/color'
import * as Line from '../graphics/struct/line'
import * as Point from '../graphics/struct/point'
import * as Rect from '../graphics/struct/rect'


/**
 * The width of a pointy top hexel in model space.
 */
export const H_WIDTH = Math.sqrt(3);

/**
 * The height of a pointy top hexel in model space.
 */
export const H_HEIGHT = 2;

/**
 * The distance from the bottom left corner of a pointy top hexel the nearest vertex on the right.
 */
export const H_RIGHT = H_WIDTH / 2;

/**
 * The distance from the bottom left corner of a pointy top hexel to the nearest vertex above.
 */
export const H_UP = H_HEIGHT / 4;

/**
 * A rectangular hexagon grid model.
 */
export class Grid {

    /**
     * How many rows this grid has.
     */
    public rows: number;

    /**
     * How many columns this grad has.
     */
    public cols: number;

    /**
     * The boundaries of this grid in model space.
     */
    public bounds = new Rect.Obj();

    /**
     * The color of each of the hexagons on this grid, beginning at the first row and first column.
     */
    public hexels: Color.Buf

    /**
     * Whether or not this grid has a gradient.
     */
    public hasGradient = true;

    /**
     * Creates a new hexagon grid with specified number of rows and columns.
     * @param cols how many columns the grid should have.
     * @param rows how many rows the grid should have.
     * @param hexels the color of each of the hexagons.
     */
    constructor(cols: number, rows: number, hexels = Color.Buf.create(cols*rows)) {
        this.cols = cols;
        this.rows = rows;
        this.hexels = hexels;
        // Compute width and height of grid
        let width = H_WIDTH * (this.cols + 0.5);
        let height = H_HEIGHT * (this.rows * 0.75 + 0.25);
        // Compute top  left corner
        // Note: first hexel is centered at (0, height)
        let left = -H_WIDTH / 2;         // Left side of first hexel
        let top = height + H_HEIGHT / 2; // Top of first hexel
        // Compute bounds
        this.bounds.setLtwh(left, top, width, height);
    }

    /**
        * Retrieves the cubic coordinate of the hexel at the specified index of this grid.
        * @param index the index of the hexel on this grid, where 0 <= index < this.size.
        */
    cubeAt(index: number) {
        // Ex: index = 14 on 8x4 grid
        let r = (index / this.cols) >> 0;       // 14/8 = 1
        let q = (index % this.cols) - (r >> 1); // 14%8 - 1/2 = 5
        return new Hex(q, r);
    }

    /**
     * Retrieves the offset coordinate of the hexel at the specified index of this grid.
     * @param index the index of the hexel on this grid, where 0 <= index < this.size.
     */
    offsetAt(index: number) {
        // Ex: index = 14 on 8x4 grid
        let p = new Point.Obj();
        p.y = (index / this.cols) >> 0; // 14/8 = 1 (2nd row)
        p.x = index % this.cols;        // 14%8 = 6 (7th column)
        return p;
    }

    /**
     * Finds the index of the hexel containing the specified point, or -1 if none found.
     * @param p a point in this grid's model space.
     */
    indexOfHexel(p: Point._) {
        // Convert point to fractal cubic coordinates
        let cube = this.pointToHex(p).round();
        // Search for the index of the corresponding hexel
        return this.indexOfCube(cube);
    }

    /**
     * Finds the index of a cubic coordinate on this grid, or -1 if this grid does not contain the coordinate.
     * @param c the cubic coordinates to search for.
     */
    indexOfCube(c: Hex) {
        // If the row is inside this grid
        if (0 <= c.r && c.r < this.rows) {
            // Compute the row offset
            let r_offset = c.r >> 1; // or Math.floor(r/2)
            // If the column is inside this grid
            if (-r_offset <= c.q && c.q < this.cols - r_offset) {
                // Compute the index
                return this.cols * c.r + c.q + r_offset;
            }
        }
        // Not on grid
        return -1;
    }

    /**
     * Finds the index of an offset coordinate on this grid, or -1 if this grid does not contain the coordinate.
     * @param offset the offset coordinate to search for.
     */
    indexOfOffset(o: Point._) {
        // If column and row are valid
        if (0 <= o.x && o.x < this.cols && 0 <= o.y && o.y < this.rows) {
            // Compute the index
            return this.cols * o.y + o.x;
        } else {
            // Not on grid
            return -1;
        }
    }

    /**
     * Converts a hex to a point in this grid's model space.
     * @param h the cubic position of a hexagon on the grid.
     */
    hexToPoint(h: Hex) {
        let p = new Point.Obj();
        // Map to grid space
        p.x = H_WIDTH *  (h.q + h.r / 2); 
        p.y = H_HEIGHT * (h.r * 0.75);
        // Map to world space by flipping Y axis
        p.y = this.bounds.height() - p.y; 
        return p;
    }

    /**
      * Converts a point in world space to a cubic coordinate in grid space. 
      * @param p a point in world space.
      */
    pointToHex(p: Point._) {
        // Map to grid space
        let x = p.x;
        let y = this.bounds.height() - p.y; 
        // Map to cubic space
        let q = (H_WIDTH * x - y) / 3;
        let r = (H_HEIGHT * y) / 3;
        // Return unrounded cube
        return new Hex(q, r);
    }

    /**
     * Invokes the callback function on the center vertex of each of the hexels on this grid.
     * @param callback the callback function.
     * @param count the number of vertices to return through the callback. Defaults to all.
     */
    forEachCenterVertex(callback: (x: number, y: number, index: number) => void, rows = this.rows) {
        // Keep track of hexel index
        let index = 0;
        // Get height of grid
        let height = Rect.height(this.bounds);
        // Moving down each row of hexels
        for (let r = 0; r < rows; r++) {
            // Compute the y coordinate of this row in world space
            let y = height - H_HEIGHT * r * 0.75; 
            // Get left/right column boundaries
            let q_left = (r / 2) - (r >> 1);  // or fract(r/2);
            let q_right = q_left + this.cols;
            // Moving left to right across each of the columns
            for (let q = q_left; q < q_right; q++) {
                // Compute the x coordinate of this column
                let x = H_WIDTH * q;
                // Send result through callback
                callback(x, y, index++);
            }
        }
    }

    /**
     * Invokes the callback function on the cubic coordinate of each of the hexels on this grid.
     * @param callback the callback function. 
     */
    forEachCubicCoordinate(callback: (c: Hex) => void) {
        for (let r = 0; r < this.rows; r++) {
            let r_offset = r >> 1; // or Math.floor(r/2)
            for (let q = -r_offset; q < this.cols - r_offset; q++) {
                callback(new Hex(q, r));
            }
        }
    }

    /**
     * Invokes the callback function on the offset coordinate of each of the hexels on this grid.
     * @param callback the callback function. 
     */
    forEachOffsetCoordinate(callback: (c: Point.Obj) => void) {
        // TODO: try reusing Float32Array?
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                callback(Point.Obj.create$(x, y));
            }
        }
    }

    /**
     * Sets each of the hexels in this grid to the specified clear color.
     * @param color the clear color.
     */
    clear(color: Color.Struct) {
        this.hexels.setEach(color);
    }

    /**
     * Maps data from a binary image onto this grid.
     * @param img the image to map onto this grid.
     */
    addBinaryImage(img: BinaryImage) {
        if (img.color.isOpaque()) {
            img.forEachSetBit(this.cols, (index) => {
                if (this.hexels.moveToPosition(index)) {
                    this.hexels.$set(img.color);
                }
            })
        } else {
            img.forEachSetBit(this.cols, (index) => {
                if (this.hexels.moveToPosition(index)) {
                    this.hexels.$blend(img.color);
                }
            })
        }
    }

    /**
     * Sets the color of each of the hexels in the specified line.
     * @param line containing the hexels to set.
     * @param thickness the thickness of the line in world space.
     * @param color the color to use.
     * @returns a record of every hexel that was changed.
     */
    addLine(line: Line._, thickness: number, color: Color.Struct, record = this.bitArray()) {
        let radius = thickness * 0.5;

        this.forEachCenterVertex((x, y, i) => {
            if (Line.contains$(line, x, y, radius) && this.hexels.moveToPosition(i)) {
                this.hexels.$blend(color);
                record.set(i);
            }
        });

        return record;
    }

    /**
     * Sets the color of each of the hexels in the specified ellipse
     * @param ellipse the ellipse containing the hexels to set.
     * @param color the color to use.
     * @returns a record of every hexel that was changed.
     */
    addEllipse(ellipse: Ellipse, color: Color.Struct, record = this.bitArray()) {

        this.forEachCenterVertex((x, y, i) => {
            if (ellipse.contains$(x, y) && this.hexels.moveToPosition(i)) {
                this.hexels.$blend(color);
                record.set(i);
            }
        });

        return record;
    }

    /**
     * Sets the color of each of the hexels in the specified shape.
     * @param shape the shape containing the hexels to set.
     * @param color the color to use.
     * @returns a record of every hexel that was changed.
     */
    addShape(shape: Shape, color: Color.Struct, record = this.bitArray()) {

        this.forEachCenterVertex((x, y, i) => {
            if (shape.contains$(x, y) && this.hexels.moveToPosition(i)) {
                this.hexels.$blend(color);
                record.set(i); 
            }
        });

        return record;
    }

    /**
     * Sets the color of each of the hexels within the specified hexagon
     * @param center the cubic coordinate of the hexel at the center of the hexagon.
     * @param radius the radius of the hexagon out from the center.
     * @param color the color to use.
     * @param record where to keep a record of changes.
     * @returns a record of every hexel that was changed.
     */
    beginStroke(center: Hex, radius: number, color: Color.Struct, record = this.bitArray()) {

        this.forEachHexelInRange(center, radius, (index) => {
            if (this.hexels.moveToPosition(index)) {
                this.hexels.$blend(color);
                record.set(index);
            }
        })

        return record;
    }

    /**
     * Sets the color of each of the hexels in the specified stroke.
     * @param start the cubic coordinate of the hexel where the stroke begins.
     * @param end the cubic coordinate of the hexel where the stroke ends.
     * @param radius radius of stroke, measured in hexels.
     * @param color the color to use.
     * @param record where to keep a record of changes.
     * @returns a record of every hexel that was changed.
     */
    continueStroke(start: Hex, end: Hex, radius: number, color: Color.Struct, record = this.bitArray()) {
        
        let last = start

        this.forEachCubeInLine(start, end, (c) => {
            this.appendHexagon(last, c, radius, color, record);
            last = c;
        });

        return record;
    }

    appendHexagon(last: Hex, center: Hex, radius: number, color: Color.Struct, record = this.bitArray()) {
        if (radius === 0) {
            // Check center
            let index = this.indexOfCube(center);
            if (index !== -1 && !record.get(index) && this.hexels.moveToPosition(index)) {
                this.hexels.$blend(color);
                record.set(index);
            }
        } else {
            // Get index d of direction(last, center)
            const d = last.directionToNeighbor(center);
            // Return if center is not a neighbor
            if (d === -1) return;
            // Move to first cube on outer ring:
            // cube = center + radius * direction(d > 0 ? d - 1 : 5) //(CW 1)
            let cube = new Hex();
            cube.add(Directions[d > 0 ? d - 1 : 5]); 
            cube.mulScalar(radius)
            cube.add(center);
            // Check initial cube
            let index = this.indexOfCube(cube);
            if (index !== -1 && !record.get(index) && this.hexels.moveToPosition(index)) {
                this.hexels.$blend(color);
                record.set(index);
            }
            // for each d+1 ≤ i < d+3: (CCW 1)
            for (let i = d + 1; i < d + 3; i++) {
                for (let j = 0; j < radius; j++) {
                    // Set cube to neighbor 
                    cube.neighbor(i % 6, cube) 
                    // Check cube
                    let index = this.indexOfCube(cube);
                    if (index !== -1 && !record.get(index) && this.hexels.moveToPosition(index)) {
                        this.hexels.$blend(color);
                        record.set(index);
                    }
                }
            }
        }
    }

    /**
     * Invokes the specified callback function on each of the hexels within a specified range.
     * @param center the cubic coordinate of the hexel at the center of the range
     * @param radius the radius of the range out from the center.
     * @param callback the callback to invoke with the index of each hexel.
     */
    forEachHexelInRange(center: Hex, radius: number, callback: (index: number) => void) {
        let cube = new Hex();
        // Moving from left to right
        for (let q = -radius; q <= radius; q++) {
            let lower = Math.max(-radius, -q - radius);
            let upper = Math.min(radius, -q + radius);
            cube.q = center.q + q;
            // And from bottom to top
            for (let r = lower; r <= upper; r++) {
                cube.r = center.r + r;
                // If grid contains hexel at this coordinate
                let index = this.indexOfCube(cube);
                if (index !== -1) {
                    // Invoke callback on hexel index
                    callback(index);
                }
            }
        }
    }

    /**
     * Invokes the specified callback function on each of the hexels within a specified ring.
     * @param center the cubic coordinate of the hexel at the center of the range
     * @param radius the distance of the ring from the center.
     * @param callback the callback to invoke with the index of each hexel.
     */
    forEachHexelInRing(center: Hex, radius: number, callback: (index: number) => void) {

        if (radius === 0) {
            // Check center
            let index = this.indexOfCube(center);
            if (index !== -1) {
                callback(index);
            }
        } else {
            // Move to first cube on outer ring:
            // cube = center + radius * direction 
            let cube = new Hex();
            cube.add(Directions[4]);
            cube.mulScalar(radius)
            cube.add(center);
            // for each 0 ≤ i < 6: (CCW)
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < radius; j++) {
                    // Check cube
                    let index = this.indexOfCube(cube);
                    if (index !== -1) {
                        callback(index);
                    }
                    // Set cube to neighbor 
                    cube.neighbor(i, cube)
                }
            }
        }
    }

    /**
     * Invokes the callback function on each of the cubic coordinates of the specified line.
     * @param start rounded cubic point where line begins.
     * @param end rounded cubic point where line ends.
     * @param callback the callback function.
     */
    forEachCubeInLine(start: Hex, end: Hex, callback: (c: Hex) => void) {
        // Paramaterize line to start + bt, 0<=t<=1
        let b = new Hex(end.q - start.q, end.r - start.r);
        // Compute length of line (in terms of cubes traversed)
        let length = b.distanceToOrigin();
        // Determine the length of each step
        let step = 1.0 / Math.max(length, 1);
        // Get cube at each step of line
        for (let i = 0; i <= length; i++) {
            let t = step * i;
            let c = new Hex();
            c.q = start.q + b.q * t;
            c.r = start.r + b.r * t;
            c.s = start.s + b.s * t;
            callback(c.round());
        }
    }

    /**
     * Applies a scanline flood fill algorithm to this grid, beginning with the hexel at the specified index.
     * @param index index of where to begin flood fill.
     * @param color the flood fill color.
     * @param record where to keep a record of changes.
     * @returns a record of every hexel that was changed.
     */
    floodFill(index: number, color: Color.Struct, record = this.bitArray()) {
        if (this.hexels.moveToPosition(index)) {
            // Blend the color with the background hexel color
            let background = this.hexels;
            let blendedColor = new Color.Obj();
            blendedColor.set(background);
            blendedColor.blend(color);
            // If the two colors are not already equal
            if (!blendedColor.equals(background)) {
                // Begin floodfill scanline algorithm
                return this.floodFillScanLine(index, blendedColor.toRgbaInt(), background.$toRgbaInt(), record);
            } 
        }

        return record;
    }

    /**
     * Non-recursive floodfill scanline algorithm.
     * @param index index of where to begin flood fill.
     * @param newColor flood fill color of the form 0xrrggbbaa.
     * @param oldColor pre flood fill color of the form 0xrrggbbaa.
     * @param record where to keep a record of changes.
     * @returns a record of every hexel that was changed.
     */
    private floodFillScanLine(index: number, newColor: number, oldColor: number, record = this.bitArray()) {

        // Init variables
        let row: number,
            rowAbove: number,
            rowBelow: number,
            spanAbove: boolean,
            spanBelow: boolean,
            w = this.cols,
            h = this.rows,
            colors = this.hexels.data,
            stack: Point.Obj[] = [],
            seed = this.offsetAt(index),
            x: number, y: number;

        // Add initial seed to stack
        stack.push(seed);

        // As long as the stack is not empty
        while (stack.length > 0) {  
            // Get the next seed from stack
            seed = stack.pop();
            // Update variables to match seed
            x = seed.x;
            y = seed.y;
            row = y * w;
            rowAbove = row - w;
            rowBelow = row + w;
            spanAbove = false;
            spanBelow = false;
            // Go as far left as possible
            while (x >= 0 && getRgba(colors, x + row) === oldColor) x--;
            // HEXEL EDGE CASE: even row
            if ((y & 1) == 0 && x >= 0) {
                // Check hexel above and to the left (if it exists)
                if (y > 0 && getRgba(colors, x + rowAbove) === oldColor) {
                    stack.push(Point.Obj.create$(x, y - 1));
                    spanAbove = true;
                }
                // Check hexel below and to the left (if it exists)
                if (y < h - 1 && getRgba(colors, x + rowBelow) === oldColor) {
                    stack.push(Point.Obj.create$(x, y + 1));
                    spanBelow = true;
                }
            }
            // Draw current scanline from far left to far right
            for (x++; x < w && getRgba(colors, x + row) === oldColor; x++) {
                let index = x + row;
                setRgba(colors, index, newColor);
                record.set(index);
                // If there's another row above this one
                if (y > 0) {
                    if (!spanAbove && getRgba(colors, x + rowAbove) === oldColor) {
                        stack.push(Point.Obj.create$(x, y - 1));
                        spanAbove = true;
                    }
                    else if (spanAbove && getRgba(colors, x + rowAbove) !== oldColor) {
                        spanAbove = false;
                    }
                }
                // If there's another row below this one
                if (y < h - 1) {
                    if (!spanBelow && getRgba(colors, x + rowBelow) === oldColor) {
                        stack.push(Point.Obj.create$(x, y + 1));
                        spanBelow = true;
                    }
                    else if (spanBelow && getRgba(colors, x + rowBelow) !== oldColor) {
                        spanBelow = false;
                    }
                }
            }
            // HEXEL EDGE CASE: odd row
            if ((y & 1) && x < w) {
                // Check hexel above and to the right (if it exists)
                if (!spanAbove && y > 0 && getRgba(colors, x + rowAbove) === oldColor) {
                    stack.push(Point.Obj.create$(x, y - 1));
                }
                // Check hexel below and to the right (if it exists)
                if (!spanBelow && y < h - 1 && getRgba(colors, x + rowBelow) === oldColor) {
                    stack.push(Point.Obj.create$(x, y + 1));
                }
            }
        }

        return record;
    }

    private bitArray() {
        return createBitArray(this.hexels.capacity());
    }
};

export function copyPixelsToGrid(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, grid: Grid) {
    // Extract pixel data 
    let data = ctx.getImageData(0, 0, grid.cols, grid.rows).data;
    let pixels = new Color.Buf(data);
    // Prepare hexel buffer
    let dst = grid.hexels;
    dst.moveToFirst();
    // Iterate over each of the pixels
    do {
        if (!pixels.$isTransparent()) {
            dst.$blend(pixels);
        } 
    } while (pixels.moveToNext() && dst.moveToNext()) 
}

export function copyHexelsToCanvas(grid: Grid, clearColor: Color.Struct, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    // Create buffer same size as the grid hexel buffer
    let src = grid.hexels; 
    src.moveToFirst();
    let dst = Color.Buf.create(src.capacity());
    // Iterate over each of the pixels
    do {
        if (!src.$equals(clearColor)) {
            dst.$set(src);
        }
    } while (src.moveToNext() && dst.moveToNext()) 
    // Pass dst as image data to canvas
    let data = new Uint8ClampedArray(dst.data.buffer);
    let imageData = new ImageData(data, grid.cols, grid.rows);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
}


