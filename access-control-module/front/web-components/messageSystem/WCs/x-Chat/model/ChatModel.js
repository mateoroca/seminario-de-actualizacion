import { LocalStorageHandler } from "../../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../../common/ApiClient.js";

class ChatModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }

  async getServerMessages(data) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "chatmessagehandler/getchatmessages",
        "POST",
        data,
        token,
        userId
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  ///////////////////////////////////////////////////////

  async sendMessageToServer(message) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "chatmessagehandler/newchatmessage",
        "POST",
        message,
        token,
        userId
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ChatModel };
