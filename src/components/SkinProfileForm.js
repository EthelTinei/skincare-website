import { BaseComponent } from './BaseComponent.js';

export class SkinProfileForm extends BaseComponent {
  constructor(onSubmit) {
    super();
    this.onSubmit = onSubmit;
    this.profile = {
      skinType: '',
      ageRange: '',
      concerns: [],
      goals: ''
    };
    this.errors = {};
  }

  render() {
    const form = document.createElement('form');
    form.className = 'skin-profile-form';
    form.noValidate = true;
    form.innerHTML = `
      <h2 class="skin-profile-form__title">Настройте свой профиль</h2>
      <div class="skin-profile-form__error-container" hidden></div>
      
      <fieldset class="skin-profile-form__field">
        <legend>Тип кожи <span class="required">*</span></legend>
        <div class="skin-profile-form__options">
          <label class="skin-profile-form__option">
            <input type="radio" name="skinType" value="сухая"> Сухая
          </label>
          <label class="skin-profile-form__option">
            <input type="radio" name="skinType" value="жирная"> Жирная
          </label>
          <label class="skin-profile-form__option">
            <input type="radio" name="skinType" value="комбинированная"> Комбинированная
          </label>
          <label class="skin-profile-form__option">
            <input type="radio" name="skinType" value="нормальная"> Нормальная
          </label>
        </div>
      </fieldset>

      <fieldset class="skin-profile-form__field">
        <legend>Возраст <span class="required">*</span></legend>
        <select class="skin-profile-form__select" name="ageRange">
          <option value="">Выберите...</option>
          <option value="18-25">18–25</option>
          <option value="26-35">26–35</option>
          <option value="36-45">36–45</option>
          <option value="46+">46+</option>
        </select>
      </fieldset>

      <fieldset class="skin-profile-form__field">
        <legend>Проблемы кожи</legend>
        <div class="skin-profile-form__checkboxes">
          <label><input type="checkbox" name="concern" value="акне"> Акне</label>
          <label><input type="checkbox" name="concern" value="сухость"> Сухость</label>
          <label><input type="checkbox" name="concern" value="пигментация"> Пигментация</label>
          <label><input type="checkbox" name="concern" value="морщины"> Морщины</label>
        </div>
      </fieldset>

      <fieldset class="skin-profile-form__field">
        <legend>Желаемый результат</legend>
        <textarea class="skin-profile-form__textarea" name="goals" 
          placeholder="Например: увлажнение, сияние..."></textarea>
      </fieldset>

      <button class="skin-profile-form__submit" type="submit">Получить рекомендации</button>
    `;

    this.#bindEvents(form);
    return form;
  }

  #bindEvents(form) {
    this.attachEvent(form, 'submit', (e) => {
      e.preventDefault();
      this.#validate(form);
      if (Object.keys(this.errors).length === 0) {
        this.profile.skinType = form.querySelector('input[name="skinType"]:checked')?.value || '';
        this.profile.ageRange = form.querySelector('select[name="ageRange"]').value;
        this.profile.concerns = Array.from(form.querySelectorAll('input[name="concern"]:checked'))
          .map(cb => cb.value);
        this.profile.goals = form.querySelector('textarea[name="goals"]').value.trim();
        this.onSubmit(this.profile);
        form.reset();
        this.#clearErrors(form);
      } else {
        this.#showErrors(form);
      }
    });
  }

  #validate(form) {
    this.errors = {};
    if (!form.querySelector('input[name="skinType"]:checked')) {
      this.errors.skinType = 'Выберите тип кожи';
    }
    if (!form.querySelector('select[name="ageRange"]').value) {
      this.errors.ageRange = 'Выберите возраст';
    }
  }

  #showErrors(form) {
    const container = form.querySelector('.skin-profile-form__error-container');
    container.innerHTML = `<p class="skin-profile-form__error-text">${Object.values(this.errors).join('. ')}</p>`;
    container.hidden = false;
  }

  #clearErrors(form) {
    const container = form.querySelector('.skin-profile-form__error-container');
    container.innerHTML = '';
    container.hidden = true;
  }
}