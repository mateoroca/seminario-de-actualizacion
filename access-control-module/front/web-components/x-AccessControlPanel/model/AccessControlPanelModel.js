import { LocalStorageHandler } from "../../common/LocalStorageHandler.js";
import { ApiClient } from "../../common/ApiClient.js";

class AccessControlPanelModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async getGroupsData() {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

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
  async assignGroup(data) {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

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
