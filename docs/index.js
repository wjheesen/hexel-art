/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../glib/src/buffer/color-buffer.ts":
/*!******************************************!*\
  !*** ../glib/src/buffer/color-buffer.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorBuffer = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var ColorBuffer = (function (_super) {
    __extends(ColorBuffer, _super);
    function ColorBuffer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorBuffer.withLength = function (n) {
        return new this(new Uint8Array(n * 4));
    };
    Object.defineProperty(ColorBuffer.prototype, "componentLength", {
        get: function () {
            return 4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorBuffer.prototype, "r", {
        get: function () {
            return this.getComponent(0);
        },
        set: function (value) {
            this.setComponent(0, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorBuffer.prototype, "g", {
        get: function () {
            return this.getComponent(1);
        },
        set: function (value) {
            this.setComponent(1, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorBuffer.prototype, "b", {
        get: function () {
            return this.getComponent(2);
        },
        set: function (value) {
            this.setComponent(2, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorBuffer.prototype, "a", {
        get: function () {
            return this.getComponent(3);
        },
        set: function (value) {
            this.setComponent(3, value);
        },
        enumerable: false,
        configurable: true
    });
    ColorBuffer.prototype.newStruct = function (data) {
        return new ColorBuffer(data);
    };
    return ColorBuffer;
}(__1.StructBuffer));
exports.ColorBuffer = ColorBuffer;


/***/ }),

/***/ "../glib/src/buffer/mat2d-buffer.ts":
/*!******************************************!*\
  !*** ../glib/src/buffer/mat2d-buffer.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mat2dBuffer = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var Mat2dBuffer = (function (_super) {
    __extends(Mat2dBuffer, _super);
    function Mat2dBuffer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mat2dBuffer.withLength = function (n) {
        return new this(new Float32Array(n * 6));
    };
    Object.defineProperty(Mat2dBuffer.prototype, "componentLength", {
        get: function () {
            return 6;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mat2dBuffer.prototype, "c1r1", {
        get: function () {
            return this.getComponent(0);
        },
        set: function (value) {
            this.setComponent(0, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mat2dBuffer.prototype, "c1r2", {
        get: function () {
            return this.getComponent(1);
        },
        set: function (value) {
            this.setComponent(1, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mat2dBuffer.prototype, "c2r1", {
        get: function () {
            return this.getComponent(2);
        },
        set: function (value) {
            this.setComponent(2, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mat2dBuffer.prototype, "c2r2", {
        get: function () {
            return this.getComponent(3);
        },
        set: function (value) {
            this.setComponent(3, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mat2dBuffer.prototype, "c3r1", {
        get: function () {
            return this.getComponent(4);
        },
        set: function (value) {
            this.setComponent(4, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mat2dBuffer.prototype, "c3r2", {
        get: function () {
            return this.getComponent(5);
        },
        set: function (value) {
            this.setComponent(5, value);
        },
        enumerable: false,
        configurable: true
    });
    Mat2dBuffer.prototype.newStruct = function (data) {
        return new Mat2dBuffer(data);
    };
    return Mat2dBuffer;
}(__1.StructBuffer));
exports.Mat2dBuffer = Mat2dBuffer;


/***/ }),

/***/ "../glib/src/buffer/struct-buffer.ts":
/*!*******************************************!*\
  !*** ../glib/src/buffer/struct-buffer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StructBuffer = void 0;
var StructBuffer = (function () {
    function StructBuffer(data) {
        this.data = data;
        this.dataPosition = 0;
    }
    Object.defineProperty(StructBuffer.prototype, "position", {
        get: function () {
            return this.dataPosition / this.componentLength;
        },
        set: function (index) {
            this.assertValidIndex(index);
            this.dataPosition = index * this.componentLength;
        },
        enumerable: false,
        configurable: true
    });
    StructBuffer.prototype.assertValidIndex = function (index) {
        if (index < 0 || index >= this.length) {
            throw "Index " + index + " is out of bounds";
        }
    };
    StructBuffer.prototype.at = function (index) {
        this.position = index;
        return this;
    };
    Object.defineProperty(StructBuffer.prototype, "length", {
        get: function () {
            return this.data.length / this.componentLength;
        },
        enumerable: false,
        configurable: true
    });
    StructBuffer.prototype.getComponent = function (index) {
        return this.data[this.dataPosition + index];
    };
    StructBuffer.prototype.setComponent = function (index, value) {
        return this.data[this.dataPosition + index] = value;
    };
    StructBuffer.prototype.get = function (index) {
        this.assertValidIndex(index);
        var data = this.getStructData(index);
        return this.newStruct(data);
    };
    StructBuffer.prototype.getStructData = function (index) {
        var begin = index * this.componentLength;
        var end = begin + this.componentLength;
        return this.data.subarray(begin, end);
    };
    return StructBuffer;
}());
exports.StructBuffer = StructBuffer;


/***/ }),

/***/ "../glib/src/buffer/typed-array.ts":
/*!*****************************************!*\
  !*** ../glib/src/buffer/typed-array.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../glib/src/buffer/vec2-buffer.ts":
/*!*****************************************!*\
  !*** ../glib/src/buffer/vec2-buffer.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vec2Buffer = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var Vec2Buffer = (function (_super) {
    __extends(Vec2Buffer, _super);
    function Vec2Buffer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vec2Buffer.withLength = function (n) {
        return new this(new Float32Array(n * 2));
    };
    Object.defineProperty(Vec2Buffer.prototype, "componentLength", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec2Buffer.prototype, "x", {
        get: function () {
            return this.getComponent(0);
        },
        set: function (value) {
            this.setComponent(0, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec2Buffer.prototype, "y", {
        get: function () {
            return this.getComponent(1);
        },
        set: function (value) {
            this.setComponent(1, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec2Buffer.prototype, "bounds", {
        get: function () {
            return this.length == 0 ? __1.Rect.empty() : this.measureBounds(this.at(0));
        },
        enumerable: false,
        configurable: true
    });
    Vec2Buffer.prototype.measureBounds = function (p0) {
        var bounds = __1.Rect.dimensions(p0.x, p0.y, 0, 0);
        for (var i = 1; i < this.length; i++) {
            bounds.unionPoint(this.at(i));
        }
        return bounds;
    };
    Vec2Buffer.prototype.newStruct = function (data) {
        return new Vec2Buffer(data);
    };
    Vec2Buffer.prototype.containsPoint = function (p, offset, count) {
        if (offset === void 0) { offset = 0; }
        if (count === void 0) { count = this.length - offset; }
        var inside = false;
        var _a = this.at(offset + count - 1), x1 = _a.x, y1 = _a.y;
        while (count-- > 0) {
            var _b = this.at(offset++), x2 = _b.x, y2 = _b.y;
            if ((y1 > p.y) !== (y2 > p.y) && p.x < (x2 - x1) * (p.y - y1) / (y2 - y1) + x1) {
                inside = !inside;
            }
            x1 = x2;
            y1 = y2;
        }
        return inside;
    };
    return Vec2Buffer;
}(__1.StructBuffer));
exports.Vec2Buffer = Vec2Buffer;


/***/ }),

/***/ "../glib/src/drawable/drawable.ts":
/*!****************************************!*\
  !*** ../glib/src/drawable/drawable.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../glib/src/event/pointer-event.ts":
/*!******************************************!*\
  !*** ../glib/src/event/pointer-event.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointerEventDetector = exports.PointerEventListener = exports.Pointer = void 0;
var Pointer = (function () {
    function Pointer(id, status, surface, position, isPrimary, isDown, activePointers) {
        this.id = id;
        this.status = status;
        this.surface = surface;
        this.position = position;
        this.isPrimary = isPrimary;
        this.isDown = isDown;
        this.activePointers = activePointers;
    }
    return Pointer;
}());
exports.Pointer = Pointer;
var PointerEventListener = (function () {
    function PointerEventListener() {
    }
    PointerEventListener.prototype.wherePointer = function (p) { return true; };
    PointerEventListener.prototype.onPointerDown = function (p) { };
    PointerEventListener.prototype.onPointerMove = function (p) { };
    PointerEventListener.prototype.onPointerUp = function (p) { };
    PointerEventListener.prototype.onPointerCancel = function (p) { };
    return PointerEventListener;
}());
exports.PointerEventListener = PointerEventListener;
var PointerEventDetector = (function () {
    function PointerEventDetector(surface) {
        var _this = this;
        this.surface = surface;
        this.activePointers = [];
        this.listeners = [];
        this.onPointerDown = function (e) {
            var pointer = _this.addPointer(e, 0);
            _this.dispatchEvent(pointer, function (l) { return l.onPointerDown(pointer); });
        };
        this.onPointerMove = function (e) {
            var pointer = _this.addPointer(e, 1);
            _this.dispatchEvent(pointer, function (l) { return l.onPointerMove(pointer); });
        };
        this.onPointerUp = function (e) {
            var pointer = _this.addPointer(e, 2);
            _this.dispatchEvent(pointer, function (l) { return l.onPointerUp(pointer); });
            _this.removePointer(pointer);
        };
        this.onPointerCancel = function (e) {
            var pointer = _this.addPointer(e, 2);
            _this.dispatchEvent(pointer, function (l) { return l.onPointerCancel(pointer); });
            _this.removePointer(pointer);
        };
    }
    PointerEventDetector.prototype.startListening = function () {
        var canvasEl = this.surface.canvasEl;
        canvasEl.addEventListener('pointerdown', this.onPointerDown);
        canvasEl.addEventListener('pointermove', this.onPointerMove);
        canvasEl.addEventListener('pointerup', this.onPointerUp);
        canvasEl.addEventListener('pointercancel', this.onPointerCancel);
    };
    PointerEventDetector.prototype.stopListening = function () {
        var canvasEl = this.surface.canvasEl;
        canvasEl.removeEventListener('pointerdown', this.onPointerDown);
        canvasEl.removeEventListener('pointermove', this.onPointerMove);
        canvasEl.removeEventListener('pointerup', this.onPointerUp);
        canvasEl.removeEventListener('pointercancel', this.onPointerCancel);
    };
    PointerEventDetector.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    PointerEventDetector.prototype.dispatchEvent = function (p, invokeFn) {
        this.listeners.filter(function (l) { return l.wherePointer(p); }).forEach(invokeFn);
    };
    PointerEventDetector.prototype.addPointer = function (e, status) {
        var _a;
        var index = this.getPointerIndex(e.pointerId);
        var isDown = status == 0 || !!((_a = this.activePointers[index]) === null || _a === void 0 ? void 0 : _a.isDown);
        var pointer = this.newPointer(e, status, isDown);
        this.surface.canvasEl.setPointerCapture(pointer.id);
        this.activePointers[index] = pointer;
        return pointer;
    };
    PointerEventDetector.prototype.newPointer = function (e, status, isDown) {
        return new Pointer(e.pointerId, status, this.surface, this.surface.mapScreenPointToWorld(e), e.isPrimary, isDown, this.activePointers);
    };
    PointerEventDetector.prototype.getPointerIndex = function (pointerId) {
        for (var i = 0; i < this.activePointers.length; i++) {
            if (this.activePointers[i].id == pointerId) {
                return i;
            }
        }
        return this.activePointers.length;
    };
    PointerEventDetector.prototype.removePointer = function (pointer) {
        this.surface.canvasEl.releasePointerCapture(pointer.id);
        this.activePointers.splice(this.getPointerIndex(pointer.id), 1);
    };
    return PointerEventDetector;
}());
exports.PointerEventDetector = PointerEventDetector;


/***/ }),

