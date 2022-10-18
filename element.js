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

    getSocialFirmaName() {
      switch (location.host) {
        case "restaurantfreud.nl": return "Restaurant Freud";
        case "zeefdrukmakers.nl": return "Zeefdrukmakers";
        case "roadsvervoer.nl": return "Roads Vervoer";
        case "roads-technology.nl": return "Roads Technology";
        case "houtstek.nl": return "Houtstek";
        case "appeltaartimperium.nl": return "Appeltaart Imperium";
        case "roadsprintenpixels.nl": return "Roads Print and Pixels";
        case "recyclefietsen.nl": return "Re Cycle"
        case "roads-website-footer.github.io": return "Roads Website Footer Co.";
        default:
          return "Roads Technology";
      }
    }

    setCopyright() {
      this.$("#copyrightContainer").forEach(el => {
        el.innerHTML = `Copyright &#xA9; ${this.getCurrentYear()} ${this.getSocialFirmaName()}`;
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
      const baseUrl = "https://roads-website-footer.github.io";
      const firmas = [
        [baseUrl + '/img/appeltaart.png', 'https://appeltaartimperium.nl/', ['Ambachtelijke appeltaarten']],
        [baseUrl + '/img/houtstek.png', 'https://houtstek.nl/', ['Meubels op maat', 'Diverse houten snijplanken']],
        [baseUrl + '/img/printandpixels.jpg', 'https://roadsprintenpixels.nl/',['Drukwerk', 'Inpak- en afwerkklussen','Huisstijl design']],
        [baseUrl + '/img/recycle.jpg', 'https://recyclefietsen.nl/', ['Fietsen en e-bikes','Koop en lease', 'Privé en zakelijk', 'Nieuw en gebruikt' ]],
        [baseUrl + '/img/restaurantfreud.png', 'https://restaurantfreud.nl/', ['Catering', 'Dinerbonnen', 'Bedrijfsetentjes']],
        [baseUrl + '/img/roadstechnology.jpg', 'https://roads-technology.nl/', ['Certified data wipe', 'Certified data wipe', 'Refurbished computers']],
        [baseUrl + '/img/roadsvervoer.jpg', 'https://roadsvervoer.nl/', ['Goederen vervoer', 'Chauffeurs diensten']],
        [baseUrl + '/img/zeefdrukmakers.jpg', 'https://zeefdrukmakers.nl/', ['Bedrukken textiel en bedrijfskleding', 'Workshops zeefdrukken']],
      ];

      this.$("#otherSocialFirmas").forEach(el => {
        el.innerHTML = 
        '<ul>' +
          firmas.map(firma => 
            `<a href=${firma[1]}> 
                <li> 
                    <img src='${firma[0]}'>
                    <div id="socialFirmasInfoContainer">
                      <div id="socialFirmasInfoText">
                        <ul>
                          ${firma[2].map(bulletPoint => 
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
