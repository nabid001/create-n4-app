import fs from "fs-extra";
import path from "path";
import { PKG_ROOTS } from "./consts.js";
import { type PackageJson } from "type-fest";

export const getVersion = () => {
  const packageJsonPath = path.join(PKG_ROOTS, "package.json");
  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;

  return packageJsonContent.version ?? "1.0.0";
};
