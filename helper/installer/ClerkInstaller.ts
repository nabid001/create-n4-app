import { TEMPLATE_PKG } from "../../utils/consts.js";
import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import { PackageManger } from "../../utils/getUserPackageManager.js";
import { packageInstaller } from "../../utils/packageInstaller.js";

const ClerkInstaller = async (packageManger: PackageManger) => {
  console.log(chalk.bold("☕ Installing Clerk..."));

  await packageInstaller({
    packageManger: packageManger.depn === "npm" ? "npm" : "bun",
    installCmd: packageManger.depn === "npm" ? "i" : "add",
    packages: ["@clerk/nextjs"],
  });

  // Check if middleware exists and copy if it doesn't
  const existingMiddleware = await fs.pathExists(
    path.join("./", "middleware.ts")
  );
  if (!existingMiddleware) {
    await fs.copyFile(
      path.join(TEMPLATE_PKG, "clerk/middleware.ts"),
      path.join("./", "middleware.ts")
    );
  }

  // Copy layout file
  await fs.copyFile(
    path.join(TEMPLATE_PKG, "clerk", "layout.tsx"),
    path.join("./", "app", "layout.tsx")
  );

  // Copy auth folder to app directory
  const authFolder = path.join(TEMPLATE_PKG, "clerk/auth");
  await fs.copy(authFolder, path.join("./", "app"));

  // Copy webhook API folder
  await fs.copy(
    path.join(TEMPLATE_PKG, "clerk", "webhook"),
    path.join("./", "app")
  );

  // Copy.env.local file to project root directory
  await fs.copyFile(
    path.join(TEMPLATE_PKG, "clerk", ".env.local"),
    path.join(process.cwd(), ".env.local")
  );
};

export default ClerkInstaller;
