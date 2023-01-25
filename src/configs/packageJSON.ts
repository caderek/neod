import type { Setup } from "../types/common"

const packageJSON = ({ name, description, language, author }: Setup) => {
  const build = language === "ts" ? { build: "neod build" } : {}

  return {
    name,
    version: "0.1.0",
    description,
    type: "module",
    scripts: {
      start: "neod dev",
      ...build,
      format: "neod format",
    },
    keywords: ["aoc"],
    author: author ?? "",
    license: "ISC",
    devDependencies: {},
    dependencies: {},
    engines: {
      node: ">=16.13.0",
    },
  }
}

export default packageJSON
