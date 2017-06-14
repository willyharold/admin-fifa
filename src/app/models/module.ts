import { AnneeAcademique } from '../models/annee-academique';
import { Classe } from '../models/classe';
import { Matiere } from '../models/matiere';
export class Module {
  constructor() {
    this.annee = new AnneeAcademique();
    this.classe = new Classe();
  }
  id: number;
  credit: number;
  code: string;
  annee: AnneeAcademique;
  classe: Classe;
  matieres?: Matiere[];
}
