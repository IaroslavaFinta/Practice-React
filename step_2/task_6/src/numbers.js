export const sum = (numbers) => {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
};

export const product = (numbers) => {
  return numbers.reduce(
    (total, number) => total * number,
    1
  );
};

export const isEven = number => number % 2 === 0;

export const evens = (numbers) => {
  return numbers.filter(isEven);
};

export const odds = (numbers) => {
  return numbers.filter(number => !isEven(number))
};
