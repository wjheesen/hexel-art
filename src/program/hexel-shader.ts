export interface Uniforms {
    readonly [name: string]: WebGLUniformLocation;
    projection: WebGLUniformLocation;
}

export interface Attributes {
    readonly [name: string]: number;
    hexelColor: number;
    position: number;
    offset: number;
    gradient: number;
}

export type Variables = Uniforms|Attributes;

export const vertex = "precision mediump float;uniform mat4 c;attribute vec4 d;attribute vec2 e,f;attribute float b;varying vec4 a;void main(){gl_Position=c*vec4(e+f,1.,1.),a=d,a.r+=b,a.g+=b,a.b+=b,a.a=1.;}", fragment = "precision mediump float;varying vec4 a;void main(){gl_FragColor=a;}", attributeRenaming = {"hexelColor":"d","position":"e","offset":"f","gradient":"b"}, uniformRenaming = {"projection":"c"};
