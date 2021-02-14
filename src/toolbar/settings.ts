import { Color } from "@wjheesen/glib";
import { Control } from "./control";

export class Settings {
    color = <Color.Like> {r: 39, g: 78, b: 19, a: 255};

    initControls(controls: Control[]) {
        controls.forEach(control => control.onInit());
    }
 }