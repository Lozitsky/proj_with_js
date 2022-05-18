import "../../css/nav/sidenav-list.scss";

class SidenavList extends HTMLElement {
  constructor() {
    super();

    this._class = this.getAttribute('name');

    // Render the template
    this.style.display = 'none';
    this.addChild(this.getTemplate(this.getClassName()));
    this.targets = [];
  }

  getClassName() {
    return `${this.getAttribute('name')}__list`;
  }

  getTemplate(_class) {
    const template = document.createElement('template');
    template.innerHTML = `
       <ul class="${_class}">  
       </ul>
    `;
    return template;
  }

  addChild(template) {
    this.parentElement.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['i'];
  }

  // Called when the element is added to the DOM
  connectedCallback() {
    this.setAttribute('i', this.childElementCount);
  }

  addListeners() {
    const children = this.children;
    const classNames = [...children].map(el => el.getAttribute('for'));

    let observer = new MutationObserver(mutations => mutations
      .forEach(record => {
        let find = [...record.addedNodes]
          .find(node => node && node instanceof HTMLElement && node.className.split(' ')
            .some(c => classNames.includes(c) ? this.addListener(c) : false));
        if (find) {
          this.targets.push(find);
        }
        return find;
      }));

    observer.observe(document.querySelector(`info-table[name*=${this.children[0].getAttribute('for')}]`).parentElement, {
      childList: true, // observe direct children
      subtree: true, // and lower descendants too
      characterDataOldValue: true // pass old data to callback
    });
  }

  addListener(c) {
    document.querySelector(`.${this._class}__item-${c}`)
      .addEventListener('click', () => this.changeTargets(c));
    return true;
  }

  changeTargets(mustVisible) {
    this.targets.forEach(item => {
      !item.className.includes(mustVisible) ? this.makeCollapsed(item) : this.makeVisible(item);
    });
  }

  makeCollapsed(target) {
    target.classList.add('collapsed');
  }

  makeVisible(target) {
    target.classList.remove('collapsed');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'i' && !+newValue) {
      this.addListeners();
      this.remove();
    }
  }
}

export default SidenavList;
