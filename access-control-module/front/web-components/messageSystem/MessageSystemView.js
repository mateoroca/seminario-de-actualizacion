import { Chat } from "./WCs/x-Chat/x-Chat.js";
import { List } from "./WCs/x-List/x-list.js";
import { LocalStorageHandler } from "../common/LocalStorageHandler.js";
import { Encryptor } from "../../web-components/common/Encryptor.js";

class MessageSystemView extends HTMLElement {
  constructor() {
    super();

    //////////////////////////////// /* debe ser solo un componente que haga de vista y controlador ?? */

    this.chat = new Chat();
    this.list = new List();
    this.localStorageHandler = new LocalStorageHandler();
    ////////////////////////////////

    this.list.controller.addEventListener("new-chat", async (e) => {
      const userId = this.localStorageHandler.getOfLocalStorage("userId");
      const eventData = e.detail;
      const chat = eventData.chat;
      const userName = eventData.userName;

      const chatId = chat.chatId;
      const userOrigin = chat.userOriginId;
      const userTarget = chat.userTargetId;
      const secretKey = chat.secretKey;

      if (userOrigin == userId) {
        this.chat.controller.setValues(
          chatId,
          userTarget,
          userOrigin,
          secretKey
        );
        this.chat.view.setChatTitle(userName);
      } else {
        this.chat.controller.setValues(
          chatId,
          userOrigin,
          userTarget,
          secretKey
        );
        this.chat.view.setChatTitle(userName);
      }
    });

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
