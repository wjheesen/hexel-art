 /**
 * Cubic position (q,r,s) of a hexel, where q+r+s = 0.
 */
export class Hex {

    /**
     * This cube's position on the Q axis.
     */
    public q: number;

    /**
     * This cube's position on the R axis.
     */
    public r: number;

    /**
     * This cube's position on the S axis.
     */
    public s: number;

    /**
     * Creates a cube with the specified coordinates.
     * @param q the position on the Q axis.
     * @param r the position on the R axis.
     * @param s the position on the S axis.
     */
    constructor(q = 0, r = 0, s = -q - r) {
        this.q = q;
        this.r = r;
        this.s = s;
    }

    /**
     * Creates a cube that is a deep copy of src.
     * @param src the cube to copy. 
     */
    static fromCube(src: Hex) {
        return new Hex(src.q, src.r, src.s);
    }

    /**
     * Sets the coordinates of this cube.
     * @param q the position on the Q axis.
     * @param r the position on the R axis.
     * @param s the position on the S axis.
     */
    set(q: number, r: number, s = -q - r) {
        this.q = q;
        this.r = r;
        this.s = s;
    }

    /**
     * Computes the distance from this cube to the other cube, that is, the number of cubes that must be traversed in order to reach the other cube.
     */
    distanceToCube(other: Hex) {
        return Math.max(
            Math.abs(this.q - other.q),
            Math.abs(this.r - other.r),
            Math.abs(this.s - other.s));
    }

    /**
     * Computes the distance from this cube to the origin, that is, the number of cubes that must be traversed in order to reach the origin.
     * @returns {Number} 
     */
    distanceToOrigin() {
        return Math.max(
            Math.abs(this.q),
            Math.abs(this.r),
            Math.abs(this.s));
    }


    /**
     * Finds a cube neighboring this cube, storing the result in dst.
     * @param dir the direction of the neighbor with respect to this cube.
     * @param dst where to store the result. Defaults to new cube.
     */
    neighbor(direction: number, dst = new Hex()) {
        return this.add(Directions[direction], dst);
    }

    /**
     * Finds the direction of a neighboring cube.
     * @param neighbor a cube neighboring this cube.
     * @returns the index of the direction, or -1 if the cube is not a neighbor.
     */
    directionToNeighbor(neighbor: Hex) {
        let diff = neighbor.subtract(this, new Hex());

        for (let i = 0; i < Directions.length; i++) {
            if (Directions[i].equals(diff)) {
                return i;
            }
        }

        return -1; // Not a neighbor
    }

    /**
     * Invokes the specified callback function on each of the neighboring cubes.
     * @param callback the callback function.
     */
    forEachNeighbor(callback: (c: Hex) => void) {
        for (let i = 0; i < Directions.length; i++) {
            callback(this.neighbor(i));
        }
    }

    /**
     * Adds the other cube to this cube componentwise, optionally storing the result in dst.
     * @param other the cube to add.
     * @param dst where to store the result.
     */
    add(other: Hex, dst: Hex = this) {
        dst.q = this.q + other.q;
        dst.r = this.r + other.r;
        dst.s = this.s + other.s;
        return dst;
    }

    /**
     * Subtracts the other cube from this cube componentwise.
     * @param other the cube to subtract.
     * @param dst where to store the result.
     */
    subtract(other: Hex, dst: Hex = this) {
        dst.q = this.q - other.q;
        dst.r = this.r - other.r;
        dst.s = this.s - other.s;
        return dst;
    }

    /**
     * Multiplies each component of this cube by k, optionally storing the result in dst.
     * @param k the scalar.
     * @param dst where to store the result.
     */
    mulScalar(k: number, dst: Hex = this) {
        dst.q = this.q * k;
        dst.r = this.r * k;
        dst.s = this.s * k;
        return dst;
    }

    /**
     * Divides each component of this cube by k, optionally storing the result in dst.
     * @param k the scalar.
     * @param dst where to store the result.
     */
    divScalar(k: number, dst: Hex = this) {
        dst.q = this.q / k;
        dst.r = this.r / k;
        dst.s = this.s / k;
        return dst;
    }

    /**
     * Rounds the coordinates of this cube to integer values such that q+r+s = 0, optionally storing the result in dst.
     * @param dst where to store the result.
     */
    round(dst: Hex = this) {
        // Copy the unrounded coordinates
        let cq = this.q,
            cr = this.r,
            cs = this.s;

        // Perform the rounding 
        dst.q = Math.round(cq);
        dst.r = Math.round(cr);
        dst.s = Math.round(cs);

        // Compare rounded to unrounded
        let q_diff = Math.abs(dst.q - cq),
            r_diff = Math.abs(dst.r - cr),
            s_diff = Math.abs(dst.s - cs);

        // Adjust accordingly
        if (q_diff > r_diff && q_diff > s_diff)
            dst.q = -dst.r - dst.s;
        else if (r_diff > s_diff)
            dst.r = -dst.q - dst.s;
        else
            dst.s = -dst.q - dst.r;

        return dst;
    }

    /**
     * Checks if this cube has exactly the same coordinates as the other cube.
     * @param other the cube to compare to.
     */
    equals(other: Hex) {
        return (
            this.q === other.q &&
            this.r === other.r &&
            this.s === other.s);
    }

};

/**
 * The six possible directions on a hexagonal grid, entered in CCW order.
 */
export const Directions = [
    new Hex(1, -1, 0), new Hex(1, 0, -1),
    new Hex(0, 1, -1), new Hex(-1, 1, 0),
    new Hex(-1, 0, 1), new Hex(0, -1, 1)
];

