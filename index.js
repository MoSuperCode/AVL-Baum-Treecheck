const fs = require("fs");
const AVLTree = require("./tree");

function readTreeFromFile(filepath) {
  return fs.readFileSync(filepath, "utf-8").trim().split("\n").map(Number);
}

function buildSubtreeFromKeys(keys) {
  const subtree = new AVLTree();
  keys.forEach((key) => {
    subtree.root = subtree.insert(subtree.root, key);
  });
  return subtree;
}

// Verarbeitung der Kommandozeilenargumente
const [searchTreeFile, subtreeFile] = process.argv.slice(2);
const searchTreeKeys = readTreeFromFile(searchTreeFile);
const subtreeKeys = readTreeFromFile(subtreeFile);

// Aufbau des Suchbaumes
const searchTree = new AVLTree();
searchTreeKeys.forEach((key) => {
  searchTree.root = searchTree.insert(searchTree.root, key);
});

// Balance-Informationen und Statistiken ausgeben
searchTree.printFinalBalances(searchTree.root);
const isAVL = searchTree.checkAVL(searchTree.root);
console.log(`AVL: ${isAVL ? "yes" : "no"}`);
const min = searchTree.findMin(searchTree.root);
const max = searchTree.findMax(searchTree.root);
const avg = searchTree.calculateAverage();
console.log(`min: ${min}, max: ${max}, avg: ${avg}`);

// Einfache Suche oder Suche nach einem Subtree
if (subtreeKeys.length === 1) {
  const key = subtreeKeys[0];
  const path = searchTree.findValuePath(searchTree.root, key);
  if (path.length > 0) {
    console.log(`${key} found ${path.join(", ")}`);
  } else {
    console.log(`${key} not found!`);
  }
} else {
  const subtree = buildSubtreeFromKeys(subtreeKeys);
  const isSubtreeFound = searchTree.findSubtree(searchTree.root, subtree.root);
  console.log(isSubtreeFound ? "Subtree found" : "Subtree not found!");
}
