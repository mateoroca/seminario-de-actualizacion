import { LoginForm } from "../web-components/x-Loginform/LoginForm.js";
import { SignUp } from "../web-components/x-SignUP/signup.js";
import { Holdin } from "../web-components/x-Holdin/Holdin.js";
import { VerifyView } from "../web-components/x-verify/view/verifyView.js";
import { navBar } from "../web-components/x-nav-bar/NavBar.js";
import { AppView } from "../x-app/view/appView.js";
import { navBarView2 } from "../web-components/x-nav-bar/views/nabBar-view2.js";
import { navBarModel2 } from "../web-components/x-nav-bar/model/navBarModel2.js";
import { navBarController2 } from "../web-components/x-nav-bar/controller/nabBarController2.js";

class Application extends HTMLElement {
  constructor() {
    super();
    this.view = new AppView();
    this.nv = new navBar();
    this.verifyView = new VerifyView();
    this.loginForm = new LoginForm();
    this.signUp = new SignUp();
    this.nv2 = new navBar(navBarView2, navBarController2, navBarModel2);

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
    const holdin = new Holdin();
    this.view.headerSlot.appendChild(this.nv);
    this.changeState(holdin);
  }

  setupEventListeners() {
    window.addEventListener("exit-verify", () => {
      this.changeState(null);
    });

    window.addEventListener("trigger-verify", () => {
      this.changeState(this.verifyView);
    });

    window.addEventListener("trigger-login-instance", () => {
      this.changeState(this.loginForm);
    });

    window.addEventListener("trigger-signup-instance", () => {
      this.changeState(this.signUp);
    });
    window.addEventListener("trigger-loggedIn-instance", () => {
      this.view.headerSlot.removeChild(this.nv);
      this.view.headerSlot.appendChild(this.nv2);
    });
    window.addEventListener("trigger-navBar0-instance", () => {
      this.view.headerSlot.removeChild(this.nv2);
      this.view.headerSlot.appendChild(this.nv);
    });
  }
}

customElements.define("x-application", Application);

export { Application };
