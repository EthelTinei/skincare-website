export class BaseComponent {
  constructor() {
    this.eventListeners = [];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    if (typeof this.onStateChange === 'function') {
      this.onStateChange(this.state);
    }
    this.render();
  }

  attachEvent(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
  }

  destroy() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
  }

  render() {
    throw new Error('Метод render() должен быть переопределён в дочернем классе');
  }
}