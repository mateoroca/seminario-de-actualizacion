class LoginFormController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.btnSignUp.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomSignUpClick();
    });
  }

  disable() {
    this.view.btnSignUp = null;
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
}

export { LoginFormController };
