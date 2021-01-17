import { Projection } from './projection';
import { Program as _Program, _Uniforms } from './program';
import { _Attribs, _Bindings } from './program';

type Program = _Program<_Uniforms, _Attribs, _Bindings>;

/**
 * List of WebGL programs being used by a renderer.
 */
export interface _Programs {
    [key: string]: Program;
}

/**
 * List of renderables being draw by a renderer.
 */ 
export interface _Drawables {
    [key: string]: Object;
}

/**
 * Helper class for graphics with WebGL.
 */
export abstract class Renderer<P extends _Programs, D extends _Drawables> {

    /**
     * The rendering context.
     */
    public gl: WebGLRenderingContext;

    /**
     * The projection being applied by this renderer.
     */
    public projection: Projection;

    /**
     * The programs being used by this renderer.
     */
    public programs: P;

    /**
     * The renderables being rendered by this renderer.
     */
    public drawables: D;

    /**
     * The location of the currently bound program.
     */
    private currentProgram: Program;

    /**
     * True if this renderer should re-render on next frame.
     */
    public needToRender = false;

    /**
     * Creates a new rendering object. 
     * @param gl the WebGL context for the renderer
     * @param projection the projection to use.
     * @param programs the WebGL programs for the renderer.
     * @param renderables the objects to render. 
     */
    constructor(gl: WebGLRenderingContext, projection: Projection, programs: P, renderables: D) {
        this.gl = gl;
        this.projection = projection;
        this.programs = programs;
        this.drawables = renderables;
    }

    /**
     * Called when the surface hosting this renderer is first created.
     */
    abstract onSurfaceCreated(): void;

    /**
     * Called whenever the canvas size changes.
     * @param width the new width of the canvas.
     * @param height the new height of the canvas.
     */
    onSurfaceChanged(width: number, height: number) {
        // Update the viewport to match the new dimensions of the drawing buffer
        this.gl.viewport(0, 0, width, height);

        // Set projection to fill viewport
        this.projection.fillViewport(width, height);

        // Mark need to re-render
        this.needToRender = true;
    }

    /**
     * Called whenever the canvas needs to be re-rendered.
     */
    abstract onDrawFrame(): void;

    /**
     * Binds to the specified program, if not already bound.
     * @param program the program to bind.
     */
    useProgram(program: Program) {
        // If the program is not already being used
        if (this.currentProgram !== program) {
            // Start using it
            program.bind(this.gl);
            // Mark it as the current program
            this.currentProgram = program;
        }
    }
};