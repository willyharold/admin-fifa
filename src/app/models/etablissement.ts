import { Section } from '../models/section';
export class Etablissement {
  id: number;
  nom:string;
  sigle:string;
  devise:string;
  telephone:string;
  email:string;
  pays:string;
  ville:string;
  bp:string;
  sections?: Section[];
}
