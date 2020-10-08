import {toInlineStyles} from '@core/utils'
import {parse} from '@core/parse'
import {defaultStyles} from '@/constants';

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getSize(state, index, defaultData = DEFAULT_WIDTH) {
  return (state && state[index] || defaultData) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getSize(state.colState, col);
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    });

    return `
      <div
        class="table__cell"
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${data || ''}"
        contenteditable
        style="${styles}; width: ${width}"
      >${parse(data) || ''}</div>
    `
  }
}

function toColumn({col, index, width}) {
  return `
    <div
      class="table__column"
      data-type="resizable"
      data-col='${index}'
      style="width: ${width}"
    >
      ${col}
      <div class="table__col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, rowNumber = '', state = {}) {
  const resize = rowNumber ? `
    <div
      class="table__row-resize"
      data-resize="row"
    >
    </div>
    ` : ''

  const height = getSize(state, rowNumber, DEFAULT_HEIGHT);

  return `
    <div
      class="table__row"
      data-type="resizable"
      style="height: ${height}"
      data-row="${rowNumber}"
    >
      <div class="table__row-info">
        ${rowNumber}
        ${resize}
      </div>
      <div class="table__row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getSize(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state={}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')


  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join('')
}
