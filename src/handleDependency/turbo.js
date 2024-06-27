import fs from "fs-extra";
import path from "path";

export const removeTurboFlag = (projectDir) => {
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = fs.readJsonSync(packageJsonPath);

  if (packageJson.scripts && packageJson.scripts.dev) {
    packageJson.scripts.dev = packageJson.scripts.dev.replace(" --turbo", "");
  }

  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
};
