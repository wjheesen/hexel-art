/// <reference path="../typings/index.d.ts" />

import { HexelRenderer } from './renderer';
import { bat, flower, heart } from './polygons';
import { Option, ColorOption, InterpolatedOption, LerpedOption, Lerper } from './options'

import ScaleToFit from './graphics/scaletofit'
import { Model } from './graphics/model'
import { Shape } from './graphics/shape'
import { Ellipse } from './graphics/ellipse'
import { BitArray, BinaryImage } from './graphics/bit'

import * as Point from './graphics/struct/point'
import * as Rect from './graphics/struct/rect'
import * as Line from './graphics/struct/line'
import * as Vec2 from './graphics/struct/vec2'
import * as Color from './graphics/struct/color'

import { Projection } from './graphics/rendering/projection';
import { Surface, Tool, Action, TouchAction, MouseAction, Status, addSurfaceListener } from './graphics/rendering/surface';

import { Grid, H_WIDTH, copyPixelsToGrid, copyHexelsToCanvas } from './hexel/grid';

declare const vex: any;
vex.defaultOptions.className = 'vex-theme-wireframe';

// Init models
const models = [
    Model.polygon(3),
    Model.square(),
    Model.diamond(),
    Model.polygon(5),
    Model.polygon(6),
    Model.star5(),
    Model.fromSource(heart),
    Model.fromSource(flower),
    Model.fromSource(bat),
];

// Init undo vars
const UndoStack: BinaryImage[] = [];
const RedoStack: BinaryImage[] = [];
const MaxUndoStackSize = 150000; // 150kb
let undoStackSize = 0;
function clearStacks() {
    RedoStack.length = 0;
    UndoStack.length = 0;
    undoStackSize = 0;
}

// For adding image to canvas
let imgUploaded: boolean;

