import fs from "fs-extra";
import { execa } from "execa";
import { PKG_ROOT } from "../../utils/consts.js";
import path from "path";

const CredentialsInstaller = async () => {
  console.log("\n☕ Auth.js installing...");

  await execa("npm", ["i", "next-auth@beta"], {
    stdio: "inherit",
  });
  await execa("npx", ["auth", "secret"], {
    stdio: "inherit",
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
