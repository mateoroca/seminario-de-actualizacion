class ServerErrors extends HTMLElement {
  constructor(error) {
    super();

    // Crear el shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Crear la estructura interna del componente
    const container = document.createElement("div");
    container.className = "helper";

    const ERROR = document.createElement("div");
    ERROR.innerText = error;
    ERROR.classList.add("errorMessageDIV");

    container.appendChild(ERROR);

    // Crear el elemento astronaut
    const astronaut = document.createElement("div");
    astronaut.dataset.js = "astro";
    astronaut.className = "astronaut";

    // Crear las partes del astronaut
    const astronautParts = [
      "head",
      "arm arm-left",
      "arm arm-right",
      "body",
      "leg leg-left",
      "leg leg-right",
      "schoolbag",
    ];

    astronautParts.forEach((partClass) => {
      const part = document.createElement("div");
      part.className = partClass;
      astronaut.appendChild(part);
    });

    // Agregar el contenido al shadow DOM
    const style = document.createElement("style");
    style.innerHTML = `@import 'web-components/ServerErrors/style/style.css'`;

    shadow.appendChild(style);

    shadow.appendChild(container);
    shadow.appendChild(astronaut);
  }
}

// Registrar el componente personalizado "helper"
customElements.define("helper-component", ServerErrors);

export { ServerErrors };
