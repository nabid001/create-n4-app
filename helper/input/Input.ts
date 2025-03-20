import inquirer from "inquirer";

type InputTypes = {
  projectName: string;
  useAuth: boolean;
  authType: "Clerk" | "Auth.js";
  authenticationType: "Credentials" | "OAuth";
  database: boolean;
  selectDatabase: "MongoDB" | "Drizzle";
};

const Input: InputTypes = await inquirer.prompt([
  {
    type: "input",
    name: "projectName",
    message: "Enter project name:",
    default: "my-next-app",
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
  {
    type: "select",
    name: "authenticationType",
    message: "Which authentication method would you like to use?",
    choices: ["Credentials", "OAuth"],
    when: (answer) => answer.useAuth && answer.authType === "Auth.js",
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
    choices: ["MongoDB", "Drizzle"],
    when: (answer) => answer.database,
  },
]);

export default Input;
