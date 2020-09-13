import {getPositionCell, getPosition} from './table.functions';

export class TableSelection {
  static className = 'table__cell_selected';
  constructor($root) {
    this.$root = $root;
    this.group = [];
  }

  // $el instanceof DOM === true
  select($el) {
    // this.clear();
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = [];
  }

  selectGroup(event) {
    const start = getPositionCell(event);
    document.onmouseup = e => {
      const end = getPositionCell(e);
      const {row, col} = getPosition(start, end)

      for (let i = row.startRow; i <= row.endRow; i++) {
        for (let j = col.startCol; j <= col.endCol; j++) {
          const $target = this.$root.find(`[data-id="${i}:${j}"]`)
          this.select($target);
        }
      }

      // this.group.forEach($el => $el.addClass(TableSelection.className));

      document.onmouseup = null;
    }
    console.log('iPressShift')
  }
}
