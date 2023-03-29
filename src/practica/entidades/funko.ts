import { TipoFunko, GeneroFunko } from "../enumerados/enumerados.js";
import chalk from 'chalk';

export class Funko {
  
  constructor(private id: number, private nombre: string, private descripcion: string, private tipo: TipoFunko, private genero: GeneroFunko,
    private franquicia: string, private numero: number, private exclusivo: boolean, private caracteristicas: string, private valor: number) {
  }

  get Id(): number { return this.id; }
  get Nombre(): string { return this.nombre; }
  get Valor(): number { return this.valor; }

  public toString(): string {
    let info = chalk.white(`ID : ${this.id}\n`);
    info += chalk.white(`Nombre : ${this.nombre}\n`);
    info += chalk.white(`Descripción : ${this.descripcion}\n`);
    info += chalk.white(`Tipo : ${this.tipo}\n`);
    info += chalk.white(`Género : ${this.genero}\n`);
    info += chalk.white(`Franquicia : ${this.franquicia}\n`);
    info += chalk.white(`Número de franquicia : ${this.numero}\n`);
    info += chalk.white(`Exclusivo : ${this.exclusivo}\n`);
    info += chalk.white(`Características : ${this.caracteristicas}\n`);
    if(this.valor < 20) {
      info += `Valor : ` + chalk.red(`${this.valor}\n`);
    } else if (this.valor >= 20 && this.valor < 50) {
      info += `Valor : ` + chalk.green(`${this.valor}\n`);
    } else if (this.valor >= 50 && this.valor < 100) {
      info += `Valor : ` + chalk.yellow(`${this.valor}\n`);
    } else if (this.valor >= 100) {
      info += `Valor : ` + chalk.blue(`${this.valor}\n`);
    }
    return info;
  }
}