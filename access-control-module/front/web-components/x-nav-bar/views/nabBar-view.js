class navBarView extends HTMLElement {
  constructor() {
    super();

    this.navBar = document.createElement("div");
    this.navBar.classList.add("nav-bar");

    this.leftContainer = document.createElement("div");
    this.leftContainer.classList.add("left-container");

    this.homeLink = document.createElement("a");
    this.homeLink.classList.add("nav-link");
    this.homeLink.textContent = "Home";

    this.rightContainer = document.createElement("div");
    this.rightContainer.classList.add("right-container");

    this.signUpLink = document.createElement("a");
    this.signUpLink.classList.add("nav-link");
    this.signUpLink.textContent = "Sign Up";

    this.logInLink = document.createElement("a");
    this.logInLink.classList.add("nav-link");
    this.logInLink.textContent = "Log In";
    this.logInLink.href = "/login";

    this.appendChild(this.navBar);
    this.navBar.appendChild(this.leftContainer);
    this.navBar.appendChild(this.rightContainer);
    this.leftContainer.appendChild(this.homeLink);

    this.rightContainer.appendChild(this.signUpLink);
    this.rightContainer.appendChild(this.logInLink);
  }
}

customElements.define("navbar-view", navBarView);
export { navBarView };
