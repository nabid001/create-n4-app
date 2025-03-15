#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs-extra";
import { Command } from "commander";
import Input from "./helper/input/Input.js";
import CreateNextApp from "./helper/installer/CreateNextApp.js";
import ClerkInstaller from "./helper/installer/ClerkInstaller.js";
import MongoDBInstaller from "./helper/installer/MongoDBInstaller.js";
import process from "process";

const program = new Command();

const createN4App = async () => {
  const { projectName, authType, useAuth, database, selectDatabase } = Input;

  const existedFile = await fs.pathExists(projectName);
  if (existedFile) {
    console.error(chalk.red(`❌ Project '${projectName}' already exists!`));
    process.exit(1);
  }

  // Create Next.js project
  await CreateNextApp(projectName);

  // Change directory to the project directory
  process.chdir(projectName);

  // Add Authentication
  if (useAuth === true && authType === "Clerk") {
    // Install Clerk
    await ClerkInstaller({ projectName });
  } else if (useAuth && authType === "Auth.js") {
    // Implement Auth.js installation logic here
  }

  if (database) {
    if (selectDatabase === "MongoDB") {
      await MongoDBInstaller({ projectName });
    }
  }
};

program.version("0.0.30").name("CREATE_N4_APP").action(createN4App);

program.parse(process.argv);
