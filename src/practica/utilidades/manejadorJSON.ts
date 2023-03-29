import chalk from "chalk";
import { TipoFunko, GeneroFunko } from '../enumerados/enumerados.js';
import { Funko } from '../entidades/funko.js';
import fs from 'fs';

export abstract class ManejadorJSON {

  private static existeUsuario(usuario: string): boolean {
    return fs.existsSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}`);
  }

  private static extraerFunkos(usuario: string): Funko[] {
    const listaFunkos: Funko[] = [];
    const listaFicheros = fs.readdirSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}`);
    for (const fichero of listaFicheros) {
      const funko = JSON.parse(fs.readFileSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/${fichero}`, 'utf-8'));
      listaFunkos.push(Object.assign(new Funko(0, '', '', TipoFunko.Pop, GeneroFunko.Normal, '', 0, false, '', 0), funko));
    }
    return listaFunkos;
  }

  private static existeFunko(usuario: string, idFunko: number): boolean {
    const listaFunkos = ManejadorJSON.extraerFunkos(usuario);
    for(const funkoLista of listaFunkos) {
      if(funkoLista.Id === idFunko) {
        return true;
      }
    }
    return false;
  }

  private static getFunko(usuario: string, idFunko: number): Funko | null {
    const listaFunkos = ManejadorJSON.extraerFunkos(usuario);
    for(const funkoLista of listaFunkos) {
      if(funkoLista.Id === idFunko) {
        return funkoLista;
      }
    }
    return null;
  }

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
    }
    return false;
  }

  public static eliminarFunkoDB(idFunko: number, usuario: string): boolean {
    if(ManejadorJSON.existeUsuario(usuario)) {
      if(ManejadorJSON.existeFunko(usuario, idFunko)) {
        const funkoEliminado = ManejadorJSON.getFunko(usuario, idFunko);
        if(funkoEliminado !== null) {
          fs.unlinkSync(`/home/usuario/ull-esit-inf-dsi-22-23-prct09-funko-app-facu2002/db/${usuario}/${funkoEliminado.Nombre}.json`);
          console.log(chalk.green(`Funko eliminado de la colección de ${usuario}.`));
        }
      } else {
        console.log(chalk.red(`El funko no existe en la colección de ${usuario}.`));
      }
      return true;
    } else {
      console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
    }
    return false;
  }

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

  // TODO : dividir por rangos
  public static listarFunkoDB(usuario: string): boolean {
    if(ManejadorJSON.existeUsuario(usuario)) {
      const listaFunkos = ManejadorJSON.extraerFunkos(usuario);
      for(const funko of listaFunkos) {
        console.log(funko.toString());
      }
      return true;
    } else {
      console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
    }
    return false;
  }

  public static mostrarFunkoDB(idFunko: number, usuario: string): boolean {
    if(ManejadorJSON.existeUsuario(usuario)) {
      if(ManejadorJSON.existeFunko(usuario, idFunko)) {
        const funko = ManejadorJSON.getFunko(usuario, idFunko);
        if(funko !== null) {
          console.log(funko.toString());
        }
      } else {
        console.log(chalk.red(`El funko no existe en la colección de ${usuario}.`));
      }
      return true;
    } else {
      console.log(chalk.red('Uupps! El usuario no existe, pruebe con otro usuario.'));
    }
    return false;
  }
}