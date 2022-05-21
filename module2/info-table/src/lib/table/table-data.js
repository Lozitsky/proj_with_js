class TableData extends HTMLElement {
  constructor() {
    super();

    let _class = this.parentElement.getAttribute('name');
    let prefix = this.parentElement.parentElement.getAttribute('name');
    this.addChild(prefix, this.getTemplate(prefix, _class));
  }

  static get observedAttributes() {
    return ['i'];
  }

  getTemplate(prefix, _class) {
    let suffix = _class.split(' ').join('-');
    const template = document.createElement('template');
    template.innerHTML = `
    <td class="${prefix}__data ${prefix}__data-${suffix}">
        <span class="${prefix}__span">${this.textContent}</span>
    </td>
    `;
    return template;
  }

  addChild(prefix, template) {
    let selectors = `.${prefix}__row-body-${this.getAttribute('i')}`;

    if (!this.childElementCount) {
      document.querySelector(selectors)
        .appendChild(template.content.cloneNode(true));

      let i = this.parentElement.parentElement.getAttribute('i');
      this.parentElement.parentElement.setAttribute('i', --i);
    }
  }

  disconnectedCallback() {
    // console.log('disconnected!');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue, newValue);
  }
}

export default TableData;