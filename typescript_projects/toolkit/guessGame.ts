import chalk from "chalk";
import { input, select, confirm } from "@inquirer/prompts";

// Function to generate a random number within a specified range
function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Main function to run the guessing game
async function runGame() {
    console.log(chalk.cyanBright("Welcome to the Number Guessing Game!"));
    console.log(chalk.yellow("I'm thinking of a number between 1 and 100..."));

// Generate a random number between 1 and 100
const targetNumber = getRandomNumber(1, 100);
let guessedCorrectly = false;


// Loop until the user guesses the correct number
while (!guessedCorrectly) {
    // Get the user's guess
    const guess = await input({
      message: chalk.blueBright("Enter your guess:"),
      validate(value) {
        const num = parseInt(value, 10);
        if (isNaN(num)) return "Please enter a valid number.";
        if (num < 1 || num > 100) return "Number must be between 1 and 100.";
        return true;
      },
    });

    // Convert the guess to a number
    const userGuess = parseInt(guess, 10);

    // Check if the guess is correct
    if (userGuess === targetNumber) {
      console.log(chalk.greenBright("?? Congratulations! You guessed the correct number!"));
      guessedCorrectly = true;
    } else if (userGuess < targetNumber) {
      console.log(chalk.red("Too low! Try again."));
    } else {
      console.log(chalk.red("Too high! Try again."));
    }
  }

  console.log(chalk.cyanBright("Thanks for playing!"));

} // END MAIN FUNCTION

// Run the game
0
