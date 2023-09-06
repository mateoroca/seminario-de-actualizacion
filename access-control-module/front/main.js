import { Application } from "./x-app/aplication.js";
import { StateApplicationHandler } from "./x-app/controller/appController.js";

function main() {
  let app = new Application();
  document.body.appendChild(app);
}

window.addEventListener("load", main);
