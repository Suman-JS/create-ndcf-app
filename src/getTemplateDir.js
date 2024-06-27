import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getTemplateDir = (answers) => {
  const { language, fileRouter, useSrcDirectory } = answers;

  const template = `${useSrcDirectory ? "src-" : ""}${`${
    fileRouter.toLowerCase().split(" ")[0]
  }-${language === "TypeScript" ? "ts" : "js"}`}`;

  const templateDir = path.join(__dirname, "templates");

  const availableTemplates = fs.readdirSync(templateDir);

  if (availableTemplates.includes(template)) {
    return path.join(templateDir, template);
  } else {
    throw new Error("No suitable template was found!");
  }
};
