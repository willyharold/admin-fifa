import { Trimestre } from '../models/trimestre';
import { Niveau } from '../models/niveau';
export class Sequence {
  constructor() {
    this.trimestre = new Trimestre();
  }
  id: number;
  libele: string;
  trimestre: Trimestre;
}
