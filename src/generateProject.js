import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";
import { fileURLToPath } from "url";
import { getTemplateDir } from "./getTemplateDir.js";
import { initializeGit } from "./handleDependency/git.js";
import { runNpmInstall } from "./handleDependency/npmInstall.js";
import { removeTurboFlag } from "./handleDependency/turbo.js";
import { removeDependency } from "./removeDependency.js";
import { replacePlaceholdersInFiles } from "./replacePlaceholders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const installCommandMap = {
  npm: "npm install",
  yarn: "yarn",
  pnpm: "pnpm install",
  bun: "bun install",
};

const runCommandMap = {
  npm: "npm run dev",
  yarn: "yarn dev",
  pnpm: "pnpm dev",
  bun: "bun dev",
};

export const generateProject = async (answers) => {
  const {
    projectName,
    turbo,
    initGit,
    containerRegistry,
    dockerHubUsername,
    githubContainerRegistryUsername,
    runNpmInstall: shouldRunNpmInstall,
    packageManager = "npm",
  } = answers;

  const currentDir = process.cwd();
  const projectDir = path.join(currentDir, projectName);

  if (fs.existsSync(projectDir)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: chalk.hex("#FF2800")(
          `Directory ${projectName} already exist! Do you wanna overwrite it?`
        ),
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.redBright("Operation canceled! Exiting..."));
      process.exit(0);
    } else {
      fs.removeSync(projectDir);
    }
  }

  const spinner = ora("Creating project...\n").start();

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const templateDir = getTemplateDir(answers);

    fs.copySync(templateDir, projectDir);

    replacePlaceholdersInFiles({
      projectDir,
      projectName,
      containerRegistry,
      dockerHubUsername,
      githubContainerRegistryUsername,
    });

    removeDependency(projectDir, answers);

    if (initGit) {
      initializeGit(projectDir);
    }

    if (!turbo) {
      removeTurboFlag(projectDir);
    }

    spinner.succeed(
      chalk.green(`Project ${projectName} created successfully!`)
    );

    if (shouldRunNpmInstall) {
      runNpmInstall(projectDir);
    }

    console.log(chalk.cyan("\nNext steps:"));
    console.log(chalk.cyan(`  cd ${projectName}`));
    if (!shouldRunNpmInstall) {
      console.log(
        `    \`${chalk.cyan(`${installCommandMap[packageManager]}`)}\``
      );
    }

    console.log(`    \`${chalk.cyan(`${runCommandMap[packageManager]}`)}\``);
  } catch (error) {
    spinner.fail(
      chalk.red("Failed to generate project due to the following error:")
    );
    console.error(error);
  } finally {
    process.chdir(currentDir);
  }
};
