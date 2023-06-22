class LoginFormView extends HTMLElement {
  constructor() {
    super();

    this.container = document.createElement("div");
    this.container.classList.add("container");

    this.form = document.createElement("form");
    this.form.classList.add("form");

    this.heading = document.createElement("p");
    this.heading.id = "heading";
    this.heading.textContent = "Login";

    this.field1 = document.createElement("div");
    this.field1.classList.add("field");

    this.inputIcon1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.inputIcon1.classList.add("input-icon");
    this.inputIcon1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.inputIcon1.setAttribute("width", "16");
    this.inputIcon1.setAttribute("height", "16");
    this.inputIcon1.setAttribute("fill", "currentColor");
    this.inputIcon1.setAttribute("viewBox", "0 0 16 16");

    this.path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path1.setAttribute(
      "d",
      "M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"
    );

    this.inputIcon1.appendChild(this.path1);

    this.input1 = document.createElement("input");
    this.input1.setAttribute("autocomplete", "on");
    this.input1.placeholder = "Username";
    this.input1.classList.add("input-field");
    this.field1.appendChild(this.inputIcon1);
    this.field1.appendChild(this.input1);

    this.field2 = document.createElement("div");
    this.field2.classList.add("field");

    this.inputIcon2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.inputIcon2.classList.add("input-icon");
    this.inputIcon2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.inputIcon2.setAttribute("width", "16");
    this.inputIcon2.setAttribute("height", "16");
    this.inputIcon2.setAttribute("fill", "currentColor");
    this.inputIcon2.setAttribute("viewBox", "0 0 16 16");

    this.path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path2.setAttribute(
      "d",
      "M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
    );

    this.inputIcon2.appendChild(this.path2);

    this.input2 = document.createElement("input");
    this.input2.setAttribute("autocomplete", "on");
    this.input2.placeholder = "Password";
    this.input2.classList.add("input-field");
    this.input2.type = "password";
    this.field2.appendChild(this.inputIcon2);
    this.field2.appendChild(this.input2);

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.classList.add("btn");

    this.btnLogin = document.createElement("button");
    this.btnLogin.classList.add("button1");
    this.btnLogin.textContent = "Login";

    this.btnSignUp = document.createElement("button");
    this.btnSignUp.classList.add("button2");
    this.btnSignUp.textContent = "Sign Up";

    this.buttonContainer.appendChild(this.btnLogin);
    this.buttonContainer.appendChild(this.btnSignUp);

    this.btnForgotPassw = document.createElement("button");
    this.btnForgotPassw.classList.add("button3");
    this.btnForgotPassw.textContent = "Forgot Password";

    this.form.appendChild(this.heading);
    this.form.appendChild(this.field1);
    this.form.appendChild(this.field2);
    this.form.appendChild(this.buttonContainer);
    this.form.appendChild(this.btnForgotPassw);

    this.container.appendChild(this.form);
    this.appendChild(this.container);
  }
}

customElements.define("x-loginformview", LoginFormView);

export { LoginFormView };
