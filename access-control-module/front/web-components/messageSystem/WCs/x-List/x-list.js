import { ListView } from "./view/listView.js";
import { ListController } from "./controller/listController.js";
import { ListModel } from "./model/listModel.js";

class List extends HTMLElement {
  constructor() {
    super();
    this.view = new ListView();
    this.model = new ListModel();
    this.controller = new ListController(this.view, this.model);
    this.appendChild(this.view);
  }
  connectedCallback() {
    this.controller.enable();
  }

  disconnectedCallback() {
    this.controller.disable();
  }
}

customElements.define("x-list", List);

export { List };
