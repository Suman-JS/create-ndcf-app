import pathModule from "path";

import { removeTrailingSlash } from "@/utils/removeTrailingSlash.js";

export const parseNameAndPath = (rawInput: string) => {
  const input = removeTrailingSlash(rawInput);

  const paths = input.split("/");

  let appName = paths[paths.length - 1]!;

  // If the user ran `npx create-ndcf-app .` or similar, the appName should be the current directory
  if (appName === ".") {
    const parsedCwd = pathModule.resolve(process.cwd());
    appName = pathModule.basename(parsedCwd);
  }

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }

  const path = paths.filter((p) => !p.startsWith("@")).join("/");

  return [appName, path] as const;
};
