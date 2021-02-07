import { Cube, Directions } from './cube';
import { BinaryImage, createBitArray } from '../graphics/bit'      
import { Shape } from '../graphics/shape'
import { Ellipse } from '../graphics/ellipse'
import { Color, ColorBuffer, LineSegment, Point, Rect, Vec2Buffer } from '@wjheesen/glib';


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

/** A rectangular hexagon grid */
export class HexelGrid {

    /** How many rows this grid has. */
    public rows: number;

    /** How many columns this grad has. */
    public cols: number;

    /** The boundaries of this grid in world space. */
    public readonly bounds: Rect;

    /** The color of each of the hexagons on this grid, beginning at the first row and first column. */
    public hexels: ColorBuffer<Uint8ClampedArray>;

    /** Whether or not this grid has a gradient. */
    public hasGradient = true;

    /**
     * Creates a new hexagon grid with specified number of rows and columns.
     * @param cols how many columns the grid should have.
     * @param rows how many rows the grid should have.
     * @param hexels the color of each of the hexagons.
     */
    constructor(cols: number, rows: number, hexels = new ColorBuffer(new Uint8ClampedArray(4*cols*rows))) {
        this.cols = cols;
        this.rows = rows;
        this.hexels = hexels;
        // Compute bounds, with first hexel centered at (0, height)
        let width = H_WIDTH * (cols + 0.5);
        let height = H_HEIGHT * (rows * 0.75 + 0.25);
        let left = -H_WIDTH / 2;         // Left side of first hexel
        let top = height + H_HEIGHT / 2; // Top of first hexel
        this.bounds = Rect.dimensions(left, top, width, height);
    }

    /**
     * Gets the cubic coordinate of the specified hexel.
     * @param index the index of the hexel on this grid, where 0 <= index < this.size.
     */
    cubeAtIndex(index: number, out = new Cube) {
        // Ex: index = 14 on 8x4 grid
        let r = (index / this.cols) >> 0;       // 14/8 = 1
        let q = (index % this.cols) - (r >> 1); // 14%8 - 1/2 = 5
        return Cube.create(q, r, out);
    }

    /**
     * Gets the point at the center of the specified hexel.
     * @param index the index of the hexel on this grid.
     */
    pointAtIndex(index: number, pout = <Point.Like> {}, cout = new Cube) {
        return this.pointAtCube(this.cubeAtIndex(index, cout), pout);
    }

    /**
     * Finds the index of the hexel containing the specified point, or -1 if none found.
     * @param p a point in this grid's model space.
     */
    indexAtPoint(p: Point.Like) {
        // Convert point to fractal cubic coordinates
        let cube = this.cubeAtPoint(p).round();
        // Search for the index of the corresponding hexel
        return this.indexAtCube(cube);
    }

