import { BaseComponent } from './BaseComponent.js';

export class ProductCard extends BaseComponent {
  constructor(product, onAdd) {
    super();
    this.product = product;
    this.onAdd = onAdd;
  }

  getRandomImage() {
    if (this.product.images && this.product.images.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.product.images.length);
      return this.product.images[randomIndex];
    }
    return '/images/cream1.webp';
  }

  render() {
    const imageUrl = this.getRandomImage();
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.productId = this.product.id;

    card.innerHTML = `
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
          <select class="product-card__select">
            <option value="mon">Понедельник</option>
            <option value="tue">Вторник</option>
            <option value="wed">Среда</option>
            <option value="thu">Четверг</option>
            <option value="fri">Пятница</option>
            <option value="sat">Суббота</option>
            <option value="sun">Воскресенье</option>
          </select>
          <button class="product-card__btn" type="button">Добавить в график</button>
        </div>
      </div>
    `;

    const btn = card.querySelector('.product-card__btn');
    const select = card.querySelector('.product-card__select');
    if (btn && select) {
      btn.addEventListener('click', () => {
        this.onAdd(select.value, this.product);
      });
    }

    return card;
  }
}