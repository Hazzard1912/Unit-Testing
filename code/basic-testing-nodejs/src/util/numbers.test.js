import { it, expect } from "vitest";
import { transformToNumber } from "./numbers";

it("should return a numeric value when a valid value is passed", () => {
  const input = "1";

  const result = transformToNumber(input);

  expect(result).toBeTypeOf("number");
});

it("should return NaN when an invalid value is passed", () => {
  const input = "a";

  const result = transformToNumber(input);

  expect(result).toBeNaN(); 
});
