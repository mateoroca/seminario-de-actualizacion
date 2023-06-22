import { LoginForm } from "./web-components/LoginForm.js";

function main() {
  let loginform = new LoginForm();

  document.body.appendChild(loginform);
}

window.addEventListener("load", main);
