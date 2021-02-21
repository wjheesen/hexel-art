import { Camera,  Renderer, Surface, Rect, PolygonMesh, ProgramUtil, FillProgram, PolygonModel, Mat2dBuffer, ColorBuffer, Color, ColorF, Mat2d, WheelZoomTool, PointerEventDetector, PanTool, PinchZoomTool } from '@wjheesen/glib';
import { HexelGrid } from './hexel/hexel-grid';
import { Scene } from './hexel/scene';
import { HexelProgram } from './program/hexel-program';
import { BrushTool } from './tool/brush-tool';
import { BrushSizeSlider } from './toolbar/brush-size-slider';
import { ColorPicker } from './toolbar/color-picker';
import { Settings } from './toolbar/settings';

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
settings.initControls([
    new ColorPicker(settings),
    new BrushSizeSlider(settings),
])

let wheelEvents = surface.startDetectingWheelEvents();
wheelEvents.addListener(new WheelZoomTool(1.1));

let pointerEvents = surface.startDetectingPointerEvents();
// pointerEvents.addListener(new PanTool);
pointerEvents.addListener(new PinchZoomTool);
pointerEvents.addListener(new BrushTool(grid, settings));

