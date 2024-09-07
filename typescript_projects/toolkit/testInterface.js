const person = {
    name: "Alice",
    age: 30,
    greet: function () {
        console.log(`Hello, my name is ${this.name}.`);
    }
};
person.greet(); // Output: Hello, my name is Alice.
console.log(person);
export {};
