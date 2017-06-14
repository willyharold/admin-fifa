import { Utilisateur } from '../models/utilisateur';
import { Sequence } from '../models/sequence';
import { Matiere } from '../models/matiere';
import { Classe } from '../models/classe';
import { AnneeAcademique } from '../models/annee-academique';
export class Note {
  constructor() {
    this.eleve = new Utilisateur();
    this.sequence = new Sequence();
    this.matiere = new Matiere();
  }
  id: number;
  note_sequence: number;
  rang: string;
  observations: string;
  appreciation: string;
  note_rattrapage: number;
  eleve: Utilisateur;
  sequence: Sequence;
  matiere: Matiere;
}
