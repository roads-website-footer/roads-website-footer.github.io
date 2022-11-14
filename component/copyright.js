import firms from "../data.json" assert { type: "json" };

const template = document.createElement("template");
template.innerHTML = `
<style>
  .copyright {

  }
</style>

<div id ="copyright" class="copyright">
</div>`;

class Copyright extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setCopyright();
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getFirmName() {
    let name = "";
    firms.map((firm) => {
      if (firm.url === window.location.origin) {
        name = firm.name;
      } else {
        name = "Roads Technology";
      }
    });

    return name;
  }

  setCopyright() {
    this.shadowRoot.getElementById(
      "copyright"
    ).innerHTML = `Copyright &#169; ${this.getCurrentYear()} ${this.getFirmName()}`;
  }
}

window.customElements.define("roads-copyright", Copyright);
