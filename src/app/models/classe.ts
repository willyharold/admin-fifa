import { Niveau } from '../models/niveau';
export class Classe {
   constructor() {
    this.niveau = new Niveau();
  }
  id: number;
  serie:string;
  max:number;
  niveau:Niveau;
}
