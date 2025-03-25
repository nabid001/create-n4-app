import fs from "fs-extra";
import path from "path";
import { ROOT_PKG } from "./consts.js";
import { type PackageJson } from "type-fest";

export const getVersion = () => {
  const packageJsonPath = path.join(ROOT_PKG, "package.json");
  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;

  return packageJsonContent.version ?? "1.0.0";
};
