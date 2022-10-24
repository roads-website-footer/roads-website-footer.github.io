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
      this.setPrivacyLinks();
      this.setSocialFirmaLogosAndInfo();
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

    setPrivacyLinks() {
      const links = [
        ["Algemene Voorwaarden", "algemene-voorwaarden"],
        ["Privacyregelement", "privacyregelement"],
        ["Disclaimer", "disclaimer"]
      ];

      this.$("#standardPrivacyLinksContainer").forEach(el => {
        el.innerHTML = '<ul>' +
          links.map(link => `<a href='/${link[1]}'><li>${link[0]}</li> </a>`).join('') +
          '</ul>';
      });
    }

    setSocialFirmaLogosAndInfo() {
      this.$("#otherSocialFirmas").forEach(el => {
          el.innerHTML =
          '<ul>' +
            firms.map(firm =>
                `<a href=${firm.url}>
                    <li>
                        <img src=${firm.thumbnail}>
                        <div id="socialFirmasInfoContainer">
                            <div id="socialFirmasInfoText" onMouseOver="this.style.opacity=1" onMouseOut="this.style.opacity=0">
                                <ul>
                                    ${firm.info.map(bulletPoint =>
                                    `<li> ${bulletPoint} </li>`
                                    )}
                                </ul>
                            </div>
                        </div>
                    </li>
                </a>`
            ).join('') +
          '</ul>';
      });
    }
  }
);
