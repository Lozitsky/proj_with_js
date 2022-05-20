// import _styles from "../../css/table/_table.scss";
import "../../css/table/_table.scss";
import globals from '../../../globals.js'

const template = document.createElement('template');

// console.log(_styles);
console.log(globals._styles.prefix);

class InfoTable extends HTMLElement {
  constructor() {
    super();
    // this.blobDownload();
    console.log('Yay!');
    // this.getFile().then(console.log);
    let _class = this.getAttribute('name');

    globals.Globals.editClass(_class);

/*    <style>
      .${_class}__table {
      overflow: auto;
      white-space: nowrap;
      margin: auto;
      width: 33%;
      min-width: 450px;
      background: hsla(0, 16%, 78%, .3);
      color: hsla(0, 75%, 3%, 1);
    }
      .${_class}__caption {
    }
      .${_class}__title::first-letter {
      text-transform: uppercase;
    }
      .${_class}__head {
      margin: .5em;
      padding: 1em;
      background: hsla(229, 96%, 90%, .2);
    }
      .${_class}__head::first-letter {
      text-transform: uppercase;
    }
      .${_class}__row {
    }
      .${_class}__tbody {
    }
      .${_class}__data {
      margin: .5em;
      padding: 1em .5em;
      background: hsla(129, 96%, 90%, .2) 0 100% repeat;
      overflow-x: auto;
      overflow-y: hidden;
      max-height: 12%;
    }
    </style>*/

    template.innerHTML = `
      <article class="${_class} collapsed">
        <table class="${_class}__table">
            <caption class="${_class}__caption">
            </caption>
            <thead class="${_class}__thead">
                <tr class="${_class}__row ${_class}__row-head">
                </tr>
            </thead>
            <tbody class="${_class}__tbody">
            </tbody>
        </table>
      </article>
`;

    // Render the template
    this.style.display = 'none';
    let element = this.addChild(_class);
    // _styles.use({target: element});
  }

  getColumnSize() {
    // Array.prototype.slice.call(this.childNodes)
    // Array.from(this.childNodes)
    return [...this.children].reduce((max, el) =>
      el.childElementCount > max ? el.childElementCount : max, 0);
  }

  addChild(_class) {
    let parent = this.parentElement.appendChild(template.content.cloneNode(true));

    let tr;
    let element = document.querySelector(`.${_class}__tbody`);
    if (!this.getColumnSize()) {
      tr = document.createElement('tr');
      tr.className = `${_class}__row ${_class}__row-body`;
      element.appendChild(tr);
    } else {
      for (let i = 1; i <= this.getColumnSize(); i++) {
        tr = document.createElement('tr');
        tr.className = `${_class}__row ${_class}__row-body-${i}`;
        element.appendChild(tr);
      }
    }
    return parent;
  }


  static get observedAttributes() {
    return ['i'];
  }

  connectedCallback() {
    this.setAttribute('i', this.childElementCount);
  }

  disconnectedCallback() {
    // console.log('disconnected!');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'i' && !+newValue) {
      this.remove();
    }
  }
}

export default InfoTable;