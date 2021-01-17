import * as Point from './struct/point';
import * as Vec2 from './struct/vec2'
import * as Rect from './struct/rect';
import * as Mat2d from './struct/mat2d';
import ScaleToFit from './scaletofit'
import { Model } from './model';

/**
 * Shape determined by matrix transformation of a mesh.
 */
export class Shape {

    /**
     * Contains the static polygon data for this shape.
     */
    public model: Model;

    /**
     * This shape's model matrix. Transforms model coordinates to world coordinates.
     */
    public matrix: Mat2d.Struct;

    /**
     * The inverse of this shape's model matrix. Cached for performance.
     */
    public inverse = new Mat2d.Struct();

    /**
     * Creates a shape based on the the specified mesh.
     * @param mesh the static polygon data for this shape.
     * @param matrix matrix transformation of the polygon. Defaults to identity.
     */
    constructor(mesh: Model, matrix?: Mat2d.Struct) {
        this.model = mesh;
        if (matrix) {
            this.matrix = matrix;
            this.inverse.set(matrix);
            this.inverse.invert();
        } else {
            this.matrix = Mat2d.Struct.identity();
            this.inverse = Mat2d.Struct.identity();
        }
    }

    /**
     * Checks if this shape contains the point (x,y).
     * @param point the point to check.
     */
    contains(pt: Point._) {
        return this.contains$(pt.x, pt.y);
    }

    /**
     * Checks if this shape contains the point (x,y).
     * @param x the x coordinate of the point to check.
     * @param y the y coordinate of the point to check.
     */
    contains$(x: number, y: number) {
        let modelPoint = new Point.Obj();
        // Convert the point to model space
        this.inverse.map$(x, y, modelPoint) ;
        // Check if this shape's model contains the point
        return this.model.contains(modelPoint);
    }

    /**
     * Offsets this shape by the specified vector.
     */
    offset(vec: Vec2._) {
        this.offset$(vec.x, vec.y);
    }

    /**
     * Offsets this shape by the vector (dx,dy).
     */
    offset$(dx: number, dy: number) {
        this.matrix.postTranslate$(dx, dy);
        this.inverse.postTranslate$(-dx, -dy);
    }

    /**
     * Transforms this shape by the specified matrix.
     * @param matrix the transformation matrix.
     */
    transform(matrix: Mat2d._) {
        this.matrix.postConcat(matrix);
        this.inverse.set(this.matrix);
        this.inverse.invert();
    }

    /**
     * Fits this shape inside dst using the specified scale to fit option.
     * @param dst the destination rectangle.
     * @param stf the scale to fit option.
     */
    fitInRect(dst: Rect._, stf: ScaleToFit) {
        this.matrix.rectToRect(this.model.bounds, dst, stf);
        this.inverse.set(this.matrix);
        this.inverse.invert();
    }

    /**
     * Stretch-rotates this shape across the line from p1 to p2.
     */
    stretchAcrossLine(p1: Point._, p2: Point._) {
        // *Translate from model pivot to shape pivot
        let pivot = p1;
        let vec = Vec2.Obj.fromPointToPoint(this.model.pivot, pivot);
        let start = Vec2.Obj.create(this.model.control); start.add(vec);
        let end = p2;
        // Compute stretch rotation matrix
        this.matrix.setStretchRotateToPoint(start, end, pivot);
        this.matrix.preTranslate(vec); //*
        this.inverse.set(this.matrix);
        this.inverse.invert();
    }
}










