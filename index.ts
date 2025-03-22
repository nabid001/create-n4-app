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
import path from "path";
import { PKG_ROOT, PKG_ROOTS } from "./utils/consts.js";
import { type PackageJson } from "type-fest";
import { getVersion } from "./utils/getVersion.js";

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

  const existedFile = await fs.pathExists(projectName);
  if (existedFile) {
    console.error(chalk.red(`❌ Project '${projectName}' already exists!`));
    process.exit(1);
  }

  s.start(chalk.bold("☕ Installing Next.js and dependencies"));
  await CreateNextApp(projectName);
  s.stop();

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
        switch (databaseType) {
          case "Neon(PostgreSQL)":
            await DrizzleInstaller();
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
