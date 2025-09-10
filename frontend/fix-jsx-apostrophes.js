const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const jsx = require("@babel/plugin-syntax-jsx");

// Folder to scan
const APP_DIR = path.join(__dirname, "app");

// Recursively get all JS/TS/JSX/TSX files
function getAllFiles(dir, files = []) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (fullPath.match(/\.(js|jsx|ts|tsx)$/)) {
      files.push(fullPath);
    }
  });
  return files;
}

// Process JSX text nodes
function processFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");

  const result = babel.transformSync(code, {
    plugins: [
      jsx,
      function jsxApostrophePlugin() {
        return {
          visitor: {
            JSXText(path) {
              // Replace apostrophe only in JSX text
              path.node.value = path.node.value.replace(/'/g, "&apos;");
            },
          },
        };
      },
    ],
    parserOpts: {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    },
    generatorOpts: {
      retainLines: true,
    },
  });

  fs.writeFileSync(filePath, result.code, "utf8");
  console.log(`Fixed JSX apostrophes in: ${filePath}`);
}

// Run
const files = getAllFiles(APP_DIR);
files.forEach(processFile);

console.log("✅ Done! All JSX apostrophes replaced safely.");
