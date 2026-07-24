"use strict";
// DOM elements
const btns = document.getElementById("calculator-btns");
const outputDisplay = document.getElementById("output-display");
const historySection = document.getElementById("history-section");
const historyBtn = document.getElementById("history-btn");
// initial state
const operators = ["+", "-", "×", "÷", "^"];
const historyArr = [];
let operand,
  operatorCount,
  operator,
  expression,
  operandContainsDecimal,
  squareRoot,
  lastCharDecimal;
function init(clearOutputDisplay) {
  operand = "";
  operatorCount = 0;
  operator = "";
  expression = [];
  operandContainsDecimal = false;
  squareRoot = false; // flag if the square root operator is being used
  lastCharDecimal = false; // flag if an operand ends in a decimal without any numbers after it
  if (clearOutputDisplay === true) {
    outputDisplay.textContent = "0";
  }
}
init(true);
function handleOperations(operand1, operator, operand2) {
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
    if (operand2 === 0) {
      console.error("Can not divide by 0, clearing output");
      setTimeout(init, 2000, true);
      return;
    }
    outputDisplay.textContent = operand1 / operand2;
    historyArr.push([operand1, operator, operand2, outputDisplay.textContent]);
  }
  if (operator === "^") {
    outputDisplay.textContent = operand1 ** operand2;
    historyArr.push([operand1, operator, operand2, outputDisplay.textContent]);
  }
  if (operator === "÷") {
    outputDisplay.textContent = operand1 + operand2;
    historyArr.push([operand1, operator, operand2, outputDisplay.textContent]);
  }
  if (operator === "√") {
    outputDisplay.textContent = Math.sqrt(operand1);
    historyArr.push([operand1, operator, outputDisplay.textContent]);
  }
}
btns.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return; // gaurd clause in case a button element isn't pressed
  // handle numbers
  if (
    e.target.classList.contains("btn--num") &&
    operandContainsDecimal === false
  ) {
    outputDisplay.textContent === "0"
      ? (outputDisplay.textContent = e.target.textContent)
      : (outputDisplay.textContent += e.target.textContent);
    lastCharDecimal = false;
  }
  if (
    e.target.classList.contains("btn--num") &&
    operandContainsDecimal === true
  ) {
    outputDisplay.textContent += e.target.textContent;
    lastCharDecimal = false;
  }
  if (
    e.target.classList.contains("btn--num") &&
    e.target.textContent === "0" &&
    outputDisplay.textContent === "0" &&
    operandContainsDecimal === false
  ) {
    console.warn(
      "Can not add more than one 0 without another number, select another number",
    );
  }
  // handle addition, subtraction, multiplication, division, exponentiation, all operations in operators array
  if (
    outputDisplay.textContent !== "0" &&
    e.target.classList.contains("btn--operator") &&
    operatorCount === 0 &&
    operator !== "√" &&
    lastCharDecimal === false
  ) {
    operator = e.target.textContent;
    expression.push(Number(outputDisplay.textContent), operator);
    outputDisplay.textContent += operator;
    operandContainsDecimal = false;
    operatorCount++;
  } else if (
    operatorCount >= 1 &&
    e.target.classList.contains("btn--operator")
  ) {
    console.warn("Can not add more than 1 operator");
  } else if (
    lastCharDecimal === true &&
    e.target.classList.contains("btn--operator")
  ) {
    operandContainsDecimal = lastCharDecimal = false;
    outputDisplay.textContent =
      outputDisplay.textContent.slice(0, outputDisplay.textContent.length - 1) +
      e.target.textContent;
    console.warn(
      "No number after decimal point, reassigned decimal to operator",
    );
    console.log(outputDisplay.textContent);
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
  }
  // handle clear, percentages, decimals
  if (e.target.classList.contains("btn--special")) {
    if (e.target.id === "clear-btn") {
      init(true);
    }
    if (e.target.id === "equals-btn") {
      expression.push(
        Number(
          outputDisplay.textContent.slice(
            outputDisplay.textContent.indexOf(operator) + 1, // check if cutting an extra char
          ),
        ),
      );
      if (squareRoot === false) {
        // all operations besides square root
        handleOperations(expression[0], operator, expression[2]);
        init();
      } else {
        handleOperations(expression[0], operator);
        init();
      }
    }
    if (e.target.id === "decimal-btn" && operandContainsDecimal === false) {
      outputDisplay.textContent += ".";
      operandContainsDecimal = lastCharDecimal = true;
    } else if (
      e.target.id === "decimal-btn" &&
      operandContainsDecimal === true
    ) {
      console.warn("There can only be 1 active decimal per operand");
    }
    if (e.target.id === "squareroot-btn" && outputDisplay.textContent === "0") {
      outputDisplay.textContent = "√";
      operator = "√";
      squareRoot = true;
    } else if (
      e.target.id === "squareroot-btn" &&
      outputDisplay.textContent !== "0"
    ) {
      console.warn("Square root must be used before first operand");
    }
  }
});
historyBtn.addEventListener("click", (e) => {
  if (historyArr.length > 0) {
    historySection.classList.toggle("hidden");
    for (let i = 0; i < historyArr.length; i++) {
      let historyArrEntry = historyArr[i];
      let historyArrEntryBtn = document.createElement("button");
      historySection.append(historyArrEntryBtn);
      for (let j = 0; j < historyArrEntry.length - 1; j++) {
        historyArrEntryBtn.textContent += ` ${historyArrEntry[j]}`;
        historyArrEntryBtn.addEventListener("click", (e) => {
          outputDisplay.textContent =
            historyArrEntry[historyArrEntry.length - 1];
        });
      }
    }
  } else {
    console.warn(
      "There is no history, please complete an operation before trying to access your history",
    );
  }
});
