export type Setup = {
  name: string
  type: "app" | "lib"
  language: "ts" | "js"
  description: string
  author: string
  semicolons: boolean
  packageManager: "npm" | "yarn" | "pnpm"
  includeEnv: boolean
}
