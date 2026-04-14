import { Storage } from "megajs";
import fs from "fs";
import path from "path";
import { Config } from "./config";

export async function uploadFile(filePath: string, config: Config): Promise<string> {
    const storage = await new Storage({
        email: config.email,
        password: config.password,
    }).ready;

    const fileName = path.basename(filePath);
    const fileData = fs.readFileSync(filePath);

    const file = await storage.upload({ name: fileName}, fileData).complete;

    const link = await file.link(false);
    return link;
}