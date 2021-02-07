import { HexelGrid, H_WIDTH } from './hexel/hexel-grid';

import { EllipseProgram } from './program/ellipse';
import { LineProgram } from './program/line';
import { ShapeProgram } from './program/shape';
import { HexelProgram } from './program/hexel';

import { Shape } from './graphics/shape';
import { Model } from './graphics/model';

import * as Rect from './graphics/struct/rect';
import * as Line from './graphics/struct/line';
import * as Color from './graphics/struct/color';
import * as ColorF from './graphics/struct/colorf';

import { Projection } from './graphics/rendering/projection';
import { Renderer, _Programs, _Drawables } from './graphics/rendering/renderer';

interface Programs extends _Programs {
    ellipse: EllipseProgram,
    line: LineProgram,
    shape: ShapeProgram,
    hexel: HexelProgram
}

interface Drawables extends _Drawables {
    ellipse: Rect.Struct,
    line: Line.Struct,
    shape: Shape,
}

export class HexelRenderer extends Renderer<Programs, Drawables> {

    /**
     * RGBA color for rendering shapes and ellipses.
     */
    private rgba = new ColorF.Struct();

    /**
     * The thickness of the lines to renderer
     */ 
    public lineThickness = H_WIDTH;

    /**
     * Creates a renderer able to render hexels, lines, ellipses, and shapes. 
     * @param gl the WebGL rendering context.
     * @param layout the initial hexel layout.
     * @param models the type of shapes that can be rendered. 
     */
    static create(gl: WebGLRenderingContext, grid: HexelGrid, models: Model[]) {
        // Init projection
        let maxZoom = Math.max(grid.rows, grid.cols);
        let projection = new Projection(grid.bounds, 1, maxZoom);
        // Init programs
        let programs: Programs = {
            ellipse: EllipseProgram.create(gl),
            line: LineProgram.create(gl),
            shape: ShapeProgram.create(gl, models),
            hexel: HexelProgram.create(gl, grid)
        }
        // Init renderables
        let renderables: Drawables = {
            ellipse: null,
            line: null,
            shape: null,
        }
        // Pass to new hexel renderer object
        return new HexelRenderer(gl, projection, programs, renderables);
    }

    /**
     * Sets the draw color used by this renderer.
     */ 
    set color(color: Color._) {
        this.rgba.setFromColor(color);
        //this.rgba.premultiplyAlpha();
    }

    onSurfaceCreated() {
        let gl = this.gl;
        // Set clear color to transparent
        gl.clearColor(0, 0, 0, 0);
        // Enable culling
        gl.enable(gl.CULL_FACE);
        // Set default cull mode
        gl.cullFace(gl.BACK);
        // Set default alpha blending function
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }

    onDrawFrame() {
        // Unpack member variables
        let { gl, projection, programs, drawables, lineThickness, rgba } = this;
        let { hexel: hexelProgram, shape: shapeProgram, line: lineProgram, ellipse: ellipseProgram } = programs
        let { shape, line, ellipse } = drawables;
        let { matrix } = projection;
        // Clear background
        //gl.clear(gl.COLOR_BUFFER_BIT);
        // Render layout
        this.useProgram(hexelProgram);
        hexelProgram.setProjection(gl, matrix);
        hexelProgram.draw(gl, projection);
        // Render shape (if applicable)
        if (shape) {
            this.useProgram(shapeProgram);
            shapeProgram.setProjection(gl, matrix);
            shapeProgram.setColor(gl, rgba);
            shapeProgram.setModel(gl, shape.model);
            shapeProgram.setModelMatrix(gl, shape.matrix);
            shapeProgram.draw(gl);
        }
        // Render ellipse (if applicable)
        else if (ellipse) {
            this.useProgram(ellipseProgram);
            ellipseProgram.setProjection(gl, matrix);
            ellipseProgram.setColor(gl, rgba);
            ellipseProgram.setEllipse(gl, ellipse);
            ellipseProgram.draw(gl);
        }
        // Render line (if applicable)
        else if (line) {
            this.useProgram(lineProgram);
            lineProgram.setProjection(gl, matrix);
            lineProgram.setColor(gl, rgba);
            lineProgram.setThickness(gl, lineThickness);
            lineProgram.setLine(gl, line);
            lineProgram.draw(gl);
        }
    }

    applyGradientChanges() {
        this.programs.hexel.applyGradientChanges(this.gl);
        this.needToRender = true;
    }

    applyColorChanges() {
        this.programs.hexel.applyColorChanges(this.gl);
        this.needToRender = true;
    }
};
