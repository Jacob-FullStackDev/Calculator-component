"use strict";
// DOM elements
const btns = document.getElementById("calculator-btns");
const outputDisplay = document.getElementById("output-display");
// initial state
const operators = ["+", "-", "×", "÷", "^"];
const historyArr = [];
let operand, operatorCount, operator, expression, operandContainsDecimal;
function init() {
  operand = "";
  operatorCount = 0;
  operator = "";
  expression = [];
  operandContainsDecimal = false;
}
init();
function handleOperations(operand1, operator, operand2 = null) {
  if (operator === "+") {
    outputDisplay.textContent = operand1 + operand2;
    historyArr.push([
      String(operand1),
      operator,
      String(operand2),
      outputDisplay.textContent,
    ]);
  }
  if (operator === "-") {
    outputDisplay.textContent = operand1 - operand2;
    historyArr.push([operand1, operator, operand2, outputDisplay.textContent]);
  }
  if (operator === "×") {
    outputDisplay.textContent = operand1 * operand2;
    historyArr.push([operand1, operator, operand2, outputDisplay.textContent]);
  }
  if (operator === "÷") {
    if (operand2 === "0") {
      console.error("Can not divide by 0");
      return;
    }
    outputDisplay.textContent = operand1 / operand2;
    historyArr.push([operand1, operator, operand2, outputDisplay.textContent]);
  }
  if (operator === "^" && percentage === false) {
    outputDisplay.textContent = operand1 ** operand2;
    historyArr.push([operand1, operator, operand2, outputDisplay.textContent]);
  }
  if (operator === "÷" && percentage === false) {
    outputDisplay.textContent = operand1 + operand2;
    historyArr.push([operand1, operator, operand2, outputDisplay.textContent]);
  }
  if (operator === "√") {
    outputDisplay.textContent = Math.sqrt(operand);
    historyArr.push([operand1, operator, outputDisplay.textContent]);
  }
}
btns.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return; // gaurd clause in case a button element isn't pressed
  // handle numbers
  if (
    e.target.classList.contains("btn--num") &&
    operandContainsPercentage === false
  ) {
    outputDisplay.textContent === "0"
      ? (outputDisplay.textContent = e.target.textContent)
      : (outputDisplay.textContent += e.target.textContent);
  }
  // handle addition, subtraction, multiplication, division, exponentiation, all operations in operators array
  if (
    outputDisplay.textContent !== "0" &&
    e.target.classList.contains("btn--operator") &&
    operatorCount === 0
  ) {
    operator = e.target.textContent;
    expression.push(Number(outputDisplay.textContent), operator);
    outputDisplay.textContent += operator;
    operatorCount++;
    operandContainsDecimal = false;
    operandContainsPercentage = false;
  }
  if (
    e.target.classList.contains("btn--operator") &&
    operators.includes(
      outputDisplay.textContent[outputDisplay.textContent.length - 1],
    )
  ) {
    operator = e.target.textContent;
    outputDisplay.textContent =
      outputDisplay.textContent.slice(0, outputDisplay.textContent.length - 1) +
      operator;
    expression[1] = operator;
    console.log(expression);
  }
  // handle clear, percentages, decimals
  if (e.target.classList.contains("btn--special")) {
    if (e.target.id === "clear-btn") {
      init();
      outputDisplay.textContent = "0";
    }
    if (e.target.id === "equals-btn") {
      expression.push(
        Number(
          outputDisplay.textContent.slice(
            outputDisplay.textContent.indexOf(operator) + 1,
          ),
        ),
      );
      if (expression.includes("√")) {
        // all operations besides square root
        handleOperations(expression[0], operator, expression[2]);
        init();
      }
    }
    if (e.target.id === "decimal-btn" && operandContainsDecimal === false) {
      outputDisplay.textContent += ".";
      operandContainsDecimal = true;
    }
  }
});
