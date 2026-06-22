"use strict";
const appendBtns = document.getElementById("append-btns"); // buttons that contain numbers or operators that go after numbers
const outputDisplay = document.getElementById("output-display");
let expression = "";
appendBtns.addEventListener("click", (e) => {
  //   console.log(e.target.textContent);
  if (expression.length === 0 || Number(e.target.textContent) !== 0) {
    if (
      (expression.length < 18 &&
        Number(e.target.textContent !== 0) &&
        !isNaN(Number(e.target.textContent))) ||
      (expression.length > 0 && !isNaN(expression[expression.length - 1]))
    ) {
      expression = expression += e.target.textContent;
      console.log(Number(e.target.textContent));
      if (outputDisplay.textContent === "0") {
        /* clears initial output display value of 0 
        so adding the expression contents doesn't rerender it */
        outputDisplay.textContent = "";
      }
      outputDisplay.textContent = expression;
    }
  }
});
