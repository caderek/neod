import fs from "fs"
import path from "path"
import { stripIndent } from "common-tags"
import chokidar from "chokidar"
import kleur from "kleur"
import getAllFiles from "../utils/getAllFiles.js"
import buildSource from "./processes/buildSource.js"
import runCode from "./processes/runCode.js"
import getLatestVersion from "./processes/getLatestVersion.js"
import copy from "../io/copy.js"

import commandPrompt from "../prompts/commandPrompt.js"
import version from "../version.js"

let latestVersion: string | null = null
getLatestVersion().then((v) => {
  latestVersion = v
})

const boldMagenta = kleur.bold().magenta

const showFullInfo = () => {
  const updateInfo =
    latestVersion === null
      ? ""
      : latestVersion !== version
      ? `(update available: v${latestVersion})`
      : "(latest)"

  console.log()
  console.log(stripIndent`
    Neod v${version} ${updateInfo}

    Type ${boldMagenta("help")}  or ${boldMagenta("h")} - to show all commands
    Type ${boldMagenta("clear")} or ${boldMagenta("c")} - to clear the console
    Type ${boldMagenta("quit")}  or ${boldMagenta("q")} - to close the runner
  `)
  console.log()
}

const showInfo = () => {
  console.log()
  console.log(stripIndent`
    Type: ${boldMagenta("h")} - help,  ${boldMagenta(
    "q",
  )} - quit, ${boldMagenta("c")} - clear
  `)

  if (latestVersion !== null && latestVersion !== version) {
    console.log()
    console.log(kleur.green(`Update available (v${latestVersion})!`))

    console.log(
      `To update, close the runner and run`,
      kleur.bold().green("npm i neod"),
    )
  }

  console.log()
}

type DevParams = {
  entryFile: string | undefined
  isTS: boolean
}

const dev = ({ entryFile, isTS }: DevParams) => {
  const files = getAllFiles("src")

  // @todo Handle arbitrary files
  const entry = entryFile ?? (isTS ? "dist/index.js" : "src/index.js")

  if (isTS) {
    buildSource(files)
  }

  runCode(entry)

  const reload = (file: string) => {
    if (![".js", ".ts", ".mjs"].includes(path.parse(file).ext)) {
      return
    }

    console.clear()

    if (isTS) {
      buildSource(file)
    }

    runCode(entry)
    showInfo()

    process.stdout.write(kleur.cyan("?") + kleur.gray("  › "))
  }

  chokidar
    .watch("src", { ignoreInitial: true })
    .on("add", reload)
    .on("change", reload)

  const listenToInput = async () => {
    showInfo()

    const { command } = await commandPrompt()

    switch (command.toLowerCase()) {
      case "help":
      case "h":
        showFullInfo()
        break
      case "clear":
      case "c":
        console.clear()
        break
      case "quit":
      case "q":
        process.exit()
      default:
        console.log("Command not supported")
        break
    }
    listenToInput()
  }

  listenToInput()
}

export default dev
