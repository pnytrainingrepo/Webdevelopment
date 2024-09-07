interface Person {
  name: string;
  age: number;
  greet(): void;
}

const person: Person = {
  name: "Alice",
  age: 30,
  greet: function() {
    console.log(`Hello, my name is ${this.name}.`);
  }
};

interface Employee extends Person {
  employeeId: number;
}

const employee: Employee = {
  name: "Bob",
  age: 40,
  employeeId: 12345,
  greet: function() {
    console.log(`Hello, I'm ${this.name} and my ID is ${this.employeeId}.`);
  }
};

employee.greet(); // Output: Hello, I'm Bob and my ID is 12345.


person.greet(); // Output: Hello, my name is Alice.
console.log(person);
