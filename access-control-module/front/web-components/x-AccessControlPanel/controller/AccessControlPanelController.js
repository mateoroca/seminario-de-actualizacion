class AccessControlPanelController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }
  enable() {
    this.view.buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      this.setOptionsUserNames();
    });
    this.setOptionsGroup();
  }
  disable() {
    this.view.buttonSubmit = null;
  }

  async setOptionsGroup() {
    /* let DATA = {
      userName: this.view.UserName.value,
      groupName: this.view.groupAccess.value,
    }; */

    let res = await this.model.getGroupsData();

    try {
      const groupsNames = [];

      for (const item of res) {
        groupsNames.push(item.name);
      }
      this.view.addSelectOptions(this.view.groupAccess, groupsNames);
    } catch (error) {
      console.log(error);
    }
  }
  async setOptionsUserNames() {
    /* let DATA = {
      userName: this.view.UserName.value,
      groupName: this.view.groupAccess.value,
    }; */

    let res = await this.model.getUserNamesData();
    console.log(res);
    try {
      const userNames = [];

      for (const item of res) {
        userNames.push(item.user_name);
      }
      this.view.addSelectOptions(this.view.UserName, userNames);
    } catch (error) {
      console.log(error);
    }
  }
}

export { AccessControlPanelController };
