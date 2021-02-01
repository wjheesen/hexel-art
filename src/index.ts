import { Camera,  Renderer, Surface, Rect, PolygonMesh, ProgramUtil, FillProgram, PolygonModel, Mat2dBuffer, ColorBuffer, Color, ColorF, Mat2d, WheelZoomTool, PointerEventDetector, PanTool, PinchZoomTool } from '@wjheesen/glib';
import { Scene } from './hexel/scene';

let canvasEl = <HTMLCanvasElement> document.getElementById('onscreen-canvas');
let camera = new Camera(new Rect(-1, 1, 1, -1), 0.5, 10);
let renderer = new Renderer(canvasEl.getContext('webgl2'), camera);
let hexMesh =  PolygonMesh.regularPolygon(6);
let util = new ProgramUtil(renderer.gl);
let matBuf = Mat2dBuffer.withLength(1);
let hexagon = new PolygonModel(hexMesh, matBuf.get(0));
Mat2d.identity(hexagon.matrix);
let fill = FillProgram.create(util, [hexMesh]); 
fill.color = new ColorBuffer(new Float32Array([1,1,1,1]));
ColorF.random(fill.color);
let scene = new Scene(fill, hexagon, matBuf);
let surface = new Surface(canvasEl, renderer, scene);
surface.startRenderLoop();

let wheelEvents = surface.startDetectingWheelEvents();
wheelEvents.addListener(new WheelZoomTool(1.1));

let pointerEvents = surface.startDetectingPointerEvents();
pointerEvents.addListener(new PanTool);
pointerEvents.addListener(new PinchZoomTool);