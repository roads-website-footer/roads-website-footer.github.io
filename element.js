customElements.define(
  "roads-website-footer",
  class extends HTMLElement {

    constructor() {
      super() // or this when done in the connectedCallback
        .attachShadow({ mode: "open" })
        .append(document.getElementById(this.nodeName).content.cloneNode(true));
    }

    $(selector){
      return [...this.shadowRoot.querySelectorAll(selector)]; // return all DOM elements as Array
    }

    connectedCallback() {
      this.setSocialFirmaName();
    }

    setSocialFirmaName() {
      this.$("#socialFirmaName").forEach( el => {
        console.log(location.host);
        switch(location.host) {
          case "restaurantfreud.nl": 
                el.innerText = "Restaurant Freud";
          break;
          case "zeefdrukmakers.nl":
                el.innerText = "Zeefdrukmakers";
          break;
          case "roadsvervoer.nl":
                el.innerText = "Roads Vervoer";
          break;
          case "roads-technology.nl":
                el.innerText = "Roads Technology";
          break;
          case "houtstek.nl":
                el.innerText = "Houtstek";
          break;
          case "appeltaartimperium.nl":
                el.innerText = "Appeltaart Imperium";
          break;
          case "roadsprintenpixels.nl":
                el.innerText = "Roads Print and Pixels";
          break;
          case "recyclefietsen.nl":
                el.innerText = "Re Cycle"
          break;
          case "roads-website-footer.github.io":
                el.innerText = "Roads Website Footer Co.";
          break;
          default:
                el.innerText = "";
        }
      });
    }

  }
);
