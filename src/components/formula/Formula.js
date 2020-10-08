import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div data-id="formula" class="formula__input"
        contenteditable spellcheck="false"></div>
    `
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    const text = $(event.target).text();
    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done')
    }
  }

  init() {
    super.init();
    this.$formula = this.$root.find('[data-id="formula"]');

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value);
    })
  }
}
