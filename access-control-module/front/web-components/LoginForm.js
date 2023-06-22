import { LoginFormView } from "../views/Login-view.js";
import { LoginFormModel } from "../model/LoginFormModel.js";
import { LoginFormController } from "../controllers/LoginFormController.js";

class LoginForm extends HTMLElement {
  constructor() {
    super();

    this.view = new LoginFormView();
    this.model = new LoginFormModel();
    this.controller = new LoginFormController(this.view, this.model);
    this.appendChild(this.view);
  }
  connectedCallback() {
    this.controller.enable();
  }

  disconnectedCallback() {
    this.controller.disable();
  }
}

customElements.define("x-loginform", LoginForm);

export { LoginForm };
