import { spinner } from "@clack/prompts";
import chalk from "chalk";
import { execa } from "execa";

const CreateNextApp = async (projectName: string) => {
  const s = spinner();
  s.start("Generating project files...");

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
      stderr: "inherit",
    }
  );
  s.stop("Project created successfully! 🎉");
};

export default CreateNextApp;