/***/ "../glib/src/event/screen-point.ts":
/*!*****************************************!*\
  !*** ../glib/src/event/screen-point.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../glib/src/event/wheel-event.ts":
/*!****************************************!*\
  !*** ../glib/src/event/wheel-event.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WheelEventDetector = exports.Wheel = void 0;
var Wheel = (function () {
    function Wheel(deltaY, surface, position) {
        this.deltaY = deltaY;
        this.surface = surface;
        this.position = position;
    }
    return Wheel;
}());
exports.Wheel = Wheel;
var WheelEventDetector = (function () {
    function WheelEventDetector(surface) {
        var _this = this;
        this.surface = surface;
        this.listeners = [];
        this.onWheel = function (e) {
            e.preventDefault();
            var wheel = new Wheel(e.deltaY, _this.surface, _this.surface.mapScreenPointToWorld(e));
            _this.listeners.forEach(function (l) { return l.onWheel(wheel); });
        };
    }
    WheelEventDetector.prototype.startListening = function () {
        this.surface.canvasEl.addEventListener('wheel', this.onWheel);
    };
    WheelEventDetector.prototype.stopListening = function () {
        this.surface.canvasEl.removeEventListener('wheel', this.onWheel);
    };
    WheelEventDetector.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    return WheelEventDetector;
}());
exports.WheelEventDetector = WheelEventDetector;


/***/ }),

/***/ "../glib/src/index.ts":
/*!****************************!*\
  !*** ../glib/src/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mat4 = exports.Vec2 = exports.Point = exports.Mat2d = exports.Ellipse = exports.ColorF = exports.Color = void 0;
exports.Color = __webpack_require__(/*! ./struct/color */ "../glib/src/struct/color.ts");
exports.ColorF = __webpack_require__(/*! ./struct/colorf */ "../glib/src/struct/colorf.ts");
exports.Ellipse = __webpack_require__(/*! ./struct/ellipse */ "../glib/src/struct/ellipse.ts");
__exportStar(__webpack_require__(/*! ./struct/line-segment */ "../glib/src/struct/line-segment.ts"), exports);
exports.Mat2d = __webpack_require__(/*! ./struct/mat2d */ "../glib/src/struct/mat2d.ts");
exports.Point = __webpack_require__(/*! ./struct/point */ "../glib/src/struct/point.ts");
__exportStar(__webpack_require__(/*! ./struct/rect */ "../glib/src/struct/rect.ts"), exports);
exports.Vec2 = __webpack_require__(/*! ./struct/vec2 */ "../glib/src/struct/vec2.ts");
exports.Mat4 = __webpack_require__(/*! ./struct/mat4 */ "../glib/src/struct/mat4.ts");
__exportStar(__webpack_require__(/*! ./buffer/struct-buffer */ "../glib/src/buffer/struct-buffer.ts"), exports);
__exportStar(__webpack_require__(/*! ./buffer/color-buffer */ "../glib/src/buffer/color-buffer.ts"), exports);
__exportStar(__webpack_require__(/*! ./buffer/mat2d-buffer */ "../glib/src/buffer/mat2d-buffer.ts"), exports);
__exportStar(__webpack_require__(/*! ./buffer/typed-array */ "../glib/src/buffer/typed-array.ts"), exports);
__exportStar(__webpack_require__(/*! ./buffer/vec2-buffer */ "../glib/src/buffer/vec2-buffer.ts"), exports);
__exportStar(__webpack_require__(/*! ./drawable/drawable */ "../glib/src/drawable/drawable.ts"), exports);
__exportStar(__webpack_require__(/*! ./model/mesh */ "../glib/src/model/mesh.ts"), exports);
__exportStar(__webpack_require__(/*! ./model/polygon-mesh */ "../glib/src/model/polygon-mesh.ts"), exports);
__exportStar(__webpack_require__(/*! ./program/program-util */ "../glib/src/program/program-util.ts"), exports);
__exportStar(__webpack_require__(/*! ./program/program */ "../glib/src/program/program.ts"), exports);
__exportStar(__webpack_require__(/*! ./program/fill-program */ "../glib/src/program/fill-program.ts"), exports);
__exportStar(__webpack_require__(/*! ./model/model */ "../glib/src/model/model.ts"), exports);
__exportStar(__webpack_require__(/*! ./model/polygon-model */ "../glib/src/model/polygon-model.ts"), exports);
__exportStar(__webpack_require__(/*! ./model/ellipse-model */ "../glib/src/model/ellipse-model.ts"), exports);
__exportStar(__webpack_require__(/*! ./event/screen-point */ "../glib/src/event/screen-point.ts"), exports);
__exportStar(__webpack_require__(/*! ./rendering/camera */ "../glib/src/rendering/camera.ts"), exports);
__exportStar(__webpack_require__(/*! ./rendering/renderer */ "../glib/src/rendering/renderer.ts"), exports);
__exportStar(__webpack_require__(/*! ./rendering/surface */ "../glib/src/rendering/surface.ts"), exports);
__exportStar(__webpack_require__(/*! ./event/pointer-event */ "../glib/src/event/pointer-event.ts"), exports);
__exportStar(__webpack_require__(/*! ./event/wheel-event */ "../glib/src/event/wheel-event.ts"), exports);
__exportStar(__webpack_require__(/*! ./tool/stroke */ "../glib/src/tool/stroke.ts"), exports);
__exportStar(__webpack_require__(/*! ./tool/wheel-zoom-tool */ "../glib/src/tool/wheel-zoom-tool.ts"), exports);
__exportStar(__webpack_require__(/*! ./tool/pan-tool */ "../glib/src/tool/pan-tool.ts"), exports);
__exportStar(__webpack_require__(/*! ./tool/pinch-zoom-tool */ "../glib/src/tool/pinch-zoom-tool.ts"), exports);


/***/ }),

/***/ "../glib/src/model/ellipse-model.ts":
/*!******************************************!*\
  !*** ../glib/src/model/ellipse-model.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EllipseModel = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var ellipse_program_1 = __webpack_require__(/*! ../program/ellipse-program */ "../glib/src/program/ellipse-program.ts");
var EllipseModel = (function (_super) {
    __extends(EllipseModel, _super);
    function EllipseModel(matrix) {
        return _super.call(this, ellipse_program_1.EllipseProgram.mesh, matrix) || this;
    }
    EllipseModel.measureBoundaries = function (matrix) {
        var a = matrix.c1r1, b = matrix.c2r1, tx = matrix.c3r1, c = matrix.c1r2, d = matrix.c2r2, ty = matrix.c3r2;
        var a2 = a * a;
        var b2 = b * b;
        var c2 = c * c;
        var d2 = d * d;
        var m = a * c + b * d;
        var n = a2 + b2 - c2 - d2;
        var phi = 0.5 * Math.atan2(2 * m, n);
        var cos2 = Math.pow(Math.cos(phi), 2);
        var sin2 = Math.pow(Math.sin(phi), 2);
        var s1 = a2 + b2 + c2 + d2;
        var s2 = Math.sqrt(n * n + 4 * m * m);
        var sx2 = 0.5 * (s1 + s2);
        var sy2 = 0.5 * (s1 - s2);
        var x = Math.sqrt(sx2 * cos2 + sy2 * sin2);
        var y = Math.sqrt(sx2 * sin2 + sy2 * cos2);
        return __1.Rect.copy({
            left: tx - x, right: tx + x,
            top: ty + y, bottom: ty - y
        });
    };
    Object.defineProperty(EllipseModel.prototype, "bounds", {
        get: function () {
            return EllipseModel.measureBoundaries(this.matrix);
        },
        set: function (dst) {
            this.transform(__1.Mat2d.rectToRect(this.bounds, dst));
        },
        enumerable: false,
        configurable: true
    });
    EllipseModel.prototype.contains = function (p) {
        var modelPoint = this.mapPointToModelSpace(p);
        if (this.mesh.bounds.containsPoint(modelPoint)) {
            return __1.Vec2.length2(modelPoint) <= 1;
        }
        return false;
    };
    return EllipseModel;
}(__1.PolygonModel));
exports.EllipseModel = EllipseModel;


/***/ }),

/***/ "../glib/src/model/mesh.ts":
/*!*********************************!*\
  !*** ../glib/src/model/mesh.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mesh = void 0;
var Mesh = (function () {
    function Mesh(vertices, indices) {
        this.vertices = vertices;
        this.indices = indices;
        this.bounds = this.vertices.bounds;
    }
    return Mesh;
}());
exports.Mesh = Mesh;


/***/ }),

/***/ "../glib/src/model/model.ts":
/*!**********************************!*\
  !*** ../glib/src/model/model.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Model = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var Model = (function () {
    function Model(matrix) {
        this.matrix = matrix;
    }
    Object.defineProperty(Model.prototype, "center", {
        get: function () {
            return { x: this.matrix.c3r1, y: this.matrix.c3r2 };
        },
        set: function (_a) {
            var x = _a.x, y = _a.y;
            this.matrix.c3r1 = x;
            this.matrix.c3r2 = y;
        },
        enumerable: false,
        configurable: true
    });
    Model.prototype.mapPointToWorldSpace = function (modelPoint, out) {
        if (out === void 0) { out = {}; }
        return __1.Mat2d.mapPoint(this.matrix, modelPoint, out);
    };
    Model.prototype.mapPointToModelSpace = function (worldPoint, out) {
        if (out === void 0) { out = {}; }
        return __1.Mat2d.mapPoint(__1.Mat2d.invert(this.matrix), worldPoint, out);
    };
    Model.prototype.transform = function (m) {
        __1.Mat2d.concat(m, this.matrix, this.matrix);
    };
    Model.prototype.translate = function (v) {
        this.transform(__1.Mat2d.translate(v));
    };
    Model.prototype.scale = function (v) {
        this.transform(__1.Mat2d.pivot(__1.Mat2d.scale(v), this.center));
    };
    Model.prototype.stretch = function (factor) {
        this.transform(__1.Mat2d.pivot(__1.Mat2d.stretch(factor), this.center));
    };
    Model.prototype.rotate = function (radians) {
        this.transform(__1.Mat2d.pivot(__1.Mat2d.rotate(radians), this.center));
    };
    return Model;
}());
exports.Model = Model;


/***/ }),

