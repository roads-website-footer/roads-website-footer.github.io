import firms from "./data.json" assert { type: "json" };

customElements.define(
  "roads-website-footer",
  class extends HTMLElement {
    constructor() {
      super() // or this when done in the connectedCallback
        .attachShadow({ mode: "open" })
        .append(document.getElementById(this.nodeName).content.cloneNode(true));
    }

    connectedCallback() {
      // this.setCopyright();
      // this.setLinks();
      // this.setFirms();
    }
    
    $(selector) {
      return [...this.shadowRoot.querySelectorAll(selector)]; // return all DOM elements as Array
    }

    setFirms() {
      this.$("#firmContainer").forEach((el) => {
        el.innerHTML =
          "<div class=card-container>" +
          firms
            .map(
              ({thumbnail,name,info,links}) =>
                `<div class="flip-card">
              <div class="card">
                <div class="card-front">
                    <img src=${thumbnail}>
                  </div>
                <div class="card-back">
                  <p>${name}</p>
                  <div class="">
                  <p>${info}</p>
                  </div>
            ` +
                `<div class="social-icons">` +
                links
                  .map(
                    ({url,icon}) =>
                      `<a href=${url}>
                    <img src='${icon}'></img>
                  </a>`
                  )
                  .join("") +
                `
                </div>
                </div>
              </div>
            </div>
            `
            )
            .join("") +
          "</div>";
      });
    }
  }
);
