document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let firstOperand = null;
    let secondOperand = null;
    let operator = null;
    let shouldResetScreen = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                resetCalculator();
            } else if (value === '=') {
                if (operator && firstOperand !== null) {
                    secondOperand = parseFloat(currentInput);
                    const result = calculate(firstOperand, secondOperand, operator);
                    display.textContent = result;
                    firstOperand = result;
                    secondOperand = null;
                    operator = null;
                    shouldResetScreen = true;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    if (operator) {
                        secondOperand = parseFloat(currentInput);
                        const result = calculate(firstOperand, secondOperand, operator);
                        display.textContent = result;
                        firstOperand = result;
                        secondOperand = null;
                    } else {
                        firstOperand = parseFloat(currentInput);
                    }
                    operator = value;
                    shouldResetScreen = true;
                }
            } else {
                if (shouldResetScreen) {
                    currentInput = '';
                    shouldResetScreen = false;
                }
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return 0;
        }
    }

    function resetCalculator() {
        currentInput = '';
        firstOperand = null;
        secondOperand = null;
        operator = null;
        display.textContent = '0';
        shouldResetScreen = false;
    }
});
