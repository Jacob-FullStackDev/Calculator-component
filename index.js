"use strict";
const appendBtns = document.getElementById("append-btns"); // buttons that contain numbers or operators that go after numbers
console.log(appendBtns);
const outputDisplay = document.getElementById("output-display");
console.log(outputDisplay);
appendBtns.addEventListener("click", (e) => {
  console.log(e.currentTarget);
});
