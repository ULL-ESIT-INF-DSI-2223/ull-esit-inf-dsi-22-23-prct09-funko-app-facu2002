import "mocha";
import { expect } from "chai";
import { MyMapReduce } from "../../src/modificacion/myMapReduce";
import { AddMapReduce } from "../../src/modificacion/addMapReduce";
import { SubMapReduce } from "../../src/modificacion/subMapReduce";
import { ProdMapReduce } from "../../src/modificacion/prodMapReduce";
import { DivMapReduce } from "../../src/modificacion/divMapReduce";

const arrayAdd = [1, 2, 3, 4, 5];
const arraySub = [5, 4, 3, 2, 1];
const arrayProd = [5, 4, 3, 2, 1];
const arrayDiv = [5, 4, 3, 2, 1];


describe("Modificacion ejercicio 1 ", () => {
  it("Creación de la superclase MyMapReduce", () => {
    expect(new AddMapReduce()).to.be.an.instanceOf(AddMapReduce);
    expect(new AddMapReduce()).to.be.an.instanceOf(MyMapReduce);
    expect(new SubMapReduce()).to.be.an.instanceOf(SubMapReduce);
    expect(new SubMapReduce()).to.be.an.instanceOf(MyMapReduce);
    expect(new ProdMapReduce()).to.be.an.instanceOf(ProdMapReduce);
    expect(new ProdMapReduce()).to.be.an.instanceOf(MyMapReduce);
    expect(new DivMapReduce()).to.be.an.instanceOf(DivMapReduce);
    expect(new DivMapReduce()).to.be.an.instanceOf(MyMapReduce);
  });
  it("AddMyReduce : método que realiza el reduce pero sumando", () => {
    const add = new AddMapReduce();
    expect(add.run(arrayAdd, (x) => x * x)).to.be.equal(55);
  });
  it("SubMyReduce : método que realiza el reduce pero restando", () => {
    const sub = new SubMapReduce();
    expect(sub.run(arraySub, (x) => x * x)).to.be.equal(-5);
  });
  it("ProdMyReduce : método que realiza el reduce pero multiplicando", () => {
    const prod = new ProdMapReduce();
    expect(prod.run(arrayProd, (x) => x * x)).to.be.equal(14400);
  });
  it("DivMyReduce : método que realiza el reduce pero dividiendo", () => {
    const div = new DivMapReduce();
    expect(div.run(arrayDiv, (x) => x * x)).to.be.equal(0.043);
  });
});

