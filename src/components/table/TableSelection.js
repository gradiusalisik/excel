// import {getPositionCell, getPosition} from './table.functions';

export class TableSelection {
  static className = 'table__cell_selected';
  constructor() {
    this.group = [];
    this.current = null
  }

  select($el) {
    this.clear();
    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;

    this.group.forEach($el => $el.addClass(TableSelection.className));
  }
}
