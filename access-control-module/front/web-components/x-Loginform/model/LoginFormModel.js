import { LocalStorageHandler } from "../../core/LocalStorageHandler.js";
import { ApiClient } from "../../core/ApiClient.js";

class LoginFormModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async login(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "UserHandler/login",
        "POST",
        data
      );

      const id = response.userId;
      const token = response.Token;
      const message = response.message;

      console.log(message);

      this.localStorageH.setOnlocalStorage("userId:", id);
      this.localStorageH.setOnlocalStorage("Token:", token);
    } catch (error) {
      console.log(error);
    }
  }
}

export { LoginFormModel };
