import { LocalStorageHandler } from "../../core/LocalStorageHandler.js";
import { ApiClient } from "../../core/ApiClient.js";

class AccessControlPanelModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async getGroupsData() {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");
      console.log(userId);
      console.log(token);
      let response = await this.apiClient.makeApiCall(
        "groupHandler/getgroupsdata",
        "GET",
        null,
        token,
        userId
      );

      return response.groups;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserNamesData() {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");
      console.log(userId);
      console.log(token);
      let response = await this.apiClient.makeApiCall(
        "userHandler/getuserdata",
        "GET",
        null,
        token,
        userId
      );

      return response.Data;
    } catch (error) {
      console.log(error);
    }
  }
  async assignGroup(data) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");
      console.log(userId);
      console.log(token);
      if (userId && token) {
        let response = await this.apiClient.makeApiCall(
          "groupHandler/addusertogroup",
          "POST",
          data,
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

export { AccessControlPanelModel };
