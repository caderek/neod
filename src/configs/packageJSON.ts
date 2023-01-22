import type { Setup } from "../types/common"
import version from "../version.js"

const packageJSON = ({ name, description, language, author }: Setup) => {
  const build = language === "ts" ? { build: "aocrunner build" } : {}

  return {
    name,
    version: "0.1.0",
    description,
    type: "module",
    scripts: {
      start: "aocrunner day",
      ...build,
      format: "prettier -w src",
      "update:readme": "aocrunner update:readme",
    },
    keywords: ["aoc"],
    author: author ?? "",
    license: "ISC",
    devDependencies: {
      "@types/node": "^16.11.6",
      aocrunner: `^${version}`,
      prettier: "^2.8.0",
    },
    dependencies: {},
    engines: {
      node: ">=16.13.0",
    },
  }
}

export default packageJSON
