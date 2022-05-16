class TableData extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
  }

  disconnectedCallback() {
    console.log('disconnected!');
  }
}