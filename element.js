customElements.define(
  "roads-website-footer",
  class extends HTMLElement {
    constructor() {
      super() // or this when done in the connectedCallback
        .attachShadow({ mode: "open" })
        .append(document.getElementById(this.nodeName).content.cloneNode(true));
    }
  }
);
