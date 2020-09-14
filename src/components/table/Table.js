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
      listeners: ['mousedown', 'keyup'],
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
  onKeyup(event) {
    const $target = this.selection.current;
    const {col, row} = $target.id(true);

    switch (event.key) {
      case 'ArrowRight':
      case 'Tab': {
        const cell = normalizeCell(col, 1)
        nextSelected(this.$root, this.selection, row, cell);
        break;
      }
      case 'ArrowLeft': {
        const cell = normalizeCell(col, -1)
        nextSelected(this.$root, this.selection, row, cell);
        break;
      }
      case 'ArrowDown':
      case 'Enter': {
        const cell = normalizeCell(row, 1)
        nextSelected(this.$root, this.selection, cell, col);
        break;
      }
      case 'ArrowUp': {
        const cell = normalizeCell(row, -1)
        nextSelected(this.$root, this.selection, cell, col);
        break;
      }
      default:
        break;
    }
  }
}

function normalizeCell(cell, step) {
  const result = cell + step;
  return result < 0 ? 0 : result;
}

function nextSelected($root, selection, row, col) {
  const $nextTarget = $root.
      find(`[data-id="${row}:${col}"]`);
  selection.select($nextTarget);
}
