import { ApiService } from '../services/ApiService.js';
import { SkinProfileForm } from './SkinProfileForm.js';
import { ProductCard } from './ProductCard.js';
import { RoutineSchedule } from './RoutineSchedule.js';

export class App {
  constructor(root) {
    this.root = root;
    this.api = new ApiService();
    this.schedule = new RoutineSchedule();
    this.products = [];
    this.userProfile = null;
    this.toastContainer = null;
  }

  async init() {
    this.#createAccessibilityElements();
    this.#initTheme();
    this.schedule.loadFromStorage();
    this.#renderLayout();
    this.#renderProfileForm();
    this.#renderPlaceholder();
    this.#bindKeyboardNavigation();
  }

  #createAccessibilityElements() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Перейти к основному содержанию';
    document.body.prepend(skipLink);

    this.toastContainer = document.createElement('div');
    this.toastContainer.id = 'toast-container';
    this.toastContainer.setAttribute('aria-live', 'polite');
    this.toastContainer.setAttribute('aria-atomic', 'true');
    this.toastContainer.className = 'visually-hidden';
    document.body.appendChild(this.toastContainer);
  }

  #initTheme() {
    const savedTheme = localStorage.getItem('skincareTheme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.#setTheme(theme);
    this.#renderThemeToggle();
  }

  #setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('skincareTheme', theme);
  }

  #renderThemeToggle() {
    let toggle = document.querySelector('.theme-toggle');
    
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'theme-toggle';
      toggle.setAttribute('aria-label', 'Переключить тему оформления');
      document.body.appendChild(toggle);
    }
    
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const icon = currentTheme === 'dark' ? '☀️' : '🌙';
    const label = currentTheme === 'dark' ? 'Светлая' : 'Тёмная';
    
    toggle.innerHTML = `<span class="theme-toggle__icon">${icon}</span> ${label}`;
    
    toggle.onclick = () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.#setTheme(newTheme);
      this.#renderThemeToggle();
    };
  }

  #renderLayout() {
    this.root.innerHTML = `
      <header class="skin-app__header">
        <h1>Персонализированный график ухода за кожей</h1>
        <p class="skin-app__subtitle">Создайте свой идеальный ритуал красоты</p>
      </header>
      <main id="main-content" class="skin-app__main">
        <section class="skin-app__profile-container"></section>
        <section class="skin-app__products-section" hidden>
          <h2>Рекомендованные средства</h2>
          <div class="products-grid"></div>
        </section>
        <section class="routine-schedule"></section>
      </main>
    `;
  }

  #renderProfileForm() {
    const container = this.root.querySelector('.skin-app__profile-container');
    const form = new SkinProfileForm((profile) => {
      this.userProfile = profile;
      this.#loadAndFilterProducts();
    });
    container.appendChild(form.render());
  }

  async #loadAndFilterProducts() {
    const productsContainer = this.root.querySelector('.skin-app__products-section');
    const grid = productsContainer.querySelector('.products-grid');

    grid.innerHTML = '<p class="loading">Загрузка рекомендаций...</p>';
    productsContainer.hidden = false;

    try {
      const data = await this.api.fetchProducts();
      this.products = data.products;

      const filtered = this.#filterProducts(this.products, this.userProfile);

      if (filtered.length === 0) {
        grid.innerHTML = '<p>Нет рекомендаций для вашего профиля.</p>';
        return;
      }

      grid.innerHTML = '';
      filtered.forEach(product => {
        const card = new ProductCard(product, (prod, time) => {
          const added = this.schedule.addItem(prod, time);
          if (added) {
            this.#showToast(`✓ ${prod.name} добавлен в график!`);
            const btn = document.querySelector(`[data-product-id="${prod.id}"] .product-card__btn`);
            if (btn) {
              btn.textContent = '✓ Добавлено';
              btn.disabled = true;
              setTimeout(() => {
                btn.textContent = 'Добавить в график';
                btn.disabled = false;
              }, 1500);
            }
          }
        });
        grid.appendChild(card.render());
      });

      this.schedule.render();

    } catch (error) {
      grid.innerHTML = `
        <div class="error-state">
          <p class="error-icon">⚠️</p>
          <h3>Не удалось загрузить данные</h3>
          <p>Проверьте подключение к интернету и попробуйте снова.</p>
          <button class="retry-btn" type="button">Повторить</button>
        </div>
      `;
      const retryBtn = grid.querySelector('.retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => this.#loadAndFilterProducts());
      }
      console.error(error);
    }
  }

  #filterProducts(products, profile) {
    return products.filter(p => {
      const skinMatch = p.skinTypes.includes('все') || p.skinTypes.includes(profile.skinType);
      const ageMatch = p.ageRanges.includes('все') || p.ageRanges.includes(profile.ageRange);
      const concernMatch = p.concerns.includes('все') ||
        p.concerns.some(c => profile.concerns.includes(c));

      return skinMatch && ageMatch && concernMatch;
    });
  }

  #renderPlaceholder() {
    this.schedule.render();
  }

  #showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    this.toastContainer.classList.remove('visually-hidden');
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
      if (this.toastContainer.children.length === 0) {
        this.toastContainer.classList.add('visually-hidden');
      }
    }, 3000);
  }

  #bindKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeToast = document.querySelector('.toast');
        if (activeToast) activeToast.remove();
      }
    });
  }
}