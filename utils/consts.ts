import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const TEMPLATE_PKG = path.join(distPath, "../../template");
export const ROOT_PKG = path.join(distPath, "../../");
