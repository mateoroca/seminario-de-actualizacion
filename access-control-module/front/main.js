import { Application } from "./x-app/aplication.js";
import { StateApplicationHandler } from "./x-app/controller/appController.js";

function main() {
  let appController = new StateApplicationHandler();
  let app = new Application(appController);
  document.body.appendChild(app);
}

window.addEventListener("load", main);
