#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { generateProject } from "./generateProject.js";
import { questions } from "./questions.js";

async function welcomeText() {
  return new Promise((resolve, reject) => {
    const message = "create-ndcf-app";
    figlet(message, { font: "Larry 3D" }, (err, data) => {
      if (err) {
        console.log(
          chalk.red(
            "Failed to generate welcome text due to following error:",
            err
          )
        );
        reject(err);
        return;
      }
      console.log(gradient.pastel.multiline(data) + "\n");
      resolve();
    });
  });
}

function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else if (userAgent.startsWith("npm")) {
      return "npm";
    } else if (userAgent.startsWith("bun")) {
      return "bun";
    }
  }
  return "unknown";
}

async function main() {
  const packageManager = detectPackageManager();

  program
    .version("0.1.0")
    .description(
      "Generates NEXT.js 14 app with typescript/javascript, app-router/pages router, tailwindcss, docker, shadcn/ui, SAP BTP Cloud foundry."
    );

  program.action(() => {
    inquirer
      .prompt(questions(packageManager))
      .then((answers) => generateProject({ ...answers, packageManager }))
      .catch((error) => {
        console.error(chalk.red("An error occurred:", error));
        process.exit(1);
      });
  });

  program.parse(process.argv);
}

await welcomeText();
await main();
