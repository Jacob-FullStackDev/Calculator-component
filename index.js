"use strict";
// DOM elements
const btns = document.getElementById("calculator-btns");
const outputDisplay = document.getElementById("output-display");
// initial state
let operand = "";
let operator = "";
let expression = "";
let total = 0;
let lastCharOperator = false; // should block adding another operator
btns.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return; // gaurd clause in case a button element isn't pressed
  // append number to screen
  // if last character is operator, don't add another operator
  // if there are 2 or more operands when the = is pressed, return result on screen
  // push expression to an array, push array to historyObj
});
