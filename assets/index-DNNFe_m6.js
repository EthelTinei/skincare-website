(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(){this.element=document.createElement(`div`),this.listeners=[]}attachEvent(e,t,n){e.addEventListener(t,n),this.listeners.push({target:e,type:t,handler:n})}removeEvents(){this.listeners.forEach(({target:e,type:t,handler:n})=>{e.removeEventListener(t,n)}),this.listeners=[]}render(){return this.element}},t=class extends e{constructor(){super(),this.element=document.createElement(`form`),this.element.className=`skin-profile-form`,this.element.noValidate=!0,this.render()}render(){this.element.innerHTML=`
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
    `}},n=class extends e{constructor(e,t){super(),this.product=e,this.onAdd=t}getRandomImage(){if(this.product.images&&this.product.images.length>0){let e=Math.floor(Math.random()*this.product.images.length);return this.product.images[e]}return`./images/cream1.webp`}render(){let e=this.getRandomImage();this.element=document.createElement(`article`),this.element.className=`product-card`,this.element.dataset.productId=this.product.id,this.element.innerHTML=`
      <div class="product-card__image">
        <img src="${e}" alt="${this.product.name}" loading="lazy" class="product-card__img">
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">${this.product.name}</h3>
        <p class="product-card__type">${this.product.type}</p>
        <div class="product-card__tags">
          <span class="product-card__tag">${this.product.benefits.join(`, `)}</span>
          <span class="product-card__tag product-card__tag--time">
            ${this.product.timeOfDay===`morning`?`☀️ Утро`:`🌙 Вечер`}
          </span>
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
    `;let t=this.element.querySelector(`.product-card__btn`),n=this.element.querySelector(`.product-card__select`);return t&&n&&this.attachEvent(t,`click`,()=>{this.onAdd(n.value,this.product)}),this.element}},r=class extends e{constructor(){super(),this.days=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],this.dayNames={mon:`Понедельник`,tue:`Вторник`,wed:`Среда`,thu:`Четверг`,fri:`Пятница`,sat:`Суббота`,sun:`Воскресенье`},this.schedule={},this.days.forEach(e=>this.schedule[e]=[]),this.element=document.createElement(`div`),this.element.className=`routine-schedule`}addProduct(e,t){this.days.includes(e)&&(this.schedule[e].push({...t,uid:Date.now()+Math.random()}),this._updateDOM())}removeProduct(e,t){this.schedule[e].splice(t,1),this._updateDOM()}clearAll(){this.days.forEach(e=>this.schedule[e]=[]),this._updateDOM()}_updateDOM(){this.element.innerHTML=`
      <div class="routine-schedule__header">
        <h2 class="routine-schedule__title">Недельный график ухода</h2>
        <button class="routine-schedule__clear-btn" type="button">Очистить всё</button>
      </div>
      <div class="routine-schedule__grid">
        ${this.days.map(e=>this._renderDayColumn(e)).join(``)}
      </div>
    `;let e=this.element.querySelector(`.routine-schedule__clear-btn`);e&&this.attachEvent(e,`click`,()=>this.clearAll()),this.element.querySelectorAll(`.routine-schedule__remove`).forEach(e=>{this.attachEvent(e,`click`,e=>{this.removeProduct(e.target.dataset.day,parseInt(e.target.dataset.index,10))})})}_renderDayColumn(e){let t=this.schedule[e];return`
      <div class="routine-schedule__day-column" data-day="${e}">
        <h3 class="routine-schedule__day-title">${this.dayNames[e]}</h3>
        <ul class="routine-schedule__list">
          ${t.length===0?`<li class="routine-schedule__empty">Нет средств</li>`:``}
          ${t.map((t,n)=>`
            <li class="routine-schedule__item">
              <span>${t.name}</span>
              <button class="routine-schedule__remove" data-day="${e}" data-index="${n}" aria-label="Удалить">×</button>
            </li>
          `).join(``)}
        </ul>
      </div>
    `}render(){return this._updateDOM(),this.element}},i=class{async fetchProducts(){let e=await fetch(`./data/skincare.json`);if(!e.ok)throw Error(`Ошибка HTTP: `+e.status);return(await e.json()).products}},a=class{constructor(){this.api=new i,this.schedule=new r,this.init()}async init(){let e=document.getElementById(`main-content`);if(!e)return;e.innerHTML=`
      <section class="skin-app__profile-container"></section>
      <section class="skin-app__products-section" hidden>
        <h2>Рекомендованные средства</h2>
        <div class="products-grid"></div>
      </section>
      <section class="skin-app__schedule-section"></section>
    `;let n=e.querySelector(`.skin-app__profile-container`),r=e.querySelector(`.skin-app__products-section`),i=r.querySelector(`.products-grid`),a=e.querySelector(`.skin-app__schedule-section`);a.appendChild(this.schedule.render());let o=new t;n.appendChild(o.element),o.element.addEventListener(`submit`,async e=>{e.preventDefault();let t=new FormData(o.element),n={skinType:t.get(`skinType`),age:t.get(`age`),concerns:t.getAll(`concerns`).join(`,`)};try{let e=await this.api.fetchProducts(),t=this.filterProducts(e,n);this.renderProducts(t,i),r.hidden=!1,a.scrollIntoView({behavior:`smooth`})}catch(e){console.error(`Ошибка загрузки:`,e),i.innerHTML=`<p class="error">Не удалось загрузить рекомендации.</p>`,r.hidden=!1}})}filterProducts(e,t){let n=t.concerns?t.concerns.split(`,`).map(e=>e.trim()):[];return e.filter(e=>{let r=e.skinTypes.includes(t.skinType)||e.skinTypes.includes(`все`),i=e.ageRanges.includes(t.age)||e.ageRanges.includes(`все`),a=n.length===0||n.some(t=>e.concerns.includes(t)||e.concerns.includes(`все`));return r&&i&&a})}renderProducts(e,t){if(t.innerHTML=``,e.length===0){t.innerHTML=`<p class="empty-state">Нет рекомендаций для вашего профиля.</p>`;return}e.forEach(e=>{let r=new n(e,(e,t)=>{this.schedule.addProduct(e,t),this.showToast(`Добавлено на ${this.schedule.dayNames[e]}`)});t.appendChild(r.render())})}showToast(e){let t=document.createElement(`div`);t.className=`toast`,t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),2e3)}};document.addEventListener(`DOMContentLoaded`,()=>{new a;let e=document.querySelector(`.theme-toggle`),t=document.documentElement;e&&e.addEventListener(`click`,()=>{let n=t.getAttribute(`data-theme`)===`dark`;t.setAttribute(`data-theme`,n?`light`:`dark`);let r=e.querySelector(`.theme-toggle__icon`),i=e.querySelector(`.theme-toggle__text`);r&&(r.textContent=n?`️`:`🌙`),i&&(i.textContent=n?`Светлая`:`Тёмная`)})});