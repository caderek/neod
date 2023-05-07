import { spawnSync } from "child_process"
import kleur from "kleur"

const runCode = (path: string) => {
  console.log(kleur.blue("\n".padEnd(40, "-")))
  console.log()
  spawnSync("node", [path], {
    stdio: "inherit",
    shell: true,
  })
  console.log(kleur.blue("\n".padEnd(40, "-")))
}

export default runCode
