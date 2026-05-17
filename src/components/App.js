import { SkinProfileForm } from './SkinProfileForm.js';
import { ProductCard } from './ProductCard.js';
import { RoutineSchedule } from './RoutineSchedule.js';
import { ApiService } from '../services/ApiService.js';

export class App {
  constructor() {
    this.api = new ApiService();
    this.schedule = new RoutineSchedule();
    this.init();
  }

  async init() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <section class="skin-app__profile-container"></section>
      <section class="skin-app__products-section" hidden>
        <h2>Рекомендованные средства</h2>
        <div class="products-grid"></div>
      </section>
      <section class="skin-app__schedule-section"></section>
    `;

    const profileContainer = mainContent.querySelector('.skin-app__profile-container');
    const productsSection = mainContent.querySelector('.skin-app__products-section');
    const productsGrid = productsSection.querySelector('.products-grid');
    const scheduleSection = mainContent.querySelector('.skin-app__schedule-section');

    scheduleSection.appendChild(this.schedule.render());

    const form = new SkinProfileForm();
    profileContainer.appendChild(form.element);

    form.element.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form.element);
      const data = {
        skinType: formData.get('skinType'),
        age: formData.get('age'),
        concerns: formData.getAll('concerns').join(',')
      };

      try {
        const products = await this.api.fetchProducts();
        const recommended = this.filterProducts(products, data);
        this.renderProducts(recommended, productsGrid);
        productsSection.hidden = false;
        scheduleSection.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        productsGrid.innerHTML = '<p class="error">Не удалось загрузить рекомендации.</p>';
        productsSection.hidden = false;
      }
    });
  }

  filterProducts(products, profile) {
    const userConcerns = profile.concerns ? profile.concerns.split(',').map(c => c.trim()) : [];
    return products.filter(p => {
      const skinMatch = p.skinTypes.includes(profile.skinType) || p.skinTypes.includes('все');
      const ageMatch = p.ageRanges.includes(profile.age) || p.ageRanges.includes('все');
      const concernMatch = userConcerns.length === 0 || userConcerns.some(c => p.concerns.includes(c) || p.concerns.includes('все'));
      return skinMatch && ageMatch && concernMatch;
    });
  }

  renderProducts(products, container) {
    container.innerHTML = '';
    if (products.length === 0) {
      container.innerHTML = '<p class="empty-state">Нет рекомендаций для вашего профиля.</p>';
      return;
    }

    products.forEach(product => {
      const card = new ProductCard(product, (day, prod) => {
        this.schedule.addProduct(day, prod);
        this.showToast(`Добавлено на ${this.schedule.dayNames[day]}`);
      });
      container.appendChild(card.render());
    });
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
}