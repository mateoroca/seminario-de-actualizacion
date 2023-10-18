import { LocalStorageHandler } from "../../core/LocalStorageHandler.js";

class ChatController {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
    this.localStorageH = new LocalStorageHandler();
    this.MessagesSet = [];
  }
  enable() {
    this.view.addEventListener("send", () => {
      this.sendAndSetMessage();
    });
    setInterval(() => {
      this.askForMessages();
    }, 5000);
  }
  disable() {
    this.view.removeEventListener("send", () => {
      this.sendAndSetMessage();
    });
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
      userTargetId: 1,
      MessageBody: messageBody,
      timesStampSended: currentTime,
      state: { sended: true, received: false },
    };

    const liMessage = this.view.setNewMessage(messageBody, currentTime);

    const res = await this.model.sendMessageToServer(message);

    if (res && res.status == true) {
      this.view.setTheReceivedSymbol(liMessage);
    } else {
      this.view.setNotReceivedSymbol(liMessage);
      /* setTimeout(this.model.sendMessageToServer(message), 10000); */
    }
  }
  ///////////////////////////////////////////////////////

  async askForMessages() {
    const data = {
      chatId: 1,
      userTargetId: 1,
    };
    let response = await this.model.getServerMessages(data);

    const dataArray = response.arrayOfMessages;
    if (response.status == true) {
      dataArray.forEach((item) => {
        const id = item.id;

        if (!this.MessagesSet.includes(id)) {
          /*  const userOriginId = item.userOriginId;
          const userTargetId = item.userTargetId;
          const timesStampReceived = item.timesStampReceived;
          const sended = item.state.sended;
          const received = item.state.received; */
          const body = item.body;
          const timesStampSended = item.timesStampSended;

          this.view.setReceivedMessages(body, timesStampSended);
          this.MessagesSet.push(id);
        }
      });
    }
  }
}

export { ChatController };
