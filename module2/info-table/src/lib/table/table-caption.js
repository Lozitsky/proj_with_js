class TableCaption extends HTMLElement {
  constructor() {
    super();

    let _class = this.parentElement.getAttribute('name');
    this.addChild(_class, this.getTemplate(_class));
  }

  getTemplate(_class) {
    const template = document.createElement('template');
    template.innerHTML = `
        <h2 class="${_class}__title">${this.textContent}</h2>
    `;
    return template;
  }

  addChild(_class, template) {
    document.querySelector(`.${_class}__caption`)
      .appendChild(template.content.cloneNode(true));

    if (!this.childElementCount) {
      let i = this.parentElement.getAttribute('i');
      this.parentElement.setAttribute('i', --i);
    }
  }

  connectedCallback() {
  }

  disconnectedCallback() {
    // console.log('disconnected!');
  }
}

export default TableCaption;