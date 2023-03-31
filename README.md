[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/fmDo8ROl)
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
6. [Conclusión](#conclusión)
7. [Bibliografía](#bibliografía)


### Introducción

Para la realización de la práctica primero me tuve que estudiar los módulos yargs, chalk y el sistema de ficheros de node.js, esto me permitió captar la idea de la práctica y poder desarrollarla de manera correcta. Una vez que tuve claro el funcionamiento de los módulos y el sistema de ficheros, me puse a desarrollar el programa, creé muchas clases que luego tuve que eliminar ya que me parecieron innecesarias. Al principio creé la clase usuario, la cual se encargaba de encapsular la información de un usuario (aunque solo contenía un ID de usuario y un nombre de usuario), luego opté por quitarla porque me parecía redundante y hacía mi código menos legible, ya que el hecho de no tener dos usuario iguales lo gestiono con ayuda del sistema operativo (porque es imposible tener dos directorios con el mismo nombre).
Por otro lado quiero resaltar el uso de dos bases de datos diferentes, una para el funcionamiento del programa y otra para la realización de los test, por lo que solo se debería ejecutar los comandos necesarios para la primera, ya que si ejecutamos los comandos especiales, los test fallarán al modificarse la base de datos correspondiente. Para la explicación de mi programa seguiré la jerarquía que utilicé en el mismo. Por último quiero resaltar que en el directorio /src/practica incluí un archivo con comandos ejemplos para probar el programa.


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



### Index




### Conclusión

Desde mi punto de vista esta ha sido una de las prácticas más entretenidas de hacer, ya que el módulo del sistema de ficheros que proporciona node.js me parece muy intuitivo y fácil de usar. Por otro lado me pareció interesante el hecho de trabajar con el paquete chalk, el cual te de la posibilidad de darle color a la salida de la terminal, ya que se pueden establecer patrones de color para los diferentes mensajes que puedan aparecer por pantalla. Por último quiero destacar el uso del último paquete, yargs, el cual me pareció fascinante cómo se puede establecer un sistema de comandos de manera tan sencilla y rápida.


### Bibliografía


[Tutorial Chalk](https://programacion.net/articulo/cambia_el_color_de_fuente_de_la_consola_de_node_js_con_chalk_1103)

[Tutorial Yargs](http://yargs.js.org/)

[Funciones que proporciona el módulo fs](https://nodejs.org/docs/latest-v19.x/api/fs.html)

