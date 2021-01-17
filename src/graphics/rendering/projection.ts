import * as Point from '../struct/point';
import * as Vec2 from '../struct/vec2';
import * as Rect from '../struct/rect';
import * as Mat4 from '../struct/mat4'


/**
 * Defines the rectangular region of clip space to display on the screen.
 */
export class Projection {

    /**
     * The bounds of the scene being projected.
     */
    public bounds: Rect.Obj;

    /**
     * The region displayed by this projection after applying its scale and offset values.
     */
    public region = new Rect.Obj();

    /**
     * The projection matrix.
     */
    public matrix = new Mat4.Struct();

    /**
     * The minimum zoom that may be applied to the default projection region.
     */
    public minZoom: number;

    /**
     * The maximum zoom that may be applied to the default projection region.
     */
    public maxZoom: number;

    /**
     * The zoom applied to the default projection region. Read only.
     */
    public zoom = 1;

    /**
     * The translational offset applied to the default projection region. Read only.
     */
    public pan = new Vec2.Struct();

    /**
     * Creates a projection initialized to {0, 0, 0, 0}.
     * @param layout the layout to project.
     * @param minZoom the minimum zoom that may be applied.
     * @param maxZoom the maximum zoom that may be applied.
     */
    constructor(bounds: Rect.Obj, minZoom: number, maxZoom: number) {
        this.bounds = bounds;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
    }

    /**
     * Sets this projection to fill a viewport, respecting the aspect ratio of the projected layout.
     * @param vw the new width of the viewport.
     * @param vh the new height of the viewport.
     */
    fillViewport(vw: number, vh: number) {
        // Destructure
        let {bounds, region, zoom, pan} = this;
        // Reset the projection region to the bounds of the layout
        this.region.set(bounds);
        // Compute width and height of projected layout bounds
        let lw = Rect.width(bounds);
        let lh = Rect.height(bounds);
        // Compute width to height ratio of viewport and layout
        let vr = vw / vh;
        let lr = lw / lh;
        // If layout width ratio less than canvas width ratio
        if (lr < vr) {
            // Increase width so that ratios are equal
            Rect.scale(region, vr / lr, 1);
        } else {
            // Otherwise increase height so that ratios are equal
            Rect.scale(region, 1, lr / vr);
        }
        // Restore zoom and pan to projection region
        Rect.stretch(region, 1 / zoom);
        Rect.offset(region, pan.x, pan.y);
        // Apply changes to our matrix
        this.applyChangesToMatrix();
    }

    /**
     * Applies the specified pan to this projection, respecting the bounds of the projected layout.
     * @param pan the pan to apply. 
     */
    panByVector(pan: Vec2._) {
        this.applyChangeInPan(pan);
        this.applyChangesToMatrix();
    }

    /**
     * Applies a change in zoom to this projection, fixing the focus point and respecting the min/max zoom options.
     * @param changeInZoom change in zoom multiplier: zoom' = zoom * changeInZoom.
     * @param focus the focus point. 
     */
    zoomToPoint(changeInZoom: number, focus: Point._) {
        let region = this.region;
        // Normalize (x,y) coordinates of focus point 
        let normX = (focus.x - region.left) / Rect.width(region);
        let normY = (focus.y - region.bottom) / Rect.height(region);
        // Apply change in zoom
        this.applyChangeInZoom(changeInZoom);
        // Determine position of focus point after change in zoom
        let aft = new Vec2.Obj();
        aft.x = region.left + (normX * Rect.width(region));
        aft.y = region.bottom + (normY * Rect.height(region));
        // Compute change in pan that will take us back to focus point
        let changeInPan = Vec2.Obj.fromPointToPoint(aft, focus);
        // Apply change in pan
        this.applyChangeInPan(changeInPan);
        // Apply changes to our matrix
        this.applyChangesToMatrix();
    }

    /**
     * Applies a change in zoom to this projection, respecting min/max zoom options.
     * @param changeInZoom the change in zoom: zoom' = zoom * changeInZoom.
     */
    applyChangeInZoom(changeInZoom: number) {
        // Compute the target zoom
        let targetZoom = this.zoom * changeInZoom;
        // If target zoom falls below our min
        if (targetZoom < this.minZoom) {
            // Adjust change in zoom so that zoom * changeInZoom = minZoom
            changeInZoom = this.minZoom / this.zoom;
            // Set zoom to min allowable
            this.zoom = this.minZoom;
            // Otherwise, if traget zoom is above our max
        } else if (targetZoom > this.maxZoom) {
            // Adjust change in zoom so that zoom * changeInZoom = maxZoom
            changeInZoom = this.maxZoom / this.zoom;
            // Set zoom to max allowable
            this.zoom = this.maxZoom;
        } else {
            // Otherwise we can safely set zoom to our target
            this.zoom = targetZoom;
        }
        // Now we can safely apply change in zoom to our projection region
        Rect.stretch(this.region, 1 / changeInZoom);
        // Return change in zoom so caller can check if it was modified
        return changeInZoom;
    }

    /**
     * Applies a change in pan to this projection, respecting the bounds of the projected layout.
     * @param changeInPan the change in pan: pan' = pan + changeInPan.
     */
    applyChangeInPan(changeInPan: Vec2._) {
        // Compute the target pan
        let targetPan = Vec2.Obj.create(this.pan);
        targetPan.add(changeInPan);

        // Determine how far we can pan from center of layout
        let far = Rect.Obj.create(this.bounds);                     // Copy projection boundaries
        far.mulScalar((this.zoom - this.minZoom) / this.zoom); // Determine max allowable size given zoom
        far.offset(-Rect.centerX(far), -Rect.centerY(far));   // Center at origin so we know how far left, up, right, and down we can go

        // If target pan is too far left
        if (targetPan.x < far.left) {
            // Adjust change in pan so that pan.x + changeInPan.x = far.left
            changeInPan.x = far.left - this.pan.x;
        }
        // If target pan is too far right
        else if (targetPan.x > far.right) {
            // Adjust change in pan so that pan.x + changeInPan.x = far.right
            changeInPan.x = far.right - this.pan.x;
        }
        // If target pan is too far down
        if (targetPan.y < far.bottom) {
            // Adjust change in pan so that pan.y + changeInPan.y = far.bottom
            changeInPan.y = far.bottom - this.pan.y;
        }
        // If target pan is too far up
        else if (targetPan.y > far.top) {
            // Adjust change in pan so that pan.y + changeInPan.y = far.top
            changeInPan.y = far.top - this.pan.y;
        }

        // Now we can safely apply change in pan to our projection region
        this.region.offset(changeInPan.x, changeInPan.y);
        // And update our pan variable accordingly
        this.pan.add(changeInPan);
    }

    /**
     * Recalculates the projection matrix to reflect changes in the projection region.
     */
    applyChangesToMatrix() {
        this.matrix.ortho(this.region,0.1, 10)
    }
};