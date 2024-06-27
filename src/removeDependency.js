import fs from "fs-extra";
import path from "path";
import { removeEslintDependencies } from "./handleDependency/eslint.js";
import { removePrettierDependencies } from "./handleDependency/prettier.js";

export const removeDependency = (projectDir, answers) => {
  const { includeDocker, eslint, prettier, language } = answers;

  if (!includeDocker) {
    fs.removeSync(path.join(projectDir, "Dockerfile"));
    fs.removeSync(path.join(projectDir, ".dockerignore"));
  }

  if (!eslint) {
    const eslintFile =
      language === "TypeScript" ? ".eslintrc.cjs" : ".eslintrc.json";
    fs.removeSync(path.join(projectDir, eslintFile));
    removeEslintDependencies(projectDir);
  }

  if (!prettier) {
    fs.removeSync(path.join(projectDir, ".prettierrc"));
    removePrettierDependencies(projectDir);
  }
};
