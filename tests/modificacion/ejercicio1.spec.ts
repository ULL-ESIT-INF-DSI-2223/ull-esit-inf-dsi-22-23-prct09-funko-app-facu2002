import "mocha";
import { expect } from "chai";
import { hola } from "../../src/modificacion/ejercicio1";

describe("Ejercicio 1 - hola()", () => {
  it("Debería devolver 'Hola mundo'", () => {
    expect(hola()).to.be.equal("Hola mundo");
  });
});