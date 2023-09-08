class navBarController2 {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.logOutLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomLogOutClick(e);
    });
  }

  disable() {
    this.view.logOutLink = null;
  }

  async onButtomLogOutClick(e) {
    let res = await this.model.logout();
    if (res) {
      console.log(res);
      window.dispatchEvent(new Event("trigger-navBar0-instance"));
    } else {
      console.log(res);
    }
  }
}

export { navBarController2 };
