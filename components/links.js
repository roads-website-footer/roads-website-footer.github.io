import firms from "./data.json" assert { type: "json" };

const template = document.createElement("template");
template.innerHTML = /* html */ `
<style>
  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    text-decoration: underline;
  }

  .seperator {
    padding: 5px;
    color: white;
  }

  .copyright {
    color: white;
  }
</style>

<div id ="link"></div>`;

class Link extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setLinks();
  }

  getCurrentYear = () => new Date().getFullYear();

  getFirm = () => {
    let currentFirm = "";

    firms.map((firm) => {
      if (firm.url === window.location.origin) {
        currentFirm = firm;
      } else {
        // return default firm
        currentFirm = firms[4];
      }
    });

    return currentFirm;
  };

  getCopyright = (firm) =>
    `<span class="copyright">&#169; ${this.getCurrentYear()} <a href=${
      firm.url
    }>${firm.name}</a></span>`;

  setLinks = () => {
    const links = [
      ["Disclaimer", "disclaimer"],
      ["Privacyregelement", "privacyregelement"],
      ["Algemene Voorwaarden", "algemene-voorwaarden"],
    ];

    this.shadowRoot.getElementById("link").innerHTML = links
      .map((link, index) => {
        /* html */
        let linkBuilder = "";

        if (index === link.length) {
          linkBuilder = `<a href='/${link[1]}'>${
            link[0]
          }</a><span class="seperator">|</span>${this.getCopyright(this.getFirm())}`;
        } else {
          linkBuilder = `<a href='/${link[1]}'>${link[0]}</a><span class="seperator">|</span>`;
        }

        return linkBuilder;
      })
      .join("");
  };
}

window.customElements.define("roads-links", Link);
