import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
export class Formula extends ExcelComponent {
  static className = 'formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
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

    console.log(this.$formula, 'formula')
    this.$on('table:input', text => {
      this.$formula.text(text);
    })

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text());
    })
  }
}
