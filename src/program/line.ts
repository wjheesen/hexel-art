import { Struct as Line } from '../graphics/struct/line';
import { Struct as ColorF } from '../graphics/struct/colorf';
import { Struct as Mat4 } from '../graphics/struct/mat4';
import * as Model from '../graphics/model'
import { createArrayBuffer, createElementBuffer } from '../graphics/rendering/util';
import { _Bindings, createProgramInfo, Program } from '../graphics/rendering/program';
import { LineProgramAttribs as Attribs, LineProgramUniforms as Uniforms, LineProgramSource as Source } from './shaders';

interface Bindings extends _Bindings {
    positionBuffer: WebGLBuffer;
    elementBuffer: WebGLBuffer;
}

/**
 * Program for rendering lines.
 */
export class LineProgram extends Program<Uniforms, Attribs, Bindings> {

    static create(gl: WebGLRenderingContext) {

        // Create program info
        let programInfo = createProgramInfo(gl, Source)

        // Init buffers
        let positions = createArrayBuffer(gl, new Float32Array([0, 0.5, 0, -0.5, 1, -0.5, 1, 0.5]));
        let indices = createElementBuffer(gl, Model.polygonIndices(4).data);

        // Create program and return
        return new LineProgram(programInfo, {
            positionBuffer: positions,
            elementBuffer: indices
        });
    }

    bind (gl: WebGLRenderingContext) {
        // Bind program
        gl.useProgram(this.location);
        // Enable blending (for transparency)
        gl.enable(gl.BLEND);
        // Bind position buffer (model data)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.positionBuffer);
        gl.vertexAttribPointer(this.attribs.a_position, 2, gl.FLOAT, false, 0, 0);
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
     * Sets the thickness of the lines this program will draw.
     */
    setThickness(gl: WebGLRenderingContext, thickness: number) {
        gl.uniform1f(this.uniforms.u_thickness, thickness);
    }

    /**
     * Sets the position of the line segment this program will draw.
     */
    setLine(gl: WebGLRenderingContext, line: Line) {
        gl.uniform4fv(this.uniforms.u_line, line.data);
    }

    /**
     * Draws a line using the color, position, and thickness data loaded into the program. 
     */
    draw (gl: WebGLRenderingContext) {
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
}