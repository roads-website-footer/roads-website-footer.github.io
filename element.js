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
      imgArray[0] = './img/appeltaart.png';
      imgArray[1] = './img/houtstek.png';
      imgArray[2] = './img/printandpixels.jpg';
      imgArray[3] = './img/recycle.jpg';
      imgArray[4] = './img/restaurantfreud.png';
      imgArray[5] = './img/roadstechnology.jpg';
      imgArray[6] = './img/roadsvervoer.jpg';
      imgArray[7] = './img/zeefdrukmakers.jpg';
      var displayImages = '<ul>';
      console.log(imgArray);
      imgArray.forEach( (img) => {
        displayImages += "<li>" + "<img src=" + img + "/>" + "</li>";
      })
      displayImages += '</ul>';
      console.log(displayImages);
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
      /* console.log(displayElements); */
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
