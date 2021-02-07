import { ShaderCompiler } from "@wjheesen/glib/src/glslx/shader-compiler";

let compiler = new ShaderCompiler;
compiler.compileTsFiles('*.glslx', './');