window.onload = () => {
    addKeyboardEventListeners();
    addButtonEventListeners();
}

/* Fix:

- Super long decimals
- Word wrap and break of long strings
- Error handling

*/

let visualDisplay = document.querySelector('.main-display');
let subVisualDisplay = document.querySelector('.sub-display');
let currentOperation = '';
let resetDisplay = false;
let resetSubDisplay = false;

function processInput(key) {
    const numberKeys = [0,1,2,3,4,5,6,7,8,9];
    const operators = ['+','-','/','*'];

    const keyType = () => {
        if (numberKeys.includes(+key)) {
            return 'number';
        } else if (operators.includes(key)) {
            return 'operator';
        } 

        return key;
    }

    switch (keyType()) {
        case 'number':
            processNumberInput(key);
            break;
        case 'operator':
            processOperatorInput(key);
            break;
        case 'backspace':
            processBackspaceInput();
            break;
        case 'enter':
            processEnterInput();
            break;
        case '.':
            processDecimalInput();
            break;
        case 'clear':
            window.location.reload();
    }
}

function processDecimalInput() {
    if (!visualDisplay.textContent.includes('.')) {
        visualDisplay.textContent = visualDisplay.textContent + '.';
        resetDisplay = false;
    }

    if (subVisualDisplay) {
        subVisualDisplay.textContent = '';
        resetSubDisplay = false;
    }
}

function processOperatorInput(operator) {
    const operationTerms = currentOperation.split(' ');

    resetSubDisplay = false;

    if (operationTerms.length !== 2) {
        currentOperation = visualDisplay.textContent + ' ' + operator;
        subVisualDisplay.textContent = currentOperation;
        resetDisplay = true;
        return;
    } else if (resetDisplay) {
        currentOperation = operationTerms[0] + ' ' + operator;
        subVisualDisplay.textContent = currentOperation;
        return;
    }

    const currentOperator = operationTerms[1];
    let result;

    result = processOperationType(currentOperator, operationTerms[0], visualDisplay.textContent);

    visualDisplay.textContent = result;
    currentOperation = '';

    processOperatorInput(operator);
}

function processOperationType(operator, operand1, operand2) {
    switch (operator) {
        case '+':
            return addNumbers(operand1, operand2);
        case '-':
            return subtractNumbers(operand1, operand2);
        case '*':
            return multiplyNumbers(operand1, operand2);
        case '/':
            return divideNumbers(operand1, operand2);
    }
}

function divideNumbers(operand1, operand2) {
    return operand1 / operand2;
}

function multiplyNumbers(operand1, operand2) {
    return operand1 * operand2;
}

function addNumbers(operand1, operand2) {
    return +operand1 + +operand2;
}

function subtractNumbers(operand1, operand2) {
    return operand1 - operand2;
}

function processEnterInput() {
    const operationTerms = currentOperation.split(' ');
    let result;

    if (currentOperation === '') {
        return;
    }

    result = processOperationType(operationTerms[1], operationTerms[0], visualDisplay.textContent);
    subVisualDisplay.textContent = `${operationTerms[0]} ${operationTerms[1]} ${visualDisplay.textContent} =`;
    visualDisplay.textContent = result;
    currentOperation = '';
    resetDisplay = true;
    resetSubDisplay = true;
}

function processNumberInput(number) {
    if (visualDisplay.textContent === '0' || resetDisplay) {
        visualDisplay.textContent = '';
    }

    if (resetSubDisplay) {
        subVisualDisplay.textContent = '';
        resetSubDisplay = false;
    }

    visualDisplay.textContent = visualDisplay.textContent + number;
    resetDisplay = false;
}

function processBackspaceInput() {
    if (+visualDisplay !== 0) {
        visualDisplay.textContent = visualDisplay.textContent.length === 1 
        ? 0
        : visualDisplay.textContent.slice(0,-1);
    }

    if (resetSubDisplay) {
        subVisualDisplay.textContent = '';
        resetSubDisplay = false;
        resetDisplay = false;
    }
}

function addKeyboardEventListeners() {
    document.addEventListener('keydown', (event) => {
        processInput(event.key.toLowerCase());
    });
}

function addButtonEventListeners() {
    const allButtons = document.querySelectorAll('button');

    allButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            processInput(event.target.getAttribute('data-value'));
        });
    });
}