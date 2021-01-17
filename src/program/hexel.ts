import { Grid, H_RIGHT, H_UP } from '../hexel/grid'
import { Struct as Mat4 } from '../graphics/struct/mat4';
import * as Vec2 from '../graphics/struct/vec2';
import * as Point from '../graphics/struct/point'
import * as IndexTuple from '../graphics/struct/indextuple'
import VertexBuf from '../graphics/vertexbuf'
import { Projection } from '../graphics/rendering/projection'
import { createProgramInfo, _Bindings, Program} from '../graphics/rendering/program'
import { HexelProgramAttribs as Attribs, HexelProgramUniforms as Uniforms, HexelProgramSource as Source } from './shaders'

interface Bindings extends _Bindings {
    positionBuffer: WebGLBuffer;
    texCoordBuffer: WebGLBuffer;
    gradientBuffer: WebGLBuffer;
    elementBuffer: WebGLBuffer;
    texture: WebGLTexture;
}

export class HexelProgram extends Program<Uniforms, Attribs, Bindings>{

    /**
     * The hexel grid being rendered
     */
    private grid: Grid;

    /**
     * The number of sections in which the grid must be rendered.
     */
    private sectionsPerGrid: number;

    /**
     * The number of hexels in each layout section.
     */ 
    private hexelsPerSection: number;

    /**
     * The number of hexels in each section of the layout.
     */
    private rowsPerSection: number;

    /**
     * The width of each section in model space.
     */
    private sectionHeight: number;

    /**
     * The number of elements being rendered per draw call.
     */
    private elementCount: number;

    /**
     * The position of the bottom left corner of the current layout section.
     * Recycled in order to reduce garbage collection.
     */
    private basePosition = new Vec2.Struct();

    /**
     * The tex coord of the bottom left corner of the current layout section.
     * Recycled in order to reduce garbage collection.
     */
    private baseTexCoord = new Vec2.Struct();

    static create(gl: WebGLRenderingContext, layout: Grid): HexelProgram {

        // Create program info
        let programInfo = createProgramInfo(gl, Source);

        // Create program with empty buffers
        let program = new HexelProgram(programInfo, {
            positionBuffer: gl.createBuffer(),
            texCoordBuffer: gl.createBuffer(),
            gradientBuffer: gl.createBuffer(),
            elementBuffer: gl.createBuffer(),
            texture: gl.createTexture()
        });

        // Set initial layout
        program.setLayout(gl, layout);

        // Return program
        return program;
    }

    bind(gl: WebGLRenderingContext) {
        // Bind program
        gl.useProgram(this.location);
        // Disable blending
        gl.disable(gl.BLEND);
        // Bind position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.positionBuffer);
        gl.vertexAttribPointer(this.attribs.a_position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.attribs.a_position);
        // Bind tex coord buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.texCoordBuffer);
        gl.vertexAttribPointer(this.attribs.a_texCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.attribs.a_texCoord);
        // Bind gradient buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.gradientBuffer);
        gl.vertexAttribPointer(this.attribs.a_gradient, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.attribs.a_gradient);
        // Bind element buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bindings.elementBuffer);
        // Bind texture
        gl.bindTexture(gl.TEXTURE_2D, this.bindings.texture);
    }

    /**
     * Sets this program's projection matrix.
     */
    setProjection(gl: WebGLRenderingContext, projection: Mat4) {
        gl.uniformMatrix4fv(this.uniforms.u_projection, false, projection.data);
    }

    /**
     * Sets the color for each of the hexels on the grid.
     */
    setColors(gl: WebGLRenderingContext, colors: Uint8Array) {
        gl.bindTexture(gl.TEXTURE_2D, this.bindings.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.grid.cols, this.grid.rows,
            0, gl.RGBA, gl.UNSIGNED_BYTE, colors);
    }

    private updateColors(gl: WebGLRenderingContext, colors: Uint8Array) {
        gl.bindTexture(gl.TEXTURE_2D, this.bindings.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.grid.cols, this.grid.rows,
            gl.RGBA, gl.UNSIGNED_BYTE, colors);
    }

