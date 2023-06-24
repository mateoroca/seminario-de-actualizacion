import { SignUpView } from "./view/signupView.js";
import { SignupModel } from "./model/signupModel.js";
import { SignupController } from "./controller/signupController.js";

class SignUp extends HTMLElement {
  constructor() {
    super();
    this.view = new SignUpView();
    this.model = new SignupModel();
    this.controller = new SignupController(this.view, this.model);
    let style = document.createElement("style");
    style.innerText = `@import './style/style.css'`;
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

customElements.define("x-signup", SignUp);

export { SignUp };
