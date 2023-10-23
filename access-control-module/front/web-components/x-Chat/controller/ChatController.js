import { LocalStorageHandler } from "../../common/LocalStorageHandler.js";

class ChatController {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
    this.localStorageH = new LocalStorageHandler();
    this.messagesAttached = [];
    this.intervalId = null;
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

    const messageBody = this.view.getMessageInput();

    const message = {
      chatId: 1,
      userOriginId: userId,
      userTargetId: userId,
      MessageBody: messageBody,
      timesStampSended: currentTime,
      state: { sended: true, received: false },
    };

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
      chatId: 1,
      userTargetId: 1,
    };
    let response = await this.model.getServerMessages(data);

    const dataArray = response.arrayOfMessages;

    if (response.status == true) {
      dataArray.forEach((item) => {
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
}

export { ChatController };
