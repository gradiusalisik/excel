import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import {changeTitleHeader} from '@/redux/actions';
import {defaultTitleHeader} from '../../constants';
import {debounce} from '../../core/utils'

export class Header extends ExcelComponent {
  static className = 'header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().currentHeader || defaultTitleHeader;
    return `
      <input
        class="header__input"
        type='text'
        value='${title}'
        data-id="inputHeader"
      />
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

  onInput(event) {
    this.$dispatch(changeTitleHeader($(event.target).text()));
  }
}
