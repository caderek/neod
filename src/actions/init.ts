import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import kleur from "kleur"
import initPrompt from "../prompts/initPrompt.js"
import save from "../io/save.js"
import copy from "../io/copy.js"
import packageJSON from "../configs/packageJSON.js"
import tsconfigJSON from "../configs/tsconfigJSON.js"
import prettierJSON from "../configs/prettierJSON.js"
import gitignoreTXT from "../configs/gitignoreTXT.js"
import prettierignoreTXT from "../configs/prettierignoreTXT.js"
import envTXT from "../configs/envTXT.js"
import readmeMD from "../configs/readmeMD.js"
import installDependencies from "./processes/installDependencies.js"
import formatCode from "./processes/formatCode.js"

import type { Setup } from "../types/common"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const init = async () => {
  console.log("Initializing")

  const setup: Setup = await initPrompt()

  const installCmd =
    setup.packageManager === "npm"
      ? "npm i"
      : setup.packageManager === "yarn"
      ? "yarn"
      : "pnpm install"

  const formatCmd =
    setup.packageManager === "npm"
      ? "npm run format"
      : setup.packageManager === "yarn"
      ? "yarn format"
      : "pnpm format"

  const startCmd =
    setup.packageManager === "npm"
      ? "npm start"
      : setup.packageManager === "yarn"
      ? "yarn start"
      : "pnpm start"

  const gitCommands = ["git init", "git add .", 'git commit -m "Init"']

  const dir = setup.name
  const srcDir = path.join(dir, "src")

  if (fs.existsSync(dir)) {
    console.log(kleur.red("Project already exists. Aborted."))
    process.exit(1)
  }

  fs.mkdirSync(srcDir, { recursive: true })

  save(dir, "package.json", packageJSON(setup))
  save(dir, ".prettierrc.json", prettierJSON(setup))
  save(dir, ".gitignore", gitignoreTXT(setup))
  save(dir, ".prettierignore", prettierignoreTXT(setup))
  save(dir, ".env", envTXT)
  save(dir, "README.md", readmeMD(setup, startCmd, installCmd))

  if (setup.language === "ts") {
    save(dir, "tsconfig.json", tsconfigJSON())
  }

  const templatesDir = path.resolve(
    dirname,
    "..",
    "..",
    "templates",
    setup.language,
  )

  copy(templatesDir, srcDir)

  console.log(kleur.magenta("\nInstalling dependencies...\n"))
  installDependencies(setup)

  console.log(kleur.magenta("\nFormatting the source files...\n"))
  formatCode(setup)

  console.log(kleur.magenta("\nInitializing Git repository...\n"))
  for (const command of gitCommands) {
    execSync(command, { cwd: dir, stdio: "inherit" })
  }

  console.log(kleur.green("\nDone!\n\n"))
}

export default init
