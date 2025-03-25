import fs from "fs-extra";
import path from "path";
import { TEMPLATE_PKG } from "../../utils/consts.js";
import chalk from "chalk";
import { PackageManger } from "../../utils/getUserPackageManager.js";
import { packageInstaller } from "../../utils/packageInstaller.js";

const DrizzleInstaller = async (packageManger: PackageManger) => {
  console.log(chalk.bold("☕ Installing Drizzle..."));

  await packageInstaller({
    packageManger: packageManger.depn,
    installCmd: packageManger.depn === "npm" ? "i" : "add",
    packages: ["drizzle-orm", "@neondatabase/serverless", "dotenv"],
  });

  await packageInstaller({
    packageManger: packageManger.depn,
    installCmd: packageManger.depn === "npm" ? "i" : "add",
    packages: ["-D", "drizzle-kit", "tsx"],
  });

  const existingEnv = await fs.exists(".env.local");

  if (!existingEnv) {
    await fs.writeFile(".env.local", `DATABASE_URL=`);
  } else {
    const existingEnvContent = await fs.readFile(".env.local", "utf8");
    if (!existingEnvContent.includes("DATABASE_URL=")) {
      await fs.appendFile(".env.local", `\nDATABASE_URL=`);
    }
  }

  await fs.copy(path.join(TEMPLATE_PKG, "drizzle"), path.join("./"));

  const packageJson = await fs.readJson("./package.json");

  // Update scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    "db:generate": "npx drizzle-kit generate",
    "db:migrate": "npx drizzle-kit migrate",
    "db:studio": "npx drizzle-kit studio",
    "db:both": "npx drizzle-kit generate && npx drizzle-kit migrate",
  };

  // Write the modified package.json back
  await fs.writeJson("./package.json", packageJson, { spaces: 2 });
};

export default DrizzleInstaller;
