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
    AoC Runner v${version} ${updateInfo}

    Type ${boldMagenta("fetch")} or ${boldMagenta("f")} - to fetch the input
    Type ${boldMagenta("send")}  or ${boldMagenta("s")} - to send the solutions
    Type ${boldMagenta("help")}  or ${boldMagenta("h")} - to show all commands
    Type ${boldMagenta("clear")} or ${boldMagenta("c")} - to clear the console
    Type ${boldMagenta("quit")}  or ${boldMagenta("q")} - to close the runner
  `)
  console.log()
}

const showInfo = () => {
  console.log()
  console.log(stripIndent`
    Type: ${boldMagenta("f")} - fetch input, ${boldMagenta(
    "s",
  )} - send solutions, ${boldMagenta("h")} - help,  ${boldMagenta("q")} - quit
  `)

  if (latestVersion !== null && latestVersion !== version) {
    console.log()
    console.log(kleur.green(`Update available (v${latestVersion})!`))

    console.log(
      `To update, close the runner and run`,
      kleur.bold().green("npm i aocrunner"),
    )
  }

  console.log()
}

const dev = (entryFile?: string) => {
  const config = { language: "TS" }

  const files = getAllFiles("src")
  const file = entryFile ?? "dev/index.js"

  if (config.language === "ts") {
    buildSource(files)
  }

  runCode(file)

  const reload = (file: string) => {
    if (![".js", ".ts", ".mjs"].includes(path.parse(file).ext)) {
      return
    }

    console.clear()

    if (config.language === "ts") {
      buildSource(file)
    }

    runCode(file)
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
