const template = document.createElement('template');

class ListItem extends HTMLElement {
  constructor() {
    super();
    let _class = this.getAttribute('for');
    template.innerHTML = `
    <li class="sidenav__item sidenav__item-${_class}">
        <a href="#" class="sidenav__link sidenav__link-${_class}">${this.textContent}</a>
    </li>
`;
    document.querySelector('.sidenav__list').appendChild(template.content.cloneNode(true));
    let i = this.parentElement.getAttribute('i');
    this.parentElement.setAttribute('i', --i);
  }

  connectedCallBack() {
  }

  disconnectedCallback() {
    console.log(`${this.localName} disconnected!`);
  }
}

export default ListItem;