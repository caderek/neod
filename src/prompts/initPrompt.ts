import prompts from "prompts"
import { execSync } from "child_process"
import kleur from "kleur"

const onCancel = () => {
  console.log(kleur.yellow("Aborting!"))
  process.exit(1)
}

const initPrompt = () => {
  let author = ""

  try {
    author = execSync("git config user.name").toString().trim()
  } catch {}

  return prompts(
    [
      {
        type: "text",
        name: "name",
        message: "Package name",
        validate: (val) =>
          !/^[a-z@][a-z0-9_\-.@]+$/.test(val)
            ? `Name hast to be a valid npm package name`
            : true,
      },
      {
        type: "select",
        name: "type",
        message: "Type",
        choices: [
          { title: "Application", value: "app" },
          { title: "Library", value: "lib" },
          { title: "Script", value: "script" },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "language",
        message: "Language",
        choices: [
          { title: "JavaScript", value: "js" },
          { title: "TypeScript", value: "ts" },
        ],
        initial: 0,
      },
      {
        type: "toggle",
        name: "semicolons",
        message: "Semicolons",
        initial: true,
        active: "yes",
        inactive: "no",
      },
      {
        type: "text",
        name: "author",
        message: `Author`,
        initial: author,
      },
      {
        type: "text",
        name: "description",
        message: `Description`,
        initial: "",
      },
      {
        type: "select",
        name: "packageManager",
        message: "Package manager",
        choices: [
          { title: "NPM", value: "npm" },
          { title: "Yarn", value: "yarn" },
          { title: "pnpm", value: "pnpm" },
        ],
        initial: 0,
      },
    ],
    { onCancel },
  )
}

export default initPrompt
