class Signin {
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("container");

    this.title = document.createElement("h2");
    this.container.appendChild(this.title);

    this.form = document.createElement("form");
    this.container.appendChild(this.form);

    this.divName = document.createElement("div");
    this.divName.classList.add("form-group");
    this.form.appendChild(this.divName);

    this.LabelName = document.createElement("label");
    this.LabelName.setAttribute("for", "Name");
    this.LabelName.innerText = "Name";
    this.divName.appendChild(this.LabelName);

    this.inputName = document.createElement("input");
    this.inputName.setAttribute("type", "text");
    this.inputName.id = "name";
    this.inputName.required = true;
    this.divName.appendChild(this.inputName);

    this.divPassW = document.createElement("div");
    this.divPassW.classList.add("form-group");
    this.form.appendChild(this.divPassW);

    this.LabelPassw = document.createElement("label");
    this.LabelPassw.setAttribute("for", "password");
    this.LabelName.innerText = "Password";
    this.divPassW.appendChild(this.LabelPassw);

    this.inputPassw = document.createElement("input");
    this.inputPassw.setAttribute("type", "password");
    this.inputPassw.id = "password";
    this.inputPassw.required = true;
    this.divPassW.appendChild(this.inputPassw);

    this.divbutton = document.createElement("div");
    this.divbutton.classList.add("form-group");
    this.form.appendChild(this.divbutton);

    this.buttonSignin = document.createElement("button");
    this.buttonSignin.setAttribute("type", "submit");
    this.buttonSignin.innerText = "SignIn";
    this.divbutton.appendChild(this.buttonSignin);
  }
}

function startApplication() {
  let view = new Signin();

  document.body.appendChild(view.container);
}

window.addEventListener("load", startApplication);
