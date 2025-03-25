export interface PackageManger {
  depn: "npm" | "bun";
  nextIns: "npx" | "bunx";
}

export const getUserPackageName: () => PackageManger = () => {
  const packageName = process.env.npm_config_user_agent;

  if (packageName) {
    if (packageName.startsWith("npm")) {
      return {
        depn: "npm",
        nextIns: "npx",
      };
    } else if (packageName.startsWith("bun")) {
      return {
        depn: "bun",
        nextIns: "bunx",
      };
    }
  } else {
    console.log("No package name specified | some thing is wrong");
    process.exit(1);
  }

  return {
    depn: "npm",
    nextIns: "npx",
  };
};
