import "../../css/table/_table.scss";

class InfoTable extends HTMLElement {
  constructor() {
    super();

    let _class = this.getAttribute('name');
    const template = document.createElement('template');
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
    this.addChild(_class, template);
  }

  getColumnSize() {
    return [...this.children].reduce((max, el) =>
      el.childElementCount > max ? el.childElementCount : max, 0);
  }

  addChild(_class, template) {
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