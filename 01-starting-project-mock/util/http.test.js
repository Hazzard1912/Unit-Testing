import { it, expect, vi } from "vitest";
import { sendDataRequest } from "./http";
import { HttpError } from "./errors";

/**
 * Queremos saber que se ejecuta el fetch de esta funcion, pero
 * sin tener el efecto real.
 *
 * ya que fetch es una funcion global usamos el stubGlobal, y
 * reemplazamos su funcionamiento para que tenga un
 * comportamiento distinto al de un spy vacio.
 *
 * Hay que detallar bien el comportamiento que espera nuestro
 * unit, con el objetivo de hacer un test bien hecho
 */

const testResponseData = { test: "test" };

const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== "string") {
      return reject("Not a string");
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal("fetch", testFetch);

it("should return any available response data", () => {
  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

it("should convert the provided data to JSON before sending the request", async () => {
  const testData = { test: "test" };
  let errorMessage;
  try {
    await sendDataRequest(testData);
  } catch (error) {
    errorMessage = error;
  }
  expect(errorMessage).not.toBe("Not a string");
});

it("should throw an HttpError in case of non-ok responses", () => {
  const testData = { test: "test" };

  testFetch.mockImplementationOnce((url, options) => {
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
