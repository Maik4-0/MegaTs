# MegaTs

A terminal tool for uploading files to MEGA cloud storage and getting a shareable link.

## Requirements

- Node.js 18 or higher
- A MEGA account (create one at https://mega.nz)

## Installation

Clone the repository into the folder you want and install dependencies:

```bash
git clone https://github.com/Maik4-0/MegaTs.git
cd /MegaTs
npm install
```

## Usage

```bash
npm start
```

On first runu should select "Switch accounts". This way you can log in to ur mega account and start uploading shareable files.

From the menu you can:
- Upload a file by entering its full path (e.g. `/home/user/Documents/file.txt`)
- Switch to a different MEGA account
- Exit the tool

After a successful upload the tool returns a shareable link that anyone can use to download the file.

## Tech Stack

- TypeScript
- megajs
- @clack/prompts
- chalk
