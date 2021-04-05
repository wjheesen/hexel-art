import { Camera,  Renderer, Surface, Rect, PolygonMesh, ProgramUtil, FillProgram, PolygonModel, Mat2dBuffer, ColorBuffer, Color, ColorF, Mat2d, WheelZoomTool, PointerEventDetector, PinchZoomTool, PanTool } from '@wjheesen/glib';
import { HexelGrid } from './hexel/hexel-grid';
import { Scene } from './hexel/scene';
import { HexelProgram } from './program/hexel-program';
import { Brush } from './tool/brush';
import { BrushSizeSlider } from './toolbar/brush-size-slider';
import { ColorPicker } from './toolbar/color-picker';
import { Settings } from './toolbar/settings';
import { ToolSelector } from './toolbar/tool-selector';

let canvasEl = <HTMLCanvasElement> document.getElementById('onscreen-canvas');
let gl = canvasEl.getContext('webgl');
let util = new ProgramUtil(gl);

let grid = new HexelGrid(128, 128);
grid.clear(Color.fromRgbInt(0xcdcdcd));

let hexMesh = PolygonMesh.regularPolygon(6);
let hexelProgram = HexelProgram.create(util, hexMesh, grid);

let camera = new Camera(grid.bounds, 1, Math.max(grid.rows, grid.cols));
let renderer = new Renderer(gl, camera);
let scene = new Scene(hexelProgram, grid);
let surface = new Surface(canvasEl, renderer, scene);
surface.startRenderLoop();

let settings = new Settings;

let wheelEvents = surface.startDetectingWheelEvents();
wheelEvents.addListener(new WheelZoomTool(1.1));

let pointerEvents = surface.startDetectingPointerEvents();
pointerEvents.addListener(new PinchZoomTool);

let toolSelector = new ToolSelector(pointerEvents)
    .addTool('brush', new Brush(grid, settings))
    .addTool('pan-tool', new PanTool);

settings.initControls([
    new ColorPicker(settings),
    new BrushSizeSlider(settings),
    toolSelector,
])
