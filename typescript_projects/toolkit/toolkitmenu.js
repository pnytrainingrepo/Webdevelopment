import { execa } from 'execa';
import chalk from 'chalk';
import { select } from '@inquirer/prompts';
import path from 'path';
// Function to run a JavaScript file using execa
async function runScript(scriptName) {
    const scriptPath = path.join(process.cwd(), scriptName); // Use current working directory
    console.log(chalk.cyanBright(`Attempting to run ${scriptPath}...`)); // Debugging line
    try {
        const { stdout, stderr } = await execa('node', [scriptPath]);
        if (stderr) {
            console.error(chalk.red(`Error: ${stderr}`));
        }
        else {
            console.log(chalk.greenBright(stdout));
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(chalk.red(`Failed to run script: ${error.message}`));
            console.error(chalk.red(`Error Stack: ${error.stack}`));
        }
        else {
            console.error(chalk.red(`An unknown error occurred: ${String(error)}`));
        }
    }
}
// Main function to display the menu and run selected programs
async function runToolkitMenu() {
    console.log(chalk.cyanBright("Welcome to the Toolkit Menu!"));
    let keepRunning = true;
    while (keepRunning) {
        // Display menu options
        const choice = await select({
            message: chalk.blueBright("Select a program to run:"),
            choices: [
                { name: "Calculator", value: "calculator.js" },
                { name: "Number Guessing Game", value: "guessingGame.js" },
                { name: "Currency Converter", value: "currencyConverter.js" },
                { name: "ATM", value: "atm.js" },
                { name: "Exit", value: "exit" },
            ]
        });
        // Handle the user's choice
        if (choice === "exit") {
            keepRunning = false;
            console.log(chalk.cyanBright("Thank you for using the Toolkit Menu! Goodbye!"));
        }
        else {
            console.log(chalk.cyanBright(`Running ${choice}...`));
            await runScript(choice);
        }
    }
}
// Run the toolkit menu
runToolkitMenu();
