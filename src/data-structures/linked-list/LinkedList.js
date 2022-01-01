import LinkedListNode from './LinkedListNode';

class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.comparatorFunction = comparatorFunction;
  }

  toString(cb) {
    let current = this.head;
    let result = [];

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    if (typeof cb === 'function') {
      return result.map(item => cb(item)).join(',');
    }

    return result.join(',');
  }

  append(value) {
    const newNode = new LinkedListNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  prepend(value) {
    const newNode = new LinkedListNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    return this;
  }

  delete(value) {
    let current = this.head;

    if (this.head === null) {
      return null;
    }

    while (this.head.value === value) {
      this.head = this.head.next;
      if (this.head === null) {
        break;
      }
    }

    current = this.head;

    while (current && current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        continue;
      }
      current = current.next;
    }

    this.tail = current;

    return new LinkedListNode(value);
  }

  deleteTail(value) {
    let current = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return current;
    }

    while (current.next && current.next.next) {
      current = current.next;
    }

    const deletedNode = current.next;
    this.tail = current;
    this.tail.next = null;

    return deletedNode;
  }

  deleteHead() {
    let current = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return current;
    }

    this.head = this.head.next;

    return current
  }

  find(node) {
    let current = this.head;
    let hasNode = false;

    if (node.callback) {
      this.comparatorFunction = null;
    }

    if (this.head === null) {
      return null;
    }

    while (current) {
      if (node.callback && node.callback(current.value)) {
        hasNode = true;
        node = current;
        break;
      }
      if (this.comparatorFunction && this.comparatorFunction(current.value, node.value) === 0) {
        hasNode = true;
        node = current;
        break;
      }
      if (!node.callback && !this.comparatorFunction) {
        if (current.value === node.value) {
          hasNode = true;
          break;
        }
      }

      current = current.next;
    }

    return hasNode ? node : null;
  }

  fromArray(arr) {
    let current;

    arr.forEach((item, i) => {
      const node = new LinkedListNode(item);

      if (i === 0) {
        this.head = node;
        current = this.head;
      } else {
        current.next = node;
        current = current.next;
        this.tail = current;
      }
    });
    console.log(this.tail);
  }

  toArray() {
    let current = this.head;
    let arr = [];

    while (current) {
      arr = [...arr, current.value];
      current = current.next;
    }

    return arr;
  }

  reverse() {
    let arr = this.toArray();
    arr = arr.reverse();

    this.fromArray(arr);
  }
}

export default LinkedList;
