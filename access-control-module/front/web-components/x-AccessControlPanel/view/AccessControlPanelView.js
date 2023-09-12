class AccessControlPanelView extends HTMLElement {
  constructor() {
    super();
    this.card = document.createElement("div");
    this.card.classList.add("card");

    this.card2 = document.createElement("div");
    this.card2.classList.add("card2");

    this.form = document.createElement("form");
    this.form.classList.add("form");

    this.heading = document.createElement("p");
    this.heading.id = "heading";
    this.heading.textContent = "Access Control Panel";

    this.fieldUserName = document.createElement("div");
    this.fieldUserName.classList.add("field");

    this.UserName = document.createElement("select");
    this.UserName.setAttribute("autocomplete", "on");
    this.UserName.placeholder = "User Name";
    this.UserName.classList.add("input-field");
    this.fieldUserName.appendChild(this.UserName);

    this.fieldName = document.createElement("div");
    this.fieldName.classList.add("field");

    this.groupAccess = document.createElement("select");
    this.groupAccess.setAttribute("autocomplete", "on");
    this.groupAccess.placeholder = "role";
    this.groupAccess.classList.add("input-field");
    this.fieldName.appendChild(this.groupAccess);

    this.btnDIV = document.createElement("div");
    this.btnDIV.classList.add("containerBtnSignUp");

    this.buttonSubmit = document.createElement("button");
    this.buttonSubmit.classList.add("btnSignUp");
    this.buttonSubmit.textContent = "Assign role";
    this.btnDIV.appendChild(this.buttonSubmit);

    this.form.appendChild(this.heading);
    this.form.appendChild(this.fieldUserName);

    this.form.appendChild(this.fieldName);

    this.form.appendChild(this.btnDIV);
    this.card2.appendChild(this.form);
    this.card.appendChild(this.card2);
    this.appendChild(this.card);
  }
  addSelectOptions(selectElement, Options) {
    Options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.text = optionText;
      selectElement.appendChild(option);
    });
  }
}

customElements.define("x-accesscontrolpanelview", AccessControlPanelView);

export { AccessControlPanelView };
