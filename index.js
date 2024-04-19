const fs = require("fs");
const AVLTree = require("./tree");

const tree = new AVLTree();

const keys = fs.readFileSync("avltest.txt", "utf-8").split("\n").map(Number);

keys.forEach((key) => {
  tree.root = tree.insert(tree.root, key);
});
