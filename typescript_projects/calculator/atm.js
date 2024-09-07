import chalk from "chalk";
import { select, input, confirm } from "@inquirer/prompts";
// Initial balance
let balance = 1000; // You can initialize this with any value or fetch from a database in a real-world scenario
// Function to handle checking balance
function checkBalance() {
    console.log(chalk.greenBright(`Your current balance is: ${chalk.yellowBright(balance.toFixed(2))} USD\n`));
}
async function withdraw() {
    const withdrawalInput = await input({
        message: chalk.blueBright("Enter the amount to withdraw:"),
        validate(value) {
            const num = parseFloat(value);
            if (isNaN(num) || num <= 0)
                return "Please enter a valid positive amount.";
            if (num > balance) {
                console.log("Insufficient funds.");
                runATM();
            }
            return true;
        }
    });
    const amountToWithdraw = parseFloat(withdrawalInput);
    // Deduct the amount
    balance -= amountToWithdraw;
    console.log(chalk.greenBright(`You have successfully withdrawn ${chalk.yellowBright(amountToWithdraw)} USD.`));
    checkBalance();
}
// Function to handle deposit
async function deposit() {
    const depositInput = await input({
        message: chalk.blueBright("Enter the amount to deposit:"),
        validate(value) {
            const num = parseFloat(value);
            return num > 0 || "Please enter a valid positive amount.";
        }
    });
    const amountToDeposit = parseFloat(depositInput);
    // Add the amount
    balance += amountToDeposit;
    console.log(chalk.greenBright(`You have successfully deposited ${chalk.yellowBright(amountToDeposit)} USD.`));
    checkBalance();
}
// Main function to run the ATM
async function runATM() {
    console.log(chalk.cyanBright("Welcome to the ATM!"));
    let keepRunning = true;
    while (keepRunning) {
        // Select transaction type
        const action = await select({
            message: chalk.blueBright("What would you like to do?"),
            choices: [
                { name: "Check Balance", value: "balance" },
                { name: "Withdraw Money", value: "withdraw" },
                { name: "Deposit Money", value: "deposit" },
                { name: "Exit", value: "exit" },
            ]
        });
        // Handle actions
        switch (action) {
            case "balance":
                checkBalance();
                break;
            case "withdraw":
                await withdraw();
                break;
            case "deposit":
                await deposit();
                break;
            case "exit":
                keepRunning = false;
                console.log(chalk.cyanBright("Thank you for using the ATM! Goodbye!"));
                break;
            default:
                console.log(chalk.redBright("Invalid action. Please try again."));
        }
        // Ask if the user wants to perform another transaction if they didn't choose to exit
        if (keepRunning) {
            const continueTransaction = await confirm({
                message: chalk.blueBright("Do you want to perform another transaction?"),
                default: true,
            });
            if (!continueTransaction) {
                keepRunning = false;
                console.log(chalk.cyanBright("Thank you for using the ATM! Goodbye!"));
            }
        }
    }
}
// Run the ATM program
runATM();
