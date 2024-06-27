import fs from "fs-extra";
import path from "path";

export const removePrettierDependencies = (projectDir) => {
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = fs.readJsonSync(packageJsonPath);

  if (packageJson.devDependencies) {
    delete packageJson.devDependencies.prettier;
    delete packageJson.devDependencies["prettier-plugin-tailwindcss"];
  }

  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
};