// Init tools
const ZoomTool: Tool = {

    onStart(action: Action) {
        // Get first two pointers
        let p1 = action.pointers[0];
        let p2 = action.pointers[1];
        // Get the span between the two pointers
        this.previousSpan = Point.distance(p1, p2);
        // Get the focus point
        this.previousFocus = Point.Obj.midpoint(p1, p2);
    },

    onMove(action: Action) {
        if (!this.previousFocus) {
            this.onStart(action);
            return;
        }
        // Get a handle to the projection
        let proj = renderer.projection;
        // Get first two pointers
        let p1 = action.pointers[0];
        let p2 = action.pointers[1];
        // Get the span between the two pointers
        let span = Point.distance(p1, p2);
        // Zoom by ratio of span and previous span
        let ds = proj.applyChangeInZoom(span / this.previousSpan);
        // Recalculate previous span in case zooming was restricted
        this.previousSpan = span / ds; 
        // Get the focus point
        let focus = Point.Obj.midpoint(p1, p2);
        // Get vector to previous focus point
        let df = Vec2.Obj.fromPointToPoint(focus, this.previousFocus);
        // Adjust vector for change in zoom
        df.divScalar(ds);
        // Pan so that previous focus point remains in focus
        proj.applyChangeInPan(df);
        // Recalculate previous focus point in case panning was restricted
        this.previousFocus.x = focus.x + df.x;
        this.previousFocus.y = focus.y + df.y;
        // Recalculate projection matrix
        proj.applyChangesToMatrix();
        // Request render
        renderer.needToRender = true;
    },

    onEnd(action: Action) {
        this.previousFocus = null;
    }
};
const PanTool: Tool = {

    onStart(action: Action) {
        // Keep track of previous point
        this.previous = action.pointers[0];
    },

    onMove(action: Action) {
        if (!this.previous) {
            this.onStart(action);
            return;
        }
        // Get current point
        let current = action.pointers[0];
        // Translate by vector from current point to previous point (reverse direction)
        let vec = Vec2.Obj.fromPointToPoint(current, this.previous);
        renderer.projection.panByVector(vec);
        renderer.needToRender = true;
        // Keep track of previous point
        this.previous.x = current.x + vec.x;
        this.previous.y = current.y + vec.y;
    },

    onEnd(action: Action) {
        this.previous = null;
    }
};
const Brush: Tool = {

    onStart(action: Action) {
        // Get current point in cubic space, rounded
        let current = grid.pointToHex(action.pointers[0]).round();
        // Find index of the corresponding hexagon
        let index = grid.indexOfCube(current);
        //console.log('pt', action.pointers[0], 'cube', current, 'index', index);
        // If found
        if (index !== -1) {
            //// Change the color of the hexagons in the specified range
            this.record = grid.beginStroke(current, brushRadius.val, drawColor.val);
            //// Apply changes to screen
            renderer.applyColorChanges();
            //// Keep track of previous point
            this.previous = current;
        }
    },

    onMove(action: Action) {
        if (!this.previous) {
            this.onStart(action);
        } else {
            // Get current point in cubic space, rounded
            let current = grid.pointToHex(action.pointers[0]).round();
            // If current point differs from previous point
            if (!current.equals(this.previous)) {
                // Add stroke from previous point to current point
                grid.continueStroke(this.previous, current, brushRadius.val, drawColor.val, this.record);
                // Apply changes to screen
                renderer.applyColorChanges();
                // Keep track of previous point
                this.previous = current;
            } 
        }
    },

    onEnd(action: Action) {
        // Add record to undo stack
        if(this.record) addToUndoStack(this.record);
        // Release hold on previous point
        this.previous = null;
        // Release hold on record
        this.record = null
    }
}
const PaintBucket: Tool = {

    onStart(action: Action) {
        if (renderer.needToRender) return;
        // Get current point
        let current = action.pointers[0];
        // Find index of the corresponding hexagon
        let index = grid.indexOfHexel(current);
        // If found
        if (index !== -1) {
            let result = grid.floodFill(index, drawColor.val);
            // Add record to undo stack
            addToUndoStack(result);
            // Load changes into gl context
            renderer.applyColorChanges();
        }
    }

}
const ColorSampler: Tool = {

    onStart(action: Action) {
        this.onMove(action);
    },

    onMove(action: Action) {
        // Get current point
        let current = action.pointers[0];
        // Find index of the corresponding hexagon
        let index = grid.indexOfHexel(current);
        if (grid.hexels.moveToPosition(index)) {
            setDrawColor(grid.hexels);
            unconfirmedAlpha = drawColor.val.a / 0xff;
        }
    },

}
const LineTool: Tool = {

    onStart(action: Action) {
        // Keep track of start point
        this.start = action.pointers[0];
    },

    onMove(action: Action) {
        if (this.start) {
            // Get end point
            let end = action.pointers[0];
            // Init line if needed
            let {drawables: d} = renderer;
            if (!d.line) {
                d.line = new Line.Struct();
            }
            // Compute line from start to end
            d.line.setThrough(this.start, end);
            // Re-render
            renderer.needToRender = true;
        }
    },

    onEnd(action: Action) {
        // Release reference to start point
        this.start = null;
        // If a line was created
        if (renderer.drawables.line) {
            let result = grid.addLine(renderer.drawables.line, lineThickness.val, drawColor.val);
            // Add result to undo stack
            addToUndoStack(result);
            // Remove line from renderer
            renderer.drawables.line = null;
            // Apply changes to screen
            renderer.applyColorChanges();
        }
    }
}
const EllipseTool: Tool = {

    onStart(action: Action) {
        // Keep track of start point
        this.start = action.pointers[0];
    },

    onMove(action: Action) {
        if (this.start) {
            // Get end point
            let end = action.pointers[0];
            // Init ellipse rect if needed
            let {drawables: d} = renderer;
            if (!d.ellipse) {
                d.ellipse = new Rect.Struct();
            }
            // Set boundaries of ellipse
            d.ellipse.setUnionOfPoints([this.start, end]);
            // Boundaries must be square if maintaining aspect
            if (maintainAspect.val) {
                Rect.expandToSquare(d.ellipse);
            }
            // Re-render
            renderer.needToRender = true;
        }
    },

    onLeave(action: Action) {
        this.onMove(action);
    },

    onEnd(action: Action) {
        // Release reference to start point
        this.start = null;
        // If an ellipse was created
        let {drawables: d} = renderer;
        if (d.ellipse) {
            // set color of hexels
            let result = grid.addEllipse(Ellipse.withBoundaries(d.ellipse), drawColor.val);
            // Add result to undo stack
            addToUndoStack(result);
            // Remove shape from renderer
            renderer.drawables.ellipse = null;
            // Apply changes to screen
            renderer.applyColorChanges();
        }
    }
};
const ShapeTool: Tool = {
    onStart(action: Action) {
        // Keep track of start point
        this.start = action.pointers[0];
    },

    onMove(action: Action) {
        if (this.start) {
            // Get end point
            let end = action.pointers[0];
            // Init shape if necessary
            let {drawables: d} = renderer;
            if (!d.shape) {
                d.shape = new Shape(model);
            }
            // If we're maintaining aspect ratio
            if (maintainAspect.val) {
                // Stretch vertices across line
                d.shape.stretchAcrossLine(this.start, end);
            } else {
                // Otherwise fit in rect
                let rect = Rect.Obj.unionOfPoints([this.start, end]);
                d.shape.fitInRect(rect, ScaleToFit.Fill);
            }
            // Re-render
            renderer.needToRender = true;
        }
    },

    onEnd(action: Action) {
        // Release reference to start point
        this.start = null;
        // If a shape was created
        let {drawables: d} = renderer;
        if (d.shape) {
            // Add shape to layout
            let result = grid.addShape(d.shape, drawColor.val);
            // Add result to undo stack
            addToUndoStack(result);
            // Remove shape from renderer
            d.shape = null;
            // Apply changes to screen
            renderer.applyColorChanges();
        }
    }
};

