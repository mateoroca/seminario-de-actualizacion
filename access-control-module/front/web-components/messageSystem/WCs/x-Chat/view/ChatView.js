class ChatView extends HTMLElement {
  constructor() {
    super();
    /////////////////////////////////////////////////////

    this.card = document.createElement("div");
    this.card.classList.add("card");

    this.chatHeader = document.createElement("div");
    this.chatHeader.classList.add("chat-header");
    this.chatHeader.textContent = "Chat";

    this.chatWindow = document.createElement("div");
    this.chatWindow.classList.add("chat-window");

    this.messageList = document.createElement("ul");
    this.messageList.classList.add("message-list");

    this.chatInput = document.createElement("div");
    this.chatInput.classList.add("chat-input");

    this.messageInput = document.createElement("input");
    this.messageInput.classList.add("message-input");
    this.messageInput.setAttribute("type", "text");
    this.messageInput.setAttribute("placeholder", "Type your message here");

    this.sendButton = document.createElement("button");
    this.sendButton.classList.add("send-button");
    this.sendButton.textContent = "Send";

    this.chatWindow.appendChild(this.messageList);
    this.chatInput.appendChild(this.messageInput);
    this.chatInput.appendChild(this.sendButton);
    this.card.appendChild(this.chatHeader);
    this.card.appendChild(this.chatWindow);
    this.card.appendChild(this.chatInput);

    const shadowRoot = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.innerHTML = `@import 'web-components/messageSystem/WCs/x-Chat/style/style.css'`;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(this.card);
    //////////////////////////////////////////////////////

    this.sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("send"));
    });

    this.messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        console.log("enter pressed");
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("send"));
      }
    });
  }
  setNewMessage(message, timestamp) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-sent-container");

    const messageItem = document.createElement("li");
    messageItem.classList.add("message-item", "message-sent");

    const messageContent = document.createElement("span");
    messageContent.textContent = message;
    messageContent.classList.add("message-content");

    const timestampElement = document.createElement("span");
    timestampElement.textContent = timestamp;
    timestampElement.classList.add("timestamp");

    messageItem.appendChild(messageContent);
    messageItem.appendChild(timestampElement);
    messageContainer.appendChild(messageItem);

    this.messageList.appendChild(messageContainer);

    return messageItem;
  }

  setReceivedMessages(message, timestamp) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-received-container");

    const messageItem = document.createElement("li");
    messageItem.classList.add("message-item", "message-received");

    const messageContent = document.createElement("span");
    messageContent.textContent = message;
    messageContent.classList.add("message-content");

    const timestampElement = document.createElement("span");
    timestampElement.textContent = timestamp;
    timestampElement.classList.add("timestamp");

    messageItem.appendChild(messageContent);
    messageItem.appendChild(timestampElement);

    messageContainer.appendChild(messageItem);

    this.messageList.appendChild(messageContainer);
  }
  setReceivedSymbol(li) {
    const sended = document.createElement("span");
    sended.textContent = "✓";
    sended.classList.add("check");

    li.appendChild(sended);
  }
  setNotReceivedSymbol(li) {
    const sended = document.createElement("span");
    sended.textContent = "❗";
    sended.classList.add("check");

    li.appendChild(sended);
  }
  getMessageInput() {
    return this.messageInput.value;
  }
  cleanInput() {
    this.messageInput.value = null;
  }

  setChatTitle(name) {
    this.chatHeader.textContent = name;
  }

  removeMessages() {
    while (this.messageList.firstChild) {
      this.messageList.removeChild(this.messageList.firstChild);
    }
  }
}

customElements.define("chat-app", ChatView);
export { ChatView };
