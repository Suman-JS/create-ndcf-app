import fs from "fs-extra";
import path from "path";

export const removeEslintDependencies = (projectDir) => {
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = fs.readJsonSync(packageJsonPath);

  if (packageJson.devDependencies) {
    delete packageJson.devDependencies.eslint;
    delete packageJson.devDependencies["eslint-config-next"];
  }

  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
};
