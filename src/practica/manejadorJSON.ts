import chalk from "chalk";
import { TipoFunko, GeneroFunko } from './enumerados.js';
import { Funko } from './funko.js';
import fs from 'fs';


/**
 * Clase ManejadorJSON
 */
export abstract class ManejadorJSON {

  /**
   * Método estático que determina si existe o no un usuario
   * @param usuario usuario a buscar
   * @returns booleano que indica si existe o no el usuario
   */
  private static existeUsuario(usuario: string): boolean {
    return fs.existsSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}`);
  }

  /**
   * Método estático que devuelve una lista de funkos de un usuario
   * @param usuario usuario del que se extraen los funkos
   * @returns lista de funkos
   */
  private static extraerFunkos(usuario: string): Funko[] {
    const listaFunkos: Funko[] = [];
    const listaFicheros = fs.readdirSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}`);
    for (const fichero of listaFicheros) {
      const funko = JSON.parse(fs.readFileSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/${fichero}`, 'utf-8'));
      listaFunkos.push(Object.assign(new Funko(0, '', '', TipoFunko.Pop, GeneroFunko.Normal, '', 0, false, '', 0), funko));
    }
    return listaFunkos;
  }

  /**
   * Método estático que determina si existe o no un funko en la lista de funkos de un usuario
   * @param usuario usuario del que se extraen los funkos
   * @param idFunko funko a buscar
   * @returns booleano que indica si existe o no el funko
   */
  private static existeFunko(usuario: string, idFunko: number): boolean {
    const listaFunkos = ManejadorJSON.extraerFunkos(usuario);
    for(const funkoLista of listaFunkos) {
      if(funkoLista.Id === idFunko) {
        return true;
      }
    }
    return false;
  }

  /**
   * Método estático que devuelve un funko de la lista de funkos de un usuario
   * @param usuario usuario del que se extraen los funkos
   * @param idFunko funko a buscar
   * @returns objeto funko o null si no existe
   */
  private static getFunko(usuario: string, idFunko: number): Funko | null {
    const listaFunkos = ManejadorJSON.extraerFunkos(usuario);
    for(const funkoLista of listaFunkos) {
      if(funkoLista.Id === idFunko) {
        return funkoLista;
      }
    }
    return null;
  }

  /**
   * Método estático que permite agregar un funko a la lista de funkos de un usuario
   * @param funko funko a agregar
   * @param usuario usuario al que se le agrega el funko
   * @returns booleano que indica si se ha agregado o no el funko
   */
  public static agregarFunkoDB(funko: Funko, usuario: string): boolean {
    if(ManejadorJSON.existeUsuario(usuario)) {
      if(ManejadorJSON.existeFunko(usuario, funko.Id)) {
        console.log(chalk.red(`El funko ya existe en la colección de ${usuario}.`));
        return false;
      } else {
        fs.writeFileSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/${funko.Nombre}.json`, JSON.stringify(funko));
        console.log(chalk.green(`Nuevo Funko agregado en la colección de ${usuario}.`));
        return true;
      }
    } else {
      fs.mkdirSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/`);
      fs.writeFileSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/${funko.Nombre}.json`, JSON.stringify(funko));
      console.log(chalk.green(`Usuario creado. Nuevo Funko agregado en la colección de ${usuario}.`));
      return true
    }
  }

  /**
   * Método estático que permite eliminar un funko de la lista de funkos de un usuario
   * @param idFunko funko a eliminar
   * @param usuario usuario del que se elimina el funko
   * @returns booleano que indica si se ha eliminado o no el funko
   */
  public static eliminarFunkoDB(idFunko: number, usuario: string): boolean {
    if(ManejadorJSON.existeUsuario(usuario)) {
      if(ManejadorJSON.existeFunko(usuario, idFunko)) {
        const funkoEliminado = ManejadorJSON.getFunko(usuario, idFunko);
        if(funkoEliminado !== null) {
          fs.unlinkSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/${funkoEliminado.Nombre}.json`);
          console.log(chalk.green(`Funko eliminado de la colección de ${usuario}.`));
        }
        return true;
      } else {
        console.log(chalk.red(`El funko no existe en la colección de ${usuario}.`));
        return false;
      }
    } else {
      console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
      return false;
    }
  }
 
  ///////////// TODO
  public static modificarFunkoDB(funko: Funko, usuario: string): boolean {
    if(ManejadorJSON.existeUsuario(usuario)) {
      if(ManejadorJSON.existeFunko(usuario, funko.Id)) {
        const funkoEliminado = ManejadorJSON.getFunko(usuario, funko.Id);
        if(funkoEliminado !== null) {
          fs.unlinkSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/${funkoEliminado.Nombre}.json`);
        }
        fs.writeFileSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/${funko.Nombre}.json`, JSON.stringify(funko));
        console.log(chalk.green(`Funko actualizado en la colección de ${usuario}.`));
      } else {
        console.log(chalk.red(`El funko no existe en la colección de ${usuario}.`));
      }
      return true;
    } else {
      console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
    }
    return false;
  }


  /**
   * Método estático que permite listar los funkos de un usuario
   * @param usuario usuario del que se extraen los funkos
   * @returns booleano que indica si se ha listado o no los funkos
   */
  public static listarFunkoDB(usuario: string): boolean {
    if(ManejadorJSON.existeUsuario(usuario)) {
      const listaFunkos = ManejadorJSON.extraerFunkos(usuario);
      for(const funko of listaFunkos) {
        console.log(funko.toString());
      }
      return true;
    } else {
      console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
      return false;
    }
  }


  /**
   * Método estático que permite mostrar un funko de un usuario
   * @param idFunko funko a mostrar
   * @param usuario usuario del que se extrae el funko
   * @returns booleano que indica si se ha mostrado o no el funko
   */
  public static mostrarFunkoDB(idFunko: number, usuario: string): boolean {
    if(ManejadorJSON.existeUsuario(usuario)) {
      if(ManejadorJSON.existeFunko(usuario, idFunko)) {
        const funko = ManejadorJSON.getFunko(usuario, idFunko);
        if(funko !== null) {
          console.log(funko.toString());
        }
        return true;
      } else {
        console.log(chalk.red(`El funko no existe en la colección de ${usuario}.`));
        return false;
      }
    } else {
      console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
      return false;
    }
  }
}