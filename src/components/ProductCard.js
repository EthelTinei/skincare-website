import { BaseComponent } from './BaseComponent.js';

export class ProductCard extends BaseComponent {
  constructor(product, onAdd) {
    super();
    this.product = product;
    this.onAdd = onAdd;
  }

  getRandomImage() {
    if (this.product.images && this.product.images.length > 0) {
      return this.product.images[Math.floor(Math.random() * this.product.images.length)];
    }
    return '/images/cream1.webp';
  }

  render() {
    const imageUrl = this.getRandomImage();
    this.element = document.createElement('article');
    this.element.className = 'product-card';
    this.element.dataset.productId = this.product.id;

    this.element.innerHTML = `
      <div class="product-card__image">
        <img src="${imageUrl}" alt="${this.product.name}" loading="lazy" class="product-card__img">
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">${this.product.name}</h3>
        <p class="product-card__type">${this.product.type}</p>
        <div class="product-card__tags">
          <span class="product-card__tag">${this.product.benefits.join(', ')}</span>
        </div>
        <div class="product-card__day-selector">
          <select class="product-card__select" aria-label="Выберите день">
            <option value="mon">Понедельник</option>
            <option value="tue">Вторник</option>
            <option value="wed">Среда</option>
            <option value="thu">Четверг</option>
            <option value="fri">Пятница</option>
            <option value="sat">Суббота</option>
            <option value="sun">Воскресенье</option>
          </select>
          <button class="product-card__btn" type="button">Добавить</button>
        </div>
      </div>
    `;

    const btn = this.element.querySelector('.product-card__btn');
    const select = this.element.querySelector('.product-card__select');
    if (btn && select) {
      this.attachEvent(btn, 'click', () => {
        this.onAdd(select.value, this.product);
      });
    }

    return this.element;
  }
}