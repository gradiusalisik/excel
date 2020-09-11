import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom'

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

  // handleMouseMove(target) {
  //   const self = this;
  //   return function(event) {
  //     console.log(self.param, self.place, 'showME', event)
  //     const mouse = event[self.param[self.place].mouse];

  //     target.setAttribute('style',
  //         `position: fixed;
  //     ${self.param[self.place].position}: ${mouse}px;
  //     z-index: 10000;`
  //     );
  //   }
  // }

  // handleClick({height, top}) {
  //   const self = this;
  //   return function(e) {
  //     const target = e.target;
  //     console.log('work click ')
  //     const mouseY = e.pageY;
  //     const resultHeight = (mouseY - top) + height;
  //     const parent = target.parentElement.parentElement;

  //     parent.style.height = `${resultHeight}px`;
  //     target.setAttribute('style', '');

  //     $(document).off('mousemove', self.moveEvent);
  //   }
  // }

  // onMousedown(event) {
  //   if (event.target.dataset.resize) {
  //     this.place = event.target.dataset.resize;
  //     const target = event.target;
  //     const element = target.getBoundingClientRect();
  //     this.size = target.parentElement.
  //         parentElement[this.param[this.place].size];
  //     this.position = element[this.param[this.place].position];

  //     this.moveEvent = this.handleMouseMove.apply(this, [event.target]);
  //     $(document).on('mousemove', this.moveEvent)
  //   }
  // }

  // onMouseup(e) {
  //   const target = e.target;
  //   const mouse = e[this.param[this.place].mouse];
  //   const resultSize = (mouse + this.size) + this.position;
  //   const parent = target.parentElement.parentElement;

  //   parent.style[this.param[this.place].style] = `${resultSize}px`;
  //   target.setAttribute('style', '');

  //   $(document).off('mousemove', this.moveEvent);
  // }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      // const $parent = $resizer.$el.parentNode; bad practice
      // const $parent = $resizer.$el.closest('.table__column') better, but bad

      const nameResize = event.target.dataset.resize;
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords();
      const index = $parent.data.col;
      const cells = this.$root.findAll(`[data-col="${index}"]`);

      document.onmousemove = e => {
        if (nameResize === 'row') {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $parent.$el.style.borderBottom = '1px solid #3c74ff';

          $parent.$el.style.height = `${value}px`;
        }

        if (nameResize === 'col') {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;
          cells.forEach((elem) => {
            elem.style.borderRight = '1px solid #3c74ff';
            elem.style.width = `${value}px`;
          })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null;
        cells.forEach((elem) => {
          elem.style.borderRight = ''
        })
        $resizer.$el.style = '';
        $parent.$el.style.borderBottom = '';
      }
    }
  }
}
