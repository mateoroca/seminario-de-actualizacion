class navBarController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.signUpLink.addEventListener("click", (e) => {
      this.onButtomSignUpClick();
    });

    this.view.logInLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomLognInClick(e);
    });
  }

  disable() {
    this.view.btnSignUp = null;
    this.view.btnForgotPassw = null;
  }

  onButtomLognInClick(e) {
    const event = new CustomEvent("trigger-login-instance");
    dispatchEvent(event);
  }

  onButtomSignUpClick() {
    const event = new CustomEvent("trigger-signup-instance");
    dispatchEvent(event);
  }
}

export { navBarController };
