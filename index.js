"use strict";
// DOM elements
const btns = document.getElementById("calculator-btns");
const outputDisplay = document.getElementById("output-display");
// initial state
let operand = "";
let operator = "";
let expression = "";
let total = 0;
const operators = ["+", "-", "×", "÷", "^"];

function handleOperations(
  operand1,
  operator,
  operand2 = null,
  percentage = false,
) {
  if (operator === "+" && percentage === false) {
    outputDisplay.textContent = operand1 + operand2;
    // historyArr.push([operand1, operator, operand2])
  }
  if (operator === "-" && percentage === false) {
    outputDisplay.textContent = operand1 - operand2;
    // historyArr.push([operand1, operator, operand2])
  }
  if (operator === "×" && percentage === false) {
    outputDisplay.textContent = operand1 * operand2;
    // historyArr.push([operand1, operator, operand2])
  }
  if (operator === "÷" && percentage === false) {
    if ((operand1 === operand2) === "0") {
      outputDisplay.textContent = "Can not divide by 0";
      return;
    }
    outputDisplay.textContent = operand1 / operand2;
    // historyArr.push([operand1, operator, operand2])
  }
  if (operator === "^" && percentage === false) {
    outputDisplay.textContent = operand1 ** operand2;
    // historyArr.push([operand1, operator, operand2])
  }
  if (operator === "÷" && percentage === false) {
    outputDisplay.textContent = operand1 + operand2;
    // historyArr.push([operand1, operator, operand2])
  }
  if (operator === "√") {
    outputDisplay.textContent = Math.sqrt(operand);
    // historyArr.push([operand1, operator])
  }
}
btns.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return; // gaurd clause in case a button element isn't pressed
  if (e.target.classList.contains("btn--clear")) {
    // temporary gaurd clause to avoid CE appearing on the output display, TODO: implement clear functionality
    return;
  }
  if (e.target.classList.contains("btn--num")) {
    outputDisplay.textContent === "0"
      ? (outputDisplay.textContent = e.target.textContent)
      : (outputDisplay.textContent += e.target.textContent);
  }
  if (
    outputDisplay.textContent !== "0" &&
    e.target.classList.contains("btn--operator")
  ) {
    if (
      !operators.includes(
        outputDisplay.textContent[outputDisplay.textContent.length - 1],
      )
    ) {
      outputDisplay.textContent += e.target.textContent;
    } else {
      console.log(
        outputDisplay.textContent.slice(
          0,
          outputDisplay.textContent.length - 1,
        ) + e.target.textContent,
      );
      outputDisplay.textContent =
        outputDisplay.textContent.slice(
          0,
          outputDisplay.textContent.length - 1,
        ) + e.target.textContent;
    }
  }
  if (e.target.classList.contains("btn--special")) {
    console.log("reached");
    if (e.target.id === "clear-btn") {
      console.log("reached id");
    }
  }
});
// TODO: if operator is truthy, but there is nothing after it, reassign it, else no more operators

// append number to screen
// if last character is operator, don't add another operator
// if there are 2 or more operands when the = is pressed, return result on screen
// push expression to an array, push array to historyObj
