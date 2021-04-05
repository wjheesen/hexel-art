import { PointerEventListener } from "@wjheesen/glib";

export class Tool  {

    private btnEl: HTMLElement;

    constructor(
        public readonly id: string, 
        public readonly eventListener: PointerEventListener
    ) {}

    onInit() {
        this.btnEl = document.getElementById(this.id);
        this.btnEl.classList.add('btn', 'btn-light', 'btn-outline-secondary', 'p-2', 'tool');
    }

    addClickListener(listener: EventListenerOrEventListenerObject) {
        this.btnEl.addEventListener('click', listener);
    }

    onSelect() {
        this.btnEl.classList.add('tool--selected');
        this.btnEl.setAttribute('aria-selected', 'true');
    }

    onDeselect() {
        this.btnEl.classList.remove('tool--selected');
        this.btnEl.removeAttribute('aria-selected');
    }
}