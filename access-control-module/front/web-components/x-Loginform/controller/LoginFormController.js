class LoginFormController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.button2.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomSignUpClick();
      this.triggerSignupInstance();
    });

    this.view.button3.addEventListener("click", (e) => {
      e.preventDefault();
      this.onbuttomForgotPasswordClick();
    });
  }

  disable() {
    this.view.btnSignUp = null;
    this.view.btnForgotPassw = null;
  }

  onButtomSignUpClick(e) {
    let DATA = {
      userName: this.view.input1.value,
      password: this.view.input2.value,
    };
    this.model.signIn(DATA).then((res) => {
      console.log(res);
    });
  }
  onbuttomForgotPasswordClick() {
    const event = new CustomEvent("trigger-verify");

    dispatchEvent(event);
  }

  triggerSignupInstance() {
    const event = new CustomEvent("trigger-signup-instance");
    dispatchEvent(event);
  }
}

export { LoginFormController };
