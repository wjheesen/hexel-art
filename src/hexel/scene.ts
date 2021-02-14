import { Drawable, FillProgram, Mat2dBuffer, PolygonModel, Renderer } from "@wjheesen/glib";
import { HexelProgram } from "../program/hexel-program";
import { HexelGrid } from "./hexel-grid";

export class Scene implements Drawable {

    constructor(
        private hexel: HexelProgram,
        private grid: HexelGrid,
    ) {}

    hasRenderRequest() {
        return this.grid.hasHexelChanges || this.grid.hasLayoutChanges;
    }

    draw(renderer: Renderer): void {
        let { gl } = renderer;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.hexel.draw(renderer);
    }
}