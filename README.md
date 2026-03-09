
# 1. What is the difference between var, let, and const?
> var

• Function scoped
• Can be redeclared and updated
• Used in older JavaScript versions
Example:
var x = 10;

> let

• Block scoped
• Can be updated but cannot be redeclared in the same scope
Example:
let y = 20;

> const

• Block scoped
• Cannot be updated or redeclared after declaration
• Value remains constant
Example:
const z = 30;

# 2. What is the spread operator (...)?
> Spread Operator
The spread operator (...) is used to expand or spread elements of an array or object.
Example:
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];

# 3. What is the difference between map(), filter(), and forEach()?
> map()

• Used to transform elements of an array
• Returns a new array
Example:
arr.map(x => x * 2);

> filter()
• Used to select elements based on a condition
• Returns a new array with filtered elements
Example:
arr.filter(x => x > 5);

> forEach()

• Used to loop through array elements
• Does not return a new array
Example:
arr.forEach(x => console.log(x));

# 4. What is an arrow function?
> Arrow Function

Arrow function is a shorter syntax for writing functions in JavaScript.
It uses the => symbol.
Example:
const add = (a, b) => {
 return a + b;
};

# 5. What are template literals?
> Template Literals

Template literals are used to create strings using backticks (``).
They allow embedding variables and expressions inside strings using ${}.
Example:
const name = "Rahim";
console.log(`Hello, ${name}! How are you?`);


