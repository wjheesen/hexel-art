type GL = WebGLRenderingContext;

/** The source code for a GL program */
interface SourceCode {
    /** The source code for the vertex shader */
    vs: string,
    /** The source code for the fragment shader */
    fs: string
}

/**
 * Holds information about a WebGLProgram's uniforms, attributes, and location.
 */
export interface ProgramInfo {

    /**
     * The location of the program in WebGL.
     */
    location: WebGLProgram;

    /**
     * The locations of the uniforms associated with the program, keyed by the uniform name.
     */
    uniforms: _Uniforms;

    /**
     * The locations of the attributes associated with the program, keyed by the attribute name.
     */
    attribs: _Attribs;
}

/**
 * Holds the locations of uniforms associated with a program, keyed by the uniform name.
 */
export interface _Uniforms {
    [key: string]: WebGLUniformLocation;
}

/**
 * Holds the locations of attribs associated with a program, keyed by the attrib name.
 */
export interface _Attribs {
    [key: string]: number;
}

/**
 * Holds the locations of WebGLObjects associated with a program, with no requirement for key names.
 */
export interface _Bindings {
    [key: string]: WebGLObject;
}

export abstract class Program<U extends _Uniforms, A extends _Attribs, B extends _Bindings>{

    /**
     * The location of this program in WebGL.
     */
    location: WebGLProgram;

    /**
     * The locations of the uniforms associated with this program, keyed by the uniform name.
     */
    uniforms: U;

    /**
     * The locations of the attributes associated with this program, keyed by the attribute name.
     */
    attribs: A;

    /**
     * The locations of the WebGL objects associated with this program.
     */
    bindings: B;

    /**
     * Creates a program with the specified program info and bindings.
     * @param info info about the compiled program.
     * @param bindings the WebGL objects associated with the program.
     */
    constructor(info: ProgramInfo, bindings: B) {
        this.location = info.location;
        this.uniforms = info.uniforms as U;
        this.attribs = info.attribs as A;
        this.bindings = bindings;
    }

    /**
     * Binds this program and any associated buffers to the specified context.
     */
    abstract bind(gl: GL): void;
}

/**
 * Creates a WebGLProgram and extracts ProgramInfo from it.
 * @param gl the WebGL context.
 * @param source the source code for the program.
 * @returns the extracted program info. 
 */
export function createProgramInfo(gl: GL, src: SourceCode) {
    return extractProgramInfo(gl, createProgramFromSourceCode(gl, src));
}


/**
 * Extracts uniform and attribute location info from a WebGL Program.
 * @param  gl the WebGL context.
 * @param  program the program from which to extract info.
 * @returns the extracted program info. 
 */
export function extractProgramInfo(gl: GL, program: WebGLProgram): ProgramInfo {

    // Get the number of uniforms and attributes in the program
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    let attribCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    // Get uniform locations
    let uniforms: _Uniforms = {};
    for (let i = 0; i < uniformCount; i++) {
        let name = gl.getActiveUniform(program, i).name;
        uniforms[name] = gl.getUniformLocation(program, name);
    }

    // Get attribute locations
    let attribs: _Attribs = {};
    for (let i = 0; i < attribCount; i++) {
        let name = gl.getActiveAttrib(program, i).name;
        attribs[name] = gl.getAttribLocation(program, name);
    }

    // Return program info
    return {
        location: program,
        uniforms: uniforms,
        attribs: attribs
    };
}

/**
 * Creates a program from 2 shaders.
 * @param  gl the WebGL context.
 * @param  vertexShader string containing code for the vertex shader.
 * @param  fragmentShader string containing code for the fragment shader.
 * @returns the program.
 */
export function createProgramFromSourceCode(gl: GL, src: SourceCode) {
    // Compile vertex and fragment shader
    let vs = compileShader(gl, src.vs, gl.VERTEX_SHADER);
    let fs = compileShader(gl, src.fs, gl.FRAGMENT_SHADER);
    // Create program and return
    return createProgramFromShaders(gl, vs, fs);
};

/**
 * Creates a program from 2 shaders.
 * @param  gl rhe WebGL context.
 * @param  vertexShader a compiled vertex shader.
 * @param  fragmentShader a compiled fragment shader.
 * @returns the program.
 */
export function createProgramFromShaders(gl: GL, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    // create a program.
    var program = gl.createProgram();

    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // link the program.
    gl.linkProgram(program);

    // Check if it linked.
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // something went wrong with the link
        throw ("program filed to link:" + gl.getProgramInfoLog(program));
    }

    return program;
};

/**
 * Creates and compiles a shader.
 * @param gl the WebGL Context.
 * @param shaderSource the GLSL source code for the shader.
 * @param shaderType the type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
 * @returns the shader.
 */
export function compileShader(gl: GL, shaderSource: string, shaderType: number) {
    // Create the shader object
    var shader = gl.createShader(shaderType);

    // Set the shader source code.
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check if it compiled
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        // Something went wrong during compilation; get the error
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }

    return shader;
}









