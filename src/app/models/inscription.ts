import { AnneeAcademique } from '../models/annee-academique';
import { Utilisateur } from '../models/utilisateur';
import { Classe } from '../models/classe';
export class Inscription {
  constructor() {
    this.annee = new AnneeAcademique();
    this.eleve = new Utilisateur();
    this.classe = new Classe();
  }
  id: number;
  annee: AnneeAcademique;
  eleve: Utilisateur;
  classe: Classe;
}
