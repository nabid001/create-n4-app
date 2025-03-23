import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "../../utils/consts.js";
import { spinner } from "@clack/prompts";
import chalk from "chalk";

const MongoDBInstaller = async () => {
  console.log(chalk.bold("☕ Installing MongoDB..."));

  await execa("npm", ["i", "mongoose", "mongodb"], {
    stderr: "inherit",
  });

  await fs.copy(path.join(PKG_ROOT, "mongodb"), "./");

  const existingEnv = await fs.pathExists(path.join("./", ".env.local"));
  if (!existingEnv) {
    await fs.writeFile(path.join("./", ".env.local"), `MONGODB_URL=`);
  } else {
    const existingEnvContent = await fs.readFile(
      path.join("./", ".env.local"),
      "utf8"
    );
    if (!existingEnvContent.includes("MONGODB_URL=")) {
      await fs.appendFile(path.join("./", ".env.local"), "\nMONGODB_URL=");
    }
  }
};

export default MongoDBInstaller;
