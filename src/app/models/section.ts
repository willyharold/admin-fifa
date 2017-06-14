import { Etablissement } from '../models/etablissement';
import { Niveau } from '../models/niveau';
export class Section {
  constructor() {
    this.etablissement = new Etablissement();
  }
  id: number;
  libele: string;
  etablissement: Etablissement;
  niveaux?: Niveau[];
}
