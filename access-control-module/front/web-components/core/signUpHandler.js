import { LocalStorageHandler } from "./LocalStorageHandler.js";
import { ApiClient } from "./ApiClient";

class SignUpHandler {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async signUp(data) {
    let response = await this.apiClient.makeApiCall(
      "UserHandler/signup",
      "POST",
      data
    );
    const id = response.userId;
    const token = response.Token;

    this.localStorageH.setOnlocalStorage("userId:", id);
    this.localStorageH.setOnlocalStorage("Token:", token);
  }
}

export { SignUpHandler };
