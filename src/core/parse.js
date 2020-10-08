export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      const text = eval(value.slice(1));
      return text;
    } catch (error) {
      return value;
    }
  }
  return value;
}
