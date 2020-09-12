import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const type = $resizer.data.resize;
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords();

  const index = $parent.data.col;
  const cells = $root.findAll(`[data-col="${index}"]`);
  let value;
  const position = type === 'col' ? 'bottom' : 'right';

  $resizer.css({
    opacity: 1,
    [position]: '-5000px'
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({
        right: `${-delta}px`,
      })
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({
        bottom: `${-delta}px`
      })
    }
  }

  document.onmouseup = () => {
    if (type === 'col') {
      cells.forEach((elem) => {
        $(elem).css({
          width: `${value}px`
        })
      })
    } else {
      $parent.css({
        height: `${value}px`
      })
    }
    $resizer.css({opacity: '', bottom: '', right: ''});
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
