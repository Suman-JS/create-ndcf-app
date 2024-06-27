import chalk from "chalk";
import { execSync } from "child_process";

export const runNpmInstall = (projectDir) => {
  process.chdir(projectDir);
  console.log(chalk.cyan("Running npm install..."));
  try {
    execSync("npm install", { stdio: "inherit" });
    console.log(chalk.green("npm install completed successfully!"));
  } catch (error) {
    console.error(
      chalk.red("An error occurred while running npm install:"),
      error
    );
    process.exit(1);
  }
};
