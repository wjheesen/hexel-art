import { ArgbRegex } from './graphics/struct/util'
import { Struct as Color } from './graphics/struct/color'

type Interpolator = (t: number) => number;

export class Option<V> {

    public key: string;
    protected value: V;

    protected constructor(key: string, value: V) {
        this.key = key;
        this.value = value;
    }

    protected static get(key: string) {
        if (localStorage) {
            return localStorage.getItem(key);
        } else {
            return null;
        }
    }

    static bool(key: string, initial: boolean) {
        let str = Option.get(key);
        let val: boolean;
        if (str === 'true') {
            val = true;
        } else if (str === 'false') {
            val = false;
        } else {
            val = initial;
        }
        return new Option<boolean>(key, val);
    }

    static num(key: string, initial: number, min: number, max: number) {
        let val = parseInt(Option.get(key));
        if (isNaN(val) || val < min || val > max) {
            val = initial;
        }
        return new Option<number>(key, val);
    }

    static str(key: string, initial: string) {
        let str = Option.get(key);
        let val = str ? str : initial;
        return new Option<string>(key, val);
    }

    get val() {
        return this.value;
    }

    set val(value: V) {
        this.value = value;
        if (localStorage) {
            localStorage.setItem(this.key, value.toString());
        }
    }
}

export class ColorOption {

    public unparsed: Option<string>;

    private value: Color;

    private constructor(unparsed: Option<string>, value: Color) {
        this.unparsed = unparsed;
        this.value = value;
    }

    static create(key: string, initial: Color) {
        let src = Option.str(key, null);
        let val: Color;
        if (src.val && ArgbRegex.test(src.val)) {
            val = Color.fromArgbString(src.val);
        } else {
            val = initial;
            src.val = initial.toArgbString();
        }
        return new ColorOption(src, val);
    }

    get val() {
        return this.value;
    }

    set val(value: Color) {
        this.value = value;
        this.unparsed.val = value.toArgbString();
    }
}

export class InterpolatedOption {

    public uninterpolated: Option<number>;

    private interpolator: Interpolator;

    private value: number;

    private constructor(interpolator: Interpolator, src: Option<number>, value: number) {
        this.interpolator = interpolator;
        this.uninterpolated = src;
        this.value = value;
    }

    static create(interpolator: Interpolator, src: Option<number>) {
        let val = interpolator(src.val);
        return new InterpolatedOption(interpolator, src, val);
    }

    get val() {
        return this.value;
    }

    set val(value: number) {
        this.uninterpolated.val = value;
        this.value = this.interpolator(value);
    }
}

export class LerpedOption {

    public unlerped: Option<number>;

    private lerper: Lerper;

    private value: number;

    private constructor(lerper: Lerper, src: Option<number>, value: number) {
        this.unlerped = src;
        this.lerper = lerper;
        this.value = value;
    }

    static create(lerper: Lerper, src: Option<number>) {
        let val = lerper.lerp(src.val);
        return new LerpedOption(lerper, src, val);
    }

    get val() {
        return this.value;
    }

    set val(value: number) {
        this.unlerped.val = value;
        this.value = this.lerper.lerp(value);
    }
}

export class Lerper {

    constructor(public a: number, public b: number) {

    }

    static fromRange(min: number, max: number, steps: number) {
        return new Lerper(min, (max - min) / steps);
    }

    lerp(t: number) {
        // f(t) = a + bt
        return this.a + this.b * t;
    }

    unlerp(val: number) {
        // t = [f(t) - a]/b
        return (val - this.a) / this.b;
    }

}
