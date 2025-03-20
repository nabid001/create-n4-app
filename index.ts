#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs-extra";
import { Command } from "commander";
import Input from "./helper/input/Input.js";
import CreateNextApp from "./helper/installer/CreateNextApp.js";
import ClerkInstaller from "./helper/installer/ClerkInstaller.js";
import MongoDBInstaller from "./helper/installer/MongoDBInstaller.js";
import process from "process";
import CredentialsInstaller from "./helper/installer/CredentialsInstaller.js";
import OAuthInstaller from "./helper/installer/OAuthInstaller.js";
import DrizzleInstaller from "./helper/installer/DrizzleInstaller.js";

const program = new Command();

const createN4App = async () => {
  const {
    projectName,
    authType,
    useAuth,
    authenticationType,
    database,
    selectDatabase,
  } = Input;

  const existedFile = await fs.pathExists(projectName);
  if (existedFile) {
    console.error(chalk.red(`❌ Project '${projectName}' already exists!`));
    process.exit(1);
  }

  await CreateNextApp(projectName);

  process.chdir(projectName);

  if (useAuth === true && authType === "Clerk") {
    await ClerkInstaller();
  } else if (useAuth && authType === "Auth.js") {
    switch (authenticationType) {
      case "Credentials":
        await CredentialsInstaller();
        break;
      case "OAuth":
        await OAuthInstaller();
        break;
    }
  }

  if (database) {
    switch (selectDatabase) {
      case "MongoDB":
        await MongoDBInstaller();
        break;
      case "Drizzle":
        await DrizzleInstaller();
        break;
    }
  }

  console.log(chalk.green(`✅ Setup Completed!`));
};

program.version("1.4.33").name("CREATE_N4_APP").action(createN4App);

program.parse(process.argv);
