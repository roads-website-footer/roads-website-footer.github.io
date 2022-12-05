import firms from "./data.json" assert { type: "json" };

const template = document.createElement("template");
template.innerHTML = /* html */ `
<style>
#title {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 3px;
    padding-top: 1em;
    padding-left: 3em;
    background-color: grey; 
    font-family: "Palanquin Dark", Arial, Helvetica, Verdana, sans-serif;
    font-size: 14px;
    color: white;
    line-height: 28px
  }

  #footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3px;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: grey; 
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    line-height: 28px
  }

  #info {
    display: flex;
    flex-direction: column;
    align-items: end;
    padding: 1em;
    background-color: grey; 
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    color: #353535;
    line-height: 28px
  }
</style>

<div id ="title">
  <h2>"Roads werkt!"</h2>
</div>
<div id ="footer">
  <roads-firms></roads-firms>
</div>
<div id="info"> 
  <roads-links></roads-links>
</div>`;

class RoadsFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setStyle();
  }

  getFirmColor = () => {
    let color;
    firms.map((firm) => {
      if (firm.url === window.location.origin) {
        color = firm.colors;
      } else {
        color = firms[4].colors;
      }
    });
    return color;
  };

  isColor = (color) => color.charAt(0) == "#";

  setBackgroundColor = (color, style) => {
    if (this.isColor(color)) {
      style.backgroundColor = color;
    } else {
      style.backgroundImage = `url(${color})`;
      style.backgroundSize = "cover";
    }
  };

  setStyle = () => {
    const { primary, secondary } = this.getFirmColor();
    const titleStyle = this.shadowRoot.getElementById("title").style;
    const footerStyle = this.shadowRoot.getElementById("footer").style;
    const infoStyle = this.shadowRoot.getElementById("info").style;

    this.setBackgroundColor(primary, titleStyle);
    this.setBackgroundColor(primary, footerStyle);
    this.setBackgroundColor(secondary, infoStyle);
  };
}

window.customElements.define("roads-website-footer", RoadsFooter);