/***/ "../glib/src/model/polygon-mesh.ts":
/*!*****************************************!*\
  !*** ../glib/src/model/polygon-mesh.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PolygonMesh = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var PolygonMesh = (function (_super) {
    __extends(PolygonMesh, _super);
    function PolygonMesh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.miters = PolygonMesh.miters(_this.vertices);
        return _this;
    }
    PolygonMesh.regularPolygon = function (n, flatTop) {
        if (flatTop === void 0) { flatTop = false; }
        return new PolygonMesh(this.regularVertices(n, flatTop), this.regularIndices(n));
    };
    PolygonMesh.regularVertices = function (n, flatTop) {
        if (flatTop === void 0) { flatTop = false; }
        var vertices = __1.Vec2Buffer.withLength(n);
        var angle = 2 * Math.PI / n;
        var rotation = __1.Mat2d.rotate(angle);
        var v = vertices.get(0);
        v.y = 1;
        if (flatTop) {
            __1.Mat2d.mapPoint(__1.Mat2d.rotate(angle / 2), v, v);
        }
        for (var i = 1; i < n; i++) {
            __1.Mat2d.mapPoint(rotation, vertices.get(i - 1), vertices.at(i));
        }
        return vertices;
    };
    PolygonMesh.regularIndices = function (n) {
        var indices = new Uint16Array(3 * (n - 2));
        for (var i = 0; i < n; i++) {
            indices[3 * i + 1] = i + 1;
            indices[3 * i + 2] = i + 2;
        }
        return indices;
    };
    PolygonMesh.rectangle = function (r) {
        var vertices = PolygonMesh.rectangleVertices(r);
        var indices = PolygonMesh.regularIndices(4);
        return new PolygonMesh(vertices, indices);
    };
    PolygonMesh.rectangleVertices = function (r) {
        var vertices = __1.Vec2Buffer.withLength(4);
        r.topLeft(vertices.at(0));
        r.bottomLeft(vertices.at(1));
        r.bottomRight(vertices.at(2));
        r.topRight(vertices.at(3));
        return vertices;
    };
    PolygonMesh.star = function (n, ratio) {
        var vertices = PolygonMesh.starVertices(n, ratio);
        var indices = PolygonMesh.starIndices(n);
        return new PolygonMesh(vertices, indices);
    };
    PolygonMesh.starVertices = function (points, ratio) {
        var vertices = __1.Vec2Buffer.withLength(points + points);
        var angle = 2 * Math.PI / points;
        var rotation = __1.Mat2d.rotate(angle);
        vertices.y = 1;
        __1.Mat2d.mapPoint(__1.Mat2d.rotate(0.5 * angle), { x: 0, y: ratio }, vertices.at(1));
        for (var i = 2; i < vertices.length; i++) {
            __1.Mat2d.mapPoint(rotation, vertices.get(i - 2), vertices.at(i));
        }
        return vertices;
    };
    PolygonMesh.starIndices = function (n) {
        var innerIndexCount = 3 * (n - 2);
        var outerIndexCount = 3 * n;
        var indices = new Uint16Array(innerIndexCount + outerIndexCount);
        var first = 1, second = 3, third = 5;
        for (var i = 0; i < innerIndexCount; second += 2, third += 2) {
            indices[i++] = first;
            indices[i++] = second;
            indices[i++] = third;
        }
        first = 2 * n - 1;
        second = 0;
        third = 1;
        for (var i = 0; i < outerIndexCount; i++, first = third++, second = third++) {
            indices[i++] = first;
            indices[i++] = second;
            indices[i++] = third;
        }
        return indices;
    };
    PolygonMesh.miters = function (vertices) {
        var length = vertices.length, lastIndex = length - 1;
        var miters = __1.Vec2Buffer.withLength(length);
        var prev = __1.Vec2.copy(vertices.at(lastIndex));
        var curr = __1.Vec2.copy(vertices.at(0));
        var line1 = __1.Vec2.fromPointToPoint(prev, curr);
        var line2 = {};
        for (var i = 0; i < length; i++) {
            __1.Vec2.copy(curr, prev);
            __1.Vec2.copy(vertices.at((i + 1) % lastIndex), curr);
            __1.Vec2.fromPointToPoint(prev, curr, line2);
            __1.Vec2.miter(line1, line2, 1, 3, miters.at(i));
            __1.Vec2.copy(line2, line1);
        }
        return miters;
    };
    PolygonMesh.prototype.containsPoint = function (p) {
        return this.vertices.containsPoint(p);
    };
    return PolygonMesh;
}(__1.Mesh));
exports.PolygonMesh = PolygonMesh;


/***/ }),

/***/ "../glib/src/model/polygon-model.ts":
/*!******************************************!*\
  !*** ../glib/src/model/polygon-model.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PolygonModel = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var PolygonModel = (function (_super) {
    __extends(PolygonModel, _super);
    function PolygonModel(mesh, matrix) {
        if (matrix === void 0) { matrix = __1.Mat2d.identity(); }
        var _this = _super.call(this, matrix) || this;
        _this.mesh = mesh;
        return _this;
    }
    Object.defineProperty(PolygonModel.prototype, "bounds", {
        get: function () {
            var vertices = this.mesh.vertices;
            var _a = this.mapPointToWorldSpace(vertices.at(0)), x = _a.x, y = _a.y;
            var bounds = __1.Rect.dimensions(x, y, 0, 0);
            for (var i = 1; i < vertices.length; i++) {
                bounds.unionPoint(this.mapPointToWorldSpace(vertices.at(i)));
            }
            return bounds;
        },
        set: function (dst) {
            this.transform(__1.Mat2d.rectToRect(this.bounds, dst));
        },
        enumerable: false,
        configurable: true
    });
    PolygonModel.prototype.vertexAt = function (index, out) {
        if (out === void 0) { out = {}; }
        return this.mapPointToWorldSpace(this.mesh.vertices.at(index), out);
    };
    PolygonModel.prototype.containsPoint = function (p) {
        return this.mesh.containsPoint(this.mapPointToModelSpace(p));
    };
    PolygonModel.prototype.scaleToFit = function (dst, stf) {
        if (stf === void 0) { stf = 2; }
        __1.Mat2d.rectToRect(this.mesh.bounds, dst, stf, this.matrix);
    };
    PolygonModel.prototype.stretchAcross = function (_a) {
        var p1 = _a.p1, p2 = _a.p2;
        var b = this.mesh.bounds;
        var cx = b.centerX;
        var v = __1.Vec2.fromPointToPoint({ x: cx, y: b.top }, p1);
        var t = __1.Mat2d.translate(v, this.matrix);
        var c = __1.Mat2d.mapPoint(t, { x: cx, y: b.bottom });
        var s = __1.Mat2d.stretchRotateToPoint(c, p2, p1);
        this.transform(s);
    };
    return PolygonModel;
}(__1.Model));
exports.PolygonModel = PolygonModel;


/***/ }),

/***/ "../glib/src/program/ellipse-program.ts":
/*!**********************************************!*\
  !*** ../glib/src/program/ellipse-program.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EllipseProgram = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var Shader = __webpack_require__(/*! ../shader/ellipse */ "../glib/src/shader/ellipse.ts");
var EllipseProgram = (function (_super) {
    __extends(EllipseProgram, _super);
    function EllipseProgram() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EllipseProgram.create = function (util) {
        var program = new EllipseProgram;
        program.location = util.createProgramFromSources(Shader.vertex, Shader.fragment);
        program.uniforms = util.getUniformLocationMap(program.location, Shader.uniformRenaming);
        program.attribs = util.getAttributeLocationMap(program.location, Shader.attributeRenaming);
        program.positionBuffer = util.createArrayBuffer(EllipseProgram.mesh.vertices.data);
        program.matrixBuffer = util.createBuffer();
        return program;
    };
    EllipseProgram.prototype.onAttach = function (_a) {
        var gl = _a.gl;
        var c1 = this.attribs.model;
        var c2 = c1 + 1;
        var c3 = this.attribs.offset;
        gl.enable(gl.BLEND);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.attribs.position);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
        gl.enableVertexAttribArray(c1);
        gl.enableVertexAttribArray(c2);
        gl.enableVertexAttribArray(c3);
        gl.vertexAttribDivisor(c1, 1);
        gl.vertexAttribDivisor(c2, 1);
        gl.vertexAttribDivisor(c3, 1);
    };
    EllipseProgram.prototype.onDetach = function (_a) {
        var gl = _a.gl;
        var c1 = this.attribs.model;
        var c2 = c1 + 1;
        var c3 = this.attribs.offset;
        gl.vertexAttribDivisor(c1, 0);
        gl.vertexAttribDivisor(c2, 0);
        gl.vertexAttribDivisor(c3, 0);
    };
    EllipseProgram.prototype.draw = function (renderer, matrices) {
        var gl = renderer.gl, camera = renderer.camera;
        renderer.useProgram(this);
        this.loadProjection(gl, camera.matrix);
        this.loadMatrices(gl, matrices);
        this.loadFillColor(gl);
        this.loadStrokeColor(gl);
        this.loadLineWidth(gl);
        gl.drawArraysInstanced(gl.TRIANGLE_FAN, 0, 4, matrices.length);
    };
    EllipseProgram.prototype.loadProjection = function (gl, projection) {
        gl.uniformMatrix4fv(this.uniforms.projection, false, projection);
    };
    EllipseProgram.prototype.loadMatrices = function (gl, matrices) {
        var c1 = this.attribs.model;
        var c2 = c1 + 1;
        var c3 = this.attribs.offset;
        gl.bufferData(gl.ARRAY_BUFFER, matrices.data, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(c1, 2, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(c2, 2, gl.FLOAT, false, 24, 8);
        gl.vertexAttribPointer(c3, 2, gl.FLOAT, false, 24, 16);
    };
    EllipseProgram.prototype.loadFillColor = function (gl) {
        gl.uniform4fv(this.uniforms.fillColor, this.fillColor.data);
    };
    EllipseProgram.prototype.loadStrokeColor = function (gl) {
        gl.uniform4fv(this.uniforms.strokeColor, this.strokeColor.data);
    };
    EllipseProgram.prototype.loadLineWidth = function (gl) {
        gl.uniform1f(this.uniforms.lineWidth, this.lineWidth);
    };
    EllipseProgram.mesh = __1.PolygonMesh.rectangle(__1.Rect.dimensions(-1, 1, 2, 2));
    return EllipseProgram;
}(__1.Program));
exports.EllipseProgram = EllipseProgram;


/***/ }),

/***/ "../glib/src/program/fill-program.ts":
/*!*******************************************!*\
  !*** ../glib/src/program/fill-program.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FillProgram = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var Shader = __webpack_require__(/*! ../shader/fill */ "../glib/src/shader/fill.ts");
