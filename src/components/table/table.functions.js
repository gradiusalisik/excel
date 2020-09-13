export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function isShiftPressed(event) {
  return event.shiftKey;
}


export function getPositionCell(event) {
  const [row, col] = event.target.dataset.id.split(':');
  return {
    row: Number(row),
    col: Number(col)
  }
}


export function getPosition(start, end) {
  console.log(start, 'START -> END', end,
      start.row, end.row, start.row > end.row);
  const row = start.row > end.row ?
    {startRow: end.row, endRow: start.row} :
    {startRow: start.row, endRow: end.row};
  const col = start.col > end.col ?
    {startCol: end.col, endCol: start.col} :
    {startCol: start.col, endCol: end.col};


  return {row, col}
}
