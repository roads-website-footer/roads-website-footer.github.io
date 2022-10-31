import firms from './data.json' assert {type: 'json'};

customElements.define(
  "roads-website-footer",
  class extends HTMLElement {

    constructor() {
      super() // or this when done in the connectedCallback
        .attachShadow({ mode: "open" })
        .append(document.getElementById(this.nodeName).content.cloneNode(true));
    }

    $(selector) {
      return [...this.shadowRoot.querySelectorAll(selector)]; // return all DOM elements as Array
    }

    connectedCallback() {
      this.setCopyright();
      this.setLinks();
      this.setFirms();
    }

    getCurrentYear() {
      return new Date().getFullYear();
    }

    getFirmName() {
        let name = "";
        firms.map(firm => {
            if(firm.url === window.location.origin) {
                name = firm.name
           } else {
                name = "Roads Technology"
           }
        });

        return name;
    }

    setCopyright() {
      this.$("#copyrightContainer").forEach(el => {
        el.innerHTML = `Copyright &#xA9; ${this.getCurrentYear()} ${this.getFirmName()}`;
      });
    }

    setLinks() {
      const links = [
        ["Algemene Voorwaarden", "algemene-voorwaarden"],
        ["Privacyregelement", "privacyregelement"],
        ["Disclaimer", "disclaimer"]
      ];

      this.$("#linksContainer").forEach(el => {
        el.innerHTML = '<ul>' +
          links.map(link => `<a href='/${link[1]}'><li>${link[0]}</li> </a>`).join('') +
          '</ul>';
      });
    }

    setFirms() {
      this.$("#firmContainer").forEach(el => {
          el.innerHTML =
          '<div class = card-container>' +
            firms.map(firm => 
                `<div class = card>
                    <div class = card-image>
                        <img src=${firm.thumbnail}>
                    </div>

                    <div class = card-content>
                     <p>${firm.name}<p>
                     </div>
                   </div>
                `
            ).join('') +
          '</div';
      });
    }
  }
);
