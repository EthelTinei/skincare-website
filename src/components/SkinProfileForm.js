import { BaseComponent } from './BaseComponent.js';

export class SkinProfileForm extends BaseComponent {
  constructor() {
    super();
    this.element = document.createElement('form');
    this.element.className = 'skin-profile-form';
    this.element.noValidate = true;
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <h2 class="skin-profile-form__title">Настройте свой профиль</h2>
      
      <div class="skin-profile-form__field">
        <legend>Тип кожи <span class="required">*</span></legend>
        <div class="skin-profile-form__options">
          <label class="skin-profile-form__option">
            <input type="radio" name="skinType" value="сухая" required> Сухая
          </label>
          <label class="skin-profile-form__option">
            <input type="radio" name="skinType" value="жирная" required> Жирная
          </label>
          <label class="skin-profile-form__option">
            <input type="radio" name="skinType" value="комбинированная" required> Комбинированная
          </label>
          <label class="skin-profile-form__option">
            <input type="radio" name="skinType" value="нормальная" required> Нормальная
          </label>
        </div>
      </div>

      <div class="skin-profile-form__field">
        <label for="age">Возраст <span class="required">*</span></label>
        <select id="age" name="age" class="skin-profile-form__select" required>
          <option value="" disabled selected>Выберите...</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46+">46+</option>
        </select>
      </div>

      <div class="skin-profile-form__field">
        <legend>Проблемы кожи</legend>
        <div class="skin-profile-form__checkboxes">
          <label class="skin-profile-form__option">
            <input type="checkbox" name="concerns" value="акне"> Акне
          </label>
          <label class="skin-profile-form__option">
            <input type="checkbox" name="concerns" value="сухость"> Сухость
          </label>
          <label class="skin-profile-form__option">
            <input type="checkbox" name="concerns" value="пигментация"> Пигментация
          </label>
          <label class="skin-profile-form__option">
            <input type="checkbox" name="concerns" value="морщины"> Морщины
          </label>
        </div>
      </div>

      <div class="skin-profile-form__field">
        <label for="desiredResult">Желаемый результат</label>
        <textarea id="desiredResult" name="desiredResult" class="skin-profile-form__textarea" placeholder="Например: увлажнение, сияние..."></textarea>
      </div>

      <button type="submit" class="skin-profile-form__submit">Получить рекомендации</button>
    `;
  }
}