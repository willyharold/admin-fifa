import { Section } from '../models/section';
import { Classe } from '../models/classe';
export class Niveau {
  constructor() {
    this.section = new Section();
  }
  id: number;
  libele:string;
  level:number;
  section:Section;
  classes?: Classe[];
}