// Init options
let ClearColor = Color.Struct.create$(205, 205, 205, 255),
    transparentColor = Color.Struct.create$(205, 205, 205, 255),
    drawColor = ColorOption.create("drawColor", Color.Struct.create$(39, 78, 19, 255)),
    brushRadius = LerpedOption.create(new Lerper(-1, 1), Option.num("brushRadius", 2, 1, 50)),
    lineThickness = LerpedOption.create(new Lerper(0, H_WIDTH), Option.num("lineThickness", 2, 1, 100)),
    maintainAspect = Option.bool("maintainAspect", true),
    shadowsEnabled = Option.bool("shadowsEnabled", true),
    zoomSpeed = LerpedOption.create(Lerper.fromRange(1, 2, 1000), Option.num("zoomSpeed", 500, 1, 1000)),
    numColumns = InterpolatedOption.create(powOf2, Option.num("log2cols", 7, 5, 9)), 
    numRows = InterpolatedOption.create(powOf2, Option.num("log2rows", 7, 5, 9)), 
    filename = Option.str("filename", "My Hexel Art"),
    unconfirmedAlpha = drawColor.val.a / 0xff,
    tool = Brush,
    toolId = "#brush",
    model = models[0];

// Init canvas and WebGL context
const onScreenCvs = <HTMLCanvasElement>document.getElementById("onscreen-canvas");
const gl = onScreenCvs.getContext('webgl'/*, { alpha: false }*/);

// Init Grid
let grid = new Grid(numColumns.val, numRows.val);
grid.clear(ClearColor);
grid.hasGradient = shadowsEnabled.val;

// Init backing state
let state = Color.Buf.create(grid.hexels.capacity());
grid.hexels.moveToFirst();
state.putBuffer(grid.hexels);

// Init renderer
let renderer = HexelRenderer.create(gl, grid, models);
renderer.lineThickness = lineThickness.val;
renderer.color = drawColor.val;

// Init rendering surface
const surface = new Surface(onScreenCvs, renderer);

// Init canvas used to upload images and download hexel art as .png
const offScreenCvs = document.getElementById("offscreen-canvas") as HTMLCanvasElement;
const ctx = offScreenCvs.getContext("2d");
offScreenCvs.width = grid.cols;
offScreenCvs.height = grid.rows;

initUi();
addScrollListener(onScreenCvs, (ev: any) => {
    // Tell the browser we're handling this event
    ev.preventDefault();
    ev.stopPropagation();
    // Get direction of scroll
    let isPositive = ev.detail < 0 || ev.wheelDelta > 0;
    // Choose change in zoom based on direction
    let changeInZoom = isPositive ? zoomSpeed.val : 1 / zoomSpeed.val;
    // Compute world coordinate
    let coord = surface.screenToWorld(ev);
    // Pass event onto projection
    renderer.projection.zoomToPoint(changeInZoom, coord);
    // Re-render
    renderer.needToRender = true;
});
addSurfaceListener(window, surface, handleMouseAction, handleTouchAction);
beginRenderLoop();

