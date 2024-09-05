import chalk from "chalk";
import { input, select } from "@inquirer/prompts";

// Function to perform the arithmetic operations
function calculate(num1: number, num2: number, operator: string): number {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 !== 0) {
        return num1 / num2;
      } else {
        console.log(chalk.redBright("Error: Division by zero is not allowed."));
        process.exit();
      }
  }
  return 0;
}

// Main function to run the calculator
async function runCalculator() {
  console.log(chalk.cyanBright("Welcome to the Calculator!"));

  // Get the first number
  const firstNumber = await input({
    message: chalk.blueBright("Enter the first number:"),
    validate(value) {
      const num = parseFloat(value);
      return !isNaN(num) || "Please enter a valid number";
    }
  });

  // Get the operator
  const operator = await select({
    message: chalk.blueBright("Choose an operation:"),
    choices: [
      { name: "Addition (+)", value: "+" },
      { name: "Subtraction (-)", value: "-" },
      { name: "Multiplication (*)", value: "*" },
      { name: "Division (/)", value: "/" },
    ],
  });

  // Get the second number
  const secondNumber = await input({
    message: chalk.blueBright("Enter the second number:"),
    validate(value) {
      const num = parseFloat(value);
      return !isNaN(num) || "Please enter a valid number";
    }
  });

  // Perform the calculation
  const result = calculate(parseFloat(firstNumber), parseFloat(secondNumber), operator);

  // Display the result
  console.log(chalk.greenBright(`The result of ${firstNumber} ${operator} ${secondNumber} is: ${result}`));
}

// Run the calculator
runCalculator();
