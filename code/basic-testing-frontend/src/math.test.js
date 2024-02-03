import { it, expect } from "vitest";

import { add } from "./math";

it("should summarize all number values in an array", () => {
  // Arrange
  const numbers = [1, 2, 3];

  // Act
  const result = add(numbers);

  // Assert
  const expectedResult = numbers.reduce(
    (prevValue, curValue) => prevValue + curValue,
    0
  );
  expect(result).toBe(expectedResult);
});

it("should yield NaN if at least one invalid number is provided", () => {
  const arrayWithNonValidNumber = ["invalid", 1];

  const result = add(arrayWithNonValidNumber);

  expect(result).toBeNaN();
});

it("should yield a correct sum if an array of numeric string values is provided", () => {
  const stringNumbers = ["1", "2"];

  const result = add(stringNumbers);

  const expectedResult = stringNumbers.reduce(
    (prevValue, curValue) => +prevValue + +curValue,
    0
  );

  expect(result).toBe(expectedResult);
});

it("should yield 0 if an empty array is provided", () => {
  const input = [];

  const result = add(input);

  expect(result).toBe(0);
});

it("should throw an error if no value is passed into the function", () => {
  const resultFn = () => {
    add();
  };

  expect(resultFn).toThrow(/is not iterable/);
});

it("should throw an error if provided with multiple arguments instead of an array", () => {
  const num1 = 1;
  const num2 = 1;
  const resultFn = () => {
    add(num1, num2);
  };
  expect(resultFn).toThrow(/is not iterable/);
});
