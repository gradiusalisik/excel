import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click']
    })
  }

  toHTML() {
    return `
      <button type='button' class="toolbar__button">
        <i class="material-icons">format_align_left</i>
      </button>
      <button type='button' class="toolbar__button">
        <i class="material-icons">format_align_center</i>
      </button>
      <button type='button' class="toolbar__button">
        <i class="material-icons">format_align_right</i>
      </button>
      <button type='button' class="toolbar__button">
        <i class="material-icons">format_bold</i>
      </button>
      <button type='button' class="toolbar__button">
        <i class="material-icons">format_italic</i>
      </button>
      <button type='button' class="toolbar__button">
        <i class="material-icons">format_underline</i>
      </button>
    `
  }

  onClick(event) {
    console.log(event.target);
  }
}
