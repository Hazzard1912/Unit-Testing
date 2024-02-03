import { expect, it, should } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example";

it("should generate a token value", (done) => {
  const testUserEmail = "test@test.com";

  generateToken(testUserEmail, (err, token) => {
    try {
      //   expect(token).toBe(2);
      expect(token).toBeDefined();
      done();
    } catch (err) {
      done(err);
    }
  });
});

it("should generate a token value", () => {
  const testUserEmail = "test@test.com";

  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
});

it("should generate a token value", async () => {
  const testUserEmail = "test@test.com";

  const token = await generateTokenPromise(testUserEmail);

  expect(token).toBeDefined();
});
