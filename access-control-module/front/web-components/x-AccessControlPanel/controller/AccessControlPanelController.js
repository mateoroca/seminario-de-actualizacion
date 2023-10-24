class AccessControlPanelController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }
  enable() {
    this.view.buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      this.assignGroup();
    });

    this.setOptionsGroup();
    this.setOptionsUserNames();
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
      this.view.addSelectOptions(this.view.groupName, groupsNames);
    } catch (error) {
      console.log(error);
    }
  }
  async setOptionsUserNames() {
    let res = await this.model.getUserNamesData();

    const UserNames = res.data;

    try {
      const userNames = [];

      for (const item of UserNames) {
        userNames.push(item.user_name);
      }
      this.view.addSelectOptions(this.view.UserName, userNames);
    } catch (error) {
      console.log(error);
    }
  }

  async assignGroup() {
    const data = this.view.getSelectValues();

    const res = await this.model.assignGroup(data);
    if (res.status) {
      window.dispatchEvent(
        new CustomEvent("trigger-alert-instance", { detail: res.message })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent("trigger-alert-instance", { detail: res.message })
      );
    }
  }
}

export { AccessControlPanelController };