    /**
     * Sets the gradient for each of the hexels on the grid.
     */
    private setGradient(gl: WebGLRenderingContext, gradient: Float32Array) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.gradientBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, gradient, gl.STATIC_DRAW);
    }

    private setTexCoords(gl: WebGLRenderingContext, texCoords: Float32Array) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    }

    private setPositions(gl: WebGLRenderingContext, positions: Float32Array) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bindings.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    }

    private setIndices(gl: WebGLRenderingContext, indices: Uint16Array) {
        this.elementCount = indices.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bindings.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    }

    /**
     * Sets a new hexel grid layout.
     */
    setLayout(gl: WebGLRenderingContext, layout: Grid) {
        this.grid = layout;
        // Calculate number of grid sections:
        // cols    rows        size    sections    hexels
        //    1       1           1           1         1
        //    2       2           4           1         4
        //    4       4          16           1        16
        //    8       8          64           1        64
        //   16      16         256           1       256
        //   32      32        1024           1      1024
        //   64      64        4096           1      4096
        //  128     128       16384           2      8192
        //  128     256       32768           4      8192
        //  256     256       65536           8      8192
        //  512     512      262144          32      8192
        // 1024    1024     1048576         128      8192
        //    c       r         c*r  size/hexels     min(size,8192)
        let grid = this.grid;
        let hexelsPerLayout = grid.hexels.capacity();
        this.hexelsPerSection = Math.min(hexelsPerLayout, 8192);
        this.sectionsPerGrid = hexelsPerLayout / this.hexelsPerSection;
        this.rowsPerSection = this.hexelsPerSection / grid.cols;
        this.sectionHeight = this.rowsPerSection * 1.5; // 0.75 * H_HEIGHT
        // Update buffers
        this.setPositions(gl, this.generateVertices());
        this.setTexCoords(gl, this.generateTexCoords());
        this.setGradient(gl, this.generateGradient());
        this.setIndices(gl, this.generateIndices());
        this.setColors(gl, layout.hexels.data);
    }

    /**
     * Applies a change in layout colors.
     */
    applyColorChanges(gl: WebGLRenderingContext) {
        this.updateColors(gl, this.grid.hexels.data);
    }

    /**
     * Applies a change in gradient.
     */
    applyGradientChanges(gl: WebGLRenderingContext) {
        this.setGradient(gl, this.generateGradient());
    }

    /**
     * Draws every section of the hexel layout that falls within the specified projection.
     */
    draw(gl: WebGLRenderingContext, projection: Projection) {
        // Determine which sections we need to render
        let proj = projection.region, grid = this.grid;
        let topRow = grid.pointToHex(Point.Obj.create$(0, proj.top)).r - 1;    // Pad for edge cases
        let botRow = grid.pointToHex(Point.Obj.create$(0, proj.bottom)).r + 1; // Pad for edge cases
        let topSection = Math.max(0, Math.floor(topRow / this.rowsPerSection));
        let botSection = Math.min(this.sectionsPerGrid, Math.ceil(botRow / this.rowsPerSection));
        //console.log('top row', topRow, 'bot row', botRow);
        //console.log('top section', topSection, 'bot section', botSection);
        // Determine offset between sections of the layout
        let positionOffset = -this.sectionHeight,            
            texCoordOffset = 1.0 / this.sectionsPerGrid;  
        // Determine base position (center of bottom left hexel in section)
        this.basePosition.x = 0;
        this.basePosition.y = positionOffset * topSection;
        // Determine base tex coord (center of top left hexel in section) 
        this.baseTexCoord.x = 0;
        this.baseTexCoord.y = texCoordOffset * topSection;
        // Render each section, beginning with the top section and moving down
        for (let i = topSection; i < botSection; i++){ 
            // Set base position
            gl.uniform2fv(this.uniforms.u_basePosition, this.basePosition.data);
            // Set base tex coord
            gl.uniform2fv(this.uniforms.u_baseTexCoord, this.baseTexCoord.data);
            // Perform draw call
            //console.log('base position', this.basePosition.toString());
            //console.log('base tex coord', this.baseTexCoord.toString());
            gl.drawElements(gl.TRIANGLES, this.elementCount, gl.UNSIGNED_SHORT, 0);
            // Offset to next position
            this.basePosition.y += positionOffset; 
            this.baseTexCoord.y += texCoordOffset; 
        }
    }

    /**
     * Generates the vertices for the hexels in the first section of the layout.
     * @returns Float32Array containing the generated vertices.
     */
    private generateVertices() {

        // Init the vertex array with six vertices per hexel
        let buffer = VertexBuf.create(6 * this.hexelsPerSection);

        this.grid.forEachCenterVertex((x, y, i) => {
            // Enter points in CCW order beginning with topmost vertex
            buffer.put$(x, y + 1); // or y + H_HEIGHT/2
            buffer.put$(x - H_RIGHT, y + H_UP);
            buffer.put$(x - H_RIGHT, y - H_UP);
            buffer.put$(x, y - 1); // or y - H_HEIGHT/2
            buffer.put$(x + H_RIGHT, y - H_UP);
            buffer.put$(x + H_RIGHT, y + H_UP);
        }, this.rowsPerSection);

        //console.log('section bounds '+ array.calculateBounds(), 'grid bounds', this.grid.bounds.toString());

        // Return the Float32Array backing the vec2 array
        return buffer.data;
    }


    /**
     * Generates the texture coordinates for the hexels in the first section of the layout.
     * @returns Float32Array containing the texture coordinates.
     */
    private generateTexCoords() {
        // Init the tex coord array with 6 tex coords per hexel
        let buffer = Vec2.Buf.create(6 * this.hexelsPerSection),
            rows = this.grid.rows, cols = this.grid.cols;
        // Starting at the top row and moving down
        for (let r = 0; r < this.rowsPerSection; r++) {
            // Compute v tex coord for this row
            let v = (r + 0.5) / rows;
            // Move left to right across columns
            for (let q = 0; q < cols; q++) {
                // Compute u tex coord for this column
                let u = (q + 0.5) / cols;
                // Add to buffer six times (once for each hexagon vertex)
                for (let i = 0; i < 6; i++) {
                    buffer.put$(u, v);
                }
            }
        }
        // Return the tex coord data
        return buffer.data;
    }


    /**
     * Generates the indices for the hexels in the first section of the layout.
     * @returns Uint16Array containing the generated indices.
     */
    private generateIndices() {
        // Init the indices array with four triangles per hexel
        let buffer = IndexTuple.Buf.create(4 * this.hexelsPerSection);

        // Compute the indices for each hexagon and add to buffer
        for (let offset = 0; buffer.hasValidPosition(); offset += 6) {
            buffer.put$(offset, offset + 1, offset + 2);
            buffer.put$(offset, offset + 2, offset + 3);
            buffer.put$(offset, offset + 3, offset + 4);
            buffer.put$(offset, offset + 4, offset + 5);
        }

        // Return the Uint16Array backing the index tuple array
        return buffer.data;
    }

    /**
     * Generates gradient attributes for the hexels in the first section of this layout.
     */
    private generateGradient() {
        let n = this.hexelsPerSection;
        // Init Float32Array with one float per hexel vertex
        let array = new Float32Array(6 * n), index = 0;
        // If the layout does not have a gradient, return array as all zeros
        if (!this.grid.hasGradient) return array;
        // (2*n^2, n=3 to 5)
        let g1 = 18 / 256, g2 = 32 / 256, g3 = 50 / 256;
        // Apply same gradient to each hexel
        for (let i = 0; i < n; i++) {
            array[index++] = g1;
            array[index++] = g2;
            array[index++] = g3;
            array[index++] = -g1;
            array[index++] = -g2;
            array[index++] = -g3;
        }
        // Return the gradient buffer
        return array;
    }
}

