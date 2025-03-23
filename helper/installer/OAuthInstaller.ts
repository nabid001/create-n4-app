import { PKG_ROOT } from "../../utils/consts.js";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const OAuthInstaller = async () => {
  console.log(chalk.bold("☕ Installing Auth.js..."));

  await execa("npm", ["i", "next-auth@beta"], {
    stderr: "inherit",
  });
  await execa("npx", ["auth", "secret"], {
    stderr: "inherit",
  });

  const oAuthTemplateDir = path.join(PKG_ROOT, "authjs", "oAuth");

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
