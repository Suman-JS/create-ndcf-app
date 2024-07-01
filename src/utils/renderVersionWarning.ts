import { execSync } from "child_process";
import https from "https";

import { getVersion } from "./getCurrentVersion.js";
import { logger } from "./logger.js";

export const renderVersionWarning = (npmVersion: string) => {
  const currentVersion = getVersion();

  if (currentVersion.includes("beta")) {
    logger.warn("  You are using a beta version of create-ndcf-app.");
    logger.warn("  Please report any bugs you encounter.");
  } else if (currentVersion.includes("next")) {
    logger.warn(
      "  You are running create-ndcf-app with the @next tag which is no longer maintained."
    );
    logger.warn("  Please run the CLI with @latest instead.");
  } else if (currentVersion !== npmVersion) {
    if (currentVersion > npmVersion) {
      logger.success("What's up dev!");
    } else {
      logger.warn("  You are using an outdated version of create-ndcf-app.");
      logger.warn(
        "  Your version: " + currentVersion + ".",
        "Latest version in the npm registry: " + npmVersion + "."
      );
      logger.warn(
        "  Please run the CLI with @latest to get the latest updates."
      );
    }
  }
  console.log("");
};

interface DistTagsBody {
  latest: string;
}

function checkForLatestVersion(): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(
        "https://registry.npmjs.org/-/package/create-ndcf-app/dist-tags",
        (res) => {
          if (res.statusCode === 200) {
            let body = "";
            res.on("data", (data) => (body += data));
            res.on("end", () => {
              resolve((JSON.parse(body) as DistTagsBody).latest);
            });
          } else {
            reject();
          }
        }
      )
      .on("error", () => {
        logger.error("Unable to check for latest version.");
        reject();
      });
  });
}

export const getNpmVersion = () =>
  // `fetch` to the registry is faster than `npm view` so we try that first
  checkForLatestVersion().catch(() => {
    try {
      return execSync("npm view create-ndcf-app version").toString().trim();
    } catch {
      return null;
    }
  });