    /**
     * Finds the index of a cubic coordinate on this grid, or -1 if this grid does not contain the coordinate.
     * @param c the cubic coordinates to search for.
     */
    indexAtCube(c: Cube) {
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
     * Converts a hex to a point in this grid's model space.
     * @param h the cubic position of a hexagon on the grid.
     */
    pointAtCube(h: Cube, out = <Point.Like> {}) {
        // Map to grid space
        out.x = H_WIDTH *  (h.q + h.r / 2); 
        out.y = H_HEIGHT * (h.r * 0.75);
        // Map to world space by flipping Y axis
        out.y = this.bounds.height - out.y; 
        return out;
    }

    /**
      * Converts a point in world space to a cubic coordinate in grid space. 
      * @param p a point in world space.
      */
    cubeAtPoint(p: Point.Like, out = new Cube) {
        // Map to grid space
        let x = p.x;
        let y = this.bounds.height - p.y; 
        // Map to cubic space
        let q = (H_WIDTH * x - y) / 3;
        let r = (H_HEIGHT * y) / 3;
        // Return unrounded cube
        return Cube.create(q, r, out);
    }

    /*** Gets the point at the center of each hexel on this grid. */
    points() { 
        let cube = new Cube;
        let points = Vec2Buffer.withLength(this.hexels.length);
        for (let i = 0; i < this.hexels.length; i++) {
            this.pointAtIndex(i, points.at(i), cube);
        }
        return points;
    }

    /**
     * Invokes the callback function on the cubic coordinate of each of the hexels on this grid.
     * @param callback the callback function. 
     */
    forEachCubicCoordinate(callback: (c: Cube) => void) {
        for (let r = 0; r < this.rows; r++) {
            let r_offset = r >> 1; // or Math.floor(r/2)
            for (let q = -r_offset; q < this.cols - r_offset; q++) {
                callback(new Cube(q, r));
            }
        }
    }

    /**
     * Invokes the callback function on the offset coordinate of each of the hexels on this grid.
     * @param callback the callback function. 
     */
    forEachOffsetCoordinate(callback: (c: Point.Like) => void) {
        // TODO: try reusing Float32Array?
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                callback({x: x, y: y});
            }
        }
    }

    /**
     * Sets each of the hexels in this grid to the specified clear color.
     * @param color the clear color.
     */
    clear(color: Color.Like) {
        for (let i = 0; i < this.hexels.length; i++) {
            Color.copy(color, this.hexels.at(i));
        }
    }

    /**
     * Maps data from a binary image onto this grid.
     * @param img the image to map onto this grid.
     */
    addBinaryImage(img: BinaryImage) {
        // if (img.color.isOpaque()) {
        //     img.forEachSetBit(this.cols, (index) => {
        //         if (this.hexels.moveToPosition(index)) {
        //             this.hexels.$set(img.color);
        //         }
        //     })
        // } else {
        //     img.forEachSetBit(this.cols, (index) => {
        //         if (this.hexels.moveToPosition(index)) {
        //             this.hexels.$blend(img.color);
        //         }
        //     })
        // }
    }

    /**
     * Sets the color of each of the hexels in the specified line.
     * @param line containing the hexels to set.
     * @param thickness the thickness of the line in world space.
     * @param color the color to use.
     * @returns a record of every hexel that was changed.
     */
    addLine(line: LineSegment, thickness: number, color: Color.Like, record = this.bitArray()) {
        // let radius = thickness * 0.5;

        // this.forEachCenterVertex((x, y, i) => {
        //     if (Line.contains$(line, x, y, radius) && this.hexels.moveToPosition(i)) {
        //         this.hexels.$blend(color);
        //         record.set(i);
        //     }
        // });

        // return record;
    }

    /**
     * Sets the color of each of the hexels in the specified ellipse
     * @param ellipse the ellipse containing the hexels to set.
     * @param color the color to use.
     * @returns a record of every hexel that was changed.
     */
    addEllipse(ellipse: Ellipse, color: Color.Like, record = this.bitArray()) {

        // this.forEachCenterVertex((x, y, i) => {
        //     if (ellipse.contains$(x, y) && this.hexels.moveToPosition(i)) {
        //         this.hexels.$blend(color);
        //         record.set(i);
        //     }
        // });

        // return record;
    }

    /**
     * Sets the color of each of the hexels in the specified shape.
     * @param shape the shape containing the hexels to set.
     * @param color the color to use.
     * @returns a record of every hexel that was changed.
     */
    addShape(shape: Shape, color: Color.Like, record = this.bitArray()) {

        // this.forEachCenterVertex((x, y, i) => {
        //     if (shape.contains$(x, y) && this.hexels.moveToPosition(i)) {
        //         this.hexels.$blend(color);
        //         record.set(i); 
        //     }
        // });

        // return record;
    }

    /**
     * Sets the color of each of the hexels within the specified hexagon
     * @param center the cubic coordinate of the hexel at the center of the hexagon.
     * @param radius the radius of the hexagon out from the center.
     * @param color the color to use.
     * @param record where to keep a record of changes.
     * @returns a record of every hexel that was changed.
     */
    beginStroke(center: Cube, radius: number, color: Color.Like, record = this.bitArray()) {

        // this.forEachHexelInRange(center, radius, (index) => {
        //     if (this.hexels.moveToPosition(index)) {
        //         this.hexels.$blend(color);
        //         record.set(index);
        //     }
        // })

        // return record;
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
    continueStroke(start: Cube, end: Cube, radius: number, color: Color.Like, record = this.bitArray()) {
        
        let last = start

        this.forEachCubeInLine(start, end, (c) => {
            this.appendHexagon(last, c, radius, color, record);
            last = c;
        });

        return record;
    }

    appendHexagon(last: Cube, center: Cube, radius: number, color: Color.Like, record = this.bitArray()) {
        // if (radius === 0) {
        //     // Check center
        //     let index = this.indexOfCube(center);
        //     if (index !== -1 && !record.get(index) && this.hexels.moveToPosition(index)) {
        //         this.hexels.$blend(color);
        //         record.set(index);
        //     }
        // } else {
        //     // Get index d of direction(last, center)
        //     const d = last.getDirection(center);
        //     // Return if center is not a neighbor
        //     if (d === -1) return;
        //     // Move to first cube on outer ring:
        //     // cube = center + radius * direction(d > 0 ? d - 1 : 5) //(CW 1)
        //     let cube = new Cube();
        //     cube.add(Directions[d > 0 ? d - 1 : 5]); 
        //     cube.scale(radius)
        //     cube.add(center);
        //     // Check initial cube
        //     let index = this.indexOfCube(cube);
        //     if (index !== -1 && !record.get(index) && this.hexels.moveToPosition(index)) {
        //         this.hexels.$blend(color);
        //         record.set(index);
        //     }
        //     // for each d+1 ≤ i < d+3: (CCW 1)
        //     for (let i = d + 1; i < d + 3; i++) {
        //         for (let j = 0; j < radius; j++) {
        //             // Set cube to neighbor 
        //             cube.getNeighbor(i % 6, cube) 
        //             // Check cube
        //             let index = this.indexOfCube(cube);
        //             if (index !== -1 && !record.get(index) && this.hexels.moveToPosition(index)) {
        //                 this.hexels.$blend(color);
        //                 record.set(index);
        //             }
        //         }
        //     }
        // }
    }

    /**
     * Invokes the specified callback function on each of the hexels within a specified range.
     * @param center the cubic coordinate of the hexel at the center of the range
     * @param radius the radius of the range out from the center.
     * @param callback the callback to invoke with the index of each hexel.
     */
    forEachHexelInRange(center: Cube, radius: number, callback: (index: number) => void) {
        let cube = new Cube();
        // Moving from left to right
        for (let q = -radius; q <= radius; q++) {
            let lower = Math.max(-radius, -q - radius);
            let upper = Math.min(radius, -q + radius);
            cube.q = center.q + q;
            // And from bottom to top
            for (let r = lower; r <= upper; r++) {
                cube.r = center.r + r;
                // If grid contains hexel at this coordinate
                let index = this.indexAtCube(cube);
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
    forEachHexelInRing(center: Cube, radius: number, callback: (index: number) => void) {

        if (radius === 0) {
            // Check center
            let index = this.indexAtCube(center);
            if (index !== -1) {
                callback(index);
            }
        } else {
            // Move to first cube on outer ring:
            // cube = center + radius * direction 
            let cube = new Cube();
            cube.add(Directions[4]);
            cube.scale(radius)
            cube.add(center);
            // for each 0 ≤ i < 6: (CCW)
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < radius; j++) {
                    // Check cube
                    let index = this.indexAtCube(cube);
                    if (index !== -1) {
                        callback(index);
                    }
                    // Set cube to neighbor 
                    cube.getNeighbor(i, cube)
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
    forEachCubeInLine(start: Cube, end: Cube, callback: (c: Cube) => void) {
        // Paramaterize line to start + bt, 0<=t<=1
        let b = new Cube(end.q - start.q, end.r - start.r);
        // Compute length of line (in terms of cubes traversed)
        let length = Cube.distance(b, new Cube);
        // Determine the length of each step
        let step = 1.0 / Math.max(length, 1);
        // Get cube at each step of line
        for (let i = 0; i <= length; i++) {
            let t = step * i;
            let c = new Cube();
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
    floodFill(index: number, color: Color.Like, record = this.bitArray()) {
        // if (this.hexels.moveToPosition(index)) {
        //     // Blend the color with the background hexel color
        //     let background = this.hexels;
        //     let blendedColor = new Color.Obj();
        //     blendedColor.set(background);
        //     blendedColor.blend(color);
        //     // If the two colors are not already equal
        //     if (!blendedColor.equals(background)) {
        //         // Begin floodfill scanline algorithm
        //         return this.floodFillScanLine(index, blendedColor.toRgbaInt(), background.$toRgbaInt(), record);
        //     } 
        // }

        // return record;
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

        // // Init variables
        // let row: number,
        //     rowAbove: number,
        //     rowBelow: number,
        //     spanAbove: boolean,
        //     spanBelow: boolean,
        //     w = this.cols,
        //     h = this.rows,
        //     colors = this.hexels.data,
        //     stack: Point.Like[] = [],
        //     seed = this.offsetAt(index),
        //     x: number, y: number;

        // // Add initial seed to stack
        // stack.push(seed);

        // // As long as the stack is not empty
        // while (stack.length > 0) {  
        //     // Get the next seed from stack
        //     seed = stack.pop();
        //     // Update variables to match seed
        //     x = seed.x;
        //     y = seed.y;
        //     row = y * w;
        //     rowAbove = row - w;
        //     rowBelow = row + w;
        //     spanAbove = false;
        //     spanBelow = false;
        //     // Go as far left as possible
        //     while (x >= 0 && getRgba(colors, x + row) === oldColor) x--;
        //     // HEXEL EDGE CASE: even row
        //     if ((y & 1) == 0 && x >= 0) {
        //         // Check hexel above and to the left (if it exists)
        //         if (y > 0 && getRgba(colors, x + rowAbove) === oldColor) {
        //             stack.push({x: x, y: y - 1});
        //             spanAbove = true;
        //         }
        //         // Check hexel below and to the left (if it exists)
        //         if (y < h - 1 && getRgba(colors, x + rowBelow) === oldColor) {
        //             stack.push({x: x, y: y + 1});
        //             spanBelow = true;
        //         }
        //     }
        //     // Draw current scanline from far left to far right
        //     for (x++; x < w && getRgba(colors, x + row) === oldColor; x++) {
        //         let index = x + row;
        //         setRgba(colors, index, newColor);
        //         record.set(index);
        //         // If there's another row above this one
        //         if (y > 0) {
        //             if (!spanAbove && getRgba(colors, x + rowAbove) === oldColor) {
        //                 stack.push({x: x, y: y - 1});
        //                 spanAbove = true;
        //             }
        //             else if (spanAbove && getRgba(colors, x + rowAbove) !== oldColor) {
        //                 spanAbove = false;
        //             }
        //         }
        //         // If there's another row below this one
        //         if (y < h - 1) {
        //             if (!spanBelow && getRgba(colors, x + rowBelow) === oldColor) {
        //                 stack.push({x: x, y: y + 1});
        //                 spanBelow = true;
        //             }
        //             else if (spanBelow && getRgba(colors, x + rowBelow) !== oldColor) {
        //                 spanBelow = false;
        //             }
        //         }
        //     }
        //     // HEXEL EDGE CASE: odd row
        //     if ((y & 1) && x < w) {
        //         // Check hexel above and to the right (if it exists)
        //         if (!spanAbove && y > 0 && getRgba(colors, x + rowAbove) === oldColor) {
        //             stack.push({x: x, y: y - 1});
        //         }
        //         // Check hexel below and to the right (if it exists)
        //         if (!spanBelow && y < h - 1 && getRgba(colors, x + rowBelow) === oldColor) {
        //             stack.push({x: x, y: y + 1});
        //         }
        //     }
        // }

        // return record;
    }

    private bitArray() {
        return createBitArray(this.hexels.length);
    }
};

export function copyPixelsToGrid(ctx: CanvasRenderingContext2D, {cols, rows, hexels}: HexelGrid) {
    let data = ctx.getImageData(0, 0, cols, rows).data;
    let pixels = new ColorBuffer(data);
    let length = Math.min(pixels.length, hexels.length);
    for (let i = 0; i < length; i++) {
        let pixel = pixels.at(i);
        let hexel = hexels.at(i);
        if (!Color.isTransparent(pixel)) {
            Color.blend(pixel, hexel, hexel);
        }
    }
}

export function copyHexelsToCanvas({cols, rows, hexels}: HexelGrid, clearColor: Color.Like, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    // Convert to pixels
    let pixels = new ColorBuffer(new Uint8ClampedArray(hexels.data.length));
    for (let i = 0; i < hexels.length; i++) {
        let pixel = pixels.at(i);
        let hexel = hexels.at(i);
        if (!Color.equals(hexel, clearColor)) {
            Color.copy(hexel, pixel);
        }
    }
    // Pass pixels as image data to canvas
    let imageData = new ImageData(pixels.data, cols, rows);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
}


