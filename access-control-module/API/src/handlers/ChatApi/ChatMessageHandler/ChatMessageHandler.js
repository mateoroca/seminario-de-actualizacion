const { v4: uuidv4 } = require("uuid");
const { cacheHandler } = require("../../../cache/cacheHandler.js");

class ChatMessageHandler {
  constructor() {
    this.i18nOptions = {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "2-digit",
      minute: "2-digit",
    };
  }
  newChatMessage(chatId, userOriginID, userTargetID, body, timeSended) {
    const dateText = new Intl.DateTimeFormat("es-AR", this.i18nOptions).format(
      new Date()
    );
    const Message = {
      id: uuidv4(),
      userOriginId: userOriginID,
      userTargetId: userTargetID,
      body: body,
      timesStampSended: timeSended,
      timesStampReceived: dateText,
      state: { sended: true, received: false },
    };
    try {
      if (!cacheHandler.chatsMessages.has(chatId)) {
        cacheHandler.chatsMessages.set(chatId, [Message]);
      } else {
        const chatMessages = cacheHandler.chatsMessages.get(chatId);
        chatMessages.push(Message);
      }

      return { status: true, message: "success to save message" };
    } catch (error) {
      console.log(error);
      return { status: false, message: "error to save message" };
    }
  }

  getChatMessages(chatId) {
    try {
      const chatMessages = cacheHandler.chatsMessages;
      const values = chatMessages.get(chatId);

      if (values && values.length > 0) {
        values.forEach((message) => {
          message.state.received = true; //se marcan como received
        });
        console.log(values);
        return values;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Error can not get chat messages");
    }
  }
}

module.exports = { ChatMessageHandler };
