import { LocalStorageHandler } from "../../common/LocalStorageHandler.js";
import { ApiClient } from "../../common/ApiClient.js";

class SignUpModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async signUp(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "sessionHandler/signup",
        "POST",
        data
      );

      const id = response.userId;
      const token = response.Token;

      this.localStorageH.setOnlocalStorage("userId:", id);
      this.localStorageH.setOnlocalStorage("Token:", token);
      return response.message;
    } catch (error) {
      console.log(error);
    }
  }
}

export { SignUpModel };
