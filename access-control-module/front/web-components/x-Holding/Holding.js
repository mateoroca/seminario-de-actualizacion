class HoldingComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const container = document.createElement("div");
    container.classList.add("container");

    const div1 = document.createElement("div");
    div1.classList.add("item");
    div1.style.setProperty("--i", "0");
    container.appendChild(div1);

    const div2 = document.createElement("div");
    div2.classList.add("item");
    div2.style.setProperty("--i", "1");
    container.appendChild(div2);

    const div3 = document.createElement("div");
    div3.classList.add("item");
    div3.style.setProperty("--i", "2");
    container.appendChild(div3);

    const div4 = document.createElement("div");
    div4.classList.add("item");
    div4.style.setProperty("--i", "3");
    container.appendChild(div4);

    const div5 = document.createElement("div");
    div5.classList.add("item");
    div5.style.setProperty("--i", "4");
    container.appendChild(div5);

    const div6 = document.createElement("div");
    div6.classList.add("item");
    div6.style.setProperty("--i", "5");
    container.appendChild(div6);

    const div7 = document.createElement("div");
    div7.classList.add("item");
    div7.style.setProperty("--i", "6");
    container.appendChild(div7);

    const div8 = document.createElement("div");
    div8.classList.add("item");
    div8.style.setProperty("--i", "7");
    container.appendChild(div8);

    const div9 = document.createElement("div");
    div9.classList.add("item");
    div9.style.setProperty("--i", "8");
    container.appendChild(div9);

    const div10 = document.createElement("div");
    div10.classList.add("item");
    div10.style.setProperty("--i", "9");
    container.appendChild(div10);

    const div11 = document.createElement("div");

    div11.classList.add("item");
    div11.style.setProperty("--i", "10");
    container.appendChild(div11);

    const div12 = document.createElement("div");
    div12.classList.add("item");
    div12.style.setProperty("--i", "11");
    container.appendChild(div12);

    const div13 = document.createElement("div");
    div13.classList.add("item");
    div13.style.setProperty("--i", "12");
    container.appendChild(div13);

    const div14 = document.createElement("div");
    div14.classList.add("item");
    div14.style.setProperty("--i", "13");
    container.appendChild(div14);

    const div15 = document.createElement("div");
    div15.classList.add("item");
    div15.style.setProperty("--i", "14");
    container.appendChild(div15);

    const div16 = document.createElement("div");
    div16.classList.add("item");
    div16.style.setProperty("--i", "15");
    container.appendChild(div16);

    const div17 = document.createElement("div");
    div17.classList.add("item");
    div17.style.setProperty("--i", "16");
    container.appendChild(div17);

    const div18 = document.createElement("div");
    div18.classList.add("item");
    div18.style.setProperty("--i", "17");
    container.appendChild(div18);

    const div19 = document.createElement("div");
    div19.classList.add("item");
    div19.style.setProperty("--i", "18");
    container.appendChild(div19);

    const div20 = document.createElement("div");
    div20.classList.add("item");
    div20.style.setProperty("--i", "19");
    container.appendChild(div20);

    const div21 = document.createElement("div");
    div21.classList.add("item");
    div21.style.setProperty("--i", "20");
    container.appendChild(div21);

    this.appendChild(container);

    let style = document.createElement("style");
    style.innerText = `@import './style/holdingStyle.css'`;
    this.appendChild(style);

    container.addEventListener("click", () => {
      const event = new CustomEvent("login");
      dispatchEvent(event);
    });
  }
}

customElements.define("holding-component", HoldingComponent);

export { HoldingComponent };
