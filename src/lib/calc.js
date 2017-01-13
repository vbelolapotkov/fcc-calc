export default class Calculator {
  constructor() {
    this.NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '.'];
    this.UNARY_KEYS = ['+/-', '%'];
    this.BINARY_KEYS = ['+', '-', 'x', '/'];
    this.CONTROL_KEYS = ['=', '<-', 'c', 'ac'];
    // this.KNOWN_KEYS = this.NUMBER_KEYS.concat(this.UNARY_KEYS, this.BINARY_KEYS, this.OTHER_KEYS);
    this._reset();
  }

  getState() {
    this._composeExpression();
    return {
      input: this._input,
      expression: this._expression
    }
  }

  set currentOperand(val) {
    this._operands[this._currentOperand] = val;
  }

  set input(val) {
    this._input = val.toString();
  }

  _composeExpression() {
    let expression = '';
    if (this._operands.a) expression += this._operands.a;
    if (this._operation !== '') expression += ' ' + this._operation;
    if (this._operands.b) expression += ' ' + this._operands.b;
    if (this._showResult) expression += ' =';
    this._expression = expression.trim();
    // set to default zero when in initial state
    if(this._expression === '') this._expression = '0';
  }

  pressKey(key) {
    if (this._isNumberKey(key)) {
      this._pressNumberKey(key);
    } else if (this._isOperationKey(key)) {
      this._pressOperationKey(key);
    } else {
      this._pressControlKey(key)
    }

    return this.getState();
  }

  _isNumberKey(key) {
    return this.NUMBER_KEYS.indexOf(key) >= 0;
  }

  _isOperationKey(key) {
    return this._isUnaryOperationKey(key) || this._isBinaryOperationKey(key);
  }

  _pressNumberKey(key) {
    if (!this._isNewInput()) {
      this._input += key;
    } else {
      this._startNewInput = false;
      this._input = key;
    }
    this.currentOperand = parseFloat(this._input);
  }

  _isNewInput() { return this._startNewInput; }


  _isUnaryOperationKey(key) {
    return this.UNARY_KEYS.indexOf(key) >= 0;
  }

  _isBinaryOperationKey(key) {
    return this.BINARY_KEYS.indexOf(key) >= 0;
  }

  _pressOperationKey(key) {
    if (this._isUnaryOperationKey(key)) {
      this._pressUnaryOperationKey(key);
    } else {
      this._pressBinaryOperationKey(key);
    }
  }

  _pressUnaryOperationKey(key) {
    let currentValue = parseFloat(this._input);
    let newValue;
    if (key === '+/-') { newValue = -currentValue; }
    if (key === '%') { newValue = currentValue/100; }
    this.currentOperand = newValue;
    this.input = newValue;
  }

  _pressControlKey(key) {
    switch(key) {
      case '=': this._pressEqualKey();
                break;
      case '<-' : this._removeDigit();
                break;
      case 'c': this._resetCurrentOperand();
                break;
      case 'ac': this._reset();
                break;
    }
  }

  _pressEqualKey() {
    // use previous result as operand a if result exists;
    if (this._result) this._operands.a = this._result;
    const result = this._calculate();
    this._result = result; //remember result when pressing = multiple times
    this.input = result;
    this._showResult = true;
    this._currentOperand = 'a';
    this._startNewInput = true;
  }

  _calculate() {
    let result;
    switch (this._operation) {
      case '+': result = this._operands.a + this._operands.b;
      break;

      case '-': result = this._operands.a - this._operands.b;
      break;

      case 'x': result = this._operands.a * this._operands.b;
      break;

      case '/': result = this._operands.a / this._operands.b;
      break;

      default: result = 0;
    }
    return result;
  }

  _removeDigit() {

  }

  _resetCurrentOperand() {
    this.currentOperand = 0;
    this.input = 0;
  }

  _reset() {
    this._input = '0';
    this._result = 0;
    this._operands = {};
    this._currentOperand = 'a';
    this._operation = '';
    this._startNewInput = true;
    this._showResult = false;
  }

  _pressBinaryOperationKey(key) {
    if (this._shouldCalculateOnBinaryKey()) {
      const result = this._calculate();
      this._operands.a = result;
      this._operands.b = undefined;
      this.input = result;
    }

    this._operation = key;
    this._operands.b = this._operands.a;
    this._currentOperand = 'b';
    this._startNewInput = true;
  }

  _shouldCalculateOnBinaryKey() {
    return this._operands.a && this._operands.b;
  }
}
