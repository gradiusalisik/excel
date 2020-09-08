import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'header';
  toHTML() {
    return `
      <input class="header__input" type='text' value='Новая таблица' />
      <div class="header__buttons">
        <button type='button' class="header__button">
          <i class="material-icons">delete</i>
        </button>
        <button type='button' class="header__button">
          <i class="material-icons">exit_to_app</i>
        </button>
      </div>
    `
  }
}