var FillProgram = (function (_super) {
    __extends(FillProgram, _super);
    function FillProgram() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FillProgram.create = function (util, meshes) {
        var program = new FillProgram;
        program.location = util.createProgramFromSources(Shader.vertex, Shader.fragment);
        program.uniforms = util.getUniformLocationMap(program.location, Shader.uniformRenaming);
        program.attribs = util.getAttributeLocationMap(program.location, Shader.attributeRenaming);
        program.indexBuffer = util.createIndexBuffer(meshes);
        program.positionBuffer = util.createVertexBuffer(meshes);
        program.matrixBuffer = util.createBuffer();
        program.dynamicBuffer = util.createBuffer();
        return program;
    };
    FillProgram.prototype.onAttach = function (_a) {
        var gl = _a.gl;
        var column1 = this.attribs.model;
        var column2 = column1 + 1;
        var column3 = this.attribs.offset;
        gl.enable(gl.BLEND);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.enableVertexAttribArray(this.attribs.position);
        gl.enableVertexAttribArray(column1);
        gl.enableVertexAttribArray(column2);
        gl.enableVertexAttribArray(column3);
        gl.vertexAttribDivisor(column1, 1);
        gl.vertexAttribDivisor(column2, 1);
        gl.vertexAttribDivisor(column3, 1);
    };
    FillProgram.prototype.onDetach = function (_a) {
        var gl = _a.gl;
        var column1 = this.attribs.model;
        var column2 = column1 + 1;
        var column3 = this.attribs.offset;
        gl.vertexAttribDivisor(column1, 0);
        gl.vertexAttribDivisor(column2, 0);
        gl.vertexAttribDivisor(column3, 0);
    };
    FillProgram.prototype.draw = function (renderer, mesh, matrices) {
        var gl = renderer.gl;
        renderer.useProgram(this);
        this.loadProjection(gl, renderer.camera.matrix);
        this.loadColor(gl);
        this.loadVertices(gl, mesh);
        this.loadMatrices(gl, matrices);
        if (mesh.indices) {
            gl.drawElementsInstanced(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, mesh.indexBufferOffset, matrices.length);
        }
        else {
            gl.drawArraysInstanced(gl.TRIANGLES, 0, mesh.vertices.length, matrices.length);
        }
    };
    FillProgram.prototype.drawTriangleStrip = function (renderer, vertices, matrices) {
        var gl = renderer.gl;
        renderer.useProgram(this);
        this.loadProjection(gl, renderer.camera.matrix);
        this.loadColor(gl);
        this.loadLineVertices(gl, vertices);
        this.loadMatrices(gl, matrices);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, vertices.length, matrices.length);
    };
    FillProgram.prototype.loadProjection = function (gl, projection) {
        gl.uniformMatrix4fv(this.uniforms.projection, false, projection);
    };
    FillProgram.prototype.loadColor = function (gl) {
        gl.uniform4fv(this.uniforms.color, this.color.data);
    };
    FillProgram.prototype.loadVertices = function (gl, mesh) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, mesh.vertexBufferOffset);
    };
    FillProgram.prototype.loadLineVertices = function (gl, vertices) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.dynamicBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices.data, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);
    };
    FillProgram.prototype.loadMatrices = function (gl, matrices) {
        var column1 = this.attribs.model;
        var column2 = column1 + 1;
        var column3 = this.attribs.offset;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, matrices.data, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(column1, 2, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(column2, 2, gl.FLOAT, false, 24, 8);
        gl.vertexAttribPointer(column3, 2, gl.FLOAT, false, 24, 16);
    };
    return FillProgram;
}(__1.Program));
exports.FillProgram = FillProgram;


/***/ }),

/***/ "../glib/src/program/program-util.ts":
/*!*******************************************!*\
  !*** ../glib/src/program/program-util.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramUtil = void 0;
var ProgramUtil = (function () {
    function ProgramUtil(gl) {
        this.gl = gl;
    }
    ProgramUtil.prototype.createBuffer = function () {
        return this.gl.createBuffer();
    };
    ProgramUtil.prototype.createArrayBuffer = function (size, usage) {
        if (usage === void 0) { usage = this.gl.STATIC_DRAW; }
        var gl = this.gl, buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, size, usage);
        return buffer;
    };
    ProgramUtil.prototype.createElementBuffer = function (size, usage) {
        if (usage === void 0) { usage = this.gl.STATIC_DRAW; }
        var gl = this.gl, buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, size, usage);
        return buffer;
    };
    ProgramUtil.prototype.createVertexBuffer = function (meshes) {
        var gl = this.gl;
        var size = this.sizeOfVertexBuffer(meshes);
        var buffer = this.createArrayBuffer(size, gl.STATIC_DRAW);
        var offset = 0;
        for (var _i = 0, meshes_1 = meshes; _i < meshes_1.length; _i++) {
            var mesh = meshes_1[_i];
            var data = mesh.vertices.data;
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
            mesh.vertexBufferOffset = offset;
            offset += data.byteLength;
        }
        return buffer;
    };
    ProgramUtil.prototype.sizeOfVertexBuffer = function (meshes) {
        return meshes.reduce(function (total, mesh) { return total + mesh.vertices.data.byteLength; }, 0);
    };
    ProgramUtil.prototype.createIndexBuffer = function (meshes) {
        var gl = this.gl;
        var size = this.sizeOfIndexBuffer(meshes);
        var buffer = this.createElementBuffer(size, gl.STATIC_DRAW);
        var offset = 0;
        for (var _i = 0, meshes_2 = meshes; _i < meshes_2.length; _i++) {
            var mesh = meshes_2[_i];
            var data = mesh.indices;
            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, data);
            mesh.indexBufferOffset = offset;
            offset += data.byteLength;
        }
        return buffer;
    };
    ProgramUtil.prototype.sizeOfIndexBuffer = function (meshes) {
        return meshes.reduce(function (total, mesh) { return total + mesh.indices.byteLength; }, 0);
    };
    ProgramUtil.prototype.createMiterBuffer = function (meshes) {
        var gl = this.gl;
        var size = this.sizeOfStrokeVertexBuffer(meshes);
        var buffer = this.createArrayBuffer(size);
        var offset = 0;
        var data;
        for (var _i = 0, meshes_3 = meshes; _i < meshes_3.length; _i++) {
            var mesh = meshes_3[_i];
            mesh.miterBufferOffset = offset;
            offset += mesh.vertices.data.byteLength;
            data = mesh.miters.data;
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
            offset += data.byteLength;
        }
        return buffer;
    };
    ProgramUtil.prototype.createStrokeIndexBuffer = function (meshes) {
        var indexCount = this.lengthOfStrokeIndexArray(meshes);
        var indices = new Uint16Array(indexCount);
        var position = 0;
        for (var _i = 0, meshes_4 = meshes; _i < meshes_4.length; _i++) {
            var mesh = meshes_4[_i];
            var vertexCount = mesh.vertices.length;
            mesh.strokeIndexCount = 2 * (vertexCount + 1);
            mesh.strokeIndexBufferOffset = position * 2;
            for (var i = 0; i < vertexCount; i++) {
                indices[position++] = i + vertexCount;
                indices[position++] = i;
            }
            indices[position++] = vertexCount;
            indices[position++] = 0;
        }
        return this.createElementBuffer(indices, this.gl.STATIC_DRAW);
    };
    ProgramUtil.prototype.lengthOfStrokeIndexArray = function (meshes) {
        return meshes.reduce(function (total, mesh) { return total + (2 * (mesh.vertices.length + 1)); }, 0);
    };
    ProgramUtil.prototype.createStrokeVertexBuffer = function (meshes) {
        var gl = this.gl;
        var size = this.sizeOfStrokeVertexBuffer(meshes);
        var buffer = this.createArrayBuffer(size);
        var offset = 0;
        for (var _i = 0, meshes_5 = meshes; _i < meshes_5.length; _i++) {
            var mesh = meshes_5[_i];
            var data = mesh.vertices.data;
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
            mesh.strokeVertexBufferOffset = offset;
            offset += data.byteLength;
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
            offset += data.byteLength;
        }
        return buffer;
    };
    ProgramUtil.prototype.sizeOfStrokeVertexBuffer = function (meshes) {
        var innerVertexSize = this.sizeOfStrokeVertexBuffer(meshes);
        var outerVertexSize = meshes.reduce(function (total, m) { return total + m.miters.data.byteLength; }, 0);
        return innerVertexSize + outerVertexSize;
    };
    ProgramUtil.prototype.createProgramFromSources = function (vertexShaderSource, fragmentShaderSource) {
        var vs = this.compileShader(vertexShaderSource, this.gl.VERTEX_SHADER);
        var fs = this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);
        return this.createProgramFromShaders(vs, fs);
    };
    ;
    ProgramUtil.prototype.createProgramFromShaders = function (vertexShader, fragmentShader) {
        var gl = this.gl, program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            throw ("program filed to link:" + gl.getProgramInfoLog(program));
        }
        return program;
    };
    ;
    ProgramUtil.prototype.compileShader = function (shaderSource, shaderType) {
        var gl = this.gl, shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            throw "could not compile shader:" + gl.getShaderInfoLog(shader);
        }
        return shader;
    };
    ProgramUtil.prototype.getUniformLocationMap = function (program, renamed) {
        var gl = this.gl, uniforms = {};
        if (renamed) {
            for (var name_1 in renamed) {
                uniforms[name_1] = gl.getUniformLocation(program, renamed[name_1]);
            }
        }
        else {
            var count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < count; i++) {
                var name_2 = gl.getActiveUniform(program, i).name;
                uniforms[name_2] = gl.getUniformLocation(program, name_2);
            }
        }
        return uniforms;
    };
    ProgramUtil.prototype.getAttributeLocationMap = function (program, renamed) {
        var gl = this.gl, attribs = {};
        if (renamed) {
            for (var name_3 in renamed) {
                attribs[name_3] = gl.getAttribLocation(program, renamed[name_3]);
            }
        }
        else {
            var count = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
            for (var i = 0; i < count; i++) {
                var name_4 = gl.getActiveAttrib(program, i).name;
                attribs[name_4] = gl.getAttribLocation(program, name_4);
            }
        }
        return attribs;
    };
    return ProgramUtil;
}());
exports.ProgramUtil = ProgramUtil;


/***/ }),

/***/ "../glib/src/program/program.ts":
/*!**************************************!*\
  !*** ../glib/src/program/program.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Program = void 0;
var Program = (function () {
    function Program() {
    }
    return Program;
}());
exports.Program = Program;


/***/ }),

