import chalk from "chalk";
import fs from "fs-extra";
import { join } from "path";

export const replacePlaceholdersInFiles = async ({
  projectDir,
  projectName,
  containerRegistry,
  dockerHubUsername,
  githubContainerRegistryUsername,
}) => {
  try {
    const filesToModify = ["manifest.yml", "package.json", "package-lock.json"];

    for (const file of filesToModify) {
      const filePath = join(projectDir, file);
      const exists = await fs.pathExists(filePath);

      if (!exists) {
        console.warn(`File ${file} not found in projectDir ${projectDir}`);
        continue;
      }

      let content = await fs.readFile(filePath, "utf8");
      content = content.replace(/template-project-name/g, projectName);

      if (containerRegistry === "DockerHub") {
        content = content.replace(/containerUsename/g, dockerHubUsername);
      } else {
        content = content.replace(
          /containerUsename/g,
          githubContainerRegistryUsername
        );
      }

      await fs.writeFile(filePath, content, "utf8");
    }
  } catch (error) {
    console.log(chalk.red("Exiting program due to the following error:"));
    console.error(error);
    process.exit(1);
  }
};
