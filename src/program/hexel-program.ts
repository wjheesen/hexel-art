import { PolygonMesh, Program, ProgramUtil, Renderer, Vec2, Vec2Buffer } from '@wjheesen/glib';
import { HexelGrid } from '../hexel/hexel-grid';
import * as Shader from './hexel-shader';

export class HexelProgram extends Program<Shader.Uniforms, Shader.Attributes> {

    private hex: PolygonMesh;
    private grid: HexelGrid;
    private indexBuffer: WebGLBuffer;
    private positionBuffer: WebGLBuffer;
    private offsetBuffer: WebGLBuffer;
    private colorBuffer: WebGLBuffer;
    private gradientBuffer: WebGLBuffer;
    
    static create(util: ProgramUtil, hex: PolygonMesh, grid: HexelGrid) {
        let program = new HexelProgram;
        program.hex = hex;
        program.grid = grid;
        program.location = util.createProgramFromSources(Shader.vertex, Shader.fragment);
        program.uniforms = util.getUniformLocationMap(program.location, Shader.uniformRenaming) as Shader.Uniforms;
        program.attribs = util.getAttributeLocationMap(program.location, Shader.attributeRenaming) as Shader.Attributes;
        program.indexBuffer = util.createIndexBuffer([hex]);
        program.positionBuffer = util.createVertexBuffer([hex]);
        program.offsetBuffer = util.createBuffer();
        program.colorBuffer = util.createBuffer();
        program.gradientBuffer = util.createArrayBuffer(this.getGradient());
        return program;
    }

    private static getGradient() {
        // Formula: 2*n^2, n=3,4,5
        let g1 = 18 / 256, g2 = 32 / 256, g3 = 50 / 256;
        return new Float32Array([g1, g2, g3, -g1, -g2, -g3]);
    }

    onAttach(renderer: Renderer) {
        this.enableIndexBuffer(renderer);
        this.enablePositionBuffer(renderer);
        this.enableOffsetBuffer(renderer);
        this.enableColorBuffer(renderer);
        this.enableGradientBuffer(renderer);
    }

    private enableIndexBuffer({gl}: Renderer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    }

    private enablePositionBuffer({gl}: Renderer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.attribs.position);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, this.hex.vertexBufferOffset);
    }

    private enableOffsetBuffer({gl, angleExt}: Renderer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.offsetBuffer);
        gl.enableVertexAttribArray(this.attribs.offset);
        gl.vertexAttribPointer(this.attribs.offset, 2, gl.FLOAT, false, 0, 0);
        angleExt.vertexAttribDivisorANGLE(this.attribs.offset, 1); // Each hexel has its own offset
    }

    private enableColorBuffer({gl, angleExt}: Renderer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.enableVertexAttribArray(this.attribs.hexelColor);
        gl.vertexAttribPointer(this.attribs.hexelColor, 4, gl.UNSIGNED_BYTE, true, 0, 0);
        angleExt.vertexAttribDivisorANGLE(this.attribs.hexelColor, 1);
    }

    private enableGradientBuffer({gl}: Renderer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.gradientBuffer);
        gl.enableVertexAttribArray(this.attribs.gradient);
        gl.vertexAttribPointer(this.attribs.gradient, 1, gl.FLOAT, false, 0, 0);
    }

    onDetach({angleExt}: Renderer){
        // Disable instancing (because it affects global state)
        angleExt.vertexAttribDivisorANGLE(this.attribs.offset, 0);
        angleExt.vertexAttribDivisorANGLE(this.attribs.color, 0);   
    }

    draw(renderer: Renderer) {
        let {gl, angleExt} = renderer;
        renderer.useProgram(this);
        this.loadProjection(gl, renderer.camera.matrix);
        if (this.grid.hasHexelChanges) this.loadHexels(gl);
        if (this.grid.hasLayoutChanges) this.loadLayout(gl);
        angleExt.drawElementsInstancedANGLE(gl.TRIANGLES, this.hex.indices.length, gl.UNSIGNED_SHORT, this.hex.indexBufferOffset, this.grid.hexels.length); 
        // angleExt.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, vertices.length, matrices.length); // TODO: try
    }

    private loadProjection(gl: WebGLRenderingContext, projection: Float32Array) {
        gl.uniformMatrix4fv(this.uniforms.projection, false, projection);
    }

    private loadLayout(gl: WebGLRenderingContext) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.offsetBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.grid.points().data, gl.STATIC_DRAW);
        this.grid.hasLayoutChanges = false;
    }

    private loadHexels(gl: WebGLRenderingContext) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.grid.hexels.data, gl.DYNAMIC_DRAW);
        this.grid.hasHexelChanges = false;
    }
}
