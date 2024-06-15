window.onload = () => {
    addKeyboardEventListeners();
}

let visualDisplay = document.querySelector('.main-display');
let subVisualDisplay = document.querySelector('.sub-display');
let currentOperation = '';
let enterSecondTerm = false;

function processInput(key) {
    const numberKeys = [0,1,2,3,4,5,6,7,8,9];
    const operators = ['+','-','/','*'];
    const deleteKey = 'backspace';
    const enterKey = 'enter';

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
    }
}

function processOperatorInput(operator) {
    const operationTerms = currentOperation.split(' ');

    if (operationTerms.length !== 2) {
        currentOperation = visualDisplay.textContent + ' ' + operator;
        subVisualDisplay.textContent = currentOperation;
        enterSecondTerm = true;
        return;
    } else if (enterSecondTerm === true) {
        currentOperation = operationTerms[0] + ' ' + operator;
        subVisualDisplay.textContent = currentOperation;
        return;
    }

    const currentOperator = currentOperation.split(' ');
    let result;

    switch (currentOperator[1]) {
        case '+':
            result = addNumbers(operationTerms[0], visualDisplay.textContent);
            break;
        case '-':
            result = subtractNumbers(operationTerms[0], visualDisplay.textContent);
            break;
        case '*':
            result = multiplyNumbers(operationTerms[0], visualDisplay.textContent);
            break;
        case '/':
            result = divideNumbers(operationTerms[0], visualDisplay.textContent);
            break;
    }

    visualDisplay.textContent = result;
    currentOperation = '';

    processOperatorInput(operator);
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

function processNumberInput(number) {
    if (+visualDisplay.textContent === 0 || enterSecondTerm === true) {
        visualDisplay.textContent = '';
    }

    visualDisplay.textContent = visualDisplay.textContent + number;
    enterSecondTerm = false;
}

function processBackspaceInput() {
    if (+visualDisplay !== 0) {
        visualDisplay.textContent = visualDisplay.textContent.length === 1 
        ? 0
        : visualDisplay.textContent.slice(0,-1);
    }
}

function addKeyboardEventListeners() {
    document.addEventListener('keydown', (event) => {
        processInput(event.key.toLowerCase());
    });
}