#!/usr/bin/env node
import init from "./actions/init.js"
import dev from "./actions/dev.js"
import build from "./actions/build.js"
import updateReadme from "./actions/updateReadMe.js"
import format from "./actions/format.js"
import dotenv from "dotenv"
import version from "./version.js"

dotenv.config()

const commandPos = process.argv.findIndex((arg) =>
  ["-v", "init", "dev", "build", "format", "update:readme"].includes(arg),
)

if (commandPos === -1) {
  console.log("Command not supported")
  process.exit(1)
}

const [command, ...rawArgs] = process.argv.slice(commandPos)
const isTS = rawArgs.includes("--ts")
const args = rawArgs.filter((arg) => arg !== "--ts")

switch (String(command || "").toLowerCase()) {
  case "-v": {
    console.log(version)
    break
  }
  case "init": {
    init()
    break
  }
  case "dev": {
    dev({ entryFile: args[0], isTS })
    break
  }
  case "build": {
    build()
    break
  }
  case "format": {
    format()
    break
  }
  case "update:readme": {
    updateReadme()
    break
  }
  default: {
    console.log("Command not supported")
    process.exit(1)
  }
}