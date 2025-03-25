import fs from "fs-extra";
import path from "path";
import { TEMPLATE_PKG } from "../../utils/consts.js";
import chalk from "chalk";
import { PackageManger } from "../../utils/getUserPackageManager.js";
import { packageInstaller } from "../../utils/packageInstaller.js";

const MongoDBInstaller = async (packageManger: PackageManger) => {
  console.log(chalk.bold("☕ Installing MongoDB..."));

  await packageInstaller({
    packageManger: packageManger.depn,
    installCmd: packageManger.depn === "npm" ? "i" : "add",
    packages: ["mongoose", "mongodb"],
  });

  await fs.copy(path.join(TEMPLATE_PKG, "mongodb"), "./");

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
