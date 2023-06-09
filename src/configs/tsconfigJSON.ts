import type { Setup } from "../types/common"

const tsconfigJSON = () => {
  return {
    compilerOptions: {
      target: "es2020",
      module: "es2020",
      removeComments: true,
      declaration: true,
      outDir: "./dist",
      preserveConstEnums: true,
      strict: true,
      allowSyntheticDefaultImports: true,
      moduleResolution: "node",
      forceConsistentCasingInFileNames: true,
      importHelpers: true,
    },
    include: ["src"],
    exclude: ["node_modules", "src/**/*.test.ts", "src/**/*.temp.ts"],
  }
}

export default tsconfigJSON
