import { TEMPLATE_PKG } from "../../utils/consts.js";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { PackageManger } from "../../utils/getUserPackageManager.js";
import {
  createOAuthSecret,
  packageInstaller,
} from "../../utils/packageInstaller.js";

const OAuthInstaller = async (packageManger: PackageManger) => {
  console.log(chalk.bold("☕ Installing Auth.js..."));

  await packageInstaller({
    packageManger: packageManger.depn,
    installCmd: packageManger.depn === "npm" ? "i" : "add",
    packages: ["next-auth@beta"],
  });

  await createOAuthSecret(packageManger);

  const oAuthTemplateDir = path.join(TEMPLATE_PKG, "authjs", "oAuth");

  await fs.copy(
    path.join(oAuthTemplateDir, "api-route"),
    path.join(process.cwd(), "app")
  );

  await fs.copyFile(
    path.join(oAuthTemplateDir, "middleware.ts"),
    path.join(process.cwd(), "middleware.ts")
  );

  await fs.copyFile(
    path.join(oAuthTemplateDir, "auth.ts"),
    path.join(process.cwd(), "auth.ts")
  );

  const existingEnv = await fs.pathExists(
    path.join(process.cwd(), ".env.local")
  );
  if (!existingEnv) {
    await fs.writeFile("env.local", `AUTH_GOOGLE_ID= \nAUTH_GOOGLE_SECRET=`);
  } else {
    const existingEnvContent = await fs.readFile(
      path.join(process.cwd(), ".env.local"),
      "utf8"
    );
    if (
      !existingEnvContent.includes("AUTH_GOOGLE_ID=") ||
      !existingEnvContent.includes("AUTH_GOOGLE_SECRET=")
    ) {
      await fs.appendFile(
        path.join(process.cwd(), ".env.local"),
        "\nAUTH_GOOGLE_ID= \nAUTH_GOOGLE_SECRET="
      );
    }
  }
};

export default OAuthInstaller;
