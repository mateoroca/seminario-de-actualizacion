import { ServerErrors } from "../../../../ServerErrors/x-serverErrors.js";

class ListView extends HTMLElement {
  constructor() {
    super();
    this.error = new ServerErrors();

    this.container = document.createElement("div");
    this.container.classList.add("backgraundDiv");

    this.subContainer = document.createElement("div");
    this.subContainer.classList.add("subContainer");
    this.container.appendChild(this.subContainer);

    this.content = document.createElement("div");
    this.content.classList.add("content");

    this.container.appendChild(this.content);

    const shadowRoot = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.innerHTML = `@import 'web-components/messageSystem/WCs/x-List/style/style.css'`;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(this.container);
    /* ------------------------------------------------------- */
    this.UserDivs = [];
    this.usersAttached = [];

    /* ------------------------------------------------------- */
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    this.currentTime = `${hours}:${minutes}`;
  }

  createUserList(name, userId) {
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info1");

    infoContainer.setAttribute("data-userid", userId);

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("iconDiv");

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.setAttribute("id", "nameDiv");
    nameDiv.textContent = name;

    // Crear el elemento SVG y sus atributos
    const Path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    Path1.setAttribute("fill", "#838383"); // Cambiar el color a negro
    Path1.setAttribute(
      "d",
      "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
    );
    Path1.setAttribute("id", "path1");

    // Crear el elemento SVG y configurar sus atributos
    const SVG1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    SVG1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    SVG1.setAttribute("height", "1em");
    SVG1.setAttribute("viewBox", "0 0 448 512");
    SVG1.appendChild(Path1);

    // Agregar el nuevo elemento SVG a iconDiv
    iconDiv.appendChild(SVG1);

    // Crear el segundo div con clase "info__title"

    const ProposalDiv = document.createElement("div");
    ProposalDiv.setAttribute("id", "ProposalDiv");
    ProposalDiv.classList.add("ProposalDiv");

    // Crear el tercer div con clase "info__close"
    const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg2.setAttribute("height", "1em");
    svg2.setAttribute("viewBox", "0 0 640 512");
    svg2.setAttribute("id", "svg2");

    const path2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path2.setAttribute(
      "d",
      "M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z"
    );

    path2.setAttribute("fill", "#838383");
    path2.setAttribute("id", "path2");

    const writeDiv = document.createElement("div");
    writeDiv.setAttribute("id", "writeDiv");
    writeDiv.classList.add("writeDiv");

    const Path3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    Path3.setAttribute("fill", "#838383"); // Cambiar el color a negro
    Path3.setAttribute(
      "d",
      "M64 112c-8.8 0-16 7.2-16 16V384c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H64zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 320H400c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm-72-72c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H200c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H200c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H280c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H280c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H360c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H360c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H440c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H440c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16z"
    );
    Path3.setAttribute("id", "path3");

    const svg3 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg3.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg3.setAttribute("height", "1em");
    svg3.setAttribute("viewBox", "0 0 640 512");
    svg3.setAttribute("id", "svg3");

    svg3.appendChild(Path3);

    svg2.appendChild(path2);

    // Crear el elemento SVG para el icono de cierre y sus atributos

    // Agregar los tres divs al contenedor principal
    writeDiv.appendChild(svg3);
    ProposalDiv.appendChild(svg2);
    infoContainer.appendChild(iconDiv);
    infoContainer.appendChild(nameDiv);
    infoContainer.appendChild(writeDiv);
    infoContainer.appendChild(ProposalDiv);

    // Agregar el contenedor principal al documento
    this.subContainer.appendChild(infoContainer);

    return infoContainer;
  }

  setActiveUser(infoContainerDiv) {
    const path1 = infoContainerDiv.querySelector("#path1");
    path1.setAttribute("fill", "#14ff08 ");
  }
  setInactiveUser(infoContainerDiv) {
    const path1 = infoContainerDiv.querySelector("#path1");
    path1.setAttribute("fill", "#838383");
  }
  setNewProposal(infoContainerDiv) {
    const path2 = infoContainerDiv.querySelector("#path2");
    path2.setAttribute("fill", "#14ff08 ");
  }

  setNotProposals(infoContainerDiv) {
    const path2 = infoContainerDiv.querySelector("#path2");
    path2.setAttribute("fill", "#838383 ");
  }

  setNewAvaibleChat(infoContainerDiv) {
    const Path3 = infoContainerDiv.querySelector("#path3");
    Path3.setAttribute("fill", "#14ff08 ");
  }

  setNotAvaibleChat(infoContainerDiv) {
    const Path3 = infoContainerDiv.querySelector("#path3");
    Path3.setAttribute("fill", "#838383 ");
  }

  AddServerErrorsComponent(errorMessage) {
    this.error.setErrorMessage(errorMessage);
    this.content.appendChild(this.error);
  }

  removeErrorsComponent() {
    this.content.remove(this.error);
  }

  //en proseso de cambio , esto iria aca pero ahora esta en el controller
  setActivitiStateOfUser(activeUsersIds) {
    this.UserDivs.forEach((div) => {
      const userIdValue = div.getAttribute("data-userid");

      if (activeUsersIds.includes(parseInt(userIdValue))) {
        this.setActiveUser(div);
      } else {
        this.setInactiveUser(div);
      }
    });
  }
}

customElements.define("x-listview", ListView);

export { ListView };
