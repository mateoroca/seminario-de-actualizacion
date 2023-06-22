import { LoginForm } from "./web-components/x-Loginform/LoginForm.js";
import { SignUpView } from "./web-components/x-SignUP/view/signupView.js";

function main() {
  let loginform = new LoginForm();

  document.body.appendChild(loginform);

  window.addEventListener("trigger-signup-instance", () => {
    /* let signup = new SignUp(); */
    let view = new SignUpView();

    document.body.removeChild(loginform);
    document.body.appendChild(view);
  });
}

window.addEventListener("load", main);
