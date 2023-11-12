class navBarView2 extends HTMLElement {
  constructor() {
    super();

    this.navBar = document.createElement("div");
    this.navBar.classList.add("nav-bar");

    this.leftContainer = document.createElement("div");
    this.leftContainer.classList.add("left-container");

    this.rightContainer = document.createElement("div");
    this.rightContainer.classList.add("right-container");

    this.accesscontrolLink = document.createElement("a");
    this.accesscontrolLink.classList.add("nav-link");
    this.accesscontrolLink.textContent = "Access Control Panel";

    this.chatLink = document.createElement("a");
    this.chatLink.classList.add("nav-link");
    this.chatLink.textContent = "Chat";

    this.logOutLink = document.createElement("a");
    this.logOutLink.classList.add("nav-link");
    this.logOutLink.textContent = "Log Out";
    this.logOutLink.href = "/logout";

    this.appendChild(this.navBar);
    this.navBar.appendChild(this.leftContainer);
    this.navBar.appendChild(this.rightContainer);
    this.leftContainer.appendChild(this.accesscontrolLink);
    this.leftContainer.appendChild(this.chatLink);
    this.rightContainer.appendChild(this.logOutLink);

    this.accesscontrolLink.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("trigger-accesscontrol-instance"));
    });

    this.chatLink.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("trigger-chat-instance"));
    });
  }
}

customElements.define("navbar-view2", navBarView2);
export { navBarView2 };
