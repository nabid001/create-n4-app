import { execa } from "execa";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "../../utils/consts.js";

const ClerkInstaller = async () => {
  console.log("☕ Installing Clerk...");
  await execa("npm", ["install", "@clerk/nextjs"], {
    stdio: "inherit",
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
