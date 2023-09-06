import { LoginForm } from "../web-components/x-Loginform/LoginForm.js";
import { SignUp } from "../web-components/x-SignUP/signup.js";
import { Holdin } from "../web-components/x-Holdin/Holdin.js";
import { VerifyView } from "../web-components/x-verify/view/verifyView.js";
import { navBar } from "../web-components/x-nav-bar/NavBar.js";
import { AppView } from "../x-app/view/appView.js";

class Application extends HTMLElement {
  constructor() {
    super();
    this.view = new AppView();

    this.currentState = null;

    let style = document.createElement("style");
    style.innerText = `@import './x-app/style/style.css'`;
    this.appendChild(this.view);
    this.appendChild(style);
  }

  changeState(newState) {
    if (this.currentState) {
      this.currentState.remove();
    }

    this.currentState = newState;
    this.view.contentSlot.appendChild(this.currentState);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const nv = new navBar();
    const nv2 = new navBar();
    const holdin = new Holdin();
    this.view.headerSlot.appendChild(nv);
    this.changeState(holdin);
  }

  setupEventListeners() {
    window.addEventListener("exit-verify", () => {
      this.changeState(null);
    });

    window.addEventListener("trigger-verify", () => {
      const verifyView = new VerifyView();
      this.changeState(verifyView);
    });

    window.addEventListener("trigger-login-instance", () => {
      const loginForm = new LoginForm();
      this.changeState(loginForm);
    });

    window.addEventListener("trigger-signup-instance", () => {
      const signUp = new SignUp();
      this.changeState(signUp);
    });
  }
}

customElements.define("x-application", Application);

export { Application };
