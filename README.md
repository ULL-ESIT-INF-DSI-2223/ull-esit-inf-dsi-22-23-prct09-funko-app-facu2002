# Práctica 9 : Aplicación de registro de Funko Pops

## Facundo José García Gallo


<p align="center">
  <a href="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/actions/workflows/node.js.yml">
    <img alt="Tests" src="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/actions/workflows/node.js.yml/badge.svg">
  </a>
  <a href="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/actions/workflows/coveralls.yml">
    <img alt="Coveralls" src="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/actions/workflows/coveralls.yml/badge.svg">
  </a>
  <a href="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/actions/workflows/sonarcloud.yml">
    <img alt="Sonar-Cloud" src="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/actions/workflows/sonarcloud.yml/badge.svg">
  </a>
</p>


## Índice

1. [Introducción](#introducción)
2. [Clase Funko](#clase-funko)
3. [Enumerados](#enumerados)
4. [Clase ManejadorJSON](#clase-manejadorjson)
5. [Index](#index)
6. [Modificación](#modificación)
7. [Conclusión](#conclusión)
8. [Bibliografía](#bibliografía)


### Introducción

Para la realización de la práctica primero me tuve que estudiar los módulos yargs, chalk y el sistema de ficheros de node.js, esto me permitió captar la idea de la práctica y poder desarrollarla de manera correcta. Una vez que tuve claro el funcionamiento de los módulos y el sistema de ficheros, me puse a desarrollar el programa, creé muchas clases que luego tuve que eliminar ya que me parecieron innecesarias. Al principio creé la clase usuario, la cual se encargaba de encapsular la información de un usuario (aunque solo contenía un ID de usuario y un nombre de usuario), luego opté por quitarla porque me parecía redundante y hacía mi código menos legible, ya que el hecho de no tener dos usuario iguales lo gestiono con ayuda del sistema operativo (porque es imposible tener dos directorios con el mismo nombre).
Por otro lado quiero resaltar el uso de dos bases de datos diferentes, una para el funcionamiento del programa y otra para la realización de los test, por lo que solo se debería ejecutar los comandos necesarios para la primera, ya que si ejecutamos los comandos especiales, los test fallarán al modificarse la base de datos correspondiente. Para la explicación de mi programa seguiré la jerarquía que utilicé en el mismo. Por último quiero resaltar que en el directorio /src/practica incluí un archivo con comandos ejemplos para probar el programa.

Una pequeña aclaración que quiero hacer es que tuve problemas con las GitHub Actions y los módulos ES, ya que tenía dos opciones, volver a versiones de paquetes anteriores, y así no me fallarían las GitHub Actions, o utilizar los módulos ES, y así poder utilizar las últimas versiones de los paquetes, pero me fallarían las GitHub Actions. Por lo que opté por utilizar los módulos ES y así migrar poco a poco a las versiones más actuales de los paquetes, ya que me parecía más importante y así poder utilizar las últimas funcionalidades de los mismos. También aclarar que si se ejecuta `npm run test` o `npm run coverage` se realizan las pruebas y el cubrimiento sin ningún tipo de problema.

### Clase Funko

La clase Funko encapsula la información que debe tener un funko, para ello creo un constructor en el cual se inicializan los atributos propios de un funko, que son los que se especifican en el enunciado de la práctica, el identificador del funko, que debe ser único para cada una de las instancias, por lo que al querer hacer cada una de las funcionalidades que se pide en el enunciado de la práctica debo comprobar este atributo, el nombre del funko, la descripción del mismo, el tipo y el género del funko, que lo represento con dos enumerados que explicaré a continuación, el nombre de la franquicia a la que pertenece, el número de identificación dentro de la franquicia, si es exclusivo o no, las características del funko y el valor que tiene en el mercado, es decir, el precio de compra.


```typescript	
1    constructor(private id: number, private nombre: string, private descripcion: string, private tipo: TipoFunko, private genero: GeneroFunko,
2      private franquicia: string, private numero: number, private exclusivo: boolean, private caracteristicas: string, private valor: number) {
3    }
```

También implementé tres getters de acceso a los atributos id, nombre y valor, ya que los demás no los necesitaré para ninguna función.

```typescript	
1    get Id(): number { return this.id; }
2    get Nombre(): string { return this.nombre; }
3    get Valor(): number { return this.valor; }
```
La última parte de esta clase viene dada por el único método de la misma, el método toString() que devuelve una string con la información perteneciente a una instancia de un funko. Para ello declaro una string y voy concatenando toda la información de una instancia y al final evalúo el precio del funko, y, atendiendo a su valor, le asigno un color diferente, tal y como se pide en la práctica. En mi caso, los rangos que utilicé fueron:
- [0, 20) -> rojo
- [20, 50) -> verde
- [50, 100) -> amarillo
- [100, INFINITO) -> azul
- (-INFINITO, 0) -> error (blanco)

```typescript	
1    public toString(): string {
2      let info = chalk.white(`ID : ${this.id}\n`);
3      info += chalk.white(`Nombre : ${this.nombre}\n`);
4      info += chalk.white(`Descripción : ${this.descripcion}\n`);
5      info += chalk.white(`Tipo : ${this.tipo}\n`);
6      info += chalk.white(`Género : ${this.genero}\n`);
7      info += chalk.white(`Franquicia : ${this.franquicia}\n`);
8      info += chalk.white(`Número de franquicia : ${this.numero}\n`);
9      info += chalk.white(`Exclusivo : ${this.exclusivo}\n`);
10     info += chalk.white(`Características : ${this.caracteristicas}\n`);
11     if(this.valor >= 0 && this.valor < 20) {
12       info += `Valor : ` + chalk.red(`${this.valor}\n`);
13     } else if (this.valor >= 20 && this.valor < 50) {
14       info += `Valor : ` + chalk.green(`${this.valor}\n`);
15     } else if (this.valor >= 50 && this.valor < 100) {
16       info += `Valor : ` + chalk.yellow(`${this.valor}\n`);
17     } else if (this.valor >= 100) {
18       info += `Valor : ` + chalk.blue(`${this.valor}\n`);
19     } else {
20       info += `Valor : ` + chalk.white(`Valor inválido\n`);
21     }
22     return info;
23   }
```

### Enumerados

Ahora pasaré a explicar los enumerados que utilizo para representar el tipo y el género de un funko.

Para empezar, el enumerado género incluye cuatro posibles opciones que puede tomar este atributo, así podemos acotar los valores que puede tomar este atributo, ya que si no lo hiciera, podría tomar cualquier valor y esto no es deseable. Este enumerado viene acompañado de una función que recibe una cadena y devuelve uno de los enumerados gracias a un switch.

```typescript
1    export enum TipoFunko {
2      'Pop' = 'Pop!',
3      'PopRides' = 'Pop! Rides',
4      'VynilSoda' = 'Vynil Soda',
5      'VynilGold' = 'Vynil Gold'
6    }
```

Por otro lado ocurre lo mismo con el atributo que representa el género de un funko. En este caso, el enumerado incluye siete posibles opciones, y también viene acompañado de una función que recibe una cadena y devuelve uno de los enumerados gracias a un switch.

```typescript
export enum GeneroFunko {
  'Normal' = 'Normal',
  'Animacion' = 'Animación',
  'PeliculasTV' = 'Películas y TV',
  'Videojuegos' = 'Videojuegos',
  'Deportes' = 'Deportes',
  'Musica' = 'Música',
  'Anime' = 'Ánime'
}
```



### Clase ManejadorJSON

La clase ManejadorJSON es la que se encarga de todas las funcionalidades que se piden en la práctica. Esta clase la declaro abstracta para que no se pueda instanciar ningun objeto, por lo que se trabajará con métodos estáticos, decidí hacer esto ya que no necesito ninguna instancia de esta clase para poder trabajar con ella y me pareció una buena práctica para no ocupar más memoria de la que necesito, es una idea similar a la del patrón singleton pero directamente sin instanciar ningún objeto.

Por otro lado quiero destacar otro aspecto que me parece interesante, el uso de un parámetro opcional llamado testing en todos y cada uno de los métodos de esta clase. Este parámetro es un booleano que indica si estamos trabajando con la base de datos de testeo o con la base de datos normal. Para el usuario final esto no es relevante, pero para los desarrolladores sí, ya que permite la interacción directa con la base de datos para comprobar el correcto funcionamiento de la práctica así como la correcta manipulación de los datos.

El primer método que pasaré a explicar es existeUsuario, el cual se encarga de devolver un boolean atendiendo a si existe o no un usuario en la base de datos. Para ello utilizo el método existsSync de la clase fs, el cual recibe como parámetro la ruta del archivo que queremos comprobar si existe o no. Además si el parámetro testing es true, entonces se trabajará con la base de datos de testeo.

```typescript
1    public static existeUsuario(usuario: string, testing?: boolean): boolean {
2      if(testing === undefined || testing === false) {
3        return fs.existsSync('./db/' + usuario);
4      } else if (testing === true) {
5        return fs.existsSync('./dbTesting/' + usuario);
6      }
7      return false;
8    }
```

Además creé el método existeFunko que realiza la misma función que la anterior pero con los funkos gracias a la ayuda de la función extraerFunkos que pasaré a explicar a continuación.

```typescript
1    public static existeFunko(usuario: string, idFunko: number, testing?: boolean): boolean {
2      const listaFunkos = ManejadorJSON.extraerFunkos(usuario, testing);
3      for(const funkoLista of listaFunkos) {
4        if(funkoLista.Id === idFunko) {
5          return true;
6        }
7      }
8      return false;
9    }
```


El siguiente método es extraerFunkos, el cual recibe un usuario y devuelve un vector de Funkos. Para ello utilizo el método readdirSync de la clase fs, el cual recibe como parámetro la ruta de la carpeta que queremos leer y devuelve un vector con los nombres de los ficheros que contiene. Una vez que tengo el vector de nombres de ficheros, lo recorro mientras los añado al vector de Funkos que devolveré. Para leer los ficheros utilizo el método readFileSync de la clase fs, el cual recibe como parámetro la ruta del fichero que queremos leer y devuelve un string con el contenido del fichero. Una vez que tengo el string, lo convierto a un objeto de tipo Funko con el método JSON.parse y Obkect.assign.


```typescript
1     public static extraerFunkos(usuario: string, testing?: boolean): Funko[] {
2       const listaFunkos: Funko[] = [];
3       let listaFicheros: string[] = [];
4       if(testing === undefined || testing === false) {
5         listaFicheros = fs.readdirSync('./db/' + usuario + '/');
6       } else if (testing === true) {
7         listaFicheros = fs.readdirSync('./dbTesting/' + usuario + '/');
8       }
9       for (const fichero of listaFicheros) {
10         let funko;
11         if(testing === undefined || testing === false) {
12           funko = JSON.parse(fs.readFileSync('./db/' + usuario + '/' + fichero, 'utf-8'));
13         } else if (testing === true) {
14           funko = JSON.parse(fs.readFileSync('./dbTesting/' + usuario + '/' + fichero, 'utf-8'));
15         }
16         listaFunkos.push(Object.assign(new Funko(0, '', '', TipoFunko.Pop, GeneroFunko.Normal, '', 0, false, '', 0), funko));
17       }
18       return listaFunkos;
19     }
```

El último método que realicé como complemento a las funciones principales es getFunko, el cual recibe el nombre de un usuario y el nombre de un funko y devuelve ese funko pero como instancia de la clase Funko. Para ello utilizo el método extraerFunkos para obtener un vector de funkos y lo recorro hasta encontrar el funko que estoy buscando. En caso de no encontralo devuelve null.

```typescript
1    public static getFunko(usuario: string, idFunko: number, testing?: boolean): Funko | null {
2      const listaFunkos = ManejadorJSON.extraerFunkos(usuario, testing);
3      for(const funkoLista of listaFunkos) {
4        if(funkoLista.Id === idFunko) {
5          return funkoLista;
6        }
7      }
8      return null;
9    }
```

A continuación comienzan los métodos principales de esta función, los que dan la forma a la solución de la práctica. El primer método es agregarFunkoDB el cual dividiré en dos: en la primera mitad explicaré que ocurre si un usuario existe y en la segunda parte explicaré que ocurre si el usuario no existe.

Para la primera parte se comprueba si el funko existe en la lista del usuario, en caso afirmativo se manda un mensaje de error ya que el funko sí que existe. En el otro caso, se comprueba si el parámetro testing está inicializado a true, en ambos casos se crea el fichero con el nombre del funko y se introduce el objeto funko en formato JSON, solo que lo hará en distintas bases de datos atendiendo al parámetro anteriormente mencionado.

```typescript
1    public static agregarFunkoDB(funko: Funko, usuario: string, testing?: boolean): boolean {
2      if(ManejadorJSON.existeUsuario(usuario, testing)) {
3        if(ManejadorJSON.existeFunko(usuario, funko.Id, testing)) {
4          console.log(chalk.red(`El funko ya existe en la colección de ${usuario}.`));
5          return false;
6        } else {
7          if(testing === undefined || testing === false) {
8            fs.writeFileSync('./db/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
9            console.log(chalk.green(`Nuevo Funko agregado en la colección de ${usuario}.`));
10           return true;
11         } else if (testing === true) {
12           fs.writeFileSync('./dbTesting/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
13           console.log(chalk.green(`Nuevo Funko agregado en la colección de ${usuario}.`));
14           return true;
15         }
16       }
```

Para la segunda parte lo único distinto que debemos hacer es crear el usuario antes de insertar el funko. Para ello primero creamos la carpeta del ususario con la ayuda de la función mkdirSync pasándole la ruta en la que la debe crear y el nombre de la misma. A continuación se pasa a crear el funko de la misma manera en que lo hicimos anteriormente.

```typescript
1     } else {
2       if(testing === undefined || testing === false) {
3         fs.mkdirSync('./db/' + usuario + '/');
4         fs.writeFileSync('./db/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
5         console.log(chalk.green(`Usuario creado. Nuevo Funko agregado en la colección de ${usuario}.`));
6         return true;
7       } else if (testing === true) {
8         fs.mkdirSync('./dbTesting/' + usuario + '/');
9         fs.writeFileSync('./dbTesting/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
10        console.log(chalk.green(`Usuario creado. Nuevo Funko agregado en la colección de ${usuario}.`));
12        return true;
13      }
14    }
15    return false;
16  }
```

El siguiente método es eliminarFunkoDB, este método primero comprueba si existe el usuario al que se le quiere eliminar el funko, en caso negativo se lanza un mensaje de error, en caso contrario pasaría a evaluarse si ya existe el funko, nuevamente en caso negativo se lanza un mensaje de error, en caso afirmativo seleccionamos el funko gracias a la función que explicamos antes getFunko y se hace uso de la función unlinkSync, la cual elimina el fichero del funko.


```typescript
1     public static eliminarFunkoDB(idFunko: number, usuario: string, testing?: boolean): boolean {
2       if(ManejadorJSON.existeUsuario(usuario, testing)) {
3         if(ManejadorJSON.existeFunko(usuario, idFunko, testing)) {
4           const funkoEliminado = ManejadorJSON.getFunko(usuario, idFunko, testing);
5           if(funkoEliminado !== null) {
6             if(testing === undefined || testing === false) {
7               fs.unlinkSync('./db/' + usuario + '/' + funkoEliminado.Nombre + '.json');
8             } else {
9               fs.unlinkSync('./dbTesting/' + usuario + '/' + funkoEliminado.Nombre + '.json');
10            }
11            console.log(chalk.green(`Funko eliminado de la colección de ${usuario}.`));
12          }
13          return true;
14        } else {
15          console.log(chalk.red(`El funko no existe en la colección de ${usuario}.`));
16          return false;
17        }
18      } else {
19        console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
20        return false;
21      }
22    }
```

El siguiente método es modificarFunkoDB, este método es bastante similar al anterior, primero comprueba si existe el usuario, en caso negativo se lanza un mensaje de error, en caso afrimativo se comprueba si existe el funko. En el caso en el que el funko no existe se lanza un mensaje de error y en caso contrario se selecciona el funko con la función getFunko y se elimina el fichero del funko, para después crear el nuevo funko en base a los parámetros nuevos que el usuario desea. 

```typescript
1     public static modificarFunkoDB(funko: Funko, usuario: string, testing?: boolean): boolean {
2       if(ManejadorJSON.existeUsuario(usuario, testing)) {
3         if(ManejadorJSON.existeFunko(usuario, funko.Id, testing)) {
4           const funkoEliminado = ManejadorJSON.getFunko(usuario, funko.Id, testing);
5           if(funkoEliminado !== null) {
6             if(testing === undefined || testing === false) {
7               fs.unlinkSync('./db/' + usuario + '/' + funkoEliminado.Nombre + '.json');
8             } else if (testing === true) {
9               fs.unlinkSync('./dbTesting/' + usuario + '/' + funkoEliminado.Nombre + '.json');
10            }
11          }
12          if(testing === undefined || testing === false) {
13            fs.writeFileSync('./db/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
14            console.log(chalk.green(`Funko actualizado en la colección de ${usuario}.`));
15          } else if (testing === true) {
16            fs.writeFileSync('./dbTesting/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
17            console.log(chalk.green(`Funko actualizado en la colección de ${usuario}.`));
18          }
19        } else {
20          console.log(chalk.red(`El funko no existe en la colección de ${usuario}.`));
21        }
22        return true;
23      } else {
24        console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
25      }
26      return false;
27    }
```

El siguiente método es listarFunkoDB, este método muestra por pantalla la lista de funko de un usuario, para ello primero comprueba si existe el usuario, en caso negativo se lanza un mensaje de error, en caso contrario se extrae la lista de funko del usuario y se muestra por pantalla con la función toString de la clase Funko. Hay que aclarar que el precio del funko se mostrará con un color diferente atendiendo a los rangos que establecimos anteriormente.

```typescript
1     public static listarFunkoDB(usuario: string, testing?: boolean): boolean {
2       if(ManejadorJSON.existeUsuario(usuario, testing)) {
3         const listaFunkos = ManejadorJSON.extraerFunkos(usuario, testing);
4         for(const funko of listaFunkos) {
5           console.log(funko.toString());
6         }
7         return true;
8       } else {
9         console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
10        return false;
11      }
12    }
```

El último método de esta clase es el método que muestra un único funko de un usuario, mostrarFunkoDB. Este método hace algo similar al anterior, primero comprueba si existe el usuario, en caso negativo se lanza un mensaje de error, en caso contrario se comprueba si existe el funko. En el caso en el que el funko no existe se lanza un mensaje de error y en caso contrario se selecciona el funko con la función getFunko y se muestra por pantalla con la función toString de la clase Funko. 

```typescript
1     public static mostrarFunkoDB(idFunko: number, usuario: string, testing?: boolean): boolean {
2       if(ManejadorJSON.existeUsuario(usuario, testing)) {
3         if(ManejadorJSON.existeFunko(usuario, idFunko, testing)) {
4           const funko = ManejadorJSON.getFunko(usuario, idFunko, testing);
5           if(funko !== null) {
6             console.log(funko.toString());
7           }
8           return true;
9         } else {
10          console.log(chalk.red(`El funko no existe en la colección de ${usuario}.`));
11          return false;
12        }
13      } else {
14        console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
15        return false;
16      }
17    }
```


### Index

En el fichero index.ts se encuentra todo lo necesario para manejar los comandos con los que se puede interactuar con el programa. Para ello se ha utilizado el paquete yargs, el cual nos proporciona una serie de funciones que nos permiten establecer los comandos y los parámetros que se pueden utilizar. 

El primer comando que se ha establecido es el comando que añade funkos a una colección de un usuario, para ello se declararon los parámetros de manera obligatoria que describen a un funko y el parámetro que define el nombre del usuario, luego se crea el funko y se llama a la función que agrega un funko a la colección del usuario, agregarFunkoDB. 

El siguiente comando es el que elimina un funko de la lista de un usuario. Para ello se declaran dos parámetros que deben pasarse obligatoriamente, el nombre del usuario y el id del funko, luego se llama a la función que elimina un funko de la colección del usuario, eliminarFunkoDB.

El tercer comando es el que modifica un funko de la lista de un usuario. Para ello se declaran los parámetros que deben pasarse obligatoriamente, todos los atributos que definen a un funko y el nombre del usuario al que se le quiere modificar la lista. El funko que se modificará será el que tenga el mismo id que el funko que se pasa como parámetro. Luego se crea el funko y se llama a la función modificarFunkoDB.

El cuarto comando es el que muestra la lista de funkos de un usuario. Para ello se declara un parámetro que debe pasarse obligatoriamente, el nombre del usuario. Luego se llama a la función listarFunkoDB.

La quinta y última función es la que muestra un único funko de un usuario. Para ello se declaran dos parámetros que deben pasarse obligatoriamente, el nombre del usuario y el id del funko. Luego se llama a la función mostrarFunkoDB.


### Modificación

La solución que aporté en la modificación fue sencilla, una clase madre myMapReduce y cuatro subclases, AddMapReduce, SubMapReduce, ProdMapReduce y DivMapReduce.

La clase principal cuenta con un atributo que viene a representar el array de números, por lo que en el constructor se inicializa a vacío. Además cuenta con un método run que recibe como parámetro un array de números y una función callback, este método se encarga de inicializar el array de números, de hacer una llamada a la función myMap (que a continuación pasaré a explicar su funcionamiento), de hacer una llamada a print y de devolver el resultado de la función myReduce que se debe implementar en cada una de las clases hijas.

El método myMap es similar al que hemos desarrollado en otras prácticas, recibe el array de números y una función callback, y devuelve un array de números. En este método se hace uso de la función push para ir añadiendo los resultados de la función callback a un array que se inicializa vacío. Por último se devuelve el array con los resultados de la función callback.

```typescript	
1    protected myMap(array: number[], callback: (x: number) => number): number[] {
2      const resultado: number[] = [];
3      for (let i = 0; i < array.length; i++) {
4        resultado.push(callback(array[i]));
5      }
6      this.array = resultado;
7      return resultado;
8    }
```

Hay que observar que el método myReduce se declara como abstracto porque cada una de las clases hijas debe implementar su propia versión de este método.
Por ejemplo, para la clase AddMapReduce se define el método myReduce de la siguiente manera, se inicializa una variable resultado con el primer elemento del array que se pasó por parámetro, luego se recorre el array desde el segundo elemento hasta el último y se va sumando el resultado a la variable resultado. Por último se devuelve el resultado.

```typescript
1    protected myReduce(array: number[]): number {
2      let resultado = array[0];
3      for (let i = 1; i < array.length; i++) {
4        resultado += array[i];
5      }
6      return resultado;
7    }
```

En el caso de la clase SubMapReduce se realiza exactamente lo mismo pero en vez de realizar la suma se realiza la resta.

```typescript
1    protected myReduce(array: number[]): number {
2      let resultado = array[0];
3      for (let i = 1; i < array.length; i++) {
4        resultado -= array[i];
5      }
6      return resultado;
7    }
```


En el caso de la clase ProdMapReduce se realiza exactamente lo mismo pero con la multiplicación.

```typescript
1    protected myReduce(array: number[]): number {
2      let resultado = array[0];
3      for (let i = 1; i < array.length; i++) {
4        resultado *= array[i];
5      }
6      return resultado;
7    }
```


En el caso de la clase DivMapReduce se realiza exactamente lo mismo pero con la división.

```typescript
1    protected myReduce(array: number[]): number {
2      let resultado = array[0];
3      for (let i = 1; i < array.length; i++) {
4        resultado /= array[i];
5      }
6      return Number(resultado.toFixed(3));
7    }
```

Por último hay que aclarar lo que se pretende con el patrón Template Method. Este patrón nos permite definir una estrcutura básica de un algoritmo en una clase madre, de tal manera que en las clases hijas se extienda la funcionalidad principal en la que difieren, llevado a nuestro caso práctica podemos aclarar que el método myMap es el paso común a todas las clases hijas, mientras que el método myReduce es el que se implementa de manera diferente en cada una de las clases hijas.
Este patrón nos da muchas ventajas como la reutilización y la flexibilidad de código o la reducción de errores en el mismo.



### Conclusión

Desde mi punto de vista esta ha sido una de las prácticas más entretenidas de hacer, ya que el módulo del sistema de ficheros que proporciona node.js me parece muy intuitivo y fácil de usar. Por otro lado me pareció interesante el hecho de trabajar con el paquete chalk, el cual te de la posibilidad de darle color a la salida de la terminal, ya que se pueden establecer patrones de color para los diferentes mensajes que puedan aparecer por pantalla. Por último quiero destacar el uso del último paquete, yargs, el cual me pareció fascinante cómo se puede establecer un sistema de comandos de manera tan sencilla y rápida.


### Bibliografía


[Tutorial Chalk](https://programacion.net/articulo/cambia_el_color_de_fuente_de_la_consola_de_node_js_con_chalk_1103)

[Tutorial Yargs](http://yargs.js.org/)

[Funciones que proporciona el módulo fs](https://nodejs.org/docs/latest-v19.x/api/fs.html)

