import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {isCell, isShiftPressed, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection(this.$root);
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    console.log(event.target)
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      this.selection.clear();
      this.selection.select($target);
      if (isShiftPressed(event)) {
        this.selection.selectGroup(event);
      }
    }
  }
}