function handleMouseAction(a: MouseAction) {
    // Do nothing if right clicking
    if (a.src.button === 2) return;
    // Choose pan tool if wheel is down
    let mTool = a.src.button === 1 ? PanTool : tool;
    // Let tool handle action
    switch (a.status) {
        case Status.Start:
            checkImgUploaded();
            checkAltKey(a.src);
            if (mTool.onStart) mTool.onStart(a);
            break;
        case Status.Move:
            if (mTool.onMove) mTool.onMove(a);
            break;
        case Status.Leave:
            if (mTool.onLeave) mTool.onLeave(a);
            break;
        case Status.End:
            if (mTool.onEnd) mTool.onEnd(a);
            break;
    }

    function checkAltKey(e: MouseEvent) {
        if (e.button === 0 && e.altKey) {
            // Get random color
            drawColor.val.setRandom();
            setDrawColor(drawColor.val);
        }
    }
}

function handleTouchAction(a: TouchAction) {
    // Choose zoom tool if more than one finger is down
    let mTool = tool;
    if (a.pointers.length > 1) {
        mTool = ZoomTool;
    } else {
        ZoomTool.onEnd(a);
    }
    // Let tool handle action
    switch (a.status) {
        case Status.Start:
            checkImgUploaded();
            if (mTool.onStart) mTool.onStart(a);
            break;
        case Status.Move:
            if (mTool.onMove) mTool.onMove(a);
            break;
        case Status.Leave:
            if (mTool.onLeave) mTool.onLeave(a);
            break;
        case Status.End:
            if (mTool.onEnd) mTool.onEnd(a);
            break;
    }
}

function addToUndoStack(data: BitArray) {
    // Copy the draw color
    let color = Color.Struct.create(drawColor.val);
    // Compress data to binary image
    let img = BinaryImage.make(data, grid.cols, grid.rows, color);
    // If not all zeros
    if (img) {
        // Add to undo stack
        UndoStack.push(img);
        // Clear redo stack
        RedoStack.length = 0;
        // Keep track of stack size
        undoStackSize += img.data.data.length;
        // If stack size is too big
        while (undoStackSize > MaxUndoStackSize) {
            // Shift first element from stack
            let first = UndoStack.shift();
            if(Color.isOpaque(first.color)){
                first.forEachSetBit(grid.cols, (index) => {
                    state.set(index, first.color);
                })
            } else {
                first.forEachSetBit(grid.cols, (index) => {
                    if (state.moveToPosition(index)) {
                        state.$blend(first.color);
                    }
                })
            }
            undoStackSize -= first.data.data.length;
        }
    }
}

function addScrollListener(canvas: HTMLCanvasElement, callback: (ev: any) => void) {
    canvas.addEventListener('DOMMouseScroll', callback, false); // for Firefox
    canvas.addEventListener('mousewheel', callback, false); // for everyone else
}

function checkImgUploaded() {
    // If an image was just uploaded
    if (imgUploaded) {
        // Preserve state
        state.moveToFirst();
        grid.hexels.moveToFirst();
        state.putBuffer(grid.hexels);
        // Clear undo and redo stack
        clearStacks()
        // Set imgUploaded flag to false
        imgUploaded = false;
    }
}

function beginRenderLoop() {
    // Cache body and toolbar
    const body = $("body");
    const toolbar = $("#toolbar");

    /**
    * Checks each frame if the canvas needs to be re-rendered.
    */
    function checkRender() {
        // Get the space allocated to the canvas
        let width = body.outerWidth();
        let height = body.innerHeight() - toolbar.innerHeight();

        // If the canvas needs to be re-rendered
        if (height > 0 && (surface.resize(width, height) || renderer.needToRender)) {
            // By all means do so
            renderer.needToRender = false;
            renderer.onDrawFrame();
        }

        // Keep calling this function every frame
        requestAnimationFrame(checkRender);
    }

    // Start the loop
    checkRender();
}

