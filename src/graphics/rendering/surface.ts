import * as Rect from '../struct/rect'
import * as Point from '../struct/point';
import { Renderer as Rdr, _Programs, _Drawables } from './renderer';
type Renderer = Rdr<_Programs, _Drawables>;

interface ScreenPoint {
    clientX: number,
    clientY: number
}

/**
 * Helper class for resizing the canvas and converting points from screen space to clip space.
 */
export class Surface {

    /**
     * The canvas being rendered to.
     */
    public canvas: HTMLCanvasElement;

    /**
     * The renderer.
     */
    public renderer: Renderer;

    /**
     * The bounding box on the canvas.
     */
    private bb: ClientRect;

    /**
     * @param canvas the canvas to manage.
     * @param renderer the surface renderer. 
     */
    constructor(canvas: HTMLCanvasElement, renderer: Renderer) {
        this.canvas = canvas;
        this.renderer = renderer;
        // Notify renderer of surface creation
        this.renderer.onSurfaceCreated();
    }

    /**
     * Requests that the canvas be re-rendered,
     * applying any changes that may have have occurred
     * to either the canvas or the layout.
     */
    requestRender() {
        this.renderer.needToRender = true;
    }

    /**
     * Resizes this surface if the specified width and height differ from the current width and height.
     * @param width the width to set on the surface.
     * @param height the height to set on the surface.
     * @returns whether or not the surface needed to be resized.
     */
    resize(width: number, height: number) {
        // If width or height has changed
        if (this.canvas.width !== width || this.canvas.height !== height) {
            // Resize canvas to specified dimensions
            this.canvas.width = width;
            this.canvas.height = height;
            // Get new bounding box
            this.bb = this.canvas.getBoundingClientRect();
            // Notify renderer of surface change
            this.renderer.onSurfaceChanged(width, height);
            // Notify caller that change took place
            return true;
        }
        // Notify caller that no change took place
        return false;
    }

    /**
     * Gets the position of a screen cordinate relative to the canvas.
     * @param screen the screen coordinate.
     * @param dst where to store the result.
     */
    screenToCanvas(screen: ScreenPoint, dst: Point._ = new Point.Obj()) {
        dst.x = screen.clientX - this.bb.left;
        dst.y = screen.clientY - this.bb.top;
        return dst;
    }

    /**
     * Maps a screen coordinate to NDC space [0,1].
     * @param screen the screen coordinate.
     * @param dst where to store the result.
     */
    screenToNdc(screen: ScreenPoint, dst: Point._ = new Point.Obj()) {
        this.screenToCanvas(screen, dst);
        this.canvasToNdc(dst, dst);
        return dst;
    }

    /**
     * Maps a screen coordinate to clip space.
     * @param screen the screen coordinate.
     * @param dst where to store the result.
     */
    screenToWorld(screen: ScreenPoint, dst: Point._ = new Point.Obj()) {
        this.screenToCanvas(screen, dst);
        this.canvasToNdc(dst, dst);
        this.ndcToWorld(dst, dst);
        return dst;
    }

    /**
     * Maps a canvas coordinate to NDC space [0,1].
     * @param p the canvas coordinate.
     * @param dst where to store the result.
     */
    canvasToNdc(p: Point._, dst: Point._ = new Point.Obj()) {
        // Get width and height of canvas
        let width = this.bb.width, height = this.bb.height;
        // Normalize the coordinate
        dst.x = p.x / width;
        dst.y = (height - p.y) / height;
        return dst;
    }

    /**
     * Maps a normalized device coordinate (NDC) to world space.
     * @param p the normalized device coordinate.
     * @param dst where to store the result.
     */
    ndcToWorld(p: Point._, dst: Point._ = new Point.Obj()) {
        // Determine where point falls within projection region
        let region = this.renderer.projection.region;
        dst.x = region.left + (p.x * Rect.width(region));
        dst.y = region.bottom + (p.y * Rect.height(region));
        return dst;
    }
};

/**
 * The status of an action.
 */
export const enum Status {
    /**
     * The action has just begun.
     */
    Start,
    /**
     * The action is ongoing, and movement is occurring.
     */
    Move,
    /**
     * The action is over.
     */
    End,
    /**
     * The action has left the boundaries of the canvas.
     */
    Leave
};

