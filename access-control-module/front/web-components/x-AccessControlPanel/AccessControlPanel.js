import { AccessControlPanelView } from "./view/AccessControlPanelView.js";
import { AccessControlPanelController } from "./controller/AccessControlPanelController.js";
import { AccessControlPanelModel } from "./model/AccessControlPanelModel.js";

class AccessControlPanel extends HTMLElement {
  constructor() {
    super();
    this.view = new AccessControlPanelView();
    this.model = new AccessControlPanelModel();
    this.controller = new AccessControlPanelController(this.view, this.model);
    let style = document.createElement("style");
    style.innerText = `@import 'web-components/x-SignUP/style/style.css'`;
    this.appendChild(style);
    this.appendChild(this.view);
  }
  connectedCallback() {
    this.controller.enable();
  }

  disconnectedCallback() {
    this.controller.disable();
  }
}

customElements.define("x-accesscontrolpanel", AccessControlPanel);

export { AccessControlPanel };
