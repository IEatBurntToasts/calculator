window.onload = () => {
    addKeyboardEventListeners();
}

let visualDisplay = document.querySelector('.main-display');

function processInput(key) {
    const numberKeys = [0,1,2,3,4,5,6,7,8,9];
    const operators = ['+','-','/','*'];
    const deleteKey = 'backspace';
    const enterKey = 'enter';

    const keyType = () => {
        if (+key in numberKeys) {
            return 'number';
        } else if (key in operators) {
            return 'operator'
        } 

        return key
    }

    switch(keyType()) {
        case 'number':
            processNumberInput(key);
            break;
        case 'backspace':
            processBackspaceInput();
            break;
    }
}

function processNumberInput(number) {
    if (+visualDisplay.textContent === 0) {
        visualDisplay.textContent = '';
    }

    visualDisplay.textContent = visualDisplay.textContent + number;
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