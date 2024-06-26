class TreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
    this.totalSum = 0;
    this.totalNodes = 0;
  }

  findMin(node) {
    if (!node) return Infinity;
    let minLeft = this.findMin(node.left);
    let minRight = this.findMin(node.right);
    return Math.min(node.key, minLeft, minRight);
  }

  findMax(node) {
    if (!node) return -Infinity;
    let maxLeft = this.findMax(node.left);
    let maxRight = this.findMax(node.right);
    return Math.max(node.key, maxLeft, maxRight);
  }

  calculateAverage() {
    return this.totalNodes > 0
      ? (this.totalSum / this.totalNodes).toFixed(1)
      : 0;
  }

  checkAVL(node) {
    if (!node) return true;
    let leftAVL = this.checkAVL(node.left);
    let rightAVL = this.checkAVL(node.right);
    let isBalanced = Math.abs(this.getBalance(node)) <= 1;
    return leftAVL && rightAVL && isBalanced;
  }

  getHeight(node) {
    if (!node) return 0;
    return node.height;
  }

  getBalance(node) {
    if (!node) return 0;
    return this.getHeight(node.right) - this.getHeight(node.left);
  }

  rotateRight(y) {
    let x = y.left;
    if (!x) return y; // Sicherstellen, dass x nicht null ist

    let T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  rotateLeft(x) {
    let y = x.right;
    if (!y) return x; // Sicherstellen, dass y nicht null ist

    let T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  insert(node, key) {
    if (!node) {
      return new TreeNode(key);
    }

    if (key < node.key) {
      node.left = this.insert(node.left, key);
    } else if (key > node.key) {
      node.right = this.insert(node.right, key);
    } else {
      return node; // Vermeidung von Duplikaten
    }

    // Aktualisiere die Höhe des aktuellen Knotens
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    return node;
  }

  printFinalBalances(node) {
    if (node !== null) {
      this.printFinalBalances(node.left);
      const balance = this.getBalance(node);
      const violation = Math.abs(balance) > 1 ? " (AVL violation!)" : "";
      console.log(`bal(${node.key}) = ${balance}${violation}`);
      this.totalSum += node.key;
      this.totalNodes++;
      this.printFinalBalances(node.right);
    }
  }

  // Diese Methode überprüft, ob zwei Bäume identisch sind
  areIdentical(nodeA, nodeB) {
    if (!nodeA && !nodeB) return true;
    if (!nodeA || !nodeB) return false;
    return (
      nodeA.key === nodeB.key &&
      this.areIdentical(nodeA.left, nodeB.left) &&
      this.areIdentical(nodeA.right, nodeB.right)
    );
  }

  // Fügen Sie die Methode startSearch hinzu oder aktualisieren Sie sie wie folgt:
  findValuePath(node, key, path = []) {
    if (!node) return [];
    if (key < node.key) {
      path.push(node.key);
      return this.findValuePath(node.left, key, path);
    } else if (key > node.key) {
      path.push(node.key);
      return this.findValuePath(node.right, key, path);
    } else {
      path.push(node.key);
      return path; // Schlüssel gefunden
    }
  }

  findSubtree(node, subtreeRoot) {
    if (!node && !subtreeRoot) return true;
    if (!node || !subtreeRoot) return false;
    if (this.areIdentical(node, subtreeRoot)) return true;
    return (
      this.findSubtree(node.left, subtreeRoot) ||
      this.findSubtree(node.right, subtreeRoot)
    );
  }
  // Fügen Sie die Methode findSubtreeStructure hinzu oder aktualisieren Sie sie wie folgt:
  findSubtreeStructure(node, subtreeRoot) {
    if (!subtreeRoot) return true; // Ein leerer Subtree ist immer enthalten
    if (!node && subtreeRoot) return false; // Subtree kann nicht in einem leeren Baum sein
    if (node && !subtreeRoot) return true; // Ein nicht-leerer Subtree ist immer in einem leeren Baum enthalten

    if (node.key === subtreeRoot.key) {
      return (
        this.findSubtreeStructure(node.left, subtreeRoot.left) &&
        this.findSubtreeStructure(node.right, subtreeRoot.right)
      );
    }

    return false;
  }
}

module.exports = AVLTree;
