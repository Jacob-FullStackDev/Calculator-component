"use strict";
const appendBtns = document.getElementById("append-btns"); // buttons that contain numbers or operators that go after numbers
const outputDisplay = document.getElementById("output-display");
appendBtns.addEventListener("click", (e) => {
  console.log(e.currentTarget);
});
