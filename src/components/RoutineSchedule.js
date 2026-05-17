import { BaseComponent } from './BaseComponent.js';

export class RoutineSchedule extends BaseComponent {
  constructor() {
    super();
    this.days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    this.dayNames = {
      mon: 'Понедельник', tue: 'Вторник', wed: 'Среда',
      thu: 'Четверг', fri: 'Пятница', sat: 'Суббота', sun: 'Воскресенье'
    };
    this.schedule = {};
    this.days.forEach(day => this.schedule[day] = []);
    this.element = document.createElement('div');
    this.element.className = 'routine-schedule';
  }

  addProduct(day, product) {
    if (!this.days.includes(day)) return;
    this.schedule[day].push({ ...product, uid: Date.now() + Math.random() });
    this._updateDOM();
  }

  removeProduct(day, index) {
    this.schedule[day].splice(index, 1);
    this._updateDOM();
  }

  clearAll() {
    this.days.forEach(day => this.schedule[day] = []);
    this._updateDOM();
  }

  _updateDOM() {
    this.element.innerHTML = `
      <div class="routine-schedule__header">
        <h2 class="routine-schedule__title">Недельный график ухода</h2>
        <button class="routine-schedule__clear-btn" type="button">Очистить всё</button>
      </div>
      <div class="routine-schedule__grid">
        ${this.days.map(day => this._renderDayColumn(day)).join('')}
      </div>
    `;

    const clearBtn = this.element.querySelector('.routine-schedule__clear-btn');
    if (clearBtn) this.attachEvent(clearBtn, 'click', () => this.clearAll());

    this.element.querySelectorAll('.routine-schedule__remove').forEach(btn => {
      this.attachEvent(btn, 'click', (e) => {
        this.removeProduct(e.target.dataset.day, parseInt(e.target.dataset.index, 10));
      });
    });
  }

  _renderDayColumn(day) {
    const items = this.schedule[day];
    return `
      <div class="routine-schedule__day-column" data-day="${day}">
        <h3 class="routine-schedule__day-title">${this.dayNames[day]}</h3>
        <ul class="routine-schedule__list">
          ${items.length === 0 ? '<li class="routine-schedule__empty">Нет средств</li>' : ''}
          ${items.map((item, index) => `
            <li class="routine-schedule__item">
              <span>${item.name}</span>
              <button class="routine-schedule__remove" data-day="${day}" data-index="${index}" aria-label="Удалить">×</button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  render() {
    this._updateDOM();
    return this.element;
  }
}