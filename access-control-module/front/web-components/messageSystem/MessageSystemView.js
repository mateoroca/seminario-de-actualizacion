import { Chat } from "./WCs/x-Chat/x-Chat.js";
import { List } from "./WCs/x-List/x-list.js";

class MessageSystemView extends HTMLElement {
  constructor() {
    super();

    //////////////////////////////// /* debe ser solo un componente que haga de vista y controlador ?? */

    this.chat = new Chat();
    this.list = new List();
    ////////////////////////////////
    this.chats = [];

    ////////////////////////////////

    this.list.controller.addEventListener(
      "Proposal-confirmed-therefore-new-chat",
      async (e) => {
        const chat = e.detail;
        this.chats.push(chat);
        console.log(chat);
      }
    );

    ////////////////////////////////

    this.mainContainer = document.createElement("div");

    this.mainContainer.classList.add("MainContainer");

    this.mainContainer.appendChild(this.list);
    this.mainContainer.appendChild(this.chat);

    let style = document.createElement("style");
    style.innerText = `@import './web-components/messageSystem/style/style.css'`;
    this.appendChild(style);
    this.appendChild(this.mainContainer);
  }

  connectedCallback() {}

  disconnectedCallback() {}
}

customElements.define("x-mesagesysyemview", MessageSystemView);

export { MessageSystemView };
