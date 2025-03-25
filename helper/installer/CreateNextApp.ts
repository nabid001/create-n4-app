import { execa } from "execa";
import { PackageManger } from "../../utils/getUserPackageManager.js";

const CreateNextApp = async (
  projectName: string,
  packageManger: PackageManger
) => {
  await execa(
    packageManger?.nextIns,
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
};

export default CreateNextApp;
