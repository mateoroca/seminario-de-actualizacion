import { LocalStorageHandler } from "../../core/LocalStorageHandler.js";
import { ApiClient } from "../../core/ApiClient.js";

class navBarModel2 {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async logout(data) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      if (userId && token) {
        let response = await this.apiClient.makeApiCall(
          "sessionHandler/logout",
          "GET",
          null,
          token,
          userId
        );
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { navBarModel2 };
