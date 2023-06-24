class SignUpView extends HTMLElement {
  constructor() {
    super();
    this.container = document.createElement("div");
    this.container.classList.add("container");

    this.form = document.createElement("form");
    this.form.classList.add("form");

    this.heading = document.createElement("p");
    this.heading.id = "heading";
    this.heading.textContent = "Logn Up";

    this.fieldName = document.createElement("div");
    this.fieldName.classList.add("field");

    this.inputName = document.createElement("input");
    this.inputName.setAttribute("autocomplete", "on");
    this.inputName.placeholder = "Name";
    this.inputName.classList.add("input-field");
    this.fieldName.appendChild(this.inputName);

    this.fieldSurname = document.createElement("div");
    this.fieldSurname.classList.add("field");

    this.inputSurname = document.createElement("input");
    this.inputSurname.setAttribute("autocomplete", "on");
    this.inputSurname.placeholder = "Surname";
    this.inputSurname.classList.add("input-field");
    this.fieldSurname.appendChild(this.inputSurname);

    this.fieldDni = document.createElement("div");
    this.fieldDni.classList.add("field");

    this.inputDni = document.createElement("input");
    this.inputDni.setAttribute("autocomplete", "on");
    this.inputDni.placeholder = "DNI";
    this.inputDni.classList.add("input-field");
    this.fieldDni.appendChild(this.inputDni);

    this.fieldGender = document.createElement("div");
    this.fieldGender.classList.add("field");

    this.inputGender = document.createElement("input");
    this.inputGender.setAttribute("autocomplete", "on");
    this.inputGender.placeholder = "Gender";
    this.inputGender.classList.add("input-field");
    this.fieldGender.appendChild(this.inputGender);

    this.fieldPhoneNumber = document.createElement("div");
    this.fieldPhoneNumber.classList.add("field");

    this.inputPhoneNumber = document.createElement("input");
    this.inputPhoneNumber.setAttribute("autocomplete", "on");
    this.inputPhoneNumber.placeholder = "Phone Number";
    this.inputPhoneNumber.classList.add("input-field");
    this.fieldPhoneNumber.appendChild(this.inputPhoneNumber);

    this.fieldEmail = document.createElement("div");
    this.fieldEmail.classList.add("field");

    this.inputEmail = document.createElement("input");
    this.inputEmail.setAttribute("autocomplete", "on");
    this.inputEmail.setAttribute("type", "email");
    this.inputEmail.placeholder = "Email";
    this.inputEmail.classList.add("input-field");
    this.fieldEmail.appendChild(this.inputEmail);

    this.btnDIV = document.createElement("div");
    this.buttonSubmit = document.createElement("button");
    this.buttonSubmit.classList.add("button0");
    this.buttonSubmit.textContent = "Submit";
    this.btnDIV.appendChild(this.buttonSubmit);

    this.form.appendChild(this.heading);
    this.form.appendChild(this.fieldName);
    this.form.appendChild(this.fieldSurname);
    this.form.appendChild(this.fieldDni);
    this.form.appendChild(this.fieldGender);
    this.form.appendChild(this.fieldPhoneNumber);
    this.form.appendChild(this.fieldEmail);
    this.form.appendChild(this.btnDIV);

    this.container.appendChild(this.form);

    this.appendChild(this.container);
  }
}

customElements.define("x-signupview", SignUpView);

export { SignUpView };
