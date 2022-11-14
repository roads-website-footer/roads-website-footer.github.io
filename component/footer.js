const template = document.createElement("template");
template.innerHTML = `
<style>
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: #d4dad3;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
  }
</style>

<div id ="footer" class="footer">
  <roads-copyright></roads-copyright>
  <roads-link></roads-link>
  <roads-firms></roads-firms>
</div>`;

class RoadsFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("roads-website-footer", RoadsFooter);
