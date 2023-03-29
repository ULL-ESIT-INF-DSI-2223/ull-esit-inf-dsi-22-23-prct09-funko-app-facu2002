import { MyMapReduce } from './myMapReduce.js';


/**
 * Clase que hereda de la clase abstracta MyMapReduce
 */
export class SubMapReduce extends MyMapReduce {

  /**
   * Metodo que aplica el reduce a cada elemento del array
   * @param array array de números
   * @returns número resultante de aplicar el reduce a cada elemento del array
   */
  protected myReduce(array: number[]): number {
    let resultado = array[0];
    for (let i = 1; i < array.length; i++) {
      resultado -= array[i];
    }
    return resultado;
  }

  /**
   * Método que imprime el array y lo devuelve para el correcto testeo
   * @returns array atributo
   */
  public print(): number[] {
    console.log(this.array);
    return this.array;
  }
}
