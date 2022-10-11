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
      this.setPrivacyLinks();
      this.setSocialFirmaLogosAndInfo();
    }

    setSocialFirmaLogosAndInfo(){
      var imgArray = new Array();
      imgArray[0] = new Image();
      imgArray[0].src = './img/appeltaart.png';
      imgArray[1] = new Image();
      imgArray[1].src = './img/houtstek.png';
      imgArray[2] = new Image();
      imgArray[2].src = './img/printandpixels.jpg';
      imgArray[3] = new Image();
      imgArray[3].src = './img/recycle.jpg';
      imgArray[4] = new Image();
      imgArray[4].src = './img/restaurantfreud.png';
      imgArray[5] = new Image();
      imgArray[5].src = './img/roadstechnology.jpg';
      imgArray[6] = new Image();
      imgArray[6].src = './img/roadsvervoer.jpg';
      imgArray[7] = new Image();
      imgArray[7].src = './img/zeefdrukmakers.jpg';
      var displayImages = '<ul>';
      imgArray.forEach( (img) => {
        displayImages += img;
      })
      displayImages += '</ul>';
      this.$("#otherSocialFirmas").forEach(el => {
        el.innerHTML = displayImages;
      });
    }


    setPrivacyLinks() {
      var links = ["Algemene Voorwaarden", "Privacyregelement", "Disclaimer"];
      var displayElements = '<ul>';

      links.forEach(function(link) {
          displayElements += '<li>'+ link + '</li>';
      })
      displayElements += '</ul>';
      console.log(displayElements);
      this.$("#standartPrivacyLinksContainer").forEach(el => {
        el.innerHTML = displayElements;
      });
    }

    setSocialFirmaName() {
      this.$("#socialFirmaName").forEach( el => {
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
