const fs = require("fs");
const AVLTree = require("./tree");

const tree = new AVLTree();

// Einlesen der Schlüssel aus der Datei und Einfügen in den AVL-Baum
const keys = fs
    .readFileSync("second.txt", "utf-8")
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
/*console.log(`Test`);
keys.forEach((key) => {
    tree.root = tree.rotateTree(tree.root, key);
});
tree.printFinalBalances(tree.root);*/
console.log(`Test`);
if (isAVL == true) {
    tree.startSearch(tree.root, 3);
}
console.log(`Finished`);