/***/ "../glib/src/rendering/camera.ts":
/*!***************************************!*\
  !*** ../glib/src/rendering/camera.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Camera = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var Camera = (function () {
    function Camera(world, minZoom, maxZoom) {
        this.world = world;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
        this.matrix = new Float32Array(16);
        this.view = __1.Rect.copy(this.world);
        this.position = this.world.center();
        this.zoom = 1;
    }
    Camera.prototype.setViewport = function (vw, vh) {
        var vr = vw / vh, wr = this.world.aspect;
        var m = __1.Mat2d.scale(wr < vr ? { x: vr / wr, y: 1 } : { x: 1, y: wr / vr });
        __1.Mat2d.concat(__1.Mat2d.stretch(1 / this.zoom), m, m);
        __1.Mat2d.concat(__1.Mat2d.translate(this.position), m, m);
        __1.Mat2d.mapRect(m, this.world, this.view);
        this.updateMatrix();
    };
    Camera.prototype.offset = function (desiredOffset) {
        var target = __1.Vec2.add(desiredOffset, this.position);
        var ratio = (this.zoom - this.minZoom) / this.zoom;
        var size = __1.Mat2d.mapRect(__1.Mat2d.stretch(ratio), this.world);
        var far = __1.Rect.copy(size);
        far.offset(__1.Vec2.rotate180(size.center()));
        var actualOffset = __1.Vec2.copy(desiredOffset);
        if (target.x < far.left) {
            actualOffset.x = far.left - this.position.x;
        }
        else if (target.x > far.right) {
            actualOffset.x = far.right - this.position.x;
        }
        if (target.y < far.bottom) {
            actualOffset.y = far.bottom - this.position.y;
        }
        else if (target.y > far.top) {
            actualOffset.y = far.top - this.position.y;
        }
        this.view.offset(actualOffset);
        __1.Vec2.add(this.position, actualOffset, this.position);
        this.updateMatrix();
        return actualOffset;
    };
    Camera.prototype.zoomIn = function (desiredScaleFactor) {
        var targetZoom = this.zoom * desiredScaleFactor;
        var actualScaleFactor;
        if (targetZoom < this.minZoom) {
            actualScaleFactor = this.minZoom / this.zoom;
            this.zoom = this.minZoom;
        }
        else if (targetZoom > this.maxZoom) {
            actualScaleFactor = this.maxZoom / this.zoom;
            this.zoom = this.maxZoom;
        }
        else {
            actualScaleFactor = desiredScaleFactor;
            this.zoom = targetZoom;
        }
        var m = __1.Mat2d.pivot(__1.Mat2d.stretch(1 / actualScaleFactor), this.position);
        __1.Mat2d.mapRect(m, this.view, this.view);
        this.updateMatrix();
        return actualScaleFactor;
    };
    Camera.prototype.zoomToPoint = function (desiredScaleFactor, focus) {
        var view = this.view;
        var normX = (focus.x - view.left) / view.width;
        var normY = (focus.y - view.bottom) / view.height;
        var actualScaleFactor = this.zoomIn(desiredScaleFactor);
        var aft = {
            x: view.left + (normX * view.width),
            y: view.bottom + (normY * view.height)
        };
        var offset = __1.Vec2.fromPointToPoint(aft, focus);
        var actualOffset = this.offset(offset);
        return { scale: actualScaleFactor, offset: actualOffset };
    };
    Camera.prototype.updateMatrix = function () {
        __1.Mat4.ortho(this.view, 0.1, 10, this.matrix);
    };
    return Camera;
}());
exports.Camera = Camera;


/***/ }),

/***/ "../glib/src/rendering/renderer.ts":
/*!*****************************************!*\
  !*** ../glib/src/rendering/renderer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Renderer = void 0;
var Renderer = (function () {
    function Renderer(gl, camera) {
        this.gl = gl;
        this.camera = camera;
    }
    Renderer.prototype.onSurfaceChange = function (width, height) {
        this.gl.viewport(0, 0, width, height);
        this.camera.setViewport(width, height);
    };
    Renderer.prototype.useProgram = function (program) {
        if (this.currentProgram !== program) {
            this.attachProgram(program);
        }
    };
    Renderer.prototype.attachProgram = function (program) {
        this.gl.useProgram(program.location);
        if (this.currentProgram) {
            this.currentProgram.onDetach(this);
        }
        program.onAttach(this);
        this.currentProgram = program;
    };
    return Renderer;
}());
exports.Renderer = Renderer;
;


/***/ }),

/***/ "../glib/src/rendering/surface.ts":
/*!****************************************!*\
  !*** ../glib/src/rendering/surface.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Surface = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var pointer_event_1 = __webpack_require__(/*! ../event/pointer-event */ "../glib/src/event/pointer-event.ts");
var wheel_event_1 = __webpack_require__(/*! ../event/wheel-event */ "../glib/src/event/wheel-event.ts");
var Surface = (function () {
    function Surface(canvasEl, renderer, scene) {
        var _this = this;
        this.canvasEl = canvasEl;
        this.renderer = renderer;
        this.scene = scene;
        this.clientRect = this.canvasEl.getBoundingClientRect();
        this.hasRenderRequest = false;
        this.checkRender = function () {
            _this.resize();
            _this.onAnimationFrame();
            requestAnimationFrame(_this.checkRender);
        };
    }
    Surface.prototype.startRenderLoop = function () {
        this.requestRender();
        this.checkRender();
    };
    Surface.prototype.requestRender = function () {
        this.hasRenderRequest = true;
    };
    Surface.prototype.onAnimationFrame = function () {
        if (this.hasRenderRequest) {
            this.scene.draw(this.renderer);
            this.hasRenderRequest = false;
        }
    };
    Surface.prototype.resize = function (width, height) {
        if (width === void 0) { width = this.canvasEl.clientWidth; }
        if (height === void 0) { height = this.canvasEl.clientHeight; }
        if (this.canvasEl.width !== width || this.canvasEl.height !== height) {
            this.canvasEl.width = width;
            this.canvasEl.height = height;
            this.clientRect = this.canvasEl.getBoundingClientRect();
            this.renderer.onSurfaceChange(width, height);
            this.requestRender();
        }
    };
    Surface.prototype.startDetectingPointerEvents = function () {
        var detector = new pointer_event_1.PointerEventDetector(this);
        detector.startListening();
        return detector;
    };
    Surface.prototype.startDetectingWheelEvents = function () {
        var detector = new wheel_event_1.WheelEventDetector(this);
        detector.startListening();
        return detector;
    };
    Surface.prototype.pan = function (desiredOffset) {
        var camera = this.renderer.camera;
        var actual = camera.offset(desiredOffset);
        if (__1.Vec2.length2(actual) != 0) {
            this.requestRender();
        }
        return actual;
    };
    Surface.prototype.zoomIn = function (desiredScaleFactor) {
        var camera = this.renderer.camera;
        var actual = camera.zoomIn(desiredScaleFactor);
        if (actual != 1) {
            this.requestRender();
        }
    };
    Surface.prototype.zoomOut = function (desiredScaleFactor) {
        this.zoomIn(1 / desiredScaleFactor);
    };
    Surface.prototype.zoomToPoint = function (desiredScaleFactor, focus) {
        var camera = this.renderer.camera;
        var actual = camera.zoomToPoint(desiredScaleFactor, focus);
        if (actual.scale != 1 || __1.Vec2.length2(actual.offset) != 0) {
            this.requestRender();
        }
        return actual;
    };
    Surface.prototype.mapScreenPointToCanvas = function (screenPoint) {
        return {
            x: screenPoint.clientX - this.clientRect.left,
            y: screenPoint.clientY - this.clientRect.top
        };
    };
    Surface.prototype.mapScreenPointToNdc = function (screenPoint) {
        return this.mapCanvasPointToNdc(this.mapScreenPointToCanvas(screenPoint));
    };
    Surface.prototype.mapScreenPointToWorld = function (screenPoint) {
        return this.mapNdcToWorld(this.mapScreenPointToNdc(screenPoint));
    };
    Surface.prototype.mapCanvasPointToNdc = function (canvasPoint) {
        var _a = this.clientRect, width = _a.width, height = _a.height;
        var x = canvasPoint.x / width;
        var y = (height - canvasPoint.y) / height;
        return { x: x, y: y };
    };
    Surface.prototype.mapNdcToWorld = function (ndc) {
        var view = this.renderer.camera.view;
        var x = view.left + (ndc.x * view.width);
        var y = view.bottom + (ndc.y * view.height);
        return { x: x, y: y };
    };
    return Surface;
}());
exports.Surface = Surface;
;


/***/ }),

/***/ "../glib/src/shader/ellipse.ts":
/*!*************************************!*\
  !*** ../glib/src/shader/ellipse.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uniformRenaming = exports.attributeRenaming = exports.fragment = exports.vertex = void 0;
exports.vertex = "precision mediump float;uniform mat4 z;uniform float s;attribute mat2 c;attribute vec2 v,h;varying vec2 f,e;mat2 i(float a){float b=sin(a),d=cos(a);return mat2(d,b,-b,d);}void main(){float j=c[0].x,k=c[1].x,l=c[0].y,m=c[1].y,a=(j+m)/2.,b=(j-m)/2.,d=(l+k)/2.,g=(l-k)/2.,n=sqrt(a*a+g*g),o=sqrt(b*b+d*d),A=n+o,p=n-o,q=atan(d,b),r=atan(g,a),w=(r-q)/2.,x=(r+q)/2.;mat2 t=i(x),u=i(w);t[1]*=sign(p),p=abs(p);vec2 y=t*(s*(u*h)),B=c*h+v+y;gl_Position=z*vec4(B,1.,1.),e=u*h,f=e*(1.+s/vec2(A,p));}", exports.fragment = "precision mediump float;uniform vec4 C,D;varying vec2 f,e;void main(){bool a=dot(f,f)<1.,b=dot(e,e)<1.;gl_FragColor=a?C:b?D:vec4(0.);}", exports.attributeRenaming = { "model": "c", "offset": "v", "position": "h" }, exports.uniformRenaming = { "projection": "z", "lineWidth": "s", "fillColor": "C", "strokeColor": "D" };


/***/ }),

/***/ "../glib/src/shader/fill.ts":
/*!**********************************!*\
  !*** ../glib/src/shader/fill.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uniformRenaming = exports.attributeRenaming = exports.fragment = exports.vertex = void 0;
exports.vertex = "precision mediump float;uniform mat4 d;attribute mat2 a;attribute vec2 b,c;void main(){vec2 e=a*c+b;gl_Position=d*vec4(e,1.,1.);}", exports.fragment = "precision mediump float;uniform vec4 f;void main(){gl_FragColor=f;}", exports.attributeRenaming = { "model": "a", "offset": "b", "position": "c" }, exports.uniformRenaming = { "projection": "d", "color": "f" };


/***/ }),

/***/ "../glib/src/struct/color.ts":
/*!***********************************!*\
  !*** ../glib/src/struct/color.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.equals = exports.isTransparent = exports.isOpaque = exports.blend = exports.random = exports.toArgbString = exports.fromArgbString = exports.toRgbaInt = exports.fromRgbInt = exports.fromRgbaInt = exports.copy = void 0;
var util_1 = __webpack_require__(/*! ./util */ "../glib/src/struct/util.ts");
function copy(c, out) {
    if (out === void 0) { out = {}; }
    out.r = c.r;
    out.g = c.g;
    out.b = c.b;
    out.a = c.a;
    return out;
}
exports.copy = copy;
function fromRgbaInt(rgba, out) {
    if (out === void 0) { out = {}; }
    out.r = (rgba >> 24) & 0xff;
    out.g = (rgba >> 16) & 0xff;
    out.b = (rgba >> 8) & 0xff;
    out.a = (rgba >> 0) & 0xff;
    return out;
}
exports.fromRgbaInt = fromRgbaInt;
function fromRgbInt(rgb, out) {
    if (out === void 0) { out = {}; }
    return fromRgbaInt((rgb << 8) | 0xff, out);
}
exports.fromRgbInt = fromRgbInt;
function toRgbaInt(c) {
    var r = c.r << 24;
    var g = c.g << 16;
    var b = c.b << 8;
    var a = c.a << 0;
    return (r | g | b | a) >>> 0;
}
exports.toRgbaInt = toRgbaInt;
function fromArgbString(argb, out) {
    if (out === void 0) { out = {}; }
    var i = argb[0] == '#' ? 1 : 0;
    out.a = parseInt(argb.substr(i, 2), 16);
    out.r = parseInt(argb.substr(i + 2, 2), 16);
    out.g = parseInt(argb.substr(i + 4, 2), 16);
    out.b = parseInt(argb.substr(i + 6, 2), 16);
    return out;
}
exports.fromArgbString = fromArgbString;
function toArgbString(c) {
    var a = util_1.pad(c.a.toString(16));
    var r = util_1.pad(c.r.toString(16));
    var g = util_1.pad(c.g.toString(16));
    var b = util_1.pad(c.b.toString(16));
    return '#' + a + r + g + b;
}
exports.toArgbString = toArgbString;
function random(out) {
    if (out === void 0) { out = {}; }
    out.r = util_1.randomByte();
    out.g = util_1.randomByte();
    out.b = util_1.randomByte();
    out.a = out.a === undefined ? 0xff : out.a;
    return out;
}
exports.random = random;
function blend(src, dst, out) {
    if (out === void 0) { out = {}; }
    var alpha = src.a + 1, invAlpha = 256 - src.a;
    out.r = (alpha * src.r + invAlpha * dst.r) >> 8;
    out.g = (alpha * src.g + invAlpha * dst.g) >> 8;
    out.b = (alpha * src.b + invAlpha * dst.b) >> 8;
    out.a = dst.a;
    return out;
}
exports.blend = blend;
function isOpaque(c) {
    return c.a === 0xff;
}
exports.isOpaque = isOpaque;
function isTransparent(c) {
    return c.a === 0;
}
exports.isTransparent = isTransparent;
function equals(c1, c2) {
    return c1.r == c2.r
        && c1.g == c2.g
        && c1.b == c2.b
        && c1.a == c2.a;
}
exports.equals = equals;


