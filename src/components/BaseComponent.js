export class BaseComponent {
  constructor() {
    this.element = document.createElement('div');
    this.listeners = [];
  }

  attachEvent(target, type, handler) {
    target.addEventListener(type, handler);
    this.listeners.push({ target, type, handler });
  }

  removeEvents() {
    this.listeners.forEach(({ target, type, handler }) => {
      target.removeEventListener(type, handler);
    });
    this.listeners = [];
  }

  render() {
    return this.element;
  }
}