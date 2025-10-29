const fs = require("fs");

// Step 1: Read JSON data
const data = JSON.parse(fs.readFileSync("roots.json", "utf8"));
const { n, k } = data.keys;

let decodedRoots = [];

// Step 2: Decode base-value pairs into decimal numbers
for (const key in data) {
  if (key !== "keys") {
    const { base, value } = data[key];
    const rootValue = parseInt(value, parseInt(base));
    decodedRoots.push(rootValue);
  }
}

console.log("Decoded Roots:", decodedRoots);

// Step 3: Check if we have enough roots to proceed
if (decodedRoots.length < k) {
  console.error(`Not enough roots! Need at least ${k}, but got ${decodedRoots.length}.`);
  process.exit(1);
}

const n_roots = decodedRoots.length;
const product = decodedRoots.reduce((acc, val) => acc * val, 1);
const constantTerm = ((-1) ** n_roots) * product;

console.log(`Constant Term (c): ${constantTerm}`);
