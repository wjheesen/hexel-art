import * as Vec2 from './struct/vec2'
import * as Point from './struct/point'
import * as Rect from './struct/rect'
import * as Mat2d from './struct/mat2d'

/**
 * Helper class for working with vertex data stored in a Float32Array.
 */
export default class VertexBuf extends Vec2.Buf {

    /**
     * Creates an empty VertexBuf with the specified vertex capacity.
     */
    static create(capacity: number) {
        return new VertexBuf(new Float32Array(capacity * 2));
    }

    /**
      * Calculates the boundaries of this vertex buffer, that is, the smallest possible rectangle containing all the specified vertices in this array.
      * @param offset the offset of the first vertex to include in the calculation.
      * @param count the number of vertices to include in the calculation. 
      */
    calculateBounds(offset = 0, count = this.capacity()) {
        return Rect.Obj.unionOfPoints$(this.data, offset * this.structLength(), count);
    }

    /**
     * Checks if the specified vertices in this polygon contain the specified point.
     * @param pt the point to check. 
     * @param offset the offset of the first vertex.
     * @param count the number of vertices to include.
     */
    contains(pt: Point._, offset = 0, count = this.capacity()) {
        return this.contains$(pt.x, pt.y, offset, count);
    }

    /**
     * Checks if the specified vertices in this array contain the specified point.
     * @param x the x coordinate of the point to check.
     * @param y the y coordinate of the point to check.
     * @param offset the offset of the first vertex.
     * @param count the number of vertices to include.
     */
    contains$(x: number, y: number, offset = 0, count = this.capacity()) {
        //Assume the point is not inside the subset
        let inside = false;

        this.forEachEdge((x1, y1, x2, y2) => {
            if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) {
                inside = !inside;
            }
        }, offset, count);

        return inside;
    }

    /**
     * Offsets the specified vertices in this buffer by the specified vector.
     * @param offset the offset of the first vertex.
     * @param count the number of vertices to include.
     */
    offset(vec: Vec2._, offset = 0, count = this.capacity()) {
        this.offset$(vec.x, vec.y, offset, count);
    }

    /**
     * Offsets the specified vertices in this buffer by the vector (dx,dy).
     * @param offset the offset of the first vertex.
     * @param count the number of vertices to include.
     */
    offset$(dx: number, dy: number, offset = 0, count = this.capacity()) {
        //Compute the data index of the first point in the subset
        let dataIndex = offset * this.structLength();
        //Offset each of the points in the subset
        for (let i = 0; i <= count; i++) {
            this.data[dataIndex++] += dx;
            this.data[dataIndex++] += dy;
        }
    }

    /**
     * Transforms the specified vertices in this buffer by the specified matrix.
     * @param matrix the transformation matrix.
     * @param offset the offset of the first vertex.
     * @param count the number of vertices to include.
     */
    transform(matrix: Mat2d._, offset = 0, count = this.capacity()) {
        let dataOffset = offset * this.structLength();
        Mat2d.mapPoints(matrix, this.data, dataOffset, count, this.data, dataOffset);
    }

    /**
     * Invokes the callback function on each of the specified edges of this polygon. 
     * @param callback the callback function.
     * @param offset the offset of the first edge.
     * @param count the number of edges to include. 
     */
    forEachEdge(callback: (x1: number, y1: number, x2: number, y2: number) => void, offset = 0, count = this.capacity()) {
        let data = this.data,
            attribLength = this.structLength(),
            dataIndex = attribLength * offset,
            stoppingIndex = attribLength * (offset + count),
            startX = data[stoppingIndex - 2],
            startY = data[stoppingIndex - 1],
            endX = 0,
            endY = 0;

        while (dataIndex < stoppingIndex) {
            endX = data[dataIndex++];
            endY = data[dataIndex++];
            callback(startX, startY, endX, endY);
            startX = endX;
            startY = endY;
        }
    }
}