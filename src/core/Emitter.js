export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей если они есть.
  // 'focus', 'make-it-work', 'formula-done'
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    })
    return true;
  }

  // on, listen
  // Подписываемся на уведомления.
  // Добавляем нового слушателя.
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn);
    }
  }
}


// Example
// const emitter = new Emitter();

// const unsub = emitter.subscribe('vladislav', data = > console.log(data));
// emitter.emit('123412', 45)

// setTimeout(() => {
//   emitter.emit('vladislav', 'After 2 seconds')
// }, 2000 )
// setTimeout(() => {
//   unsub();
// }, 3000 )

// setTimeout(() => {
//   emitter.emit('vladislav', 'After 2 seconds')
// }, 4000 )
