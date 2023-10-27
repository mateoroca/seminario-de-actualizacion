import { LocalStorageHandler } from "../../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../../common/ApiClient.js";

class ListModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }

  async getServerChatProposals(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "chatproposalhandler/getchatproposal",
        "POST",
        data
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  ///////////////////////////////////////////////////////

  async sendNewChatProposal(message) {
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

  async getChats(data) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "chatHandler/getchats",
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
  async getActiveUsers() {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "sessionhandler/getactiveusers",
        "GET",
        null
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "userHandler/getusers",
        "GET",
        null,
        token,
        userId
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async createChateProposal(data) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "chatproposalhandler/newchatproposal",
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

  async confirmChatProposal(chatProposalId) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "chatproposalhandler/confirmchatproposal",
        "POST",
        chatProposalId,
        token,
        userId
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async rejectProposal(chatProposalId) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "chatproposalhandler/rejectchatproposal",
        "POST",
        chatProposalId,
        token,
        userId
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ListModel };
