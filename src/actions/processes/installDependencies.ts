import { spawnSync } from "child_process"
import type { Setup } from "../../types/common"

const installCmd = (setup: Setup) =>
  setup.packageManager === "npm"
    ? "i"
    : setup.packageManager === "yarn"
    ? "add"
    : "install"

const getDependencies = (setup: Setup) => {
  return {
    dev: ["@types/node", "neod"],
    prod: [...(setup.includeEnv ? ["dotenv"] : [])],
  }
}

const installDependencies = (setup: Setup) => {
  const dependencies = getDependencies(setup)
  const command = installCmd(setup)

  spawnSync(setup.packageManager, [command, ...dependencies.dev, "-D"], {
    stdio: "inherit",
    shell: true,
    cwd: setup.name,
  })

  spawnSync(setup.packageManager, [command, ...dependencies.prod], {
    stdio: "inherit",
    shell: true,
    cwd: setup.name,
  })
}

export default installDependencies