/**
 * Action on surface triggered a mouse event.
 */
export interface MouseAction{

    /**
     * Array containing the position of the mouse in world space.
     */
    pointers: Point._[];

    /**
     * The status of this action: Start, Move, End, or Leave.
     */
    status: Status;

    /**
     * The event that triggered this action.
     */
    src: MouseEvent;
}

/**
 * Action on surface triggered by a touch event.
 */
export interface TouchAction {

    /**
     * Array containing the position in world space of each of the pointers that are currently down.
     */
    pointers: Point._[];

    /**
     * The status of this action: Start, Move, End, or Leave.
     */
    status: Status;

    /**
     * The event that triggered this action.
     */
    src: TouchEvent;
}

export type Action = MouseAction | TouchAction;

/**
 * Adds a listener to the specified surface.
 */
export function addSurfaceListener(
    window: Window,
    surface: Surface,
    onMouseAction: (a: MouseAction) => void,
    onTouchAction: (a: TouchAction) => void) {

    // Whether or not a pointer is currently down
    let isDragging = false;

    // Listen for mouse events
    window.addEventListener("mousedown", (e) => {
        // Return if not inside canvas or not left clicking
        if (e.target !== surface.canvas) return;
        // The drag has begun -- set the isDragging flag
        isDragging = true;
        // Tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // Get action and pass to callback
        onMouseAction(getMouseAction(e, Status.Start));
    }, false);

    window.addEventListener("mousemove", (e) => {
        // return if we're not dragging
        if (!isDragging) { return; }
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // Get action and pass to callback
        onMouseAction(getMouseAction(e, Status.Move));
    }, false);
    window.addEventListener("mouseout", (e) => {
        // return if we're not dragging
        if (!isDragging) { return; }
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // Get action and pass to callback
        onMouseAction(getMouseAction(e, Status.Leave));
    }, false);
    window.addEventListener("mouseup", (e) => {
        // return if we're not dragging
        if (!isDragging) { return; }
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // The drag is over -- clear the isDragging flag
        isDragging = false;
        // Get action and pass to callback
        onMouseAction(getMouseAction(e, Status.End));
    }, false);

    // Listen for touch events
    // Listen for mouse events
    window.addEventListener("touchstart", (e: TouchEvent) => {
        // Return if not inside canvas
        if (e.target !== surface.canvas) return;
        // The drag has begun -- set the isDragging flag
        isDragging = true;
        // Tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // Get action and pass to callback
        onTouchAction(getTouchAction(e, Status.Start));
    }, false);

    window.addEventListener("touchmove", (e: TouchEvent) => {
        // return if we're not dragging
        if (!isDragging) { return; }
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // Get action and pass to callback
        onTouchAction(getTouchAction(e, Status.Move));
    }, false);
    window.addEventListener("touchleave", (e: TouchEvent) => {
        // return if we're not dragging
        if (!isDragging) { return; }
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // Get action and pass to callback
        onTouchAction(getTouchAction(e, Status.Leave));
    }, false);
    window.addEventListener("touchend", (e: TouchEvent) => {
        // return if we're not dragging
        if (!isDragging) { return; }
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // The drag is over -- clear the isDragging flag
        isDragging = false;
        // Get action and pass to callback
        onTouchAction(getTouchAction(e, Status.End));
    }, false);

    function getMouseAction(event: MouseEvent, status: Status) {
        return {
            src: event,
            status: status,
            pointers: [surface.screenToWorld(event)]
        }
    }

    function getTouchAction(event: TouchEvent, status: Status) {
        return {
            src: event,
            status: status,
            pointers: getPointers(event)
        }
    }

    function getPointers(event: TouchEvent) {
        // Create empty pointers array
        let pointers: Point._[] = [];
        // Get the array of touches
        let touches = event.touches;
        // Convert each of the touches to world space and add to array
        for (let i = 0; i < touches.length; i++) {
            pointers[i] = surface.screenToWorld(touches[i]);
        }
        // Return the array of pointers
        return pointers;
    }
}

export interface Tool {
    onStart?: (action: Action) => void;
    onMove?: (action: Action) => void;
    onLeave?: (action: Action) => void;
    onEnd?: (action: Action) => void;
}