function setTool(newTool: Tool, newId: string) {
    if (newTool != tool) {
        // Set previous tool icon to inactive
        $(toolId).children("i")
            .addClass("md-inactive")
            .removeClass("md-active");

        // Set new tool icon to active
        $(newId).children("i")
            .addClass("md-active")
            .removeClass("md-inactive");

        // Set new tool 
        tool = newTool;
        toolId = newId;
    }
}

function initUi() {
    initColorPicker();
    initBrushTool();
    initLineTool();
    initShapeTool();
    initOtherTools();
    initUndo();
    initRedo();
    initOptionsDialog();
    initImageUploadDialog();
    initImageDownloadDialog();
    initShortcutKeys();
}

function initColorPicker() {
    $("#color-picker").spectrum({
        color: drawColor.unparsed.val,
        flat: false,
        showInput: false,
        showInitial: false,
        allowEmpty: false,
        showAlpha: true,
        disabled: false,
        showPalette: true,
        showPaletteOnly: true,
        togglePaletteOnly: true,
        showSelectionPalette: false,
        clickoutFiresChange: true,
        hideAfterPaletteSelect: true,
        preferredFormat: "rgb",
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ],
        change: function (tinycolor) {
            if (tinycolor) {
                // Override alpha (in case of palette selection)
                tinycolor.setAlpha(unconfirmedAlpha);
                // Convert to #aarrggbb string
                let argb = tinycolor.toHex8String();
                // Update UI component
                $(this).spectrum("set", argb);
                // Update color
                drawColor.val.setFromArgbString(argb);
                drawColor.unparsed.val = argb;
                // Update renderer color
                renderer.color = drawColor.val;
            }
        },
        hide: function (tinycolor) {
            // Set unconfirmed alpha back to alpha
            unconfirmedAlpha = drawColor.val.a / 0xff;
        }
    });

    $("#color-picker").on("dragstop.spectrum", function (e, tinyColor) {
        // Value confirmed if change event is called.
        // Otherwise reverts to alpha when color picker is hidden.
        unconfirmedAlpha = tinyColor.getAlpha();
    });
}

function initBrushTool() {

    $("#brush").click(function () {
        setTool(Brush, "#brush");
    });

    let slider = new Slider("input[name=brushRadius]", {
        min: 1,
        max: 50,
        step: 1,
        value: brushRadius.unlerped.val,
        tooltip: 'show'
    });

    slider.on('slideStop', function (ignored) {
        setTool(Brush, "#brush");
        brushRadius.val = slider.getValue();
    });
}

function initLineTool() {

    $("#line").click(function () {
        setTool(LineTool, "#line");
    });

    let slider = new Slider("input[name=lineThickness]", {
        min: 1,
        max: 100,
        step: 1,
        value: lineThickness.unlerped.val,
        tooltip: 'show'
    });

    slider.on('slideStop', function (ignored) {
        setTool(LineTool, "#line");
        lineThickness.val = slider.getValue();
        renderer.lineThickness = lineThickness.val;
    });
}

function initShapeTool() {

    let shapeIcon = 'icon-circle';

    $("#shape").click(function () {
        if (shapeIcon == 'icon-circle') {
            setTool(EllipseTool, "#shape");
        } else {
            setTool(ShapeTool, "#shape");
        }
    });

    $("input[name=maintainAspect]")
        .prop('checked', maintainAspect.val)
        .change(function () {
            maintainAspect.val = this.checked ? true : false;
        })

    $("#circle").click(function () {
        setTool(EllipseTool, "#shape")
        setShapeIcon('icon-circle');
    });

    let shapes: string[] = [
        "triangle", "square", "diamond", "pentagon",
        "hexagon", "star", "heart", "flower", "bat"
    ];

    for (let i = 0; i < shapes.length; i++) {
        $('#' + shapes[i]).click(function () {
            model = models[i];
            setTool(ShapeTool, "#shape")
            setShapeIcon('icon-' + shapes[i]);
        });
    }

    function setShapeIcon(icon: string) {
        if (shapeIcon != icon) {
            // Change icon
            $("#shape").children("i")
                .removeClass(shapeIcon)
                .addClass(icon);
            // Update icon class name
            shapeIcon = icon;
        }
    }
}

