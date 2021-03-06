// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
import Structure from "../structify/struct";
import StructureBuffer from "../structify/buf";

/**
 * Point with x and y coordinates.
 */
interface Point {
    /**
     * The X coordinate of this point.
     */
    x: number;
    /**
     * The Y coordinate of this point.
     */
    y: number;
}
export { Point as _};
/**
 * Sets each component of this Point to that of the other Point.
 */
export function set(_this: Point, other: Point) {
    _this.x = other.x;
    _this.y = other.y;
}

/**
 * Sets each component of this Point.
 */
export function set$(_this: Point, x: number, y: number) {
    _this.x = x;
    _this.y = y;
}

/**
 * Adds the other Point to this Point componentwise.
 */
export function add(_this: Point, other: Point) {
    _this.x += other.x;
    _this.y += other.y;
}

/**
 * Adds the specified values to this Point componentwise.
 */
export function add$(_this: Point, x: number, y: number) {
    _this.x += x;
    _this.y += y;
}

/**
 * Subtracts the other Point from this Point componentwise.
 */
export function subtract(_this: Point, other: Point) {
    _this.x -= other.x;
    _this.y -= other.y;
}

/**
 * Subtracts the specified values from this Point componentwise.
 */
export function subtract$(_this: Point, x: number, y: number) {
    _this.x -= x;
    _this.y -= y;
}

/**
 * Multiplies each component of this Point by the specified scalar.
 */
export function mulScalar(_this: Point, k: number) {
    _this.x *= k;
    _this.y *= k;
}

/**
 * Divides each component of this Point by the specified scalar.
 */
export function divScalar(_this: Point, k: number) {
    _this.x /= k;
    _this.y /= k;
}

/**
 * Checks if each component of this Point is equal to that of the other Point.
 */
export function equals(_this: Point, other: Point) {
    return _this.x === other.x && _this.y === other.y;
}

/**
 * Checks if each component of this Point is equal to the specified scalar.
 */
export function equalsScalar(_this: Point, k: number) {
    return _this.x === k && _this.y === k;
}

/**
 * Checks if each component of this Point is approximately equal to that of the other Point.
 */
export function epsilonEquals(_this: Point, other: Point, e: number) {
    return Math.abs(_this.x - other.x) <= e && Math.abs(_this.y - other.y) <= e;
}

/**
 * Checks if each component of this Point is approximately equal to the specified scalar.
 */
export function epsilonEqualsScalar(_this: Point, k: number, e: number) {
    return Math.abs(_this.x - k) <= e && Math.abs(_this.y - k) <= e;
}

/**
 * Returns a string representation of this Point.
 */
export function toString(_this: Point) {
    return `{ x: ${_this.x}, y: ${_this.y} }`
}

/**
 * Sets this point to the midpoint of p1 and p2.
 */
export function setMidpoint(_this: Point, p1: Point, p2: Point) {
    _this.x = 0.5 * (p1.x + p2.x);
    _this.y = 0.5 * (p1.y + p2.y);
}

/**
 * Computes the distance between this point and the other point.
 * @param other defaults to origin.
 */
export function distance(_this: Point, other?: Point) {
    return Math.sqrt(distance2(_this, other));
}

/**
 * Computes the distance squared from this point to the other point.
 * @param other defaults to origin.
 */
export function distance2(_this: Point, other?: Point) {
    let dx = other ? other.x - _this.x : _this.x;
    let dy = other ? other.y - _this.y : _this.y;
    return dx * dx + dy * dy;
}

/**
 * Point with x and y coordinates.
 */
export class Obj {
    static create(other: Point) {
        let Point = new Obj();
        Point.set(other);
        return Point;
    }

    static create$(x: number, y: number) {
        let Point = new Obj();
        Point.set$(x, y);
        return Point;
    }

    static midpoint(p1: Point, p2: Point) {
        let Point = new Obj();
        Point.setMidpoint(p1, p2);
        return Point;
    }

    /**
     * The X coordinate of this point.
     */
    x: number;
    /**
     * The Y coordinate of this point.
     */
    y: number;

    /**
     * Sets each component of this Point to that of the other Point.
     */
    set(other: Point) {
        return set(this, other);
    }

    /**
     * Sets each component of this Point.
     */
    set$(x: number, y: number) {
        return set$(this, x, y);
    }

    /**
     * Adds the other Point to this Point componentwise.
     */
    add(other: Point) {
        return add(this, other);
    }

    /**
     * Adds the specified values to this Point componentwise.
     */
    add$(x: number, y: number) {
        return add$(this, x, y);
    }