/***/ }),

/***/ "../glib/src/struct/colorf.ts":
/*!************************************!*\
  !*** ../glib/src/struct/colorf.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.premultiplyAlpha = exports.isOpaque = exports.random = exports.toColor = exports.fromColor = exports.equals = exports.isTransparent = exports.copy = void 0;
var color_1 = __webpack_require__(/*! ./color */ "../glib/src/struct/color.ts");
Object.defineProperty(exports, "copy", ({ enumerable: true, get: function () { return color_1.copy; } }));
Object.defineProperty(exports, "isTransparent", ({ enumerable: true, get: function () { return color_1.isTransparent; } }));
function equals(c1, c2, e) {
    if (e === void 0) { e = 0; }
    return Math.abs(c1.r - c2.r) <= e
        && Math.abs(c1.g - c2.g) <= e
        && Math.abs(c1.b - c2.b) <= e;
}
exports.equals = equals;
function fromColor(src, out) {
    if (out === void 0) { out = {}; }
    out.r = src.r / 0xff;
    out.g = src.g / 0xff;
    out.b = src.b / 0xff;
    out.a = src.a / 0xff;
    return out;
}
exports.fromColor = fromColor;
function toColor(src, out) {
    if (out === void 0) { out = {}; }
    out.r = (src.r * 0xff) >> 0;
    out.g = (src.g * 0xff) >> 0;
    out.b = (src.b * 0xff) >> 0;
    out.a = (src.a * 0xff) >> 0;
    return out;
}
exports.toColor = toColor;
function random(out) {
    if (out === void 0) { out = {}; }
    out.r = Math.random();
    out.g = Math.random();
    out.b = Math.random();
    out.a = out.a === undefined ? 1 : out.a;
    return out;
}
exports.random = random;
function isOpaque(c) {
    return c.a === 1;
}
exports.isOpaque = isOpaque;
function premultiplyAlpha(c, out) {
    if (out === void 0) { out = {}; }
    out.r = c.r * c.a;
    out.g = c.g * c.a;
    out.b = c.b * c.a;
    out.a = 1;
    return out;
}
exports.premultiplyAlpha = premultiplyAlpha;


/***/ }),

/***/ "../glib/src/struct/ellipse.ts":
/*!*************************************!*\
  !*** ../glib/src/struct/ellipse.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.equals = exports.containsPoint = exports.fromRect = exports.circle = exports.copy = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
function copy(e, out) {
    if (out === void 0) { out = {}; }
    out.rx = e.rx;
    out.ry = e.ry;
    out.c = __1.Point.copy(e.c, out.c);
    return out;
}
exports.copy = copy;
function circle(r, c, out) {
    if (out === void 0) { out = {}; }
    return copy({ rx: r, ry: r, c: c }, out);
}
exports.circle = circle;
function fromRect(r, out) {
    if (out === void 0) { out = {}; }
    return copy({ rx: r.width / 2, ry: r.height / 2, c: r.center() }, out);
}
exports.fromRect = fromRect;
function containsPoint(e, p) {
    var d = __1.Vec2.fromPointToPoint(p, e.c);
    var sx = d.x / e.rx;
    var sy = d.y / e.ry;
    return (sx * sx) + (sy * sy) <= 1;
}
exports.containsPoint = containsPoint;
function equals(e1, e2, e) {
    if (e === void 0) { e = 0; }
    return Math.abs(e1.rx - e2.rx) <= e
        && Math.abs(e1.ry - e2.ry) <= e
        && __1.Point.equals(e1.c, e2.c, e);
}
exports.equals = equals;


/***/ }),

/***/ "../glib/src/struct/line-segment.ts":
/*!******************************************!*\
  !*** ../glib/src/struct/line-segment.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LineSegment = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var LineSegment = (function () {
    function LineSegment(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    Object.defineProperty(LineSegment.prototype, "midpoint", {
        get: function () {
            return __1.Point.midpoint(this.p1, this.p2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "length", {
        get: function () {
            return __1.Point.distance(this.p1, this.p2);
        },
        enumerable: false,
        configurable: true
    });
    LineSegment.prototype.containsPoint = function (p, epsilon) {
        if (epsilon === void 0) { epsilon = 0; }
        var a = this.p1, b = __1.Vec2.fromPointToPoint(this.p1, this.p2), t = -1;
        var v = __1.Vec2.fromPointToPoint(a, p);
        var len2 = __1.Vec2.length2(b);
        if (len2 != 0) {
            t = __1.Vec2.dot(b, v) / len2;
        }
        if (t < 0 || t > 1) {
            return false;
        }
        var closest = __1.Vec2.add(a, __1.Vec2.multiply(b, t));
        var dist2 = __1.Point.distance2(closest, p);
        return dist2 <= (epsilon * epsilon);
    };
    LineSegment.prototype.copy = function () {
        return new LineSegment(__1.Point.copy(this.p1), __1.Point.copy(this.p2));
    };
    LineSegment.prototype.equals = function (l, e) {
        if (e === void 0) { e = 0; }
        return __1.Point.equals(this.p1, l.p1, e)
            && __1.Point.equals(this.p2, l.p2, e);
    };
    return LineSegment;
}());
exports.LineSegment = LineSegment;


/***/ }),

/***/ "../glib/src/struct/mat2d.ts":
/*!***********************************!*\
  !*** ../glib/src/struct/mat2d.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.equals = exports.mapRect = exports.mapPoint = exports.rectToRect = exports.sinCos = exports.stretchRotateToPoint = exports.rotate = exports.stretch = exports.scaleToPoint = exports.scale = exports.translate = exports.identity = exports.conjugate = exports.pivot = exports.concat = exports.determinant = exports.invert = exports.copy = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
function copy(m, out) {
    if (out === void 0) { out = {}; }
    out.c1r1 = m.c1r1;
    out.c2r1 = m.c2r1;
    out.c3r1 = m.c3r1;
    out.c1r2 = m.c1r2;
    out.c2r2 = m.c2r2;
    out.c3r2 = m.c3r2;
    return out;
}
exports.copy = copy;
function invert(m, out) {
    if (out === void 0) { out = {}; }
    var det = determinant(m);
    var c1r1 = m.c1r1, c2r1 = m.c2r1, c3r1 = m.c3r1, c1r2 = m.c1r2, c2r2 = m.c2r2, c3r2 = m.c3r2;
    out.c1r1 = c2r2 / det;
    out.c2r1 = -c2r1 / det;
    out.c3r1 = ((c2r1 * c3r2) - (c3r1 * c2r2)) / det;
    out.c1r2 = -c1r2 / det;
    out.c2r2 = c1r1 / det;
    out.c3r2 = ((c1r2 * c3r1) - (c1r1 * c3r2)) / det;
    return out;
}
exports.invert = invert;
function determinant(m) {
    return (m.c1r1 * m.c2r2) - (m.c2r1 * m.c1r2);
}
exports.determinant = determinant;
function concat(left, right, out) {
    if (out === void 0) { out = {}; }
    var c1r1 = left.c1r1 * right.c1r1 + left.c2r1 * right.c1r2;
    var c2r1 = left.c1r1 * right.c2r1 + left.c2r1 * right.c2r2;
    var c3r1 = left.c1r1 * right.c3r1 + left.c2r1 * right.c3r2 + left.c3r1;
    var c1r2 = left.c1r2 * right.c1r1 + left.c2r2 * right.c1r2;
    var c2r2 = left.c1r2 * right.c2r1 + left.c2r2 * right.c2r2;
    var c3r2 = left.c1r2 * right.c3r1 + left.c2r2 * right.c3r2 + left.c3r2;
    out.c1r1 = c1r1;
    out.c2r1 = c2r1;
    out.c3r1 = c3r1;
    out.c1r2 = c1r2;
    out.c2r2 = c2r2;
    out.c3r2 = c3r2;
    return out;
}
exports.concat = concat;
function pivot(m, v, out) {
    if (out === void 0) { out = {}; }
    return conjugate(m, translate(v), out);
}
exports.pivot = pivot;
function conjugate(m, conjugator, out) {
    if (out === void 0) { out = {}; }
    return concat(conjugator, concat(m, invert(conjugator)), out);
}
exports.conjugate = conjugate;
function identity(out) {
    if (out === void 0) { out = {}; }
    out.c1r1 = 1;
    out.c2r1 = 0;
    out.c3r1 = 0;
    out.c1r2 = 0;
    out.c2r2 = 1;
    out.c3r2 = 0;
    return out;
}
exports.identity = identity;
function translate(_a, out) {
    var x = _a.x, y = _a.y;
    if (out === void 0) { out = {}; }
    out.c1r1 = 1;
    out.c2r1 = 0;
    out.c3r1 = x;
    out.c1r2 = 0;
    out.c2r2 = 1;
    out.c3r2 = y;
    return out;
}
exports.translate = translate;
function scale(_a, out) {
    var x = _a.x, y = _a.y;
    if (out === void 0) { out = {}; }
    out.c1r1 = x;
    out.c2r1 = 0;
    out.c3r1 = 0;
    out.c1r2 = 0;
    out.c2r2 = y;
    out.c3r2 = 0;
    return out;
}
exports.scale = scale;
function scaleToPoint(start, end, p, out) {
    if (out === void 0) { out = {}; }
    var v1 = __1.Vec2.fromPointToPoint(p, start);
    var v2 = __1.Vec2.fromPointToPoint(p, end);
    var s = scale({ x: v2.x / v1.x, y: v2.y / v1.y }, out);
    return pivot(s, p, out);
}
exports.scaleToPoint = scaleToPoint;
function stretch(factor, out) {
    if (out === void 0) { out = {}; }
    return scale({ x: factor, y: factor }, out);
}
exports.stretch = stretch;
function rotate(radians, out) {
    if (out === void 0) { out = {}; }
    return sinCos(Math.sin(radians), Math.cos(radians), out);
}
exports.rotate = rotate;
function stretchRotateToPoint(start, end, p, out) {
    if (out === void 0) { out = {}; }
    var v1 = __1.Vec2.fromPointToPoint(p, start);
    var v2 = __1.Vec2.fromPointToPoint(p, end);
    var l1 = __1.Vec2.length(v1);
    var l2 = __1.Vec2.length(v2);
    var s = stretch(l2 / l1);
    var n1 = __1.Vec2.divide(v1, l1);
    var n2 = __1.Vec2.divide(v2, l2);
    var sin = __1.Vec2.cross(n1, n2);
    var cos = __1.Vec2.dot(n1, n2);
    var r = sinCos(sin, cos);
    return pivot(concat(s, r), p, out);
}
exports.stretchRotateToPoint = stretchRotateToPoint;
function sinCos(sin, cos, out) {
    if (out === void 0) { out = {}; }
    out.c1r1 = cos;
    out.c2r1 = -sin;
    out.c3r1 = 0;
    out.c1r2 = sin;
    out.c2r2 = cos;
    out.c3r2 = 0;
    return out;
}
exports.sinCos = sinCos;
;
function rectToRect(src, dst, stf, out) {
    if (stf === void 0) { stf = 2; }
    if (out === void 0) { out = {}; }
    var origin = { x: 0, y: 0 };
    var srcPoint = getScaleToFitPoint(src, stf);
    var dstPoint = getScaleToFitPoint(dst, stf);
    translate(__1.Vec2.fromPointToPoint(srcPoint, origin), out);
    var sx = dst.width / src.width;
    var sy = dst.height / src.height;
    var scaleMatrix = stf == 2 ? scale({ x: sx, y: sy }) : stretch(Math.min(sx, sy));
    concat(scaleMatrix, out, out);
    var translation = translate(__1.Vec2.fromPointToPoint(origin, dstPoint));
    return concat(translation, out, out);
}
exports.rectToRect = rectToRect;
function getScaleToFitPoint(r, stf) {
    switch (stf) {
        case 0:
            return r.center();
        case 1:
            return r.bottomRight();
        default:
            return r.topLeft();
    }
}
function mapPoint(m, _a, out) {
    var x = _a.x, y = _a.y;
    if (out === void 0) { out = {}; }
    out.x = m.c1r1 * x + m.c2r1 * y + m.c3r1;
    out.y = m.c1r2 * x + m.c2r2 * y + m.c3r2;
    return out;
}
exports.mapPoint = mapPoint;
function mapRect(m, r, out) {
    if (out === void 0) { out = __1.Rect.empty(); }
    var _a = mapPoint(m, r.topLeft()), x = _a.x, y = _a.y;
    var corners = [r.bottomLeft(), r.bottomRight(), r.topRight()];
    out.left = out.right = x;
    out.top = out.bottom = y;
    for (var _i = 0, corners_1 = corners; _i < corners_1.length; _i++) {
        var corner = corners_1[_i];
        out.unionPoint(mapPoint(m, corner));
    }
    return out;
}
exports.mapRect = mapRect;
function equals(m1, m2, e) {
    if (e === void 0) { e = 0; }
    return Math.abs(m1.c1r1 - m2.c1r1) <= e
        && Math.abs(m1.c1r2 - m2.c1r2) <= e
        && Math.abs(m1.c2r1 - m2.c2r1) <= e
        && Math.abs(m1.c2r2 - m2.c2r2) <= e
        && Math.abs(m1.c3r1 - m2.c3r1) <= e
        && Math.abs(m1.c3r2 - m2.c3r2) <= e;
}
exports.equals = equals;


/***/ }),

