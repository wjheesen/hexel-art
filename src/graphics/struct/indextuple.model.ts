﻿import Template from '../structify/template';

/**
  * Holds the three indices for a triangle.
  */
export class IndexTuple extends Template<Uint16Array> {
    /**
     * The index of the first triangle vertex.
     */
    first: number;
    /**
     * The index of the second triangle vertex.
     */
    second: number;
    /**
     * The index of the third triangle vertex.
     */
    third: number;
}

