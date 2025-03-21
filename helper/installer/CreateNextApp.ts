import chalk from "chalk";
import { execa } from "execa";

const CreateNextApp = async (projectName: string) => {
  await execa(
    "npx",
    [
      "create-next-app@latest",
      projectName,
      "--typescript",
      "--eslint",
      "--tailwind",
      "--no-src-dir",
      "--app",
      "--turbopack",
      "--no-import-alias",
    ],
    {
      stdio: "inherit",
    }
  );
};

export default CreateNextApp;
