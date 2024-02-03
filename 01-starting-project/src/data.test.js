import { it, expect, describe, vi } from "vitest";
import { generateReportData } from "./data";

/**
 * Veamos como funciona el spy.
 *
 * Queremos saber si una funcion es llamada correctamente
 * y en que momento, no nos interesa nada mas en este caso.
 * 
 * Podemos ver ademas si fue llamada una cantidad determinada de
 * veces, si fue llamada con argumentos, entre otras.
 */

describe("generateReportData()", () => {
  it("should execute logFn if provided", () => {
    const logger = vi.fn(); // funcion vacia


    // podemos definir un 'comportamiento de la spy'    
    // const logger2 = vi.fn( () => {
        
    // }); 


    generateReportData(logger);

    expect(logger).toBeCalled();
  });
});
