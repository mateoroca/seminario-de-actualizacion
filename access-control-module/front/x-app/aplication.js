import { LoginForm } from "../web-components/x-Loginform/LoginForm.js";
import { SignUp } from "../web-components/x-SignUP/signup.js";
import { Holdin } from "../web-components/x-Holdin/Holdin.js";
import { VerifyView } from "../web-components/x-verify/view/verifyView.js";

class Application extends HTMLElement {
  constructor(AppControllerReference) {
    super();
    this.stateHandler = AppControllerReference;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const holdin = new Holdin();
    this.stateHandler.changeState(holdin);
  }

  setupEventListeners() {
    window.addEventListener("exit-verify", () => {
      this.stateHandler.changeState(null);
    });

    window.addEventListener("trigger-verify", () => {
      const verifyView = new VerifyView();
      this.stateHandler.changeState(verifyView);
    });

    window.addEventListener("trigger-login-instance", () => {
      const loginForm = new LoginForm();
      this.stateHandler.changeState(loginForm);
    });

    window.addEventListener("trigger-signup-instance", () => {
      const signUp = new SignUp();
      this.stateHandler.changeState(signUp);
    });
  }
}

customElements.define("x-application", Application);

export { Application };
