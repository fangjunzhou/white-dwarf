const { build } = require("esbuild");
const { dependencies, peerDependencies } = require("./package.json");
const { Generator } = require("npm-dts");

new Generator({
  entry: "src/Editor/index.ts",
  output: "dist/Editor/index.d.ts",
}).generate();

const sharedConfig = {
  entryPoints: ["src/Editor/index.ts"],
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
  outfile: "dist/Editor/index.js",
});

build({
  ...sharedConfig,
  outfile: "dist/Editor/index.esm.js",
  platform: "neutral",
  format: "esm",
});
