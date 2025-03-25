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
import { outro, spinner } from "@clack/prompts";
import { getVersion } from "./utils/getVersion.js";
import { getUserPackageName } from "./utils/getUserPackageManager.js";

const s = spinner();
const program = new Command();

const createN4App = async () => {
  const {
    projectName,
    useAuth,
    authType,
    database,
    databaseType,
    authenticationType,
    selectDatabase,
  } = await Input();
  const packageManager = getUserPackageName();
  const existedFile = await fs.pathExists(projectName);

  if (existedFile) {
    console.error(chalk.red(`❌ Project '${projectName}' already exists!`));
    process.exit(1);
  }
  // consoling the package manager
  console.log(chalk.bold.yellow(packageManager?.depn));

  // Install Next.js
  s.start(chalk.bold("☕ Installing Next.js and dependencies"));
  await CreateNextApp(projectName, packageManager);
  s.stop();

  // Redirect to the project folder
  process.chdir(projectName);

  if (useAuth === true && authType === "Clerk") {
    await ClerkInstaller(packageManager);
  } else if (useAuth && authType === "Auth.js") {
    switch (authenticationType) {
      case "Credentials":
        await CredentialsInstaller(packageManager);
        break;
      case "OAuth":
        await OAuthInstaller(packageManager);
        break;
    }
  }

  if (database) {
    switch (selectDatabase) {
      case "MongoDB":
        await MongoDBInstaller(packageManager);
        break;
      case "Drizzle":
        switch (databaseType) {
          case "Neon(PostgreSQL)":
            await DrizzleInstaller(packageManager);
            break;
        }
        break;
    }
  }

  outro(
    `✅ Setup complete. ${chalk.yellowBright(
      "Don't forget to add Environment Variables"
    )}`
  );
};

program
  .version(getVersion(), "-v, --version", "Display the version number")
  .name("CREATE_N4_APP")
  .action(createN4App);

program.parse(process.argv);
