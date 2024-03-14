let displayValue = '0';
let operator = '';
let operand = '';

// update display
const updateDisplay = () => {
  document.getElementById('display').innerText = displayValue;
};

// handle number like 1,2,3
const handleNumber = (num) => {
  if (operator === '=') {
    displayValue = '';
    operator = '';
  }
  displayValue += num;
  updateDisplay();
};
//handle operator functioin
const handleOperator = (op) => {
  operator = op;
  operand = displayValue;
  displayValue = '0';
  updateDisplay();
};

// handle decimal "."
const handleDecimal = () => {
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
  updateDisplay();
};

//clean up the calculator
const handleClear = () => {
  displayValue = '0';
  operator = '';
  operand = '';
  updateDisplay();
};

// use switch case to handle the operator
const handleCalculate = () => {
  let result;
  switch (operator) {
    case '+':
      result = parseFloat(operand) + parseFloat(displayValue);
      break;
    case '-':
      result = parseFloat(operand) - parseFloat(displayValue);
      break;
    case '*':
      result = parseFloat(operand) * parseFloat(displayValue);
      break;
    case '/':
      result = parseFloat(operand) / parseFloat(displayValue);
      break;
    default:
      result = displayValue;
  }
  displayValue = result.toString();
  operator = '=';
  updateDisplay();
};
