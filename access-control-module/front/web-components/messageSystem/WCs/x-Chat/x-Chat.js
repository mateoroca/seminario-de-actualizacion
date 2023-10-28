import { ChatModel } from "./model/ChatModel.js";
import { ChatView } from "./view/ChatView.js";
import { ChatController } from "./controller/ChatController.js";

class Chat extends HTMLElement {
  constructor() {
    super();

    this.view = new ChatView();
    this.model = new ChatModel();
    this.controller = new ChatController(this.view, this.model);

    this.appendChild(this.view);
  }
  connectedCallback() {
    this.controller.enable();
  }

  disconnectedCallback() {
    this.controller.disable();
  }
}
customElements.define("x-chat", Chat);
export { Chat };
