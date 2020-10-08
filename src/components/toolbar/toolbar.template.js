function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <button
      type='button'
      class="toolbar__button
        ${button.active ? 'active' : ''}"
        ${meta}
      >
      <i
        class="material-icons"
        ${meta}
        >${button.icon}</i>
    </button>
  `
}

const getValue = (name, valueDefault, value) => {
  return name === value ? valueDefault : value;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: getValue(state['fontWeight'], 'normal', 'bold')}
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: getValue(state['fontStyle'], 'normal', 'italic')}
    },
    {
      icon: 'format_underline',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration:
        getValue(state['textDecoration'], 'none', 'underline')}
    },
  ]
  return buttons.map(toButton).join('')
}
