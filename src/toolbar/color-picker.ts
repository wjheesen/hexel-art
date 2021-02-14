import { Color } from "@wjheesen/glib";
import { Control } from "./control";
import { Settings } from "./settings";

export class ColorPicker implements Control {

    private alpha: number;
    private $picker: JQuery<HTMLElement>;

    constructor(private settings: Settings) {}

    onInit() {
        this.resetAlpha();
        this.initPicker();
        this.initSlider();
    }

    private resetAlpha() {
        this.alpha = this.settings.color.a / 0xff;
    }

    private initPicker() {
        this.$picker = $("#color-picker");

        this.$picker.spectrum({
            color: Color.toArgbString(this.settings.color),
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
            change: this.onChange,
            hide: this.onHide,
        });

    }

    private onChange = (tinycolor: tinycolor.Instance) => {
        if (tinycolor) {
            // Override alpha (in case of palette selection)
            tinycolor.setAlpha(this.alpha);
            // Convert to #aarrggbb string
            let argb = tinycolor.toHex8String();
            // Update UI component
            $(this).spectrum("set", argb);
            // Update color
            Color.fromArgbString(argb, this.settings.color);
        }
    }

    private onHide = () => {
        this.resetAlpha();
    }

    private initSlider() {
        this.$picker.on("dragstop.spectrum", (e, tinycolor) => {
            this.alpha = tinycolor.getAlpha(); // Not applied until color is picked
        });
    }
}