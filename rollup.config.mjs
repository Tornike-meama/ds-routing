import resolve, { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };
// import { terser } from "rollup-plugin-terser";
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
  {
    input: "src/index.ts",
    external: [ 'fs' ],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.main,
        format: "cjs",
        export: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      // peerDepsExternal(),
      nodeResolve({ preferBuiltins: false }), // or `true`
      commonjs(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      // terser(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];