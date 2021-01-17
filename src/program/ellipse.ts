import * as Model from '../graphics/model'
import { Struct as Rect } from '../graphics/struct/rect';
import { Struct as ColorF } from '../graphics/struct/colorf';
import { Struct as Mat4 } from '../graphics/struct/mat4';
import { createArrayBuffer, createElementBuffer } from '../graphics/rendering/util';
import { Program, _Bindings, createProgramInfo } from '../graphics/rendering/program';
import { EllipseProgramAttribs as Attribs, EllipseProgramUniforms as Uniforms, EllipseProgramSource as Source } from './shaders'

interface Bindings extends _Bindings {
    texCoordBuffer: WebGLBuffer;
    elementBuffer: WebGLBuffer;
}

/**
 * Program for rendering ellipses.
 */
export class EllipseProgram extends Program<Uniforms, Attribs, Bindings> {

    static create(gl: WebGLRenderingContext) {

        // Create program info
        let programInfo = createProgramInfo(gl, Source);

        // Init buffers
        let texCoords = createArrayBuffer(gl, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]));
        let indices = createElementBuffer(gl, Model.polygonIndices(4).data);

        // Create program and return
        return new EllipseProgram(programInfo, {
            texCoordBuffer: texCoords,
            elementBuffer: indices
        });
    }

    bind(gl: WebGLRenderingContext) {
        // Bind program
        gl.useProgram(this.location);
        // Enable blending (for transparency)
        gl.enable(gl.BLEND);
        // Bind tex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.texCoordBuffer);
        gl.vertexAttribPointer(this.attribs.a_texCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.attribs.a_texCoord);
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
     * Sets the boundaries of the ellipse to draw.
     * @param bounds the boundaries of the ellipse.
     */
    setEllipse(gl: WebGLRenderingContext, ellipse: Rect) {
        gl.uniform4fv(this.uniforms.u_rect, ellipse.data); 
    }

    /**
     * Draws an ellipse using the color and bounds data loaded into the program. 
     */
    draw(gl: WebGLRenderingContext){
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
}