class SignupController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }
  enable() {
    this.view.buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomSubmmitClick();
    });
  }
  disable() {
    this.view.buttonSubmit = null;
  }

  onButtomSubmmitClick() {
    if (this.view.inputPassw.value == this.view.inputCheckPassw.value) {
      let DATA = {
        userName: this.view.inputUserName.value,
        email: this.view.inputEmail.value,
        name: this.view.inputName.value,
        surname: this.view.inputSurname.value,
        password: this.view.inputPassw.value,
      };

      this.model
        .signUp(DATA)
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.error("Error en la solicitud al servidor:", error);
        });
    } else {
      alert("error the password must be the same");
    }
  }
}

export { SignupController };
