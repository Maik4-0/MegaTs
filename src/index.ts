import * as clack from "@clack/prompts";
import chalk from "chalk";
import { loadConfig, saveConfig } from "./auth";
import { uploadFile} from "./upload";

async function main() {
    clack.intro(chalk.bgCyan(chalk.black(" MegaTs Uploader ")));

    let config = loadConfig();

    if (!config) {
        clack.log.warn("No credentials found. Please log in to MEGA.");

        const email = await clack.text({
            message: "MEGA Email:",
            validate: (value) => {
                if (!value || !value.includes("@")) return "Please enter a valid email address.";
                return undefined;
            },
        });

        const password = await clack.password({
            message: "MEGA Password:",
        });

        if (clack.isCancel(email) || clack.isCancel(password)) {
            clack.cancel("Cancelled.");
            process.exit(0);
        }

        config = { email: email as string, password: password as string };
        saveConfig(config);
        clack.log.success("Credentials saved!");
    }
    while (true) {
        const action = await clack.select({
            message: "What do you want to do?",
            options: [
                {value: "switch", label: "Switch accounts"},
                {value: "upload", label: "Upload a file"},
                {value: "exit", label: "Exit"},
            ],
        });

        if (action === "switch") {
            const email = await clack.text({
                message: "MEGA Email:",
                validate: (value) => {
                    if (!value || !value.includes("@")) return "Please enter a valid email address.";
                    return undefined;
                },
            })
            const password = await clack.password({
                message: "MEGA Password:",
            })
            const password2 = await clack.password({
                message: "Confirm Password:",
                validate: (value) => {
                    if (value !== password) return "Passwords do not match: (ESC to exit)";
                    return undefined;
                },
            })
            config = { email: email as string, password: password as string };
            saveConfig(config);
            clack.log.success("Credentials saved!");
            continue;
        }

        if (clack.isCancel(action) || action === "exit") {
            clack.outro(chalk.cyan("Goodbye!"));
            process.exit(0);
        }

        const filePath = await clack.text({
            message: "Enter file path:",
            validate: (value) => {
                if (!value) return "Please enter a valid path";
                return undefined;
            },
        });
        if (clack.isCancel(filePath)) {
            continue;
        }

        const spinner = clack.spinner();
        spinner.start("Uploading file. . .");

        try {
            const link = await uploadFile(filePath as string, config);
            spinner.stop("upload complete.");
            clack.log.success(chalk.cyan("Link: ") + link);
        } catch (err) {
            spinner.stop("Upload failed.");
            clack.log.error(String(err));
        }
    }
}

main();