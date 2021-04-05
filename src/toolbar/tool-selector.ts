import { PointerEventDetector, PointerEventListener } from "@wjheesen/glib";
import { Tool } from "../tool/tool";
import { Control } from "./control";

export class ToolSelector implements Control {

    private tools: Tool[] = [];    
    private selectedTool?: Tool;

    constructor(
        private pointerEvents: PointerEventDetector, 
    ) {}

    addTool(id: string, eventListener: PointerEventListener) {
        this.tools.push(new Tool(id, eventListener));
        return this;
    }

    onInit() {
        this.tools.forEach(this.initTool);
        this.select(this.tools[0]);
    }

    private initTool = (tool: Tool) => {
        tool.onInit();
        tool.addClickListener(() => this.setTool(tool));
    }

    private setTool(tool: Tool) {
        this.deselect(this.selectedTool);
        this.select(tool);
    }

    private deselect(tool: Tool) {
        this.pointerEvents.removeListener(tool.eventListener);
        this.selectedTool = null;
        tool.onDeselect();
    }

    private select(tool: Tool) {
        this.pointerEvents.addListener(tool.eventListener);
        this.selectedTool = tool;
        tool.onSelect();
    }
}