import * as p from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";

import { CREATE_NDCF_APP, DEFAULT_APP_NAME } from "@/consts.js";
import { getVersion } from "@/utils/getCurrentVersion.js";
import { getUserPkgManager } from "@/utils/getUserPackageManager.js";
import { IsTTYError } from "@/utils/isTTYError.js";
import { logger } from "@/utils/logger.js";
import { validateAppName } from "@/utils/validateAppName.js";
import { validateImportAlias } from "@/utils/validateImportAlias.js";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;
  docker: boolean;
  appRouter: boolean;
  dockerUsername?: string;
  turbo: boolean;
}

interface CliResults {
  appName: string;
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    docker: true,
    importAlias: "@/",
    appRouter: true,
    dockerUsername: "template-project-name:latest",
    turbo: true,
  },
};

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;

  const program = new Command()
    .name(CREATE_NDCF_APP)
    .description(
      "A CLI for creating web applications with the Next.js App/Pages router with Docker Configuration, TypeScript/JavaScript, and Tailwind CSS and shadcn/ui"
    )
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new ndcf-app",
      false
    )
    .option(
      "--docker [boolean]",
      "Boolean value if we should include docker configuration.",
      (value) => !!value && value !== "false"
    )
    .option(
      "--turbo [boolean]",
      "Boolean value if we should include --turbo flag? for the dev server.",
      (value) => !!value && value !== "false"
    )
    .option(
      "--src [boolean]",
      "Boolean value if we should use src directory.",
      (value) => !!value && value !== "false"
    )
    .option(
      "-i, --import-alias",
      "Explicitly tell the CLI to use a custom import alias",
      defaultOptions.flags.importAlias
    )
    .option(
      "-du, --docker-username",
      "Explicitly tell the CLI to use use it for the docker username",
      defaultOptions.flags.dockerUsername
    )
    .option(
      "--appRouter [boolean]",
      "Explicitly tell the CLI to use the new Next.js app router",
      (value) => !!value && value !== "false"
    )
    .version(getVersion(), "-v, --version", "Display the version number")
    .parse(process.argv);

  // Needs to be separated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = program.opts();

  if (cliResults.flags.default) {
    return cliResults;
  }

  // Explained below why this is in a try/catch block
  try {
    if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are
  using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you
  can provide the arguments from the CLI directly: https://create.ndcf.gg/en/installation#experimental-usage to skip the prompts.`);

      throw new IsTTYError("Non-interactive environment");
    }

    // if --CI flag is set, we are running in CI mode and should not prompt the user

    const pkgManager = getUserPkgManager();

    const project = await p.group(
      {
        ...(!cliProvidedName && {
          name: () =>
            p.text({
              message: "What will your project be called?",
              defaultValue: cliProvidedName,
              validate: validateAppName,
            }),
        }),
        language: () => {
          return p.select({
            message: "Will you be using TypeScript or JavaScript?",
            options: [
              { value: "typescript", label: "TypeScript" },
              { value: "javascript", label: "JavaScript" },
            ],
            initialValue: "typescript",
          });
        },
        _: ({ results }) =>
          results.language === "javascript"
            ? p.note(chalk.redBright("Wrong answer, using TypeScript instead"))
            : undefined,
        styling: () => {
          return p.confirm({
            message: "Will you be using Tailwind CSS for styling?",
          });
        },
        trpc: () => {
          return p.confirm({
            message: "Would you like to use tRPC?",
          });
        },
        authentication: () => {
          return p.select({
            message: "What authentication provider would you like to use?",
            options: [
              { value: "none", label: "None" },
              { value: "next-auth", label: "docker.js" },
              // Maybe later
              // { value: "clerk", label: "Clerk" },
            ],
            initialValue: "none",
          });
        },
        database: () => {
          return p.select({
            message: "What database ORM would you like to use?",
            options: [
              { value: "none", label: "None" },
              { value: "prisma", label: "Prisma" },
              { value: "drizzle", label: "Drizzle" },
            ],
            initialValue: "none",
          });
        },
        appRouter: () => {
          return p.confirm({
            message: "Would you like to use Next.js App Router?",
            initialValue: true,
          });
        },
        databaseProvider: ({ results }) => {
          if (results.database === "none") return;
          return p.select({
            message: "What database provider would you like to use?",
            options: [
              { value: "sqlite", label: "SQLite (LibSQL)" },
              { value: "mysql", label: "MySQL" },
              { value: "postgres", label: "PostgreSQL" },
              { value: "planetscale", label: "PlanetScale" },
            ],
            initialValue: "sqlite",
          });
        },
        ...(!cliResults.flags.noGit && {
          git: () => {
            return p.confirm({
              message:
                "Should we initialize a Git repository and stage the changes?",
              initialValue: !defaultOptions.flags.noGit,
            });
          },
        }),
        ...(!cliResults.flags.noInstall && {
          install: () => {
            return p.confirm({
              message:
                `Should we run '${pkgManager}` +
                (pkgManager === "yarn" ? `'?` : ` install' for you?`),
              initialValue: !defaultOptions.flags.noInstall,
            });
          },
        }),
        importAlias: () => {
          return p.text({
            message: "What import alias would you like to use?",
            defaultValue: defaultOptions.flags.importAlias,
            placeholder: defaultOptions.flags.importAlias,
            validate: validateImportAlias,
          });
        },
      },
      {
        onCancel() {
          process.exit(1);
        },
      }
    );

    // const packages: AvailablePackages[] = [];
    // if (project.styling) packages.push("tailwind");
    // if (project.trpc) packages.push("trpc");
    // if (project.authentication === "next-auth") packages.push("docker");
    // if (project.database === "prisma") packages.push("prisma");
    // if (project.database === "drizzle") packages.push("drizzle");

    return {
      appName: project.name ?? cliResults.appName,
      // packages,
      // databaseProvider:
      //   (project.databaseProvider as DatabaseProvider) || "sqlite",
      flags: {
        ...cliResults.flags,
        appRouter: project.appRouter ?? cliResults.flags.appRouter,
        noGit: !project.git || cliResults.flags.noGit,
        noInstall: !project.install || cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
    };
  } catch (err) {
    // If the user is not calling create-ndcf-app from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default ndcf app
    if (err instanceof IsTTYError) {
      logger.warn(`
  ${CREATE_NDCF_APP} needs an interactive terminal to provide options`);

      const shouldContinue = await p.confirm({
        message: `Continue scaffolding a default ndcf app?`,
        initialValue: true,
      });

      if (!shouldContinue) {
        logger.info("Exiting...");
        process.exit(0);
      }

      logger.info(
        `Bootstrapping a default ndcf app in ./${cliResults.appName}`
      );
    } else {
      throw err;
    }
  }
  console.log(cliResults);
  return cliResults;
};
