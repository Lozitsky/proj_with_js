class TableItem extends HTMLElement {
  constructor() {
    super();

    let _class = this.parentElement.getAttribute('name');
    let header = this.getAttribute('name');
    let suffix = header.split(' ').join('-');

    this.addChild(_class, this.getHeadTemplate(_class, suffix, header), this.getBodyTemplate(_class, suffix));
  }

  addChild(_class, headTemplate, bodyTemplate) {
    document.querySelector(`.${_class}__row-head`)
      .appendChild(headTemplate.content.cloneNode(true));

    if (!this.childElementCount) {
      document.querySelector(`.${_class}__row-body`)
        .appendChild(bodyTemplate.content.cloneNode(true));

      let i = this.parentElement.getAttribute('i');
      this.parentElement.setAttribute('i', --i);
    }
  }

  getHeadTemplate(prefix, suffix, header) {
    const template = document.createElement('template');
    template.innerHTML = `
        <th class="${prefix}__head ${prefix}__head-${suffix}">${header}</th>
    `;
    return template;
  }

  getBodyTemplate(_class, suffix) {
    const template = document.createElement('template');
    template.innerHTML = `
            <th class="${_class}__data ${_class}__data-${suffix}">${this.textContent}</th>
    `;
    return template;
  }

  connectedCallback() {
  }

  disconnectedCallback() {
    console.log('disconnected!');
  }
}

export default TableItem;