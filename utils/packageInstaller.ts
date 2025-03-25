import { execa } from "execa";
import { PackageManger } from "./getUserPackageManager.js";

export type PackageInstaller = {
  packageManger: "npm" | "npx" | "bun" | "bunx";
  installCmd?: "i" | "add";
  packages: string[];
};

export const packageInstaller = async ({
  packageManger,
  installCmd,
  packages,
}: PackageInstaller) => {
  const installCommand = installCmd ?? (packageManger === "bun" ? "add" : "i");
  try {
    await execa(packageManger, [installCommand, ...packages], {
      stderr: "inherit",
    });
  } catch (error) {
    console.log("Failed to install", error);
  }
};

export const createOAuthSecret = async (packageManger: PackageManger) => {
  try {
    await execa(packageManger.nextIns, ["auth", "secret"], {
      stderr: "inherit",
    });
  } catch (error) {
    console.log("Failed to create auth secret", error);
  }
};
