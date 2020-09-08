const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="table__cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `
    <div class="table__column">${col}</div>
  `
}

function createRow(content, rowNumber = '') {
  return `
    <div class="table__row">
      <div class="table__row-info">${rowNumber}</div>
      <div class="table__row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i< rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('')
}
