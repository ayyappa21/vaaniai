const { compile, optimize } = require("@tailwindcss/node");
const { Scanner } = require("@tailwindcss/oxide");
const postcss = require("postcss");
const path = require("path");

module.exports = function tailwindV4Plugin() {
  return {
    postcssPlugin: "tailwindcss-v4-local",
    async Once(root, { result }) {
      const rawCss = root.source?.input?.css || "";
      if (!rawCss.includes("tailwindcss") && !rawCss.includes("@theme") && !rawCss.includes("@layer")) {
        return;
      }

      const baseDir = path.resolve(__dirname, "src");
      const from = result.opts.from || path.resolve(__dirname, "src/app/globals.css");

      const compiler = await compile(rawCss, {
        base: baseDir,
        from,
        onDependency: (file) => {
          result.messages.push({
            type: "dependency",
            plugin: "tailwindcss-v4-local",
            file,
            parent: from
          });
        }
      });

      const scanner = new Scanner({
        sources: [{ base: baseDir, pattern: "**/*", negated: false }]
      });

      const candidates = new Set(scanner.scan());
      const built = compiler.build([...candidates]);
      const optimized = optimize(built, { minify: process.env.NODE_ENV === "production" }).code;
      const parsed = postcss.parse(optimized, { from });
      root.nodes = parsed.nodes;
    }
  };
};
module.exports.postcss = true;
