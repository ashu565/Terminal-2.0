//@ts-nocheck
export const tt = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];
const obj = {};
tt.map((ss, i) => {
    obj[ss] = i;
});
console.log(obj);
class Node {
    constructor() {
        this.links = Array(26);
        this.flag = false;
    }
    containsKey(c) {
        if (this.links[obj[c]]) {
            return true;
        }
        return false;
    }

    put(c, node) {
        this.links[obj[c]] = node;
    }

    get(c) {
        return this.links[obj[c]];
    }
    setEnd() {
        this.flag = true;
    }
}
class Trie {
    constructor() {
        this.root = new Node();
    }
    insert(s) {
        let node = this.root;
        for (let i = 0; i < s.length; i++) {
            const c = s[i];
            if (!node.containsKey(c)) {
                node.put(c, new Node());
            }
            node = node.get(c);
        }
        node.setEnd();
    }
    search(node, ans, s) {
        // debug(s,ans);
        if (!node) return;
        if (node.flag) {
            ans.push(s);
        }
        for (let i = 0; i < 26; i++) {
            if (node.links[i]) {
                const t = s;
                s = s + tt[i];
                this.search(node.links[i], ans, s);
                s = t;
            }
        }
    }
    pref_search(s) {
        let node = this.root;
        // check if exists
        for (let i = 0; i < s.length; i++) {
            const c = s[i];
            if (!node.containsKey(c)) {
                return [];
            }
            node = node.get(c);
        }
        let ans = [];
        this.search(node, ans, s);
        return ans;
    }
}

export default Trie;