function initOtherTools() {

    let otherTool = PaintBucket,
        otherToolIcon = 'icon-bucket';

    $("#other").click(function () {
        setTool(otherTool, "#other");
    });

    function setOtherTool(tool: Tool, icon: string) {
        if (otherToolIcon != icon) {
            // Change icon
            $("#other").children("i")
                .removeClass(otherToolIcon)
                .addClass(icon);
            // Update icon class name
            otherToolIcon = icon;
            otherTool = tool;
        }
    }

    $("#color-sampler").click(function () {
        //setTool(ColorSampler, "#color-sampler");
        setTool(ColorSampler, "#other");
        setOtherTool(ColorSampler, 'icon-eyedropper');
    });

    $("#paint-bucket").click(function () {
        //setTool(PaintBucket, "#paint-bucket");
        setTool(PaintBucket, "#other");
        setOtherTool(PaintBucket, 'icon-bucket');
    });

    $("#pan-tool").click(function () {
        //setTool(PanTool, "#pan-tool");
        setTool(PanTool, "#other");
        setOtherTool(PanTool, 'icon-pan');
    });
}

function initOptionsDialog() {

    $("#options").click(openDialog);

    function openDialog() {

        let html =
            `<div class="vex-custom-field-wrapper">
    <div class="vex-custom-input-wrapper">
        <label for="enableShadows">Enable shadows:</label>
        <input name="enableShadows" type="checkbox" ${shadowsEnabled.val ? 'checked' : ""}/>
    </div>
</div>
<div class="vex-custom-field-wrapper">
    <div class="vex-custom-input-wrapper">
        <label for="zoomSpeed">Zoom speed:</label>
        <input name="zoomSpeed" type="number" min="1" max="1000" />
    </div>
</div>
<div class="vex-custom-field-wrapper">
    <div class="vex-custom-input-wrapper">
          <label for="gridWidth">Grid width:</label>
          <input name="gridWidth" type="number" min="5" max="10" />
    </div>
</div>
<div class="vex-custom-field-wrapper">
    <div class="vex-custom-input-wrapper">
          <label for="gridHeight">Grid height:</label>
          <input name="gridHeight" type="number" min="5" max="10" />
    </div>
</div>`;

        vex.dialog.open({
            message: `Options`,
            input: html,
            callback: handleData
        });

        initSliders();
    }

    function handleData(data: any) {
        if (data) {
            // Handle change in shadows option
            if (data.enableShadows) {
                // If not already enabled
                if (!shadowsEnabled.val) {
                    grid.hasGradient = shadowsEnabled.val = true;
                    renderer.applyGradientChanges();
                }
            } else {
                // If enabled
                if (shadowsEnabled.val) {
                    grid.hasGradient = shadowsEnabled.val = false;
                    renderer.applyGradientChanges();
                }
            }
            // Handle change in scroll speed
            if (data.zoomSpeed) {
                zoomSpeed.val = parseInt(data.zoomSpeed);
            }
            // Handle change in grid width or height
            if (data.gridWidth != numColumns.uninterpolated.val || data.gridHeight != numRows.uninterpolated.val) {
                // Get new column and row dimensions
                numColumns.val = parseInt(data.gridWidth);
                numRows.val = parseInt(data.gridHeight);
                let cols = offScreenCvs.width = numColumns.val;
                let rows = offScreenCvs.height = numRows.val; 
                // Save handle to old grid
                let oldGrid = grid;
                // Create new grid 
                grid = new Grid(cols, rows);
                grid.clear(ClearColor);
                grid.hasGradient = oldGrid.hasGradient;
                // Copy data from old color buffer
                let src = new Uint32Array(oldGrid.hexels.data.buffer),
                    dst = new Uint32Array(grid.hexels.data.buffer),
                    minRows = Math.min(rows, oldGrid.rows),
                    minCols = Math.min(cols, oldGrid.cols);
                // Keep all the hexel data from old grid
                for (let y = 0; y < minRows; y++) {
                    for (let x = 0; x < minCols; x++) {
                        dst[y * cols + x] = src[y * oldGrid.cols + x];
                    }
                }
                // Update grid, layout, projection, and renderer
                renderer.programs.hexel.setLayout(gl, grid);
                renderer.projection = new Projection(grid.bounds, 1, Math.max(grid.rows, grid.cols));
                renderer.projection.fillViewport(onScreenCvs.clientWidth, onScreenCvs.clientHeight);
                renderer.needToRender = true;
                // Clear undo and redo stacks
                clearStacks();
                // Update state
                state = Color.Buf.create(grid.hexels.capacity());
                grid.hexels.moveToFirst();
                state.putBuffer(grid.hexels);
            }
        }
    }

    function initSliders() {
        $("input[name=zoomSpeed]").slider({
            min: 1,
            max: 1000,
            step: 1,
            value: zoomSpeed.unlerped.val,
            tooltip: 'hide'
        });
        $("input[name=gridWidth]").slider({
            ticks: [5, 6, 7, 8, 9],
            ticks_labels: ["32", "64", "128", "256", "512"],
            min: 5,
            max: 9,
            step: 1,
            value: numColumns.uninterpolated.val,
            tooltip: 'hide'
        });
        $("input[name=gridHeight]").slider({
            ticks: [5, 6, 7, 8, 9],
            ticks_labels: ["32", "64", "128", "256", "512"],
            min: 5,
            max: 9,
            step: 1,
            value: numRows.uninterpolated.val,
            tooltip: 'hide'
        });
    }

}

