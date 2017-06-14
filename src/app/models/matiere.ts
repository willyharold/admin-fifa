import { Module } from '../models/module';
export class Matiere {
  constructor() {
    this.module = new Module();
  }

  id: number;
  libele: string;
  code: string;
  heure: number;
  module: Module;
}
