import { Sequence } from '../models/sequence';
import { Niveau } from '../models/niveau';
export class Trimestre {
  constructor() {
    this.niveau = new Niveau();
  }
  id: number;
  libele: string;
  niveau: Niveau;
  sequences?: Sequence[];
}
