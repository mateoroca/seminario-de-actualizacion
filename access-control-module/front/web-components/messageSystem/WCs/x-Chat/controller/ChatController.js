import { LocalStorageHandler } from "../../../../common/LocalStorageHandler.js";
import { Encryptor } from "../../../../../web-components/common/Encryptor.js";

class ChatController {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
    /* --------------------------------------------------- */
    this.localStorageH = new LocalStorageHandler();
    this.encryptor = new Encryptor();
    /* --------------------------------------------------- */
    this.messagesAttached = [];
    this.intervalId = null;
    this.chatId;
    this.userOriginId;
    this.userTargetId;
    this.secretKey;
  }
  enable() {
    this.view.addEventListener("send", () => {
      // se escuchan dos eventos seguidos
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

    const encryptedMessageBody = this.encryptor.encryptMessage(
      messageBody,
      this.secretKey
    );

    const message = {
      chatId: this.chatId,
      userOriginId: userId,
      userTargetId: this.userOriginId,
      MessageBody: encryptedMessageBody,
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
      chatId: this.chatId,
    };

    let response = await this.model.getServerMessages(data);

    const arrayOfMessages = response.arrayOfMessages;

    console.log(arrayOfMessages);

    if (response.status == true) {
      arrayOfMessages.forEach((message) => {
        const id = message.id;
        const userTargetId = message.userTargetId;

        if (userId == userTargetId) {
          if (!this.messagesAttached.includes(id)) {
            const body = message.body;

            const decryptMessageBody = this.encryptor.decryptMessage(
              body,
              this.secretKey
            );

            const timesStampSended = message.timesStampSended;

            if (message.state.received == true) {
              //valido si el estado es received

              this.view.setReceivedMessages(
                decryptMessageBody,
                timesStampSended
              );
              this.messagesAttached.push(id);
            }
          }
        }
      });
    }
  }
  //////////////////////////////////////////////////////////

  setValues(chatId, userOriginId, userTargetId, secretKey) {
    this.chatId = chatId;
    this.userOriginId = userOriginId;
    this.userTargetId = userTargetId;
    this.secretKey = secretKey;
  }
}

export { ChatController };
