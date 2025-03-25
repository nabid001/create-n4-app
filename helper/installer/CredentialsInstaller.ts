import { TEMPLATE_PKG } from "../../utils/consts.js";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { PackageManger } from "../../utils/getUserPackageManager.js";
import {
  createOAuthSecret,
  packageInstaller,
} from "../../utils/packageInstaller.js";

const CredentialsInstaller = async (packageManger: PackageManger) => {
  console.log(chalk.bold("☕ Installing Auth.js..."));

  await packageInstaller({
    packageManger: packageManger.depn,
    installCmd: packageManger.depn === "npm" ? "i" : "add",
    packages: ["next-auth@beta"],
  });

  await createOAuthSecret(packageManger);

  const credentialsTemplateDir = path.join(
    TEMPLATE_PKG,
    "authjs",
    "credentials"
  );

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
