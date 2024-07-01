import path from "path";
import { fileURLToPath } from "url";

// Path is in relation to a single index.js file inside ./dist
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

//export const PKG_ROOT = path.dirname(require.main!.filename);
export const DEFAULT_APP_NAME = "my-ndcf-app";
export const CREATE_NDCF_APP = "create-ndcf-app";

export const TITLE_TEXT = `
                     _                        _       __                         
                    | |                      | |     / _|                        
  ___ _ __ ___  __ _| |_ ___ ______ _ __   __| | ___| |_ ______ __ _ _ __  _ __  
 / __| '__/ _ \\/ _\` | __/ _ \\______| '_ \\ / _\` |/ __|  _|______/ _\` | '_ \\| '_ \\ 
| (__| | |  __/ (_| | ||  __/      | | | | (_| | (__| |       | (_| | |_) | |_) |
 \\___|_|  \\___|\\__,_|\\__\\___|      |_| |_|\\__,_|\\___|_|        \\__,_| .__/| .__/ 
                                                                    | |   | |    
                                                                    |_|   |_|    
`;
