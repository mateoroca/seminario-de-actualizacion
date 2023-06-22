class SignupController {
  constructor(viewReference, modelReference) {
    this.view = new viewReference();
    this.model = new modelReference();
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
    let DATA = {
      name: this.view.inputName.value,
      surname: this.view.inputSurname.value,
      dni: this.view.inputDni.value,
      email: this.view.inputEmail.value,
      gender: this.value.inputGender.value,
      phonenumber: this.inputPhoneNumber.value,
    };
    this.model.signUp(DATA).then((res) => {
      console.log(res);
    });
  }
}

export { SignupController };
