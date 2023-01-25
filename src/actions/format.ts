import { spawnSync } from "child_process"
import type { Setup } from "../types/common"

const format = (setup?: Setup) => {
  spawnSync("prettier", ["-w", "src"], {
    stdio: "inherit",
    shell: true,
    cwd: setup?.name,
  })
}

export default format
