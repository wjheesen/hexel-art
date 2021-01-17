/**
 * The vertex and index data for a bat-shaped polygon.
 */
export const bat = { vertices: new Float32Array([0,3,-2,5,-3,2,-5,0,-8,3,-10,7,-17,10,-13,5,-12,-1,-3,-7,0,-10,3,-7,12,-1,13,5,17,10,10,7,8,3,5,0,3,2,2,5]), indices: new Uint16Array([0,1,2,0,2,3,0,3,9,0,9,10,0,10,11,0,11,17,0,17,18,0,18,19,4,5,6,4,6,7,4,7,8,4,8,9,4,9,3,16,14,15,16,13,14,16,12,13,16,11,12,16,17,11]) };
/**
 * The vertex and index data for a flower-shaped polygon.
 */
export const flower = { vertices: new Float32Array([0,-2,-1,-1,-2,-1,-2,-2,-3,-3,-1,-3,-2,-4,-2,-5,-1,-5,0,-6,0,-4,1,-5,2,-5,2,-4,3,-3,1,-3,2,-2,2,-1,1,-1,0,0]), indices: new Uint16Array([5,0,1,5,1,2,5,2,3,5,3,4,5,6,7,5,7,8,5,8,9,5,9,10,5,10,0,15,0,10,15,10,11,15,11,12,15,12,13,15,13,14,15,16,17,15,17,18,15,18,19,15,19,0]) };
/**
 * The vertex and index data for a heart-shaped polygon.
 */
export const heart = { vertices: new Float32Array([0,12,-3,16,-5,16,-8,12,-8,8,0,0,8,8,8,12,5,16,3,16]) };
