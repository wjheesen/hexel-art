import * as Point from './struct/point';
import * as Rect from './struct/rect';

/**
 * Ellipse with semi axes (rx,ry) centered at the point (cx,cy).
 */
export class Ellipse {
    /**
     * The semi x axis of this ellipse, that is, the distance from the center of this ellipse to its left and right vertices.
     */
    rx: number;
    /**
     * The semi y axis of this ellipse, that is, the distance from the center of this ellipse to its top and bottom vertices.
     */
    ry: number;
    /**
     * The X coordinate of the point at the center of this ellipse.
     */
    cx: number;
    /**
     * The Y coordinate of the point at the center of this ellipse.
     */
    cy: number;

    /**
     * Creates an ellipse with semi axes (rx,ry) and center point (cx,cy).
     */
    constructor(rx: number, ry: number, cx: number, cy: number) {
        this.rx = rx;
        this.ry = ry;
        this.cx = cx;
        this.cy = cy;
    }

    /**
     * Creates an ellipse with the speicified boundaries.
     * @param rect the boundaries of the ellipse.
     * @returns the new ellipse.
     */
    static withBoundaries(bounds: Rect._) {
        let rx = Rect.width(bounds) / 2;
        let ry = Rect.height(bounds) / 2;
        let cx = Rect.centerX(bounds);
        let cy = Rect.centerY(bounds);
        return new Ellipse(rx, ry, cx, cy);
    }

    /**
     * Checks if this ellipse contains the specified point.
     * @param pt the point to check.
     */
    contains(ellipse: Ellipse, pt: Point._) {
        return this.contains$(pt.x, pt.y);
    }

    /**
     * Checks if this ellipse contains the point (x,y).
     * @param x the x coordinate of the point.
     * @param y the y coordinate of the point.
     */
    contains$(x: number, y: number) {
        // Compute vector <dx,dy> from point to center of ellipse
        let dx = this.cx - x;
        let dy = this.cy - y;
        // Normalize vector according to semi x and semi y axes
        let sx = dx / this.rx;
        let sy = dy / this.ry;
        // At this point we've reduced the problem to point in circle:
        return (sx * sx) + (sy * sy) <= 1;
    }
}








