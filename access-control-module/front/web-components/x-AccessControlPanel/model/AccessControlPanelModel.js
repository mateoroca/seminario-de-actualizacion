import { LocalStorageHandler } from "../../core/LocalStorageHandler.js";
import { ApiClient } from "../../core/ApiClient.js";

class AccessControlPanelModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async getGroupsData() {
    try {
      let response = await this.apiClient.makeApiCall(
        "groupHandler/getgroupsdata",
        "GET",
        null
      );

      return response.groups;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserNamesData() {
    try {
      let response = await this.apiClient.makeApiCall(
        "userHandler/getuserdata",
        "GET",
        null
      );

      return response.Data;
    } catch (error) {
      console.log(error);
    }
  }
}

export { AccessControlPanelModel };