    /**
     * Subtracts the other Point from this Point componentwise.
     */
    subtract(other: Point) {
        return subtract(this, other);
    }

    /**
     * Subtracts the specified values from this Point componentwise.
     */
    subtract$(x: number, y: number) {
        return subtract$(this, x, y);
    }

    /**
     * Multiplies each component of this Point by the specified scalar.
     */
    mulScalar(k: number) {
        return mulScalar(this, k);
    }

    /**
     * Divides each component of this Point by the specified scalar.
     */
    divScalar(k: number) {
        return divScalar(this, k);
    }

    /**
     * Checks if each component of this Point is equal to that of the other Point.
     */
    equals(other: Point) {
        return equals(this, other);
    }

    /**
     * Checks if each component of this Point is equal to the specified scalar.
     */
    equalsScalar(k: number) {
        return equalsScalar(this, k);
    }

    /**
     * Checks if each component of this Point is approximately equal to that of the other Point.
     */
    epsilonEquals(other: Point, e: number) {
        return epsilonEquals(this, other, e);
    }

    /**
     * Checks if each component of this Point is approximately equal to the specified scalar.
     */
    epsilonEqualsScalar(k: number, e: number) {
        return epsilonEqualsScalar(this, k, e);
    }

    /**
     * Returns a string representation of this Point.
     */
    toString() {
        return toString(this);
    }

    /**
     * Sets this point to the midpoint of p1 and p2.
     */
    setMidpoint(p1: Point, p2: Point) {
        return setMidpoint(this, p1, p2);
    }

    /**
     * Computes the distance between this point and the other point.
     * @param other defaults to origin.
     */
    distance(other?: Point) {
        return distance(this, other);
    }

    /**
     * Computes the distance squared from this point to the other point.
     * @param other defaults to origin.
     */
    distance2(other?: Point) {
        return distance2(this, other);
    }
}

/**
 * A Point backed by a Float32Array.
 */
export class Struct extends Structure<Float32Array> {
    static create(other: Point) {
        let Point = new Struct();
        Point.set(other);
        return Point;
    }

    static create$(x: number, y: number) {
        let Point = new Struct();
        Point.set$(x, y);
        return Point;
    }

    static midpoint(p1: Point, p2: Point) {
        let Point = new Struct();
        Point.setMidpoint(p1, p2);
        return Point;
    }

    /**
     * Creates a Point struct.
     */
    constructor() {
        super(new Float32Array(2));
    }

    /**
     * The X coordinate of this point.
     */
    get x() {
        return this.data[0];
    }

    /**
     * The X coordinate of this point.
     */
    set x(value: number) {
        this.data[0] = value;
    }

    /**
     * The Y coordinate of this point.
     */
    get y() {
        return this.data[1];
    }

    /**
     * The Y coordinate of this point.
     */
    set y(value: number) {
        this.data[1] = value;
    }

    /**
     * Sets each component of this Point to that of the other Point.
     */
    set(other: Point) {
        return set(this, other);
    }

    /**
     * Sets each component of this Point.
     */
    set$(x: number, y: number) {
        return set$(this, x, y);
    }

    /**
     * Adds the other Point to this Point componentwise.
     */
    add(other: Point) {
        return add(this, other);
    }

    /**
     * Adds the specified values to this Point componentwise.
     */
    add$(x: number, y: number) {
        return add$(this, x, y);
    }

    /**
     * Subtracts the other Point from this Point componentwise.
     */
    subtract(other: Point) {
        return subtract(this, other);
    }

    /**
     * Subtracts the specified values from this Point componentwise.
     */
    subtract$(x: number, y: number) {
        return subtract$(this, x, y);
    }

    /**
     * Multiplies each component of this Point by the specified scalar.
     */
    mulScalar(k: number) {
        return mulScalar(this, k);
    }

    /**
     * Divides each component of this Point by the specified scalar.
     */
    divScalar(k: number) {
        return divScalar(this, k);
    }

    /**
     * Checks if each component of this Point is equal to that of the other Point.
     */
    equals(other: Point) {
        return equals(this, other);
    }

    /**
     * Checks if each component of this Point is equal to the specified scalar.
     */
    equalsScalar(k: number) {
        return equalsScalar(this, k);
    }

    /**
     * Checks if each component of this Point is approximately equal to that of the other Point.
     */
    epsilonEquals(other: Point, e: number) {
        return epsilonEquals(this, other, e);
    }

