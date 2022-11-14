import firms from "../data.json" assert { type: "json" };

const template = document.createElement("template");
template.innerHTML = `
<style>
  .firms {

  }

  img {
    width: 90%;
  }

  .flip-card {
    background-color: transparent;
    width: 300px;
    height: 300px;
    perspective: 1000px;
    padding: 25px;
  }

  .flip-card:hover .card {
    transform: rotateY(180deg);
  }

  .card-container {
    display: grid;
    grid-template-columns: auto auto auto auto;
  }

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: white;
    color: black;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .card-back {
    display: grid;
    grid-template-rows: auto auto 10%;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #31afe1;
    color: white;
    transform: rotateY(180deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .social-icons {
    display: flex;
    justify-content: center;
  }

  .social-icons img {
    height: 100%;
  }
</style>

<div id ="firm" class="firm">
</div>`;

class Firms extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setFirms();
  }

  setFirms() {
    this.shadowRoot.getElementById("firm").innerHTML =
      "<div class=card-container>" +
      firms
        .map(
          ({ thumbnail, name, info, links }) =>
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
                ({ url, icon }) =>
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
      "</div";
  }
}

window.customElements.define("roads-firms", Firms);
