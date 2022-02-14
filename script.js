class Calculator {
    constructor(display1, display2) {
      this.display1 = display1;
      this.display2 = display2;
      this.clear();
    }
     
    clear() {
      this.currNum = "";
      this.preNum = "";
      this.operation = undefined;
    }
     
    delete() {
      this.currNum = this.currNum.toString().slice(0, -1);
    }
     
    appendNumber(number) {
      if (number === "." && this.currNum.includes(".")) return;
      this.currNum = this.currNum.toString() + number.toString();
    }
     
    chooseOperation(operation) {
      if (this.currNum === "") return;
      if (this.preNum !== "") {
        this.compute();
      }
      this.operation = operation;
      this.preNum = this.currNum;
      this.currNum = "";
    }
  
    compute() {
      let result;
      const prev = parseFloat(this.preNum);
      const current = parseFloat(this.currNum);
      if (isNaN(prev) || isNaN(current)) return;
  
      switch (this.operation) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "x":
          result = prev * current;
          break;
        case "÷":
          result = prev / current;
          break;
  
        default:
          break;
      }
      this.currNum = result;
      this.operation = undefined;
      this.preNum = "";
    }
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const numArr = stringNumber.split(".");
      const integerDigits = parseFloat(numArr[0]);
      const decimalDigits = numArr[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0,
        });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
     
    updateDisplay() {
      this.display2.innerText = this.getDisplayNumber(
        this.currNum
      );
      if (this.operation != null) {
        this.display1.innerText = `${this.getDisplayNumber(
          this.preNum
        )} ${this.operation}`;
      } else {
        this.display1.innerText = this.getDisplayNumber(
          this.preNum
        );
      }
    }
  }
  
  const numButtons = document.querySelectorAll("[data-number]");
  const operationBtns = document.querySelectorAll("[data-operation]");
  const equalButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const allClearBtn = document.querySelector("[data-all-clear]");
  const display1 = document.querySelector(
    "[data-prev-operand]"
  );
  const display2 = document.querySelector(
    "[data-curr-operand]"
  );
  
  document.addEventListener("DOMContentLoaded", () => {
    const calc = new Calculator(
      display1,
      display2
    );
  
    numButtons.forEach((button) => {
      button.addEventListener("click", () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
      });
    });
    operationBtns.forEach((button) => {
      button.addEventListener("click", () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
      });
    });
    equalButton.addEventListener("click", () => {
      calc.compute();
      calc.updateDisplay();
    });
    deleteButton.addEventListener("click", () => {
      calc.delete();
      calc.updateDisplay();
    });
    allClearBtn.addEventListener("click", () => {
      calc.clear();
      calc.updateDisplay();
    });
  });