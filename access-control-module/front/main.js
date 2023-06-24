import { LoginForm } from "./web-components/x-Loginform/LoginForm.js";
import { SignUp } from "./web-components/x-SignUP/signup.js";
import { HoldinComponent } from "./web-components/x-Holdin/Holdin.js";

function main() {
  let holdin_x = new HoldinComponent();
  let signup = new SignUp();
  let loginform = new LoginForm();

  document.body.appendChild(holdin_x);

  window.addEventListener("trigger-login-instance", () => {
    document.body.removeChild(holdin_x);
    document.body.appendChild(loginform);
  });

  window.addEventListener("trigger-signup-instance", () => {
    document.body.removeChild(loginform);
    document.body.appendChild(signup);
  });
}

window.addEventListener("load", main);
