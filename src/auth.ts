import fs from "fs";
import { CONFIG_PATH, Config } from "./config";

export function saveConfig(config: Config): void {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export function loadConfig(): Config | null {
    if (!fs.existsSync(CONFIG_PATH)) {
        return null;
    }
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw) as Config;
}