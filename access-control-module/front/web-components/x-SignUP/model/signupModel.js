import { LocalStorageHandler } from "../../core/LocalStorageHandler.js";
import { ApiClient } from "../../core/ApiClient.js";

class SignUpModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async signUp(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "UserHandler/signup",
        "POST",
        data
      );

      const id = response.userId;
      const token = response.Token;

      this.localStorageH.setOnlocalStorage("userId:", id);
      this.localStorageH.setOnlocalStorage("Token:", token);
    } catch (error) {
      console.log(error);
    }
  }
}

export { SignUpModel };
