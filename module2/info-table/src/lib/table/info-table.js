import "../../css/table/info-table.scss";

const template = document.createElement('template');

class InfoTable extends HTMLElement {
  constructor() {
    super();

    let _class = this.getAttribute('name');
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
    this.addChild(_class);
  }

  getColumnSize() {
    // Array.prototype.slice.call(this.childNodes)
    // Array.from(this.childNodes)
    return [...this.children].reduce((max, el) =>
      el.childElementCount > max ? el.childElementCount : max, 0);
  }

  addChild(_class) {
    this.parentElement.appendChild(template.content.cloneNode(true));

    let tr;
    if (!this.getColumnSize()) {
      tr = document.createElement('tr');
      tr.className = `class="${_class}__row ${_class}__row-body`;
      document.querySelector(`.${_class}__tbody`).appendChild(tr);
    } else {
      for (let i = 1; i <= this.getColumnSize(); i++) {
        tr = document.createElement('tr');
        tr.className = `${_class}__row ${_class}__row-body-${i}`;
        document.querySelector(`.${_class}__tbody`).appendChild(tr);
      }
    }
  }

  static get observedAttributes() {
    return ['i'];
  }

  connectedCallback() {
    this.setAttribute('i', this.childElementCount);
  }

  disconnectedCallback() {
    console.log('disconnected!');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'i' && !+newValue) {
      this.remove();
    }
  }
}

export default InfoTable;