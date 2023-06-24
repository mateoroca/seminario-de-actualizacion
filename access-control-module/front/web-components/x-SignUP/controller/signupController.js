class SignupController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }
  enable() {
    this.view.buttonSubmit.addEventListener("click", (e) => {
      /*  e.preventDefault(); */
      this.onButtomSubmmitClick();
    });
  }
  disable() {
    this.view.buttonSubmit = null;
  }

  onButtomSubmmitClick() {
    let DATA = {
      name: this.view.inputName.value,
      surname: this.view.inputSurname.value,
      dni: this.view.inputDni.value,
      email: this.view.inputEmail.value,
      gender: this.view.inputGender.value,
      phonenumber: this.view.inputPhoneNumber.value,
    };
    this.model.signUp(DATA).then((res) => {
      alert(res);
    });
  }
}

export { SignupController };
