import { spawnSync } from "child_process"
import type { Setup } from "../../types/common"

const formatCode = (setup: Setup) => {
  spawnSync("prettier", ["-w", "src"], {
    stdio: "inherit",
    shell: true,
    cwd: setup.name,
  })
}

export default formatCode
