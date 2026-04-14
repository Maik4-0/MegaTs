import os from "os";
import path from "path";
export const CONFIG_PATH = path.join(os.homedir(), "mega-send.json");
export interface Config {
    email: string;
    password: string;
}