    /**
     * Checks if each component of this Point is approximately equal to the specified scalar.
     */
    epsilonEqualsScalar(k: number, e: number) {
        return epsilonEqualsScalar(this, k, e);
    }

    /**
     * Returns a string representation of this Point.
     */
    toString() {
        return toString(this);
    }

    /**
     * Sets this point to the midpoint of p1 and p2.
     */
    setMidpoint(p1: Point, p2: Point) {
        return setMidpoint(this, p1, p2);
    }

    /**
     * Computes the distance between this point and the other point.
     * @param other defaults to origin.
     */
    distance(other?: Point) {
        return distance(this, other);
    }

    /**
     * Computes the distance squared from this point to the other point.
     * @param other defaults to origin.
     */
    distance2(other?: Point) {
        return distance2(this, other);
    }
}

/**
 * A Point buffer backed by a Float32Array.
 */
export class Buf extends StructureBuffer<Float32Array> {
    /**
     * Creates an empty Point buffer with the specified Point capacity.
     */
    static create(capacity: number) {
        return new Buf(new Float32Array(capacity * 2));
    }

    /**
     * The X coordinate of this point.
     */
    get x() {
        return this.data[this.dataPosition + 0];
    }

    /**
     * The X coordinate of this point.
     */
    set x(value: number) {
        this.data[this.dataPosition + 0] = value;
    }

    /**
     * The Y coordinate of this point.
     */
    get y() {
        return this.data[this.dataPosition + 1];
    }

    /**
     * The Y coordinate of this point.
     */
    set y(value: number) {
        this.data[this.dataPosition + 1] = value;
    }

    /**
     * Gets the number of components in a Point, namely 2.
     */
    structLength() {
        return 2;
    }

    /**
     * Sets each component of the Point at the specified position.
     */
    set$(position: number, x: number, y: number) {
        let dataPos = position * this.structLength();
        this.data[dataPos++] = x;
        this.data[dataPos++] = y;
    }

    /**
     * Sets each component of the current Point, then moves to the next position of this buffer.
     */
    put$(x: number, y: number) {
        this.data[this.dataPosition++] = x;
        this.data[this.dataPosition++] = y;
    }

    /**
     * Sets each component of the current Point to that of the other Point.
     */
    $set(other: Point) {
        return set(this, other);
    }

    /**
     * Sets each component of the current Point.
     */
    $set$(x: number, y: number) {
        return set$(this, x, y);
    }

    /**
     * Adds the other Point to the current Point componentwise.
     */
    $add(other: Point) {
        return add(this, other);
    }

    /**
     * Adds the specified values to the current Point componentwise.
     */
    $add$(x: number, y: number) {
        return add$(this, x, y);
    }

    /**
     * Subtracts the other Point from the current Point componentwise.
     */
    $subtract(other: Point) {
        return subtract(this, other);
    }

    /**
     * Subtracts the specified values from the current Point componentwise.
     */
    $subtract$(x: number, y: number) {
        return subtract$(this, x, y);
    }

    /**
     * Multiplies each component of the current Point by the specified scalar.
     */
    $mulScalar(k: number) {
        return mulScalar(this, k);
    }

    /**
     * Divides each component of the current Point by the specified scalar.
     */
    $divScalar(k: number) {
        return divScalar(this, k);
    }

    /**
     * Checks if each component of the current Point is equal to that of the other Point.
     */
    $equals(other: Point) {
        return equals(this, other);
    }

    /**
     * Checks if each component of the current Point is equal to the specified scalar.
     */
    $equalsScalar(k: number) {
        return equalsScalar(this, k);
    }

    /**
     * Checks if each component of the current Point is approximately equal to that of the other Point.
     */
    $epsilonEquals(other: Point, e: number) {
        return epsilonEquals(this, other, e);
    }

    /**
     * Checks if each component of the current Point is approximately equal to the specified scalar.
     */
    $epsilonEqualsScalar(k: number, e: number) {
        return epsilonEqualsScalar(this, k, e);
    }

    /**
     * Returns a string representation of the current Point.
     */
    $toString() {
        return toString(this);
    }

    /**
     * Sets this point to the midpoint of p1 and p2.
     */
    $setMidpoint(p1: Point, p2: Point) {
        return setMidpoint(this, p1, p2);
    }

    /**
     * Computes the distance between this point and the other point.
     * @param other defaults to origin.
     */
    $distance(other: Point) {
        return distance(this, other);
    }

    /**
     * Computes the distance squared from this point to the other point.
     * @param other defaults to origin.
     */
    $distance2(other: Point) {
        return distance2(this, other);
    }
}
