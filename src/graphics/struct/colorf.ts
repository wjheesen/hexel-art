// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
import * as Color from "./color";
import {ArgbRegex, pad} from "./util";
import Structure from "../structify/struct";
import StructureBuffer from "../structify/buf";

/**
 * A 32-bit (r,g,b,a) color.
 */
interface ColorF {
    /**
     * The red component of this ColorF.
     */
    r: number;
    /**
     * The green component of this ColorF.
     */
    g: number;
    /**
     * The blue component of this ColorF.
     */
    b: number;
    /**
     * The alpha component of this ColorF.
     */
    a: number;
}
export { ColorF as _};
/**
 * Sets each component of this ColorF to that of the other ColorF.
 */
export function set(_this: ColorF, other: ColorF) {
    _this.r = other.r;
    _this.g = other.g;
    _this.b = other.b;
    _this.a = other.a;
}

/**
 * Sets each component of this ColorF.
 */
export function set$(_this: ColorF, r: number, g: number, b: number, a: number) {
    _this.r = r;
    _this.g = g;
    _this.b = b;
    _this.a = a;
}

/**
 * Adds the other ColorF to this ColorF componentwise.
 */
export function add(_this: ColorF, other: ColorF) {
    _this.r += other.r;
    _this.g += other.g;
    _this.b += other.b;
    _this.a += other.a;
}

/**
 * Adds the specified values to this ColorF componentwise.
 */
export function add$(_this: ColorF, r: number, g: number, b: number, a: number) {
    _this.r += r;
    _this.g += g;
    _this.b += b;
    _this.a += a;
}

/**
 * Subtracts the other ColorF from this ColorF componentwise.
 */
export function subtract(_this: ColorF, other: ColorF) {
    _this.r -= other.r;
    _this.g -= other.g;
    _this.b -= other.b;
    _this.a -= other.a;
}

/**
 * Subtracts the specified values from this ColorF componentwise.
 */
export function subtract$(_this: ColorF, r: number, g: number, b: number, a: number) {
    _this.r -= r;
    _this.g -= g;
    _this.b -= b;
    _this.a -= a;
}

/**
 * Multiplies each component of this ColorF by the specified scalar.
 */
export function mulScalar(_this: ColorF, k: number) {
    _this.r *= k;
    _this.g *= k;
    _this.b *= k;
    _this.a *= k;
}

/**
 * Divides each component of this ColorF by the specified scalar.
 */
export function divScalar(_this: ColorF, k: number) {
    _this.r /= k;
    _this.g /= k;
    _this.b /= k;
    _this.a /= k;
}

/**
 * Checks if each component of this ColorF is equal to that of the other ColorF.
 */
export function equals(_this: ColorF, other: ColorF) {
    return _this.r === other.r && _this.g === other.g && _this.b === other.b && _this.a === other.a;
}

/**
 * Checks if each component of this ColorF is equal to the specified scalar.
 */
export function equalsScalar(_this: ColorF, k: number) {
    return _this.r === k && _this.g === k && _this.b === k && _this.a === k;
}

/**
 * Checks if each component of this ColorF is approximately equal to that of the other ColorF.
 */
export function epsilonEquals(_this: ColorF, other: ColorF, e: number) {
    return Math.abs(_this.r - other.r) <= e && Math.abs(_this.g - other.g) <= e && Math.abs(_this.b - other.b) <= e && Math.abs(_this.a - other.a) <= e;
}

/**
 * Checks if each component of this ColorF is approximately equal to the specified scalar.
 */
export function epsilonEqualsScalar(_this: ColorF, k: number, e: number) {
    return Math.abs(_this.r - k) <= e && Math.abs(_this.g - k) <= e && Math.abs(_this.b - k) <= e && Math.abs(_this.a - k) <= e;
}

/**
 * Returns a string representation of this ColorF.
 */
export function toString(_this: ColorF) {
    return `{ r: ${_this.r}, g: ${_this.g}, b: ${_this.b}, a: ${_this.a} }`
}

/**
 * Checks if the specified Color is fully opaque. 
 */
export function isOpaque(_this: ColorF, c: ColorF) {
    return c.a === 1;
}

/**
 * Checks if the specified Color is fully transparent.
 */
export function isTransparent(_this: ColorF, c: ColorF) {
    return c.a === 0;
}

/**
 * Randomly sets the (r,g,b) components of this Color.
 */
export function random(_this: ColorF) {
    _this.r = Math.random();
    _this.g = Math.random();
    _this.b = Math.random();
}

/**
 * Extracts the (r,g,b,a) components of the specified Color into this ColorF.
 */
