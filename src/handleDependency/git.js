import chalk from "chalk";
import { execSync } from "child_process";

export const initializeGit = (projectDir) => {
  process.chdir(projectDir);
  execSync("git init");
  console.log(chalk.green("Initialized a git repository."));
};
