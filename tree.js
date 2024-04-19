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
    let T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  rotateLeft(x) {
    let y = x.right;
    let T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  insert(node, key) {
    if (!node) {
      console.log(`Einfügen des Knotens mit Schlüssel: ${key}`);
      return new TreeNode(key);
    }

    if (key < node.key) {
      console.log(`Gehe links, um ${key} einzufügen`);
      node.left = this.insert(node.left, key);
    } else if (key > node.key) {
      console.log(`Gehe rechts, um ${key} einzufügen`);
      node.right = this.insert(node.right, key);
    } else {
      console.log(`Schlüssel ${key} existiert bereits. Überspringe Einfügen.`);
      return node; // Doppelte Schlüssel nicht erlaubt
    }

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    let balance = this.getBalance(node);

    console.log(`Balance nach Einfügen von ${key}: ${balance}`);

    if (balance > 1 || balance < -1) {
      console.log(
        `Rotation erforderlich bei Knoten ${node.key} mit Balance ${balance}`
      );
    }

    // Füge hier spezifische Logs für jede Rotation ein
    // Beispiel für eine Rotation:
    if (balance > 1 && key > node.right.key) {
      console.log(`Linke Rotation um Knoten ${node.key}`);
      return this.rotateLeft(node);
    }
  }
}

module.exports = AVLTree;
