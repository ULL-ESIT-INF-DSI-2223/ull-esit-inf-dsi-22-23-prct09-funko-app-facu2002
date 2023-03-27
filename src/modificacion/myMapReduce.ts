// Implemente, a través del patrón Template Method, un algoritmo que permita llevar a cabo, como primer paso, 
// la operación map sobre una lista de números (sin hacer uso del propio método map proporcionado por TypeScript)
// y, como segundo paso, la operación reduce (sin hacer uso del propio método reduce proporcionado por TypeScript) 
// sobre la lista resultante de haber aplicado el map a la primera lista. En la clase base abstracta, la operación
// reduce debe ser abstracta (así tendremos que implementarla obligatoriamente en las subclases), mientras que la 
// operación map deberá proporcionar un comportamiento por defecto consistente en aplicar a cada elemento de la 
// lista una función pasada como parámetro a dicha operación map (este comportamiento por defecto podría sobreescribirse,
// si se deseara, en las subclases). Luego en las subclases, que podrían ser, por ejemplo, AddMapReduce, SubMapReduce,
// ProdMapReduce y DivMapReduce, entre otras, particularice la implementación de la operación reduce según corresponda.
// También añada algunos métodos de enganche (hooks) entre los pasos que haya definido en su método de plantilla.


/**
 * Clase abstracta que implementa el patrón Template Method
 */
export abstract class MyMapReduce {

  /**
   * Atributo que almacena el array
   */
  protected array: number[];

  /**
   * Constructor de la clase que crea instancias de la clase, inicializando el array
   */
  constructor() {
    this.array = [];
  }

  /**
   * Método que ejecuta el algoritmo, método de plantilla
   * @param array array de números
   * @param callback función que se le aplica a cada elemento del array
   * @returns número resultante de aplicar la función a cada elemento del array y el reduce correspondiente
   */
  public run(array: number[], callback: (x: number) => number) {
    this.array = array;
    this.myMap(this.array, callback);
    this.print();
    return this.myReduce(this.array);
  }

  /**
   * Método que aplica la función a cada elemento del array
   * @param array array de números
   * @param callback función que se le aplica a cada elemento del array
   * @returns array resultante de aplicar la función a cada elemento del array
   */
  protected myMap(array: number[], callback: (x: number) => number): number[] {
    const resultado: number[] = [];
    for (let i = 0; i < array.length; i++) {
      resultado.push(callback(array[i]));
    }
    this.array = resultado;
    return resultado;
  }

  /**
   * Método abstracto que aplica el reduce a cada elemento del array
   * @param array array de números
   */
  protected abstract myReduce(array: number[]): number;

  /**
   * Método que imprime el array, método Hook
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  abstract print(): number[];
}
