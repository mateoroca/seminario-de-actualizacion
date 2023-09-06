class LoginFormController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.button1.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomLogInClick();
    });

    this.view.button3.addEventListener("click", (e) => {
      e.preventDefault();
      this.onbuttomForgotPasswordClick();
    });
  }

  disable() {
    this.view.button1 = null;
    this.view.button3 = null;
  }

  onButtomLogInClick(e) {
    let DATA = {
      userName: this.view.input1.value,
      password: this.view.input2.value,
    };
    this.model.login(DATA).then((res) => {
      console.log(res);
    });
  }
  onbuttomForgotPasswordClick() {
    const event = new CustomEvent("trigger-verify");

    dispatchEvent(event);
  }
}

export { LoginFormController };
