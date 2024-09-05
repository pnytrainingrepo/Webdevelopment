import chalk from "chalk";
import { input, select, confirm } from "@inquirer/prompts";
// Main function to run the calculator
async function runCalculator() {
    console.log(chalk.bgMagenta("Welcome to the Calculator!"));
    let keepRunning = true;
    while (keepRunning) {
        // Get the first number
        const firstNumber = await input({
            message: chalk.blueBright("Enter the first number:"),
            validate(value) {
                const num = parseFloat(value);
                return !isNaN(num) || "Please enter a valid number";
            }
        });
        // Get the Second number
        const secondNumber = await input({
            message: chalk.blueBright("Enter the Second number:"),
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
        // Function to perform the arithmetic operations
        function calculate(num1, num2, operator) {
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
                    }
                    else {
                        console.log(chalk.redBright("Error: Division by zero is not allowed."));
                        //process.exit();
                    }
            }
            return 0;
        }
        // Perform the calculation
        const result = calculate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
        // Display the result
        console.log(chalk.greenBright(`The result of ${firstNumber} ${operator} ${secondNumber} is: ${result}`));
        // Ask if the user wants to convert again or exit
        const continueConversion = await confirm({
            message: chalk.blueBright("Do you want to perform another calculation?"),
            default: true,
        });
        if (!continueConversion) {
            keepRunning = false;
            console.log(chalk.cyanBright("Thank you for using the Calculator! Goodbye!"));
        }
    } // END WHILE LOOP
} // CLOSE MAIN ASYNC FUNCTION
// Run the calculator
runCalculator();