export function setFromColor(_this: ColorF, src: Color._) {
    _this.r = src.r / 0xff;
    _this.g = src.g / 0xff;
    _this.b = src.b / 0xff;
    _this.a = src.a / 0xff;
}

/**
 * Extracts the (r,g,b,a) components of the specified ARGB string into this ColorF.
 * @param argb hexadecimal string of the form #aarrggbb.
 */
export function setFromArgbString(_this: ColorF, argb: string) {
    let result = ArgbRegex.exec(argb);
    _this.a = parseInt(result[1], 16) / 0xff;
    _this.r = parseInt(result[2], 16) / 0xff;
    _this.g = parseInt(result[3], 16) / 0xff;
    _this.b = parseInt(result[4], 16) / 0xff;
}

/**
 * Creates an ARGB string from this specified ColorF's (r,g,b,a) components.
 * @returns string of the form #aarrggbb
 */
export function toArgbString(_this: ColorF) {
    let r = pad((_this.r * 0xff).toString(16));
    let g = pad((_this.g * 0xff).toString(16));
    let b = pad((_this.b * 0xff).toString(16));
    let a = pad((_this.a * 0xff).toString(16));
    return '#' + a + r + g + b;
}

/**
 * Extracts the (r,g,b,a) components of the specified RGBA int into this ColorF.
 * @param rgba integer of the form 0xrrggbbaa.
 */
export function setFromRgbaInt(_this: ColorF, rgba: number) {
    _this.r = ((rgba >> 24) & 0xff) / 0xff;
    _this.g = ((rgba >> 16) & 0xff) / 0xff;
    _this.b = ((rgba >> 8) & 0xff) / 0xff;
    _this.a = ((rgba >> 0) & 0xff) / 0xff;
}

/**
 * Creates an RGBA int with values extracted from this ColorF.
 * @returns int of the form 0xrrggbbaa
 */
export function toRgbaInt(_this: ColorF) {
    let r = (_this.r * 0xff) << 24;
    let g = (_this.g * 0xff) << 16;
    let b = (_this.b * 0xff) << 8;
    let a = (_this.a * 0xff) << 0;
    return (r | g | b | a) >>> 0;
}

/**
 * Premultiplies the (r,g,b) components of this ColorF by it's alpha component.
 */
export function premultiplyAlpha(_this: ColorF) {
    let a = _this.a;
    _this.r *= a;
    _this.g *= a;
    _this.b *= a;
}

/**
 * A 32-bit (r,g,b,a) color.
 */
export class Obj {
    static create(other: ColorF) {
        let ColorF = new Obj();
        ColorF.set(other);
        return ColorF;
    }

    static create$(r: number, g: number, b: number, a: number) {
        let ColorF = new Obj();
        ColorF.set$(r, g, b, a);
        return ColorF;
    }

    static fromColor(src: Color._) {
        let ColorF = new Obj();
        ColorF.setFromColor(src);
        return ColorF;
    }

    static fromArgbString(argb: string) {
        let ColorF = new Obj();
        ColorF.setFromArgbString(argb);
        return ColorF;
    }

    static fromRgbaInt(rgba: number) {
        let ColorF = new Obj();
        ColorF.setFromRgbaInt(rgba);
        return ColorF;
    }

    /**
     * The red component of this ColorF.
     */
    r: number;
    /**
     * The green component of this ColorF.
     */
    g: number;
    /**
     * The blue component of this ColorF.
     */
    b: number;
    /**
     * The alpha component of this ColorF.
     */
    a: number;

    /**
     * Sets each component of this ColorF to that of the other ColorF.
     */
    set(other: ColorF) {
        return set(this, other);
    }

    /**
     * Sets each component of this ColorF.
     */
    set$(r: number, g: number, b: number, a: number) {
        return set$(this, r, g, b, a);
    }

    /**
     * Adds the other ColorF to this ColorF componentwise.
     */
    add(other: ColorF) {
        return add(this, other);
    }

    /**
     * Adds the specified values to this ColorF componentwise.
     */
    add$(r: number, g: number, b: number, a: number) {
        return add$(this, r, g, b, a);
    }

    /**
     * Subtracts the other ColorF from this ColorF componentwise.
     */
    subtract(other: ColorF) {
        return subtract(this, other);
    }

    /**
     * Subtracts the specified values from this ColorF componentwise.
     */
    subtract$(r: number, g: number, b: number, a: number) {
        return subtract$(this, r, g, b, a);
    }

    /**
     * Multiplies each component of this ColorF by the specified scalar.
     */
    mulScalar(k: number) {
        return mulScalar(this, k);
    }

