﻿import TypedArray from './typedarray'

export default class Template<T extends TypedArray>{

    /**
     * Sets each component of this struct to that of the other struct.
     */
    set(other: this) { }

    /**
     * Sets each component of this struct.
     */
    set$(x: number, y: number) {}

    /**
     * Adds the other struct to this struct componentwise.
     */
    add(other: this) {}

    /**
     * Adds the specified values to this struct componentwise.
     */
    add$(x: number, y: number) {}

    /**
     * Subtracts the other struct from this struct componentwise.
     */
    subtract(other: this) {}

    /**
     * Subtracts the specified values from this struct componentwise.
     */
    subtract$(x: number, y: number) {}

    /**
     * Multiplies each component of this struct by the specified scalar.
     */
    mulScalar(k: number) {}

    /**
     * Divides each component of this struct by the specified scalar.
     */
    divScalar(k: number) {}

    /**
     * Checks if each component of this struct is equal to that of the other struct.
     */
    equals(other: this) {}

    /**
     * Checks if each component of this struct is equal to the specified scalar.
     */
    equalsScalar(k: number) {}

    /**
     * Checks if each component of this struct is approximately equal to that of the other struct.
     */
    epsilonEquals(other: this, e: number) {}

    /**
     * Checks if each component of this struct is approximately equal to the specified scalar.
     */
    epsilonEqualsScalar(k: number, e: number) {}

    /**
     * Returns a string representation of this struct.
     */
    toString() {}
}