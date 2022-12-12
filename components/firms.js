import firms from "./data.json" assert { type: "json" };

const template = document.createElement("template");
template.innerHTML = /* html */ `
<style>
/* Hover over a card to flip, can tab too. */
/* firm */
#firm {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

/* .flip-card-container */
.flip-card-container {
  width: 220px;
  height: 150px;
  padding: .5em;
}

/* .flip-card */
.flip-card {
  width: inherit;
  height: inherit;
  position: relative;
  transform-style: preserve-3d;
  transition: .6s .1s;
}

/* hover and focus-within states */
.flip-card-container:hover .flip-card {
  transform: rotateY(180deg);
}

/* .card-front */
.card-front {
  width: 100%;
  height: 100%;
  border-radius: 12px;
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

.card-front img {
  width: 60%;
}

img[src*="roads_"] {
  width: 85%;
}

/* .card-back */
.card-back {
  display: grid;
  grid-template-rows: auto auto 10%;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: white;
  overflow: hidden;
  backface-visibility: hidden;
  justify-self: center;
  text-align: center;
  transform: rotateY(180deg);
}

.social-icons {
    display: flex;
    justify-content: center;
  }

.social-icons img {
  height: 100%;
}

.filter-youtube {
  filter: invert(19%) sepia(92%) saturate(5362%) hue-rotate(356deg) brightness(111%) contrast(122%);
}

.filter-twitter {
  filter: invert(57%) sepia(61%) saturate(4041%) hue-rotate(177deg) brightness(98%) contrast(93%);
}

.filter-facebook {
  filter: invert(32%) sepia(26%) saturate(1386%) hue-rotate(183deg) brightness(92%) contrast(85%);
}

.filter-instagram {
  filter: invert(48%) sepia(63%) saturate(7001%) hue-rotate(320deg) brightness(90%) contrast(96%);
}

</style>

<div id ="firm"></div>
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

  getSocialLinks = (links) =>
    links
      .map(({ url, icon }) => `<a href=${url}> ${this.getSocialIcon(icon)}</a>`)
      .join("");

  getSocialIcon = (icon) => {
    if (icon.includes("facebook")) {
      return `<img src='${icon}' class='filter-facebook'>`;
    } else if (icon.includes("twitter")) {
      return `<img src='${icon}' class='filter-twitter'>`;
    } else if (icon.includes("instagram")) {
      return `<img src='${icon}' class='filter-instagram'>`;
    } else if (icon.includes("youtube")) {
      return `<img src='${icon}' class='filter-youtube'>`;
    } else {
      return `<img src='${icon}'>`;
    }
  };

  setFirms() {
    this.shadowRoot.getElementById("firm").innerHTML = firms
      .map(
        ({ name, url, thumbnail, links }) =>
          /* html */
          `<div class="flip-card-container">
            <div class="flip-card">
              <div class="card-front">
                <img src= ${thumbnail}>
              </div>
              
              <div class="card-back"> 
                <a href= ${url}>
                  <p>${name}</p>
                </a> 
                
                <div class="social-icons">
                  ${this.getSocialLinks(links)}
                </div>
              </div>
            </div>
          </div>`
      )
      .join("");
  }
}

window.customElements.define("roads-firms", Firms);
