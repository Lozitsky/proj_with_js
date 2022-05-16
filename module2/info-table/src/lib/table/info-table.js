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

  addChild(_class) {
    this.parentElement.appendChild(template.content.cloneNode(true));
    if (!this.lastElementChild.childElementCount) {
      document.querySelector(`.${_class}__tbody`)
        .innerHTML = `      
          <tr class="${_class}__row ${_class}__row-body">
          </tr>
        `;
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