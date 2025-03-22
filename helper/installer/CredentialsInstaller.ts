import { execa } from "execa";
import { PKG_ROOT } from "../../utils/consts.js";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const CredentialsInstaller = async () => {
  console.log(chalk.bold("☕ Installing Auth.js..."));

  await execa("npm", ["i", "next-auth@beta"], {
    stderr: "inherit",
  });
  await execa("npx", ["auth", "secret"], {
    stderr: "inherit",
  });

  const credentialsTemplateDir = path.join(PKG_ROOT, "authjs", "credentials");

  await fs.copy(
    path.join(credentialsTemplateDir, "route"),
    path.join(process.cwd(), "app")
  );

  await fs.copy(
    path.join(credentialsTemplateDir, "api-route"),
    path.join(process.cwd(), "app")
  );

  await fs.copyFile(
    path.join(credentialsTemplateDir, "middleware.ts"),
    path.join(process.cwd(), "middleware.ts")
  );

  await fs.copyFile(
    path.join(credentialsTemplateDir, "auth.ts"),
    path.join(process.cwd(), "auth.ts")
  );
};

export default CredentialsInstaller;
