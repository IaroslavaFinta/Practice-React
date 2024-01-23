const isEven = number => number % 2 === 0;

export class Numbers {
  constructor(numbers) {
    this.numbers = numbers;
  }

  sum() {
    return this.numbers.reduce(
      (total, number) => total + number,
      0
    );
  };

  product () {
    return this.numbers.reduce(
      (total, number) => total * number,
      1
    );
  };

  evens () {
    return this.numbers.filter(isEven);
  };

  odds () {
    return this.numbers.filter(number => !isEven(number))
  };
}
