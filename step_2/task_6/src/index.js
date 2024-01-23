import { evens, sum, product, isEven } from './numbers.js';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Product:", product(numbers));
console.log("Evens:", evens(numbers));
console.log("Sum:", sum(numbers));

console.log("2 is even?:", isEven(2));
