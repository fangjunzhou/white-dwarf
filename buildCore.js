const { build } = require("esbuild");
const { dependencies, peerDependencies } = require("./package.json");
const { Generator } = require("npm-dts");

new Generator({
  entry: "src/Core/index.ts",
  output: "dist/Core/index.d.ts",
}).generate();

const sharedConfig = {
  entryPoints: ["src/Core/index.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  watch: {
    onRebuild(error, result) {
      if (error) console.error("watch build failed:", error);
      else console.log("watch build succeeded:", result);
    },
  },
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

build({
  ...sharedConfig,
  platform: "node",
  outfile: "dist/Core/index.js",
});

build({
  ...sharedConfig,
  outfile: "dist/Core/index.esm.js",
  platform: "neutral",
  format: "esm",
});
