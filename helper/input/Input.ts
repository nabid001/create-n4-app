import inquirer from "inquirer";

const Input = await inquirer.prompt([
  {
    type: "input",
    name: "projectName",
    message: "Enter project name:",
    default: "my-next-app",
  },
  {
    type: "confirm",
    name: "database",
    message: "Would you like to add Database?",
    default: true,
  },
  {
    type: "list",
    name: "selectDatabase",
    message: "What database ORM would you like to use?",
    choices: ["MongoDB", "Drizzle", "Prisma"],
    when: (answer) => answer.database,
  },
  {
    type: "confirm",
    name: "useAuth",
    message: "Do you want to add Authentication?",
    default: true,
  },
  {
    type: "list",
    name: "authType",
    message: "What authentication provider would you like to use?",
    choices: ["Clerk", "Auth.js"],
    when: (answer) => answer.useAuth,
  },
]);

export default Input;
