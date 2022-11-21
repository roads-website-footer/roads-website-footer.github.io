const template = document.createElement("template");
template.innerHTML = /* html */ `
<style>
  .link {

  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    padding: 0;
  }

  li {
    padding: 15px;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: #EE7222;

  }
</style>

<div id ="link" class="link">
</div>`;

class Link extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setLinks();
  }

  setLinks() {
    const links = [
      ["Algemene Voorwaarden", "algemene-voorwaarden"],
      ["Privacyregelement", "privacyregelement"],
      ["Disclaimer", "disclaimer"],
    ];

    this.shadowRoot.getElementById("link").innerHTML =
      "<ul>" +
      links
        .map((link) => `<a href='/${link[1]}'><li>${link[0]}</li> </a>`)
        .join("") +
      "</ul>";
  }
}

window.customElements.define("roads-link", Link);
