import { Drawable, FillProgram, Mat2dBuffer, PolygonModel, Renderer } from "@wjheesen/glib";

export class Scene implements Drawable {

    constructor(
        private fill: FillProgram,
        private hexagon: PolygonModel,
        private matrices: Mat2dBuffer
    ) {}

    draw(renderer: Renderer): void {
        let { gl } = renderer;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.fill.draw(renderer, this.hexagon.mesh, this.matrices);
    }
}