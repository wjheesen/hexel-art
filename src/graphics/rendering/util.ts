type GL = WebGLRenderingContext;
type ArraySize = number | ArrayBuffer | ArrayBufferView;
type ElementArraySize = number | ArrayBuffer | Uint8Array | Uint16Array;


/**
 * Creates an array buffer with the specified size.
 * @param gl the WebGL context.
 * @param size the size of the array buffer, or the initial data for the buffer.
 * @param usage one of gl.STATIC_DRAW (often used, seldom changed), gl.DYNAMIC_DRAW (often used, often changed), or gl.STREAM_DRAW (seldom used).
 */
export function createArrayBuffer(gl: GL, size: ArraySize, usage = gl.STATIC_DRAW) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, size, usage);
    return buffer;
}

/**
 * Creates an element buffer with the specified size.
 * @param gl the WebGL context.
 * @param size the size of the element buffer, or the initial data for the buffer.
 * @param usage one of gl.STATIC_DRAW (often used, seldom changed), gl.DYNAMIC_DRAW (often used, often changed), or gl.STREAM_DRAW (seldom used).
 */
export function createElementBuffer(gl: GL, size: ElementArraySize, usage = gl.STATIC_DRAW) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, size, usage);
    return buffer;
}