/***/ "../glib/src/struct/mat4.ts":
/*!**********************************!*\
  !*** ../glib/src/struct/mat4.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ortho = void 0;
function ortho(clip, near, far, out) {
    var width = clip.width, height = clip.height, depth = near - far;
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 2 / height;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1 / depth;
    out[11] = 0;
    out[12] = -(clip.right + clip.left) / width;
    out[13] = -(clip.top + clip.bottom) / height;
    out[14] = -near / depth;
    out[15] = 1;
}
exports.ortho = ortho;


/***/ }),

/***/ "../glib/src/struct/point.ts":
/*!***********************************!*\
  !*** ../glib/src/struct/point.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.equals = exports.distance2 = exports.distance = exports.midpoint = exports.copy = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
function copy(p, out) {
    if (out === void 0) { out = {}; }
    out.x = p.x;
    out.y = p.y;
    return out;
}
exports.copy = copy;
function midpoint(p1, p2, out) {
    if (out === void 0) { out = {}; }
    return __1.Vec2.multiply(__1.Vec2.add(p1, p2, out), 0.5, out);
}
exports.midpoint = midpoint;
function distance(p1, p2) {
    return Math.sqrt(distance2(p1, p2));
}
exports.distance = distance;
function distance2(p1, p2) {
    return __1.Vec2.length2(__1.Vec2.fromPointToPoint(p1, p2));
}
exports.distance2 = distance2;
function equals(p1, p2, e) {
    if (e === void 0) { e = 0; }
    return Math.abs(p1.x - p2.x) <= e
        && Math.abs(p1.y - p2.y) <= e;
}
exports.equals = equals;


/***/ }),

/***/ "../glib/src/struct/rect.ts":
/*!**********************************!*\
  !*** ../glib/src/struct/rect.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rect = void 0;
var Rect = (function () {
    function Rect(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    Rect.copy = function (r) {
        return new Rect(r.left, r.top, r.right, r.bottom);
    };
    Rect.empty = function () {
        return new Rect(0, 0, 0, 0);
    };
    Rect.dimensions = function (left, top, width, height) {
        return new Rect(left, top, left + width, top - height);
    };
    Object.defineProperty(Rect.prototype, "width", {
        get: function () {
            return this.right - this.left;
        },
        set: function (w) {
            this.right = this.left + w;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "height", {
        get: function () {
            return this.top - this.bottom;
        },
        set: function (h) {
            this.bottom = this.top - h;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "aspect", {
        get: function () {
            return this.width / this.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "area", {
        get: function () {
            return this.width * this.height;
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.center = function (out) {
        if (out === void 0) { out = {}; }
        out.x = this.centerX;
        out.y = this.centerY;
        return out;
    };
    Object.defineProperty(Rect.prototype, "centerX", {
        get: function () {
            return 0.5 * (this.left + this.right);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "centerY", {
        get: function () {
            return 0.5 * (this.bottom + this.top);
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.topLeft = function (out) {
        if (out === void 0) { out = {}; }
        out.x = this.left;
        out.y = this.top;
        return out;
    };
    Rect.prototype.bottomLeft = function (out) {
        if (out === void 0) { out = {}; }
        out.x = this.left;
        out.y = this.bottom;
        return out;
    };
    Rect.prototype.bottomRight = function (out) {
        if (out === void 0) { out = {}; }
        out.x = this.right;
        out.y = this.bottom;
        return out;
    };
    Rect.prototype.topRight = function (out) {
        if (out === void 0) { out = {}; }
        out.x = this.right;
        out.y = this.top;
        return out;
    };
    Rect.prototype.isEmpty = function () {
        return this.left >= this.right || this.bottom >= this.top;
    };
    Rect.prototype.isValid = function () {
        return this.right >= this.left && this.top >= this.bottom;
    };
    Rect.prototype.union = function (r) {
        this.left = Math.min(this.left, r.left);
        this.right = Math.max(this.right, r.right);
        this.bottom = Math.min(this.bottom, r.bottom);
        this.top = Math.max(this.top, r.top);
    };
    Rect.prototype.unionPoint = function (_a) {
        var x = _a.x, y = _a.y;
        this.left = Math.min(x, this.left);
        this.top = Math.max(y, this.top);
        this.right = Math.max(x, this.right);
        this.bottom = Math.min(y, this.bottom);
    };
    Rect.prototype.intersects = function (r) {
        return this.right >= r.left && r.right >= this.left && this.top >= r.bottom && r.top >= this.bottom;
    };
    Rect.prototype.intersect = function (r) {
        this.left = Math.max(this.left, r.left);
        this.right = Math.min(this.right, r.right);
        this.bottom = Math.max(this.bottom, r.bottom);
        this.top = Math.min(this.top, r.top);
    };
    Rect.prototype.inset = function (_a) {
        var x = _a.x, y = _a.y;
        this.left += x;
        this.top -= y;
        this.right -= x;
        this.bottom += y;
    };
    Rect.prototype.offset = function (_a) {
        var x = _a.x, y = _a.y;
        this.offsetX(x);
        this.offsetY(y);
    };
    Rect.prototype.offsetX = function (dx) {
        this.left += dx;
        this.right += dx;
    };
    Rect.prototype.offsetY = function (dy) {
        this.top += dy;
        this.bottom += dy;
    };
    Rect.prototype.contains = function (r) {
        return this.left <= r.left && r.right <= this.right &&
            this.bottom <= r.bottom && r.top <= this.top;
    };
    Rect.prototype.containsPoint = function (_a) {
        var x = _a.x, y = _a.y;
        return this.containsX(x) && this.containsY(y);
    };
    Rect.prototype.containsX = function (x) {
        return this.left <= x && x <= this.right;
    };
    Rect.prototype.containsY = function (y) {
        return this.bottom <= y && y <= this.top;
    };
    Rect.prototype.sort = function () {
        var _a = this, top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
        var vFlipped = bottom > top;
        var hFlipped = left > right;
        this.top = vFlipped ? bottom : top;
        this.left = hFlipped ? right : left;
        this.bottom = vFlipped ? top : bottom;
        this.right = hFlipped ? left : right;
    };
    Rect.prototype.equals = function (r, e) {
        if (e === void 0) { e = 0; }
        return Math.abs(this.left - r.left) <= e
            && Math.abs(this.top - r.top) <= e
            && Math.abs(this.right - r.right) <= e
            && Math.abs(this.bottom - r.bottom) <= e;
    };
    return Rect;
}());
exports.Rect = Rect;


/***/ }),

/***/ "../glib/src/struct/util.ts":
/*!**********************************!*\
  !*** ../glib/src/struct/util.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomByte = exports.randomInt = exports.pad = void 0;
function pad(str) {
    return (str.length == 1) ? '0' + str : str;
}
exports.pad = pad;
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomInt = randomInt;
function randomByte() {
    return randomInt(0, 0xff);
}
exports.randomByte = randomByte;


/***/ }),

