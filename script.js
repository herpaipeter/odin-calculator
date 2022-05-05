const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (func, a, b) => {
    return func(a, b);
};

let firstOp = "0";
let firstActive = true;
let secondOp = "0";
let operator = "";
const display = document.querySelector("#display");
display.textContent = "0";
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
numberButtons.forEach(b => b.addEventListener("click", () => {
    const intVal = parseInt(b.getAttribute("id"));
    if (firstActive) {
        firstOp = (firstOp !== "0" ? firstOp : "") + intVal;
        display.textContent = firstOp;
    } else {
        secondOp = (secondOp !== "0" ? secondOp : "") + intVal;
        display.textContent = secondOp;
    }
}));

operatorButtons.forEach(b => b.addEventListener("click", () => {
    if (!firstActive) {
        firstOp = operate(getOperatorByText(operator), parseInt(firstOp), parseInt(secondOp));
        secondOp = "0";
        display.textContent = firstOp;
    } else {
        display.textContent = secondOp;
        firstActive = false;
    }
    operator = b.getAttribute("id");
    if (operator === "equals") {
        reset();
    }
}));

const getOperatorByText = (opText) => {
    switch (opText) {
        case "add":
            return add;
        case "subtract":
            return subtract;
        case "multiply":
            return multiply;
        case "divide":
            return divide;
    }
}

const clearButton = document.querySelector("#clear");

const reset = () => {
    firstOp = "0";
    firstActive = true;
    secondOp = "0";
    operator = "";
}

const resetDisplay = () => {
    reset();
    display.textContent = firstOp;
}

clearButton.addEventListener("click", () => resetDisplay());