function initImageUploadDialog() {

    let img: HTMLImageElement;

    $("#upload").click(openDialog);

    function openDialog() {

        let msg = `Upload image onto this ${grid.cols}x${grid.rows} grid.`

        let html =
            `<div class="vex-custom-field-wrapper">
    <div class="vex-custom-input-wrapper">
        <label for="imagefile">Image:</label>
        <input name="imagefile" type="file" accept="image/*" required>
    </div>
    <div class="vex-custom-input-wrapper">
        <label for="x">X (hexels from left):</label>
        <input name="x" type="number" min="0" max="${grid.cols}">
    </div>
    <div class="vex-custom-input-wrapper">
        <label for="y">Y (hexels from top):</label>
        <input name="y" type="number" min="0" max="${grid.rows}">
    </div>
    <div class="vex-custom-input-wrapper">
        <label for="width">Width (in hexels):</label>
        <input name="width" type="number" min="0">
    </div>
    <div class="vex-custom-input-wrapper">
        <label for="height">Height (in hexels):</label>
        <input name="height" type="number" min="0">
    </div>
</div>`;

        vex.dialog.open({
            message: msg,
            input: html,
            callback: handleData
        });

        $("input[name=imagefile]").change(function (e: any) {
            // If file was picked
            if (e.target.files[0]) {
                // Get the file (we'll assume its an image)
                let file = e.target.files[0];
                // Load the image from the file
                loadImageFromFile(file, (image) => {
                    // Compute optimal bounds for image 
                    let wRatio = offScreenCvs.width / image.width;
                    let hRatio = offScreenCvs.height / image.height;
                    let ratio = Math.min(wRatio, hRatio);
                    let width = Math.round(image.width * ratio);
                    let height = Math.round(image.height * ratio);
                    let centerShift_x = Math.round((offScreenCvs.width - width) / 2);
                    let centerShift_y = Math.round((offScreenCvs.height - height) / 2);
                    // Pass to UI
                    $("input[name=x]").val(centerShift_x);
                    $("input[name=y]").val(centerShift_y);
                    $("input[name=width]").val(width);
                    $("input[name=height]").val(height);
                    // Save reference to image
                    img = image;
                });
            }
        });
    }

    function handleData(data: any) {
        if (img && data) {
            let x = data.x, y = data.y, width = data.width, height = data.height;
            addImageToCanvas(offScreenCvs, ctx, img, x, y, width, height);
            copyPixelsToGrid(offScreenCvs, ctx, grid);
            renderer.applyColorChanges();
            imgUploaded = true;
        }
    }

    function addImageToCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement, left = 0, top = 0, width = grid.cols, height = grid.rows) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, // src
            left, top, width, height); // dst
    }

    function loadImageFromFile(blob: Blob, onLoad: (image: HTMLImageElement) => void) {
        let reader = new FileReader();
        reader.onload = function (event: any) {
            let img = new Image();
            img.onload = function () {
                onLoad(img);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(blob);
    }
}

function initImageDownloadDialog() {


    $("#download").click(openDialog);

    function openDialog() {

        let msg = `Download hexel art as a ${grid.cols}x${grid.rows} image file.`

        let html =
`<div class="vex-custom-field-wrapper">
    <div class="vex-custom-input-wrapper">
        <label for="transparentColor">Transparent color:</label>
        <input name="transparentColor" type="text" style="display: none" />
    </div>
    <br/>
    <div class="vex-custom-input-wrapper">
        <label for="filename">Filename:</label>
        <input name="filename" type="text" value="${filename.val}"/>
    </div>
</div>
<p> Note: an image viewer will interpret the file as pixel art, but if you reupload the file to this app, you will be able to view and modify the original hexel art.</p>`;

        vex.dialog.open({
            message: msg,
            input: html,
            callback: handleData
        });

        $("input[name=transparentColor]").spectrum({
            color: Color.equalsScalar(transparentColor, 0) ? null : Color.toArgbString(transparentColor),
            flat: false,
            showInput: true,
            showInitial: false,
            allowEmpty: true,
            disabled: false,
            showPalette: true,
            showPaletteOnly: true,
            togglePaletteOnly: true,
            showSelectionPalette: false,
            clickoutFiresChange: true,
            hideAfterPaletteSelect: true,
            preferredFormat: "rgb",
            palette: [
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
            ],
            change: function (tinycolor) {
                if (tinycolor) {
                    transparentColor.setFromArgbString(tinycolor.toHex8String());
                } else {
                    transparentColor.set$(0, 0, 0, 0);
                }
            }
        });
    }

    function handleData(data: any) {
        if (data) {
            if (data.filename) {
                // Save file name
                filename.val = data.filename;
                // Update canvas
                copyHexelsToCanvas(grid, transparentColor, offScreenCvs, ctx);
                // Polyfilled by canvas-toBlob.js
                (<any>offScreenCvs).toBlob(function (blob: Blob) {
                    saveAs(blob, filename.val, true);
                }, "image/png");
            }
        }
    }

}

function undo() {
    if (UndoStack.length > 0) {

        if (imgUploaded) {
            imgUploaded = false;
        } else {
            let mostRecent = UndoStack.pop();
            RedoStack.push(mostRecent);
            undoStackSize -= mostRecent.data.data.length;
        }

        grid.hexels.moveToFirst();
        state.moveToFirst();
        grid.hexels.putBuffer(state);
        for (let img of UndoStack) {
            grid.addBinaryImage(img);
        }
        renderer.applyColorChanges();
    }
}

function redo () {
    if (RedoStack.length > 0) {
        let img = RedoStack.pop();
        UndoStack.push(img);
        undoStackSize += img.data.data.length;
        grid.addBinaryImage(img);
        renderer.applyColorChanges();
    }
}

function initUndo() {
    $("#undo").click(undo)
}

function initRedo() {
    $("#redo").click(redo)
}

function powOf2(n: number) {
    return 1 << n;
}

function setDrawColor(color: Color._) {
    drawColor.val.set(color);
    drawColor.unparsed.val = Color.toArgbString(color);
    // Set as spectrum color
    $("#color-picker").spectrum("set", drawColor.unparsed.val);
    // Set as rendering color
    renderer.color = drawColor.val;
}

function initShortcutKeys() {
    let which = -1;
    let finished = false;
    $(document)
        .on("keydown", e => {
            which = e.which;
        })
        .on("keyup", e => {
            which = -1;
            finished = false;
        })
        .on("keypress", e => {
            if (finished) return;
            let key = String.fromCharCode(which).toLowerCase();
            if (e.metaKey || e.ctrlKey) {
                if (key === 'z') {
                    if (e.shiftKey) {
                        redo();
                    } else {
                        undo();
                    }
                    finished = true;
                } else if (key === 'y') {
                    redo();
                    finished = true;
                }
            }
        })

}









