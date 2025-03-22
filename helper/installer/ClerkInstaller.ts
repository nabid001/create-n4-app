import { execa } from "execa";
import { PKG_ROOT } from "../../utils/consts.js";
import fs from "fs-extra";
import chalk from "chalk";
import path from "path";

const ClerkInstaller = async () => {
  console.log(chalk.bold("☕ Installing Clerk..."));
  await execa("npm", ["install", "@clerk/nextjs"], {
    stderr: "inherit",
  });

  // Check if middleware exists and copy if it doesn't
  const existingMiddleware = await fs.pathExists(
    path.join("./", "middleware.ts")
  );
  if (!existingMiddleware) {
    await fs.copyFile(
      path.join(PKG_ROOT, "clerk/middleware.ts"),
      path.join("./", "middleware.ts")
    );
  }

  // Copy layout file
  await fs.copyFile(
    path.join(PKG_ROOT, "clerk", "layout.tsx"),
    path.join("./", "app", "layout.tsx")
  );

  // Copy auth folder to app directory
  const authFolder = path.join(PKG_ROOT, "clerk/auth");
  await fs.copy(authFolder, path.join("./", "app"));

  // Copy webhook API folder
  await fs.copy(
    path.join(PKG_ROOT, "clerk", "webhook"),
    path.join("./", "app")
  );

  // Copy.env.local file to project root directory
  await fs.copyFile(
    path.join(PKG_ROOT, "clerk", ".env.local"),
    path.join(process.cwd(), ".env.local")
  );
};

export default ClerkInstaller;
