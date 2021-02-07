 /** Cubic coordinate (q,r,s), where q+r+s = 0. */
export class Cube {

    /** Counts the number of cubes that must be traversed in order to go from c1 to c2. */
    static distance(c1: Cube, c2: Cube) {
        return Math.max(
            Math.abs(c1.q - c2.q),
            Math.abs(c1.r - c2.r),
            Math.abs(c1.s - c2.s)
        );
    }

    static create(q = 0, r = 0, out = new Cube) {
        out.q = q;
        out.r = r;
        out.s = -q - r;
        return out;
    }

    constructor(
        /** This cube's position on the Q axis. */
        public q = 0, 
        /** This cube's position on the R axis. */
        public r = 0, 
        /** This cube's position on the S axis. */
        public s = 0
    ) {}

    /**
     * Gets a cube adjacent to this one, in the specified direction. 
     * @param direction index of the direction in the `Directions` array.
     */
    getNeighbor(direction: number, dst = new Cube) {
        return this.add(Directions[direction], dst);
    }

    /**
     * Finds the direction to a neighboring cube.
     * @param neighbor a cube neighboring this cube.
     * @returns the index of the direction in the `Directions` array, or -1 if the cube is not a neighbor.
     */
    getDirection(neighbor: Cube) {
        let diff = neighbor.subtract(this);
        for (let i = 0; i < Directions.length; i++) {
            if (Directions[i].equals(diff)) {
                return i;
            }
        }
        return -1; // Not a neighbor
    }

    /** Adds 2 cubes together componentwise. */
    add(c: Cube, dst = <Cube> this) {
        dst.q = this.q + c.q;
        dst.r = this.r + c.r;
        dst.s = this.s + c.s;
        return dst;
    }

    /** Subtracts c2 from c1 componentwise. */
    subtract(c: Cube, dst = <Cube> this) {
        dst.q = this.q - c.q;
        dst.r = this.r - c.r;
        dst.s = this.s - c.s;
        return dst;
    }

    /** Multiplies each component of this cube by k. */
    scale(k: number, dst = <Cube> this) {
        dst.q = this.q * k;
        dst.r = this.r * k;
        dst.s = this.s * k;
        return dst;
    }

    /** Rounds the coordinates of this cube to integer values such that q+r+s = 0 */
    round(dst = <Cube> this) {
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

    /** Checks if this cube has exactly the same coordinates as the other cube */
    equals(c: Cube) {
        return this.q === c.q && this.r === c.r && this.s === c.s;
    }
};

/**
 * The six possible directions on a hexagonal grid, entered in CCW order.
 */
export const Directions = [
    new Cube(1, -1, 0), new Cube(1, 0, -1),
    new Cube(0, 1, -1), new Cube(-1, 1, 0),
    new Cube(-1, 0, 1), new Cube(0, -1, 1)
];

