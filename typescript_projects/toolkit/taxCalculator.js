import chalk from 'chalk';
import { input } from '@inquirer/prompts';
// GET TAXABLE SALARY AS INPUT
const taxableSalaryInput = await input({
    message: chalk.blueBright("Enter the Taxable Salary (Monthly) Amount:"),
    validate(value) {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0 || "Please enter a valid number";
    }
});
const taxableSalary = parseInt(taxableSalaryInput) * 12;
// Calculate Tax Function
function calculateTax(num) {
    if (num < 600000) {
        return 0;
    }
    else if (num >= 600000 && num < 1200000) {
        return (num - 600000) * 0.05;
    }
    else if (num >= 1200000 && num < 2200000) {
        return 30000 + (num - 800000) * 0.15;
    }
    else if (num >= 2200000 && num < 3200000) {
        return 180000 + (num - 1200000) * 0.25;
    }
    else if (num >= 3200000 && num < 4100000) {
        return 430000 + (num - 2400000) * 0.30;
    }
    else if (num >= 4100000) {
        return 700000 + (num - 4100000) * 0.35;
    }
    // Add any additional conditions if necessary.
    else {
        return 0; // Default case if no other conditions are met
    }
}
// Perform Tax Calculation
const tax = calculateTax(taxableSalary);
// Display the Tax Calculation Result
if (taxableSalary > 600000)
    console.log(chalk.greenBright(`The Tax on Taxable Salary ${taxableSalary}  is: ${tax}`));
else
    console.log(chalk.greenBright(`The Salary ${taxableSalary}  is exempted from tax`));
