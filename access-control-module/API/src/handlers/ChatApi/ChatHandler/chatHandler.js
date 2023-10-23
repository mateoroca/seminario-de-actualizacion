const { v4: uuidv4 } = require("uuid");
const { cacheHandler } = require("../../../cache/cacheHandler.js");

class ChatHandler {
  constructor(userHandler) {
    this.userHandler = userHandler;
    this.i18nOptions = {
      timeZone: "America/Argentina/Buenos_Aires",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
  }

  createChats(userOriginId, userTargetId) {
    const dateText = new Intl.DateTimeFormat("es-AR", this.i18nOptions).format(
      new Date()
    );
    try {
      let chat = {
        chatId: uuidv4(),
        userOriginId: userOriginId,
        userTargetId: userTargetId,
        timeStamp: dateText,
      };
      cacheHandler.chats.push(chat);
      return chat;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  getChats() {
    try {
      const chats = cacheHandler.getChats();
      return { status: true, message: "success to get chats", data: chats };
    } catch (error) {
      return { status: false, message: "error to get chats" };
    }
  }
}

module.exports = { ChatHandler };