    /**
     * Divides each component of this ColorF by the specified scalar.
     */
    divScalar(k: number) {
        return divScalar(this, k);
    }

    /**
     * Checks if each component of this ColorF is equal to that of the other ColorF.
     */
    equals(other: ColorF) {
        return equals(this, other);
    }

    /**
     * Checks if each component of this ColorF is equal to the specified scalar.
     */
    equalsScalar(k: number) {
        return equalsScalar(this, k);
    }

    /**
     * Checks if each component of this ColorF is approximately equal to that of the other ColorF.
     */
    epsilonEquals(other: ColorF, e: number) {
        return epsilonEquals(this, other, e);
    }

    /**
     * Checks if each component of this ColorF is approximately equal to the specified scalar.
     */
    epsilonEqualsScalar(k: number, e: number) {
        return epsilonEqualsScalar(this, k, e);
    }

    /**
     * Returns a string representation of this ColorF.
     */
    toString() {
        return toString(this);
    }

    /**
     * Checks if the specified Color is fully opaque. 
     */
    isOpaque(c: ColorF) {
        return isOpaque(this, c);
    }

    /**
     * Checks if the specified Color is fully transparent.
     */
    isTransparent(c: ColorF) {
        return isTransparent(this, c);
    }

    /**
     * Randomly sets the (r,g,b) components of this Color.
     */
    random() {
        return random(this);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified Color into this ColorF.
     */
    setFromColor(src: Color._) {
        return setFromColor(this, src);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified ARGB string into this ColorF.
     * @param argb hexadecimal string of the form #aarrggbb.
     */
    setFromArgbString(argb: string) {
        return setFromArgbString(this, argb);
    }

    /**
     * Creates an ARGB string from this specified ColorF's (r,g,b,a) components.
     * @returns string of the form #aarrggbb
     */
    toArgbString() {
        return toArgbString(this);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified RGBA int into this ColorF.
     * @param rgba integer of the form 0xrrggbbaa.
     */
    setFromRgbaInt(rgba: number) {
        return setFromRgbaInt(this, rgba);
    }

    /**
     * Creates an RGBA int with values extracted from this ColorF.
     * @returns int of the form 0xrrggbbaa
     */
    toRgbaInt() {
        return toRgbaInt(this);
    }

    /**
     * Premultiplies the (r,g,b) components of this ColorF by it's alpha component.
     */
    premultiplyAlpha() {
        return premultiplyAlpha(this);
    }
}

/**
 * A ColorF backed by a Float32Array.
 */
export class Struct extends Structure<Float32Array> {
    static create(other: ColorF) {
        let ColorF = new Struct();
        ColorF.set(other);
        return ColorF;
    }

    static create$(r: number, g: number, b: number, a: number) {
        let ColorF = new Struct();
        ColorF.set$(r, g, b, a);
        return ColorF;
    }

    static fromColor(src: Color._) {
        let ColorF = new Struct();
        ColorF.setFromColor(src);
        return ColorF;
    }

    static fromArgbString(argb: string) {
        let ColorF = new Struct();
        ColorF.setFromArgbString(argb);
        return ColorF;
    }

    static fromRgbaInt(rgba: number) {
        let ColorF = new Struct();
        ColorF.setFromRgbaInt(rgba);
        return ColorF;
    }

    /**
     * Creates a ColorF struct.
     */
    constructor() {
        super(new Float32Array(4));
    }

    /**
     * The red component of this ColorF.
     */
    get r() {
        return this.data[0];
    }

    /**
     * The red component of this ColorF.
     */
    set r(value: number) {
        this.data[0] = value;
    }

    /**
     * The green component of this ColorF.
     */
    get g() {
        return this.data[1];
    }

    /**
     * The green component of this ColorF.
     */
    set g(value: number) {
        this.data[1] = value;
    }

    /**
     * The blue component of this ColorF.
     */
    get b() {
        return this.data[2];
    }

    /**
     * The blue component of this ColorF.
     */
    set b(value: number) {
        this.data[2] = value;
    }

    /**
     * The alpha component of this ColorF.
     */
    get a() {
        return this.data[3];
    }

    /**
     * The alpha component of this ColorF.
     */
    set a(value: number) {
        this.data[3] = value;
    }

    /**
     * Sets each component of this ColorF to that of the other ColorF.
     */
    set(other: ColorF) {
        return set(this, other);
    }

    /**
     * Sets each component of this ColorF.
     */
    set$(r: number, g: number, b: number, a: number) {
        return set$(this, r, g, b, a);
    }

    /**
     * Adds the other ColorF to this ColorF componentwise.
     */
    add(other: ColorF) {
        return add(this, other);
    }

    /**
     * Adds the specified values to this ColorF componentwise.
     */
    add$(r: number, g: number, b: number, a: number) {
        return add$(this, r, g, b, a);
    }

    /**
     * Subtracts the other ColorF from this ColorF componentwise.
     */
    subtract(other: ColorF) {
        return subtract(this, other);
    }

    /**
     * Subtracts the specified values from this ColorF componentwise.
     */
    subtract$(r: number, g: number, b: number, a: number) {
        return subtract$(this, r, g, b, a);
    }

    /**
     * Multiplies each component of this ColorF by the specified scalar.
     */
    mulScalar(k: number) {
        return mulScalar(this, k);
    }

    /**
     * Divides each component of this ColorF by the specified scalar.
     */
    divScalar(k: number) {
        return divScalar(this, k);
    }

    /**
     * Checks if each component of this ColorF is equal to that of the other ColorF.
     */
    equals(other: ColorF) {
        return equals(this, other);
    }

    /**
     * Checks if each component of this ColorF is equal to the specified scalar.
     */
    equalsScalar(k: number) {
        return equalsScalar(this, k);
    }

    /**
     * Checks if each component of this ColorF is approximately equal to that of the other ColorF.
     */
    epsilonEquals(other: ColorF, e: number) {
        return epsilonEquals(this, other, e);
    }

    /**
     * Checks if each component of this ColorF is approximately equal to the specified scalar.
     */
    epsilonEqualsScalar(k: number, e: number) {
        return epsilonEqualsScalar(this, k, e);
    }

    /**
     * Returns a string representation of this ColorF.
     */
    toString() {
        return toString(this);
    }

    /**
     * Checks if the specified Color is fully opaque. 
     */
    isOpaque(c: ColorF) {
        return isOpaque(this, c);
    }

    /**
     * Checks if the specified Color is fully transparent.
     */
    isTransparent(c: ColorF) {
        return isTransparent(this, c);
    }

    /**
     * Randomly sets the (r,g,b) components of this Color.
     */
    random() {
        return random(this);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified Color into this ColorF.
     */
    setFromColor(src: Color._) {
        return setFromColor(this, src);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified ARGB string into this ColorF.
     * @param argb hexadecimal string of the form #aarrggbb.
     */
    setFromArgbString(argb: string) {
        return setFromArgbString(this, argb);
    }

    /**
     * Creates an ARGB string from this specified ColorF's (r,g,b,a) components.
     * @returns string of the form #aarrggbb
     */
    toArgbString() {
        return toArgbString(this);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified RGBA int into this ColorF.
     * @param rgba integer of the form 0xrrggbbaa.
     */
    setFromRgbaInt(rgba: number) {
        return setFromRgbaInt(this, rgba);
    }

    /**
     * Creates an RGBA int with values extracted from this ColorF.
     * @returns int of the form 0xrrggbbaa
     */
    toRgbaInt() {
        return toRgbaInt(this);
    }

    /**
     * Premultiplies the (r,g,b) components of this ColorF by it's alpha component.
     */
    premultiplyAlpha() {
        return premultiplyAlpha(this);
    }
}

/**
 * A ColorF buffer backed by a Float32Array.
 */
export class Buf extends StructureBuffer<Float32Array> {
    /**
     * Creates an empty ColorF buffer with the specified ColorF capacity.
     */
    static create(capacity: number) {
        return new Buf(new Float32Array(capacity * 4));
    }

    /**
     * The red component of the current ColorF.
     */
    get r() {
        return this.data[this.dataPosition + 0];
    }

    /**
     * The red component of the current ColorF.
     */
    set r(value: number) {
        this.data[this.dataPosition + 0] = value;
    }

    /**
     * The green component of the current ColorF.
     */
    get g() {
        return this.data[this.dataPosition + 1];
    }

    /**
     * The green component of the current ColorF.
     */
    set g(value: number) {
        this.data[this.dataPosition + 1] = value;
    }

    /**
     * The blue component of the current ColorF.
     */
    get b() {
        return this.data[this.dataPosition + 2];
    }

    /**
     * The blue component of the current ColorF.
     */
    set b(value: number) {
        this.data[this.dataPosition + 2] = value;
    }

    /**
     * The alpha component of the current ColorF.
     */
    get a() {
        return this.data[this.dataPosition + 3];
    }

    /**
     * The alpha component of the current ColorF.
     */
    set a(value: number) {
        this.data[this.dataPosition + 3] = value;
    }

    /**
     * Gets the number of components in a ColorF, namely 4.
     */
    structLength() {
        return 4;
    }

    /**
     * Sets each component of the ColorF at the specified position.
     */
    set$(position: number, r: number, g: number, b: number, a: number) {
        let dataPos = position * this.structLength();
        this.data[dataPos++] = r;
        this.data[dataPos++] = g;
        this.data[dataPos++] = b;
        this.data[dataPos++] = a;
    }

    /**
     * Sets each component of the current ColorF, then moves to the next position of this buffer.
     */
    put$(r: number, g: number, b: number, a: number) {
        this.data[this.dataPosition++] = r;
        this.data[this.dataPosition++] = g;
        this.data[this.dataPosition++] = b;
        this.data[this.dataPosition++] = a;
    }

    /**
     * Sets each component of the current ColorF to that of the other ColorF.
     */
    $set(other: ColorF) {
        return set(this, other);
    }

    /**
     * Sets each component of the current ColorF.
     */
    $set$(r: number, g: number, b: number, a: number) {
        return set$(this, r, g, b, a);
    }

    /**
     * Adds the other ColorF to the current ColorF componentwise.
     */
    $add(other: ColorF) {
        return add(this, other);
    }

    /**
     * Adds the specified values to the current ColorF componentwise.
     */
    $add$(r: number, g: number, b: number, a: number) {
        return add$(this, r, g, b, a);
    }

    /**
     * Subtracts the other ColorF from the current ColorF componentwise.
     */
    $subtract(other: ColorF) {
        return subtract(this, other);
    }

    /**
     * Subtracts the specified values from the current ColorF componentwise.
     */
    $subtract$(r: number, g: number, b: number, a: number) {
        return subtract$(this, r, g, b, a);
    }

    /**
     * Multiplies each component of the current ColorF by the specified scalar.
     */
    $mulScalar(k: number) {
        return mulScalar(this, k);
    }

    /**
     * Divides each component of the current ColorF by the specified scalar.
     */
    $divScalar(k: number) {
        return divScalar(this, k);
    }

    /**
     * Checks if each component of the current ColorF is equal to that of the other ColorF.
     */
    $equals(other: ColorF) {
        return equals(this, other);
    }

    /**
     * Checks if each component of the current ColorF is equal to the specified scalar.
     */
    $equalsScalar(k: number) {
        return equalsScalar(this, k);
    }

    /**
     * Checks if each component of the current ColorF is approximately equal to that of the other ColorF.
     */
    $epsilonEquals(other: ColorF, e: number) {
        return epsilonEquals(this, other, e);
    }

    /**
     * Checks if each component of the current ColorF is approximately equal to the specified scalar.
     */
    $epsilonEqualsScalar(k: number, e: number) {
        return epsilonEqualsScalar(this, k, e);
    }

    /**
     * Returns a string representation of the current ColorF.
     */
    $toString() {
        return toString(this);
    }

    /**
     * Checks if the specified Color is fully opaque. 
     */
    $isOpaque(c: ColorF) {
        return isOpaque(this, c);
    }

    /**
     * Checks if the specified Color is fully transparent.
     */
    $isTransparent(c: ColorF) {
        return isTransparent(this, c);
    }

    /**
     * Randomly sets the (r,g,b) components of this Color.
     */
    $random() {
        return random(this);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified Color into the current ColorF.
     */
    $setFromColor(src: Color._) {
        return setFromColor(this, src);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified ARGB string into the current ColorF.
     * @param argb hexadecimal string of the form #aarrggbb.
     */
    $setFromArgbString(argb: string) {
        return setFromArgbString(this, argb);
    }

    /**
     * Creates an ARGB string from this specified ColorF's (r,g,b,a) components.
     * @returns string of the form #aarrggbb
     */
    $toArgbString() {
        return toArgbString(this);
    }

    /**
     * Extracts the (r,g,b,a) components of the specified RGBA int into the current ColorF.
     * @param rgba integer of the form 0xrrggbbaa.
     */
    $setFromRgbaInt(rgba: number) {
        return setFromRgbaInt(this, rgba);
    }

    /**
     * Creates an RGBA int with values extracted from the current ColorF.
     * @returns int of the form 0xrrggbbaa
     */
    $toRgbaInt() {
        return toRgbaInt(this);
    }

    /**
     * Premultiplies the (r,g,b) components of the current ColorF by it's alpha component.
     */
    $premultiplyAlpha() {
        return premultiplyAlpha(this);
    }
}