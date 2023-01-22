import type { Setup } from "../types/common"
import { stripIndents } from "common-tags"

const readmeMD = (
  { language, name, description }: Setup,
  startCmd: string,
  installCmd: string,
) => {
  const lang = language === "ts" ? "TypeScript" : "JavaScript"

  return stripIndents`
    <!-- Entries between comment tags (<!--TAG--><!--/TAG-->) are auto-generated -->

    [![Node](https://badgen.net/badge/Node/v16.13.0+/blue)](https://nodejs.org/en/download/)
    ![Language](https://badgen.net/badge/Language/${lang}/blue)
    [![Template](https://badgen.net/badge/Template/neod/blue)](https://github.com/caderek/neod)


    # ${name}

    ${description}


    ## Installation

    \`\`\`
    ${installCmd}
    \`\`\`

    ## Running in dev mode

    \`\`\`
    ${startCmd}
    \`\`\`
  `
}

export default readmeMD
