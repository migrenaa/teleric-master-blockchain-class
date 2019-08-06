class Stack {
    stack: Array<string>;

    /**
     * Initializes empty stack
     */
    constructor() {
        this.stack = new Array<string>();
    }

    public push(element: string): void {
        this.stack.push(element);
    }

    public pop(): string {
        return this.stack.pop();
    }

    public top(): string {
        return this.stack[this.stack.length - 1];
    }

    public empty(): boolean {
        return this.stack.length === 0;
    }
}


function balancedOutput(braces: string): string {
    const result = areBalanced(braces) ? "YES" : "NO";
    return result;
}

function areBalanced(braces: string): boolean {
    let stack: Stack = new Stack();

    let currentBracet: string;
    for (let index = 0; index < braces.length; index++) {
        currentBracet = braces[index];
        if (isOpeningBracet(currentBracet)) {
            stack.push(currentBracet);
        } else {
            if (isMatchingBracet(stack.top(), currentBracet)) {
                stack.pop();
            } else {
                return false;
            }
        }
    }

    return stack.empty();
}

function isOpeningBracet(currentBracet: string): boolean {
    return currentBracet === '(' ||
        currentBracet === '[' ||
        currentBracet === '{';
}

function isMatchingBracet(opening: string, closing: string) {
    return (opening === '(' && closing === ')') ||
        (opening === '[' && closing === ']') ||
        (opening === '{' && closing === '}');
}

console.log(balancedOutput("([{}])"));
console.log(balancedOutput("{[(])}"));
console.log(balancedOutput("{{[[(())]]}}"));