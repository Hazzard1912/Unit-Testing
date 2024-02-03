import { it, expect, describe } from "vitest";
import { extractPostData } from "./posts";

/**
 * Esta funcion necesita de un form que viene de el Dom.
 * como lo simulamos?
 *
 * En este caso estamos simulando manualmente como funciona
 * extractPostData. En verdad no usamos como tal un mock pero
 * nos sirvio para hacer el test
 */
describe("extractPostData()", () => {
  it("should extract title and content from the provided form data", () => {
    const testTitle = "Test title";
    const testContent = "Test content";

    const testFormData = {
      title: testTitle,
      content: testContent,
      get(identifier) {
        return this[identifier];
      },
    };

    const data = extractPostData(testFormData);

    expect(data.title).toBe(testTitle);
    expect(data.content).toBe(testContent);
  });
});
