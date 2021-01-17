import { Struct as Mat3 } from '../graphics/struct/mat2d'
import { Struct as ColorF } from '../graphics/struct/colorf';
import { Struct as Mat4 } from '../graphics/struct/mat4';
import { Model } from '../graphics/model'
import VertexBuf from '../graphics/vertexbuf'
import { Buf as IndexTupleBuf } from '../graphics/struct/indextuple'
import { createArrayBuffer, createElementBuffer } from '../graphics/rendering/util';
import { _Bindings, createProgramInfo, Program } from '../graphics/rendering/program';
import { ShapeProgramAttribs as Attribs, ShapeProgramUniforms as Uniforms, ShapeProgramSource as Source } from './shaders';

interface Bindings extends _Bindings {
    positionBuffer: WebGLBuffer;
    elementBuffer: WebGLBuffer;
}

/**
 * Program for rendering shapes.
 */
export class ShapeProgram extends Program<Uniforms, Attribs, Bindings> {

    /**
     * The number of elements to render. Varies based on model.
     */
    private elementCount = 0;

    /**
     * The byte offset of the first element to render. Varies based on model.
     */
    private elementOffset = 0;

    /**
     * Creates a program that can render polygons corresponding to each of the models in the specified array.
     */
    static create(gl: WebGLRenderingContext, models: Model[]) {

        // Create program info
        let programInfo = createProgramInfo(gl, Source);

        // Pack models
        let packed = packModels(models);

        // Init buffers
        let positions = createArrayBuffer(gl, packed.vertices);
        let indices = createElementBuffer(gl, packed.indices);

        // Create program and return
        return new ShapeProgram(programInfo, {
            positionBuffer: positions,
            elementBuffer: indices
        });
    }

    bind (gl: WebGLRenderingContext) {
        // Bind program
        gl.useProgram(this.location);
        // Disable culling (so shapes can be flipped)
        //gl.disable(gl.CULL_FACE);
        // Enable blending (for transparency)
        gl.enable(gl.BLEND);
        // Bind position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.positionBuffer);
        gl.enableVertexAttribArray(this.attribs.a_position);
        // Bind element buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bindings.elementBuffer);
    }

    /**
     * Sets this program's projection matrix.
     */
    setProjection(gl: WebGLRenderingContext, projection: Mat4) {
        gl.uniformMatrix4fv(this.uniforms.u_projection, false, projection.data);
    }

    /**
     * Sets this program's draw color.
     */
    setColor(gl: WebGLRenderingContext, color: ColorF) {
        gl.uniform4fv(this.uniforms.u_color, color.data);
    }

    /**
     * Sets the model data this program will use to draw shapes.
     */
    setModel(gl: WebGLRenderingContext, model: Model) {
        // Point to start of model's vertex array
        gl.vertexAttribPointer(this.attribs.a_position, 2, gl.FLOAT,
            false, 0, model.vertexBufferOffset);
        // Get number of elements to render
        this.elementCount = model.indices.data.length;
        // Get byte offset first element in element buffer
        this.elementOffset = model.elementBufferOffset;
    }

   /**
     * Sets the model matrix applied to shapes this program will draw.
     */
    setModelMatrix(gl: WebGLRenderingContext, matrix: Mat3) {
        gl.uniformMatrix3fv(this.uniforms.u_model, false, matrix.data);
    }

    /**
     * Draws a shape using the color, model, and model matrix loaded into this program. 
     */
    draw (gl: WebGLRenderingContext) {
        gl.drawElements(gl.TRIANGLES, this.elementCount, gl.UNSIGNED_SHORT, this.elementOffset);
    }
}

/**
 * Holds data from one or more models that have been packed into buffers.
 */
interface PackedModelData {

    /**
     * The packed vertex data.
     */
    vertices: Float32Array;

    /**
     * The packed index data.
     */
    indices: Uint16Array;
}

/**
* Packs the index and vertex data from each model into arrays, storing the byte offsets in the model.
* @param models the models to pack.
* @returns the packed index and vertex arrays.
*/
function packModels(models: Model[]): PackedModelData {

    // Compute the total number of vertices and index tuples
    let vertexCount = 0, indexCount = 0;
    for (let i = 0; i < models.length; i++) {
        vertexCount += models[i].vertices.capacity();
        indexCount += models[i].indices.capacity();
    }

    // Create arrays big enough to hold the packed data
    let packedVertices = VertexBuf.create(vertexCount);
    let packedIndices = IndexTupleBuf.create(indexCount);

    // Keep track of index and vertex offsets
    let bytesPerVertex = packedVertices.structLength() * packedVertices.data.BYTES_PER_ELEMENT,
        bytesPerIndexTuple = packedIndices.structLength() * packedIndices.data.BYTES_PER_ELEMENT;

    // Pack the vertices and indices into the arrays and update the maps accordingly
    for (let model of models) {
        // Save the current byte offset into the packed vertex array
        model.vertexBufferOffset = packedVertices.position() * bytesPerVertex;
        // Save the current index offset into packed index array
        model.elementBufferOffset = packedIndices.position() * bytesPerIndexTuple;
        // Pack vertices from current model
        model.vertices.moveToFirst();
        packedVertices.putBuffer(model.vertices);
        // Pack indices from current model
        model.indices.moveToFirst();
        packedIndices.putBuffer(model.indices);
    }

    // Construct packed model data object and return
    return {
        vertices: packedVertices.data,
        indices: packedIndices.data
    };
}