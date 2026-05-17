import { BaseComponent } from './BaseComponent.js';

export class RoutineSchedule extends BaseComponent {
  constructor() {
    super();
    this.schedule = { morning: [], evening: [] };
  }

  addItem(product, time) {
    if (!this.schedule[time].some(p => p.id === product.id)) {
      this.schedule[time].push(product);
      this.#saveToStorage();
      this.render();
      return true;
    }
    return false;
  }

  removeItem(productId, time) {
    this.schedule[time] = this.schedule[time].filter(p => p.id !== productId);
    this.#saveToStorage();
    this.render();
  }

  clearAll() {
    this.schedule = { morning: [], evening: [] };
    this.#saveToStorage();
    this.render();
  }

  #saveToStorage() {
    localStorage.setItem('skincareSchedule', JSON.stringify(this.schedule));
  }

  loadFromStorage() {
    const saved = localStorage.getItem('skincareSchedule');
    if (saved) {
      this.schedule = JSON.parse(saved);
    }
  }

  render() {
    const container = document.querySelector('.routine-schedule');
    if (!container) return;

    container.innerHTML = `
      <div class="routine-schedule__header">
        <h2 class="routine-schedule__title">Ваш график ухода</h2>
        <button class="routine-schedule__clear-btn" type="button">Очистить всё</button>
      </div>
      <div class="routine-schedule__columns">
        ${this.#renderColumn('morning', '☀️ Утро')}
        ${this.#renderColumn('evening', '🌙 Вечер')}
      </div>
    `;

    this.#bindRemoveEvents(container);
    this.#bindClearEvent(container);
  }

  #renderColumn(time, title) {
    const items = this.schedule[time];
    return `
      <section class="routine-schedule__column">
        <h3 class="routine-schedule__column-title">${title}</h3>
        ${items.length === 0 
          ? '<p class="routine-schedule__empty">Пока пусто</p>' 
          : `<ul class="routine-schedule__list">
              ${items.map(p => `
                <li class="routine-schedule__item">
                  <span>${p.name}</span>
                  <button class="routine-schedule__remove" 
                          data-id="${p.id}" 
                          data-time="${time}">×</button>
                </li>
              `).join('')}
            </ul>`
        }
      </section>
    `;
  }

  #bindRemoveEvents(container) {
    container.querySelectorAll('.routine-schedule__remove').forEach(btn => {
      this.attachEvent(btn, 'click', (e) => {
        const id = Number(e.target.dataset.id);
        const time = e.target.dataset.time;
        this.removeItem(id, time);
      });
    });
  }

  #bindClearEvent(container) {
    const clearBtn = container.querySelector('.routine-schedule__clear-btn');
    if (clearBtn) {
      this.attachEvent(clearBtn, 'click', () => {
        if (confirm('Вы уверены, что хотите очистить весь график?')) {
          this.clearAll();
        }
      });
    }
  }
}