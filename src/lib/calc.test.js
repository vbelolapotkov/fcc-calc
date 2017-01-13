import {describe, beforeEach, it} from 'mocha';
import {expect} from 'chai';
import Calculator from './calc';

describe('Calculator', function () {
  let calc;
  beforeEach(function () {
    calc = new Calculator();
  });

  describe('getState()', function () {
    it('should return input as 0 by default', function () {
      const { input } = calc.getState();
      expect(input).to.equal('0');
    });

    it('should return empty expression by default', function () {
      const { expression } = calc.getState();
      expect(expression).to.equal('0');
    });
  });

  describe('pressKey(key)', function () {
    it('should return input and expression', function () {
      const {input, expression} = calc.pressKey('1');
      expect(input).not.to.be.undefined;
      expect(typeof input).to.equal('string');
      expect(expression).not.to.be.undefined;
      expect(typeof expression).to.equal('string');
    });

    describe('when digit key is pressed', function () {
      it('should set input to the digit if in default state', function () {
        const {input, expression} = calc.pressKey('1');
        expect(input).to.equal('1');
        expect(expression).to.equal('1');
      });

      it('should compose number from multiple keys', function () {
        const {input, expression} = pressSequence(calc, ['1', '2', '3']);
        expect(input).to.equal('123');
        expect(expression).to.equal('123');
      });

      it('should support decimal numbers', function () {
        let result = pressSequence(calc, ['1', '2', ',']);
        expect(result.input).to.equal('12,');
        expect(result.expression).to.equal('12');

        result = calc.pressKey('5');
        expect(result.input).to.equal('12,5');
        expect(result.expression).to.equal('12,5');
      });
    });

    describe('when unary operation key is pressed', function () {
      beforeEach(function () {
        pressSequence(calc, ['1', '2', '3']);
      });

      it('should change sign when +/- is pressed', function () {
        let result = calc.pressKey('+/-');
        expect(result.input).to.equal('-123');
        expect(result.expression).to.equal('-123');

        result = calc.pressKey('+/-');
        expect(result.input).to.equal('123');
        expect(result.expression).to.equal('123');
      });

      it('should convert % to decimal when % is pressed', function () {
        let result = calc.pressKey('%');
        expect(result.input).to.equal('1.23');
        expect(result.expression).to.equal('1.23');
      });

    });

    describe('when binary operation pressed', function () {
      let result;
      beforeEach(function () {
        result = pressSequence(calc, ['1', '2', '+']);
      });

      it('should leave input', function () {
        expect(result.input).to.equal('12');
      });

      it('should show operation in expression', function () {
        expect(result.expression).to.equal('12 + 12');
      });

      it('should start new input if number pressed', function () {
        const result = calc.pressKey('1');
        expect(result.input).to.equal('1');
        expect(result.expression).to.equal('12 + 1');
      });
    });

    describe('binary operations', function () {
      describe('+', function () {
        it('should show result in the input and correct expression', function () {
          let {input, expression} = pressSequence(calc, ['1','2', '+', '4', '5', '=']);
          expect(input).to.equal('57');
          expect(expression).to.equal('12 + 45 =');
        });

        it('should show intermediate result with multiple operations in a row', function () {
          const result = pressSequence(calc, ['1','+','2','+']);
          expect(result.input).to.equal('3');
          expect(result.expression).to.equal('3 + 3');
        });

        it('should accumulate result', function () {
          const result = pressSequence(calc, ['1','+','2','+','3','=']);
          expect(result.input).to.equal('6');
          expect(result.expression).to.equal('3 + 3 =');
        });
      });

      describe('-', function () {
        it('should show result in the input and correct expression', function () {
          let {input, expression} = pressSequence(calc, ['2','1', '-', '1', '3', '=']);
          expect(input).to.equal('8');
          expect(expression).to.equal('21 - 13 =');
        });
      });

      describe('x', function () {
        it('should show result in the input and correct expression', function () {
          let {input, expression} = pressSequence(calc, ['2','1', 'x', '1', '0', '=']);
          expect(input).to.equal('210');
          expect(expression).to.equal('21 x 10 =');
        });
      });

      describe('/', function () {
        it('should show result in the input and correct expression', function () {
          let {input, expression} = pressSequence(calc, ['2','1', '/', '3', '=']);
          expect(input).to.equal('7');
          expect(expression).to.equal('21 / 3 =');
        });
      });
    });

    describe('= key', function () {
      it('should use intermediate result as first operand if = pressed multiple times', function () {
        const result = pressSequence(calc, ['1','+','2','+','=','=','=']);
        expect(result.input).to.equal('12');
        expect(result.expression).to.equal('9 + 3 =');
      });
    });

    describe('ac key', function () {
      it('should set calculator to default state', function () {
        let {input, expression} = pressSequence(calc, ['2','1', '*', '1', '0', '=', 'ac']);
        expect(input).to.equal('0');
        expect(expression).to.equal('0');
      });
    });

  });
});

function pressSequence(calc, keys) {
  let lastState = {};
  keys.forEach(key => {
    lastState = calc.pressKey(key);
  });
  return lastState;
}
