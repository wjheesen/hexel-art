export interface EllipseProgramUniforms {
	[key: string]: WebGLUniformLocation;
	u_projection: WebGLUniformLocation;
	u_rect: WebGLUniformLocation;
	u_color: WebGLUniformLocation;
}

export interface EllipseProgramAttribs {
	[key: string]: number;
	a_texCoord: number;
}

export const EllipseProgramSource = {"vs":"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform mat4 u_projection;uniform vec4 u_rect;attribute vec2 a_texCoord;varying vec2 v_texCoord;void main(){float left = u_rect[0]; float top = u_rect[1]; float right = u_rect[2]; float bottom = u_rect[3]; float width = right - left; float height = top - bottom; float posX = width * a_texCoord.x + left; float posY = height * a_texCoord.y + bottom; gl_Position = u_projection * vec4(posX, posY, 1.0, 1.0); v_texCoord = a_texCoord;}","fs":"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform vec4 u_color;varying vec2 v_texCoord;void main(){float dx = v_texCoord.x * 2.0 - 1.0; float dy = v_texCoord.y * 2.0 - 1.0; float dist2 = dx * dx + dy * dy; gl_FragColor = u_color * float(dist2 <= 1.0);}"};

export interface HexelProgramUniforms {
	[key: string]: WebGLUniformLocation;
	u_tex: WebGLUniformLocation;
	u_projection: WebGLUniformLocation;
	u_basePosition: WebGLUniformLocation;
	u_baseTexCoord: WebGLUniformLocation;
}

export interface HexelProgramAttribs {
	[key: string]: number;
	a_position: number;
	a_texCoord: number;
	a_gradient: number;
}

export const HexelProgramSource = {"vs":"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform sampler2D u_tex;uniform mat4 u_projection;uniform vec2 u_basePosition;uniform vec2 u_baseTexCoord;attribute vec2 a_position;attribute vec2 a_texCoord;attribute float a_gradient;varying vec4 v_color;void main(){gl_Position.xy = u_basePosition + a_position; gl_Position.z = 1.0; gl_Position.w = 1.0; gl_Position = u_projection * gl_Position; v_color = texture2D(u_tex, u_baseTexCoord + a_texCoord); v_color.r += a_gradient; v_color.g += a_gradient; v_color.b += a_gradient; v_color.a = 1.0;}","fs":"#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec4 v_color;void main(){gl_FragColor = v_color;}"};

export interface LineProgramUniforms {
	[key: string]: WebGLUniformLocation;
	u_projection: WebGLUniformLocation;
	u_line: WebGLUniformLocation;
	u_thickness: WebGLUniformLocation;
	u_color: WebGLUniformLocation;
}

export interface LineProgramAttribs {
	[key: string]: number;
	a_position: number;
}

export const LineProgramSource = {"vs":"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform mat4 u_projection;uniform vec4 u_line;uniform float u_thickness;attribute vec2 a_position;void main(){vec2 p1 = vec2(u_line[0], u_line[1]); vec2 p2 = vec2(u_line[2], u_line[3]); float width = distance(p1, p2); float height = u_thickness; float sx = width * a_position.x; float sy = height * a_position.y; float hypotenuse = width; float adjacent = p2.x - p1.x; float opposite = p2.y - p1.y; float sin = opposite / hypotenuse; float cos = adjacent / hypotenuse; float rx = cos * sx - sin * sy; float ry = sin * sx + cos * sy; float tx = rx + p1.x; float ty = ry + p1.y; gl_Position = u_projection * vec4(tx, ty, 1.0, 1.0);}","fs":"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform vec4 u_color;void main(){gl_FragColor = u_color;}"};

export interface ShapeProgramUniforms {
	[key: string]: WebGLUniformLocation;
	u_projection: WebGLUniformLocation;
	u_model: WebGLUniformLocation;
	u_color: WebGLUniformLocation;
}

export interface ShapeProgramAttribs {
	[key: string]: number;
	a_position: number;
}

export const ShapeProgramSource = {"vs":"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform mat4 u_projection;uniform mat3 u_model;attribute vec2 a_position;void main(){gl_Position.xy = a_position; gl_Position.z = 1.0; gl_Position.xyz = u_model * gl_Position.xyz; gl_Position.w = 1.0; gl_Position = u_projection * gl_Position;}","fs":"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform vec4 u_color;void main(){gl_FragColor = u_color;}"};