/***/ "../glib/src/struct/vec2.ts":
/*!**********************************!*\
  !*** ../glib/src/struct/vec2.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.equals = exports.miter = exports.boundY = exports.boundX = exports.bound = exports.fromPointToPoint = exports.rotate270 = exports.rotate180 = exports.rotate90 = exports.normalize = exports.cross = exports.dot = exports.length2 = exports.length = exports.divide = exports.multiply = exports.subtract = exports.add = exports.copy = void 0;
function copy(v, out) {
    if (out === void 0) { out = {}; }
    out.x = v.x;
    out.y = v.y;
    return out;
}
exports.copy = copy;
function add(v1, v2, out) {
    if (out === void 0) { out = {}; }
    out.x = v1.x + v2.x;
    out.y = v1.y + v2.y;
    return out;
}
exports.add = add;
function subtract(v1, v2, out) {
    if (out === void 0) { out = {}; }
    out.x = v1.x - v2.x;
    out.y = v1.y - v2.y;
    return out;
}
exports.subtract = subtract;
function multiply(_a, factor, out) {
    var x = _a.x, y = _a.y;
    if (out === void 0) { out = {}; }
    out.x = x * factor;
    out.y = y * factor;
    return out;
}
exports.multiply = multiply;
function divide(_a, factor, out) {
    var x = _a.x, y = _a.y;
    if (out === void 0) { out = {}; }
    out.x = x / factor;
    out.y = y / factor;
    return out;
}
exports.divide = divide;
function length(v) {
    return Math.sqrt(length2(v));
}
exports.length = length;
function length2(_a) {
    var x = _a.x, y = _a.y;
    return x * x + y * y;
}
exports.length2 = length2;
function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}
exports.dot = dot;
function cross(v1, v2) {
    return (v1.x * v2.y) - (v2.x * v1.y);
}
exports.cross = cross;
function normalize(v, out) {
    if (out === void 0) { out = {}; }
    return divide(v, length(v), out);
}
exports.normalize = normalize;
function rotate90(_a, out) {
    var x = _a.x, y = _a.y;
    if (out === void 0) { out = {}; }
    out.x = y;
    out.y = -x;
    return out;
}
exports.rotate90 = rotate90;
function rotate180(_a, out) {
    var x = _a.x, y = _a.y;
    if (out === void 0) { out = {}; }
    out.x = -x;
    out.y = -y;
    return out;
}
exports.rotate180 = rotate180;
function rotate270(_a, out) {
    var x = _a.x, y = _a.y;
    if (out === void 0) { out = {}; }
    out.x = -y;
    out.y = x;
    return out;
}
exports.rotate270 = rotate270;
function fromPointToPoint(p1, p2, out) {
    if (out === void 0) { out = {}; }
    out.x = p2.x - p1.x;
    out.y = p2.y - p1.y;
    return out;
}
exports.fromPointToPoint = fromPointToPoint;
function bound(v, p, b, out) {
    if (out === void 0) { out = {}; }
    out.x = boundX(v.x, p.x, b);
    out.y = boundY(v.y, p.y, b);
    return out;
}
exports.bound = bound;
function boundX(dx, x, b) {
    var targetX = dx + x;
    var side = dx < 0 ? b.left : b.right;
    return b.containsX(targetX) ? dx : side - x;
}
exports.boundX = boundX;
function boundY(dy, y, b) {
    var targetY = dy + y;
    var side = dy < 0 ? b.bottom : b.top;
    return b.containsY(targetY) ? dy : side - y;
}
exports.boundY = boundY;
function miter(line1, line2, lineWidth, miterLimit, out) {
    if (out === void 0) { out = {}; }
    var n1 = normalize(rotate90(line1));
    var n2 = normalize(rotate90(line2));
    var direction = normalize(add(n1, n2));
    var length = Math.min(miterLimit, lineWidth / dot(direction, n2));
    return multiply(direction, length, out);
}
exports.miter = miter;
function equals(v1, v2, e) {
    if (e === void 0) { e = 0; }
    return Math.abs(v1.x - v2.x) <= e
        && Math.abs(v1.y - v2.y) <= e;
}
exports.equals = equals;


/***/ }),

/***/ "../glib/src/tool/pan-tool.ts":
/*!************************************!*\
  !*** ../glib/src/tool/pan-tool.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PanTool = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var PanTool = (function (_super) {
    __extends(PanTool, _super);
    function PanTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanTool.prototype.wherePointer = function (p) {
        return p.isDown && p.activePointers.length == 1;
    };
    PanTool.prototype.onPointerDown = function (p) {
        this.previous = p.position;
    };
    PanTool.prototype.onPointerMove = function (_a) {
        var position = _a.position, surface = _a.surface;
        var toPrevious = __1.Vec2.fromPointToPoint(position, this.previous);
        var actual = surface.pan(toPrevious);
        __1.Vec2.add(actual, position, this.previous);
    };
    return PanTool;
}(__1.PointerEventListener));
exports.PanTool = PanTool;


/***/ }),

/***/ "../glib/src/tool/pinch-zoom-tool.ts":
/*!*******************************************!*\
  !*** ../glib/src/tool/pinch-zoom-tool.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PinchZoomTool = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var PinchZoomTool = (function (_super) {
    __extends(PinchZoomTool, _super);
    function PinchZoomTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PinchZoomTool.prototype.wherePointer = function (p) {
        return p.isDown && p.activePointers.length == 2;
    };
    PinchZoomTool.prototype.onPointerDown = function (p) {
        var line = this.measureLine(p);
        this.previousSpan = line.length;
        this.previousFocus = line.midpoint;
    };
    PinchZoomTool.prototype.onPointerMove = function (p) {
        var line = this.measureLine(p);
        var scale = line.length / this.previousSpan;
        var focus = __1.Point.midpoint(line.midpoint, this.previousFocus);
        var actual = p.surface.zoomToPoint(scale, focus);
        this.previousSpan = line.length / actual.scale;
        this.previousFocus = __1.Vec2.add(actual.offset, this.previousFocus);
    };
    PinchZoomTool.prototype.measureLine = function (_a) {
        var activePointers = _a.activePointers;
        var p1 = activePointers[0].position;
        var p2 = activePointers[1].position;
        return new __1.LineSegment(p1, p2);
    };
    return PinchZoomTool;
}(__1.PointerEventListener));
exports.PinchZoomTool = PinchZoomTool;


/***/ }),

/***/ "../glib/src/tool/stroke.ts":
/*!**********************************!*\
  !*** ../glib/src/tool/stroke.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Stroke = void 0;
var __1 = __webpack_require__(/*! .. */ "../glib/src/index.ts");
var Stroke = (function () {
    function Stroke() {
        this.vertices = [];
    }
    Stroke.prototype.moveTo = function (_a, thickness) {
        var x = _a.x, y = _a.y;
        var halfThickness = thickness * 0.5;
        var top = { x: x, y: y + halfThickness };
        var bot = { x: x, y: y - halfThickness };
        this.vertices.push(top, bot);
    };
    Stroke.prototype.lineTo = function (p, thickness) {
        var nextIndex = this.vertices.length;
        if (nextIndex < 2) {
            throw "Must make a call to moveTo() before making a call to lineTo()";
        }
        var halfThickness = 0.5 * thickness;
        var prevCen = this.getPreviousPoint(nextIndex);
        var line = __1.Vec2.fromPointToPoint(prevCen, p);
        var prevLine = null;
        if (nextIndex >= 4) {
            var prevPrevCen = this.getPreviousPoint(nextIndex - 2);
            prevLine = __1.Vec2.fromPointToPoint(prevPrevCen, prevCen);
            if (__1.Vec2.length(line) <= halfThickness && __1.Vec2.length(prevLine) <= halfThickness) {
                nextIndex -= 2;
                prevCen = prevPrevCen;
                line = __1.Vec2.fromPointToPoint(prevCen, p);
                prevLine = nextIndex >= 4 ? this.getPreviousPoint(nextIndex - 2) : null;
            }
        }
        var ortho = __1.Vec2.multiply(__1.Vec2.normalize(__1.Vec2.rotate90(line)), halfThickness);
        var useMiter = prevLine !== null && __1.Vec2.length(prevLine) > thickness / 8;
        var miter = useMiter ? __1.Vec2.miter(prevLine, line, halfThickness, thickness) : ortho;
        this.vertices[nextIndex - 2] = __1.Vec2.add(prevCen, miter);
        this.vertices[nextIndex - 1] = __1.Vec2.subtract(prevCen, miter);
        this.vertices[nextIndex + 0] = __1.Vec2.add(p, ortho);
        this.vertices[nextIndex + 1] = __1.Vec2.subtract(p, ortho);
    };
    Stroke.prototype.getPreviousPoint = function (currIndex) {
        var vertices = this.vertices;
        var prevTop = vertices[currIndex - 2];
        var prevBot = vertices[currIndex - 1];
        return __1.Point.midpoint(prevTop, prevBot);
    };
    return Stroke;
}());
exports.Stroke = Stroke;


/***/ }),

/***/ "../glib/src/tool/wheel-zoom-tool.ts":
/*!*******************************************!*\
  !*** ../glib/src/tool/wheel-zoom-tool.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WheelZoomTool = void 0;
var WheelZoomTool = (function () {
    function WheelZoomTool(scaleFactor) {
        this.scaleFactor = scaleFactor;
    }
    WheelZoomTool.prototype.onWheel = function (wheel) {
        var scale = wheel.deltaY < 0 ? this.scaleFactor : 1 / this.scaleFactor;
        var actual = wheel.surface.zoomToPoint(scale, wheel.position);
    };
    return WheelZoomTool;
}());
exports.WheelZoomTool = WheelZoomTool;


/***/ }),

/***/ "./src/hexel/scene.ts":
/*!****************************!*\
  !*** ./src/hexel/scene.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scene = void 0;
var Scene = (function () {
    function Scene(fill, hexagon, matrices) {
        this.fill = fill;
        this.hexagon = hexagon;
        this.matrices = matrices;
    }
    Scene.prototype.draw = function (renderer) {
        var gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.fill.draw(renderer, this.hexagon.mesh, this.matrices);
    };
    return Scene;
}());
exports.Scene = Scene;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var glib_1 = __webpack_require__(/*! @wjheesen/glib */ "../glib/src/index.ts");
var scene_1 = __webpack_require__(/*! ./hexel/scene */ "./src/hexel/scene.ts");
var canvasEl = document.getElementById('onscreen-canvas');
var camera = new glib_1.Camera(new glib_1.Rect(-1, 1, 1, -1), 0.5, 10);
var renderer = new glib_1.Renderer(canvasEl.getContext('webgl2'), camera);
var hexMesh = glib_1.PolygonMesh.regularPolygon(6);
var util = new glib_1.ProgramUtil(renderer.gl);
var matBuf = glib_1.Mat2dBuffer.withLength(1);
var hexagon = new glib_1.PolygonModel(hexMesh, matBuf.get(0));
glib_1.Mat2d.identity(hexagon.matrix);
var fill = glib_1.FillProgram.create(util, [hexMesh]);
fill.color = new glib_1.ColorBuffer(new Float32Array([1, 1, 1, 1]));
glib_1.ColorF.random(fill.color);
var scene = new scene_1.Scene(fill, hexagon, matBuf);
var surface = new glib_1.Surface(canvasEl, renderer, scene);
surface.startRenderLoop();
var wheelEvents = surface.startDetectingWheelEvents();
wheelEvents.addListener(new glib_1.WheelZoomTool(1.1));
var pointerEvents = surface.startDetectingPointerEvents();
pointerEvents.addListener(new glib_1.PanTool);
pointerEvents.addListener(new glib_1.PinchZoomTool);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=index.js.map