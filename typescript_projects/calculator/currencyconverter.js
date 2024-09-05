import chalk from "chalk";
import { input, select } from "@inquirer/prompts";
// Function to simulate fetching exchange rates (You can expand this to fetch real data from an API)
function getExchangeRate(fromCurrency, toCurrency) {
    const rates = {
        USD: { EUR: 0.85, GBP: 0.76, PKR: 287 },
        EUR: { USD: 1.18, GBP: 0.89, PKR: 336 },
        GBP: { USD: 1.32, EUR: 1.12, PKR: 377 },
        PKR: { USD: 0.0035, EUR: 0.0030, GBP: 0.0026 }
    };
    return rates[fromCurrency][toCurrency] || 1;
}
// Get the amount to convert
const amountInput = await input({
    message: chalk.blueBright("Enter the amount to convert:"),
    validate(value) {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0 || "Please enter a valid amount";
    }
});
const amount = parseFloat(amountInput);
// Get the source currency
const fromCurrency = await select({
    message: chalk.blueBright("Select the currency you want to convert from:"),
    choices: [
        { name: "US Dollar (USD)", value: "USD" },
        { name: "Euro (EUR)", value: "EUR" },
        { name: "British Pound (GBP)", value: "GBP" },
        { name: "Pakistani Rupee (PKR)", value: "PKR" }
    ]
});
// Get the target currency
const toCurrency = await select({
    message: chalk.blueBright("Select the currency you want to convert to:"),
    choices: [
        { name: "US Dollar (USD)", value: "USD" },
        { name: "Euro (EUR)", value: "EUR" },
        { name: "British Pound (GBP)", value: "GBP" },
        { name: "Pakistani Rupee (PKR)", value: "PKR" }
    ]
});
// Fetch the exchange rate
const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
// Perform the conversion
const convertedAmount = amount * exchangeRate;
// Display the result with animations and colorful output
console.log(chalk.greenBright(`\nConverting ${chalk.yellow(amount)} ${fromCurrency} to ${toCurrency}...`));
console.log(chalk.magentaBright(`Exchange Rate: 1 ${fromCurrency} = ${chalk.yellow(exchangeRate)} ${toCurrency}`));
console.log(chalk.greenBright(`Converted Amount: ${chalk.yellow(convertedAmount.toFixed(2))} ${toCurrency}\n`));
