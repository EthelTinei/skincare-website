import { App } from './components/App.js';

document.addEventListener('DOMContentLoaded', () => {
  new App();

  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      const icon = themeToggle.querySelector('.theme-toggle__icon');
      const text = themeToggle.querySelector('.theme-toggle__text');
      if (icon) icon.textContent = isDark ? '️' : '🌙';
      if (text) text.textContent = isDark ? 'Светлая' : 'Тёмная';
    });
  }
});