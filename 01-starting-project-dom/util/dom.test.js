import fs, { access } from "fs";
import path from "path";

import { it, expect, vi, beforeEach } from "vitest";

import { showError } from "./dom";

import { Window } from "happy-dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;

vi.stubGlobal("document", document);

beforeEach(() => {
  document.body.innerHTML = "";
  document.write(htmlDocumentContent);
});

it("should add an error paragraph to the id='errors' element", () => {
  /**
   * Ya podemos hacer todas las pruebas como si interactuaramos
   * con el dom, porque, en realidad, estamos creando un dom
   * virtual que copia lo que hay en el archivo html que hayamos
   * definido para esta prueba
   */

  showError("Test");

  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstChild;

  expect(errorParagraph).not.toBeNull();
});

it("should not contain an error paragraph initially", () => {
  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstChild;

  expect(errorParagraph).toBeNull();
});

it("should output the provided message in the error paragraph", () => {
  const testErrorMessage = "Test";

  showError(testErrorMessage);
  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstChild;

  expect(errorParagraph.textContent).toBe(testErrorMessage);
});
