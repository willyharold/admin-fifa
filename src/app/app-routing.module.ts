import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnneeAcademiqueComponent } from './components/annee-academique/annee-academique.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { SectionComponent } from './components/section/section.component';
import { LoginComponent } from './components/login/login.component';
import { NiveauComponent } from './components/niveau/niveau.component';
import { ClasseComponent } from './components/classe/classe.component';
import { ParentComponent } from './components/parent/parent.component';
import { EleveComponent } from './components/eleve/eleve.component';
import { AuthGuard } from './security/auth-guard.service';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { MatiereComponent } from './components/matiere/matiere.component';
import { ModuleComponent } from './components/module/module.component';
import { TrimestreComponent } from './components/trimestre/trimestre.component';
import { SequenceComponent } from './components/sequence/sequence.component';
import { NoteMatiereComponent } from './components/note/matiere/matiere.component';
import { ChargeComponent } from './components/charge/charge.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'charge', component: ChargeComponent },
  { path: 'annee', component: AnneeAcademiqueComponent },
  { path: 'etablissement', component: EtablissementComponent },
  { path: 'section', component: SectionComponent },
  { path: 'niveau', component: NiveauComponent },
  { path: 'classe', component: ClasseComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'eleve', component: EleveComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'matiere', component: MatiereComponent },
  { path: 'matiere', component: MatiereComponent },
  { path: 'trimestre', component: TrimestreComponent },
  { path: 'sequence', component: SequenceComponent },
  { path: 'note/matiere', component: NoteMatiereComponent },

  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
