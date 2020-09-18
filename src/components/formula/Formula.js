import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
      listeners: ['input', 'keyup'],
    });
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div class="formula__input" contenteditable spellcheck="false"></div>
      <div class="formula__input"
        contenteditable spellcheck="false" data-type='formula'></div>
    `
  }

  onInput(event) {
    console.log('Formula: onInput', event.target.textContent.trim());
  onKeyup(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.$emit('formula:inputEnter')
    }
  }

  onClick() {
    console.log('onclick')
  init() {
    super.init();

    this.$on('table:input', text => {
      const $elInput = $(this.$root.$el).find('[data-type="formula"]')
      $elInput.text(text);
    })
  }
}
