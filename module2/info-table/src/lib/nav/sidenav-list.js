import "../../css/nav/sidenav-list.scss";

const template = document.createElement('template');

class SidenavList extends HTMLElement {
  constructor() {
    super();

    let _class = this.getAttribute('name');
    template.innerHTML = `
     <ul class="${_class}__list">  
     </ul>
`;

    // Render the template
    this.style.display = 'none';
    this.parentElement.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['i'];
  }

  // Called when the element is added to the DOM
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

export default SidenavList;
