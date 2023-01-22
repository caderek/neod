import { saveReadme, readReadme } from "../io/readme.js"

export const updateReadme = () => {
  const title = ""

  const readme = readReadme().replace(
    /<!--TITLE-->(.|\n|\r)+<!--\/TITLE-->/,
    `<!--TITLE-->\n\n${title}\n\n<!--/TITLE-->`,
  )

  saveReadme(readme)
}

export default updateReadme
