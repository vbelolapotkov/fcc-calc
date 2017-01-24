const KEY_MAP = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0': '0',
  '.': '.',
  '-': '-',
  '+': '+',
  '*': 'x',
  'x': 'x',
  '/': '/',
  '%': '%',
  '=': '=',
  'Enter': '=',
  'Backspace': '<-',
  'Escape': 'c',
  'Alt + –': '+/-',
  'Alt + Escape': 'ac'
};

export function getKey(event) {
  let key = event.key;
  if (event.altKey) key = 'Alt + ' + key;
  return KEY_MAP[key];
}
