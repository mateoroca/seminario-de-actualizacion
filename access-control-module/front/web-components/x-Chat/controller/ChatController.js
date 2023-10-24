import { LocalStorageHandler } from "../../common/LocalStorageHandler.js";

class ChatController {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
    this.localStorageH = new LocalStorageHandler();
    this.messagesAttached = [];
    this.intervalId = null;
    this.chatId;
    this.userOriginId;
    this.userTargetId;
  }
  enable() {
    this.view.addEventListener("send", () => {
      this.sendAndSetMessage();
      this.view.cleanInput();
    });
    this.intervalId = setInterval(() => {
      this.askForNewMessages();
    }, 5000);
  }
  disable() {
    this.view.removeEventListener("send", () => {
      this.sendAndSetMessage();
    });
    clearInterval(this.intervalId);
  }
  ///////////////////////////////////////////////////////
  async sendAndSetMessage() {
    const userId = this.localStorageH.getOfLocalStorage("userId");
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    console.log(this.chatId, this.userOriginId, this.userTargetId);

    const messageBody = this.view.getMessageInput();

    const message = {
      chatId: this.chatId,
      userOriginId: userId,
      userTargetId: this.userOriginId,
      MessageBody: messageBody,
      timesStampSended: currentTime,
      state: { sended: true, received: false },
    };

    console.log(message);

    const liMessage = this.view.setNewMessage(messageBody, currentTime);

    let response = await this.model.sendMessageToServer(message);

    if (response && response.status == true) {
      this.view.setReceivedSymbol(liMessage);
    } else {
      this.view.setNotReceivedSymbol(liMessage);
    }
  }
  ///////////////////////////////////////////////////////

  async askForNewMessages() {
    const userId = this.localStorageH.getOfLocalStorage("userId");

    const data = {
      chatId: this.chatId,
    };

    let response = await this.model.getServerMessages(data);

    const arrayOfMessages = response.arrayOfMessages;

    if (response.status == true) {
      arrayOfMessages.forEach((item) => {
        const id = item.id;
        const userTargetId = item.userTargetId;

        if (userId == userTargetId) {
          if (!this.messagesAttached.includes(id)) {
            const body = item.body;
            const timesStampSended = item.timesStampSended;

            this.view.setReceivedMessages(body, timesStampSended);
            this.MessagesSet.push(id);
          }
        }
      });
    }
  }
  //////////////////////////////////////////////////////////

  setValues(chatId, userOriginId, userTargetId) {
    this.chatId = chatId;
    this.userOriginId = userOriginId;
    this.userTargetId = userTargetId;
  }
}

export { ChatController };
