import { DEFAULT_APP_NAME } from "@/consts.js";
import { isInsideGitRepo, isRootGitRepo } from "@/helpers/git.js";
import { getUserPkgManager } from "@/utils/getUserPackageManager.js";
import { logger } from "@/utils/logger.js";
import { InstallerOptions } from "@/utils/types.js";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = async ({
  projectName = DEFAULT_APP_NAME,
  noInstall,
  projectDir,
}: Pick<
  InstallerOptions,
  "projectName" | "noInstall" | "projectDir" | "appRouter"
>) => {
  const pkgManager = getUserPkgManager();

  logger.info("Next steps:");
  projectName !== "." && logger.info(`  cd ${projectName}`);
  if (noInstall) {
    // To reflect yarn's default behavior of installing packages when no additional args provided
    if (pkgManager === "yarn") {
      logger.info(`  ${pkgManager}`);
    } else {
      logger.info(`  ${pkgManager} install`);
    }
  }

  if (["npm", "bun"].includes(pkgManager)) {
    logger.info(`  ${pkgManager} run dev`);
  } else {
    logger.info(`  ${pkgManager} dev`);
  }

  if (!(await isInsideGitRepo(projectDir)) && !isRootGitRepo(projectDir)) {
    logger.info(`  git init`);
  }
  logger.info(`  git commit -m "initial commit"`);
};
