"use strict";
// DOM elements
const btns = document.getElementById("calculator-btns");
const outputDisplay = document.getElementById("output-display");
const historySection = document.getElementById("history-section");
const historyBtn = document.getElementById("history-btn");
// initial state
const operators = ["+", "-", "×", "÷", "^"];
const historyArr = [];
let operatorCount,
  operator,
  operand,
  expression,
  operandContainsDecimal,
  squareRoot,
  lastCharDecimal,
  historyShowing;
function init(clearOutputDisplay) {
  operatorCount = 0;
  operator = "";
  expression = [];
  operandContainsDecimal = false;
  squareRoot = false; // flag if the square root operator is being used
  lastCharDecimal = false; // flag if an operand ends in a decimal without any numbers after it
  historyShowing = false; // flag if history section is being displayed
  if (clearOutputDisplay === true) {
    outputDisplay.textContent = "0";
  }
}
init(true);
function handleOutputEdgeCases(res) {
  if (isNaN(res)) {
    console.error(
      "NaN was returned, could not complete operation, clearing output",
    );
    setTimeout(init, 2000, true);
    return;
  }
  if (res >= 999899990001) {
    console.warn("Result was too long, rounding result to 12 places");
    res = Number(String(res).slice(0, 12));
  }
  if (res >= Number.MAX_SAFE_INTEGER) {
    console.warn(
      "Result was too high, the result is the largest number JavaScript can safely support",
    );
    res = Number.MAX_SAFE_INTEGER;
  }
  outputDisplay.textContent = res;
  operand = res; // will this be a number datatype if textContent = operand = res
}

function handleOperations(operand1, operator, operand2) {
  let result;
  if (operator === "+") {
    result = operand1 + operand2;
    handleOutputEdgeCases(result);
    historyArr.push([operand1, operator, operand2, "=", result]);
  }
  if (operator === "-") {
    result = operand1 - operand2;
    handleOutputEdgeCases(result);
    historyArr.push([operand1, operator, operand2, "=", result]);
  }
  if (operator === "×") {
    result = operand1 * operand2;
    handleOutputEdgeCases(result);
    historyArr.push([operand1, operator, operand2, "=", result]);
  }
  if (operator === "÷") {
    if (operand2 === 0) {
      console.error("Can not divide by 0, clearing output");
      setTimeout(init, 2000, true);
      return;
    }
    result = operand1 / operand2;
    handleOutputEdgeCases(result);
    historyArr.push([operand1, operator, operand2, "=", result]);
  }
  if (operator === "^") {
    result = operand1 ** operand2;
    handleOutputEdgeCases(result);
    historyArr.push([operand1, operator, operand2, "=", result]);
  }
  if (operator === "√") {
    result = Math.sqrt(operand1);
    handleOutputEdgeCases(result);
    outputDisplay.textContent = result;
    historyArr.push([operand1, operator, "=", result]);
  }
  init();
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
    operandContainsDecimal = lastCharDecimal = false;
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
    outputDisplay.textContent =
      outputDisplay.textContent.slice(0, outputDisplay.textContent.length - 1) +
      e.target.textContent;
    operator = e.target.textContent;
    operatorCount++;
    operandContainsDecimal = lastCharDecimal = false;
    expression.push(
      Number(
        outputDisplay.textContent.slice(
          0,
          outputDisplay.textContent.length - 1,
        ),
      ),
      operator,
    );
    console.warn(
      "No number after decimal point, reassigned decimal to operator",
    );
  } else if (
    outputDisplay.textContent === "0" &&
    e.target.classList.contains("btn--operator")
  ) {
    console.warn("Did not add operator since there was no first operand");
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
    if (
      e.target.id === "equals-btn" &&
      !operators.includes(
        outputDisplay.textContent[outputDisplay.textContent.length - 1],
      )
    ) {
      expression.push(
        Number(
          outputDisplay.textContent.slice(
            outputDisplay.textContent.indexOf(operator) + 1,
          ),
        ),
      );
      if (squareRoot === false) {
        // all operations besides square root
        handleOperations(expression[0], operator, expression[2]);
      } else {
        handleOperations(expression[0], operator);
      }
    } else if (
      e.target.id === "equals-btn" &&
      operators.includes(
        outputDisplay.textContent[outputDisplay.textContent.length - 1],
      )
    ) {
      console.warn("No number after operator");
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
    historyShowing = !historyShowing;
    for (let i = 0; i < historyArr.length; i++) {
      let entry = historyArr[i];
      const btn = document.createElement("button");
      let result = historyArr[i];
      for (let j = 0; j < entry.length; j++) {
        btn.textContent += `${entry[j]} `;
      }
      historySection.append(btn);
    }
    return;
  }
  if (historyShowing) {
    historySection.classList.toggle("hidden");
    historyShowing = !historyShowing;
    while (historySection.firstChild) {
      historySection.removeChild(historySection.firstChild);
    }
  }
  if (historyArr.length === 0)
    console.warn(
      "There is no history, please complete an operation before trying to access your history",
    );
});
historySection.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return; // gaurd clause in case a button element isn't pressed
  if (e.target.tagName === "BUTTON") {
    outputDisplay.textContent = e.target.textContent.slice(
      e.target.textContent.indexOf("=") + 1,
    );
  }
});
