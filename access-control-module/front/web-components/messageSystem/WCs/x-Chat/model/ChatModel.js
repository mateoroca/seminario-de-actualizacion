import { LocalStorageHandler } from "../../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../../common/ApiClient.js";

class ChatModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }

  async getServerMessages(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "chatmessagehandler/getchatmessages",
        "POST",
        data
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  ///////////////////////////////////////////////////////

  async sendMessageToServer(message) {
    try {
      let response = await this.apiClient.makeApiCall(
        "chatmessagehandler/newchatmessage",
        "POST",
        message
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ChatModel };
