"use strict";
const appendBtns = document.getElementById("append-btns"); // buttons that contain numbers or operators that go after numbers
const outputDisplay = document.getElementById("output-display");
let expression = "";
appendBtns.addEventListener("click", (e) => {
  //   console.log(e.target.textContent);
  if (expression.length < 18) {
    expression = expression += e.target.textContent;
    console.log(expression.length);
  }
  outputDisplay.textContent = expression;
});
