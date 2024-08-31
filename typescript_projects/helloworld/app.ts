import inquirer from "inquirer";

let answers = await inquirer.prompt([
    {
      name: "age",
      type: "input", // Use 'input' for taking string or number inputs from the user
      message: "Enter your Age:"
    }
  ]);
  
  console.log(answers);