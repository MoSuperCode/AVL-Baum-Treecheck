const fs = require("fs");
const AVLTree = require("./tree");

const tree = new AVLTree();

// Einlesen der Schlüssel aus der Datei und Einfügen in den AVL-Baum
const keys = fs
  .readFileSync("avltest.txt", "utf-8")
  .trim()
  .split("\n")
  .map(Number);
keys.forEach((key) => {
  tree.root = tree.insert(tree.root, key);
});

// Finalen Balance-Status des Baumes ausgeben
tree.printFinalBalances(tree.root);

// Überprüfen, ob der Baum den AVL-Kriterien entspricht
const isAVL = tree.checkAVL(tree.root);
console.log(`AVL: ${isAVL ? "yes" : "no"}`);

// Minimale, maximale und durchschnittliche Schlüsselwerte berechnen und ausgeben
const min = tree.findMin(tree.root);
const max = tree.findMax(tree.root);
const avg = tree.calculateAverage();
console.log(`min: ${min}, max: ${max}, avg: ${avg}`);
