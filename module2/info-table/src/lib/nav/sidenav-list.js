import "../../css/nav/sidenav-list.scss";

const template = document.createElement('template');
template.innerHTML = `
   <ul class="sidenav__list">  
   </ul>
`;

class SidenavList extends HTMLElement {
  constructor() {
    super();

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
    console.log('disconnected!');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'i' && !+newValue) {
      this.remove();
    }
  }
}

export default SidenavList;
