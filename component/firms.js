import firms from "../data.json" assert { type: "json" };

const template = document.createElement("template");
template.innerHTML = /* html */ `
<style>
/* Hover over a card to flip, can tab too. */
/* firm */
#firm {
  min-height: 50vh;
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

/* .flip-card-container */
.flip-card-container {
  width: 300px;
  height: 300px;
  margin: 40px;
  perspective: 1000px;
}

/* .flip-card */
.flip-card {
  width: inherit;
  height: inherit;
  position: relative;
  transform-style: preserve-3d;
  transition: .6s .1s;
  <!-- transform: rotateY(180deg); -->
}

/* hover and focus-within states */
.flip-card-container:hover .flip-card,
.flip-card-container:focus-within .flip-card {
  transform: rotateY(180deg);
}

/* .card-front */
.card-front{
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-front {
  transform: rotateY(0deg);
  z-index: 2;
}

.card-front >img {
  width: 90%;
}

/* .card-back */
.card-back {
  display: grid;
  grid-template-rows: auto auto 10%;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background: white;
  overflow: hidden;
  backface-visibility: hidden;
  justify-self: center;
  text-align: center;
}

.card-back {
  transform: rotateY(180deg);
  z-index: 1;
}

.social-icons {
    display: flex;
    justify-content: center;
  }

.social-icons img {
  height: 100%;
}

/* hover state */
.flip-card-container:hover .card-front .img-bg::before {
  width: 6px;
  border-left-color: var(--primary);
  border-right-color: var(--primary);
}
</style>
<div id ="firm" class="firm"> </div>
`;

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
      "<div>" +
      firms.map(
        ({ thumbnail, name, info, links }) =>
          /* html */
          `<div class="flip-card-container">
            <div class="flip-card">
      
              <div class="card-front">
                <img src= ${thumbnail}> 
              </div>

              <div class="card-back"> 
                <p>${name}</p>
                <p>${info}</p>
              
                <div class="social-icons">
               ` +
          links
            .map(({ url, icon }) => `<a href=${url}> <img src='${icon}'></a>`)
            .join("") +
          /* html */ `
          </div>
              </div>
            </div>
        </div>
      </div>
     `
      );
  }
}

window.customElements.define("roads-firms", Firms);
