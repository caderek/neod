import { spawnSync } from "child_process"
import path from "path"
import fs from "fs"

const pak = JSON.parse(fs.readFileSync("package.json", "utf-8"))

const buildSource = (input: string | string[], sourcemap: boolean = true) => {
  const files = Array.isArray(input) ? input : [input]
  const outDir = Array.isArray(input)
    ? "dist"
    : path.parse(input).dir.replace(/^src/, "dist")

  console.log("Transpiling...\n")

  if (pak.browser !== undefined) {
    spawnSync(
      "npx",
      [
        "esbuild",
        ...files,
        "--format=esm",
        `--outdir=${outDir}`,
        "--bundle",
        "--platform=browser",
        "--target=es2022",
        ...(sourcemap ? ["--sourcemap"] : []),
      ],
      { stdio: "inherit", shell: true },
    )
  } else {
    spawnSync(
      "npx",
      [
        "esbuild",
        ...files,
        "--format=esm",
        `--outdir=${outDir}`,
        "--platform=node",
        "--target=node16",
        ...(sourcemap ? ["--sourcemap"] : []),
      ],
      { stdio: "inherit", shell: true },
    )
  }
}

export default buildSource
