class SidenavList extends HTMLElement {
  constructor() {
    super();

    this._class = this.getAttribute('name');
    this._toggle = this.hasAttribute('toggle');
    // Render the template
    this.style.display = 'none';
    this.addChild(this.getTemplate(this._class));
    this.targets = [];
  }

  getTemplate(_class) {
    const template = document.createElement('template');
    template.innerHTML = `
       <style>
          .${_class}__list {
            display: grid;
            grid-template-columns: minmax(150px, 1fr);
            grid-gap: .5em;
          }
          .${_class}__item {
            display: flex;
            background: hsla(150, 96%, 90%, .2);
          }
          .${_class}__link {
            white-space: nowrap;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1em 0;
          }
          .collapsed {
            position: absolute;
            opacity: 0;
            top: 0;
            right: 0;
          /*display: none;*/
          }
       </style>
       <ul class="${_class}__list">  
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

    const observer = new MutationObserver(mutations => {
      mutations
        .forEach(record => {
          let find = [...record.addedNodes]
            .find(node => node && node instanceof HTMLElement && node.className.split(' ')
              .some(c => classNames.includes(c) ? this.addListener(c) : false));
          if (find) {
            this.targets.push(find);
          }
          return find;
        });
      observer.disconnect();
    }
    );

    observer.observe(document.querySelector(`info-table[name*=${this.children[0].getAttribute('for')}]`).parentElement, {
      childList: true, // observe direct children
      subtree: true, // and lower descendants too
      characterDataOldValue: true // pass old data to callback
    });
  }

  addListener(c) {
    document.querySelector(`.${this._class}__item-${c}`)
      .addEventListener('click', () =>
        this._toggle ? this.toggleVisibility(c) : this.changeTargets(c)
      );
    return true;
  }

  changeTargets(mustVisible) {
    this.targets.forEach(item => {
      !item.className.includes(mustVisible) ? this.makeCollapsed(item) : this.makeVisible(item);
    });
  }

  toggleVisibility(className) {
    this.makeToggle(this.targets.find(item => item.className.includes(className)));
  }

  makeCollapsed(target) {
    target.classList.add('collapsed');
  }

  makeVisible(target) {
    target.classList.remove('collapsed');
  }

  makeToggle(target) {
    target.classList.contains('collapsed') ? this.makeVisible(target) : this.makeCollapsed(target);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'i' && !+newValue) {
      this.addListeners();
      this.remove();
    }
  }
}

export default SidenavList;
