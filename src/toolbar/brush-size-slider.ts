import { Control } from "./control";
import { Settings } from "./settings";

declare var Slider: any;

export class BrushSizeSlider implements Control {

    constructor(private settings: Settings) {}

    onInit() {
        let el = <HTMLInputElement> document.querySelector("input[name=brushRadius]");
        el.valueAsNumber = this.settings.brushRadius;

        let slider = new Slider(el, {
            min: el.min,
            max: el.max,
            step: el.step,
            value: el.value,
            tooltip: 'show'
        });
    
        slider.on('slideStop', () => {
            this.settings.brushRadius = slider.getValue();
            // setTool(Brush, "#brush"); // TODO:
        });
    }
}