import { SignUpView } from "./view2/SignUp-view";
import { SignupController } from "./controller/signupController";
import { SignupModel } from "./model/signupModel";

class SignUp extends HTMLElement {
  constructor() {
    super();
    this.view = new SignUpView();
    this.model = new SignupModel();
    this.controller = new SignupController(this.view, this.model);
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
