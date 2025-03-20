import fs from "fs-extra";
import { execa } from "execa";
import path from "path";
import { PKG_ROOT } from "../../utils/consts.js";
import chalk from "chalk";

const DrizzleInstaller = async () => {
  console.log("\n☕ Installing Drizzle...");

  await execa(
    "npm",
    ["i", "drizzle-orm", "@neondatabase/serverless", "dotenv"],
    { stdio: "inherit" }
  );
  await execa("npm", ["i", "-D", "drizzle-kit", "tsx"], { stdio: "inherit" });

  const existingEnv = await fs.exists(".env.local");

  if (!existingEnv) {
    await fs.writeFile(".env.local", `DATABASE_URL=`);
  } else {
    const existingEnvContent = await fs.readFile(".env.local", "utf8");
    if (!existingEnvContent.includes("DATABASE_URL=")) {
      await fs.appendFile(".env.local", `\nDATABASE_URL=`);
    }
  }

  await fs.copy(path.join(PKG_ROOT, "drizzle"), path.join("./"));

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

  console.log(chalk.yellow("Don't forget to add Environment variables"));
};

export default DrizzleInstaller;
