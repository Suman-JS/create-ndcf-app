import chalk from "chalk";
import { validationMap } from "./validators/validationMap.js";

const installCommandMap = {
  npm: "npm install",
  yarn: "yarn",
  pnpm: "pnpm install",
  bun: "bun install",
};

function validateProjectName(value) {
  for (const { check, message } of validationMap) {
    if (check(value)) {
      return chalk.red(message);
    }
  }
  return true;
}

export const questions = (packageManager = "npm") => [
  {
    type: "input",
    name: "projectName",
    message: "What will your project be called?",
    validate: validateProjectName,
  },
  {
    type: "list",
    name: "language",
    message: "Will you be using TypeScript or JavaScript?",
    choices: ["TypeScript", "JavaScript"],
  },
  {
    type: "confirm",
    name: "languageFeedback",
    message: "",
    default: true,
    when: (answers) => {
      if (answers.language === "TypeScript") {
        console.log(chalk.green("Good choice! Using TypeScript!"));
      } else {
        console.log(
          chalk.yellowBright("Alright! You asked for it. Using JavaScript!")
        );
      }
      return false;
    },
  },
  {
    type: "list",
    name: "fileRouter",
    message: "Would you like to use App Router or Pages Router?",
    choices: ["App Router", "Pages Router"],
  },
  {
    type: "confirm",
    name: "eslint",
    message: "Would you like to use ESLint?",
    default: true,
  },
  {
    type: "confirm",
    name: "prettier",
    message: "Would you like to use Prettier?",
    default: true,
  },
  {
    type: "confirm",
    name: "turbo",
    message: "Would you like to use --turbo flag?",
    default: true,
  },
  {
    type: "confirm",
    name: "useSrcDirectory",
    message: "Would you like to use a 'src' directory?",
    default: false,
  },
  {
    type: "confirm",
    name: "includeDocker",
    message: "Do you want to include Docker configuration?",
    default: true,
  },
  {
    type: "confirm",
    name: "initGit",
    message: "Initialize a new git repository?",
    default: true,
  },
  {
    type: "confirm",
    name: "gitFeedback",
    message: "",
    default: true,
    when: (answers) => {
      if (answers.initGit === true) {
        console.log(
          chalk.green("Great! We'll initialize a new git repository.")
        );
      } else {
        console.log(
          chalk.green("Sounds good! You can come back and run git init later.")
        );
      }
      return false;
    },
  },
  {
    type: "list",
    name: "containerRegistry",
    message: "Which Container Registry would you like to use?",
    choices: ["DockerHub", "GitHub Container Registry"],
    when: (answers) => answers.includeDocker,
  },
  {
    type: "input",
    name: "dockerHubUsername",
    message: "What is your DockerHub username?",
    validate: function (value) {
      return value.length
        ? true
        : chalk.red("Please enter a DockerHub username.");
    },
    when: (answers) =>
      answers.includeDocker && answers.containerRegistry === "DockerHub",
  },
  {
    type: "input",
    name: "githubContainerRegistryUsername",
    message: "What is your GitHub Container Registry username?",
    validate: function (value) {
      if (!value.length) {
        return chalk.red("Please enter a GitHub Container Registry username.");
      }
      if (!value.startsWith("ghcr.io/")) {
        return chalk.red(
          "Please enter a GitHub Container Registry username with the 'ghcr.io/' prefix. For example, 'ghcr.io/my-username/my-repo'."
        );
      }
      return true;
    },
    when: (answers) =>
      answers.includeDocker &&
      answers.containerRegistry === "GitHub Container Registry",
  },
  {
    type: "confirm",
    name: "runNpmInstall",
    message: `Would you like us to run \`${installCommandMap[packageManager]}\` for you?`,
    default: true,
  },
  {
    type: "input",
    name: "packageManager",
    message: "",
    default: packageManager,
    when: () => false,
  },
];
