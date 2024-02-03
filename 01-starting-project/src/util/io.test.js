import { it, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs";

/**
 * Usamos mock para evitar que se ejecute la libreria fs de
 * node, que implicitamente es llamada dentro de la funcion
 * que estamos testeando.
 *
 * Con un mock simulamos esa api sin generar ningun efecto real
 * y seguimos testeando la unidad sin problemas.
 */

/**
 * Esto funciona asi, si no pasamos ningun otro parametro, vitest
 * y jest lo que hacen es generar un automocking, que busca esa
 * api, la encuentra y genera todas las funciones como spy, para
 * asi poder simular el comportamiento o bien el llamado correcto
 * de la misma.
 *
 * Para esto necesitamos importar en este archivo la api, en este
 * caso importamos fs o bien promises as fs from 'fs', que es lo
 * que nos interesa testear.
 *
 * Importante, si necesitamos hacer un test que usa esta libreria
 * en otro archivo, tambien deberemos iniciar el mock alli, ya
 * que esto al finalizar se 'desmockea'. Por lo cual es valido
 * solo en este archivo.
 */

import path from "path";

vi.mock("fs");

// Esto es curioso, pero en resumen, modificamos el comportamiento
// de un spy para hacer nuestra prueba mas sencilla.
vi.mock("path", () => {
  return {
    default: {
      join: (...args) => {
        return args[args.length - 1];
      },
    },
  };
});

it("should execute the writeFile method", () => {
  const testData = "Test";
  const testFilename = "test.txt";
  writeData(testData, testFilename);

  // return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
  //   expect(fs.writeFile).toBeCalled();
  //   expect(fs.writeFile).toBeCalledWith(testFilename, testData);
});
