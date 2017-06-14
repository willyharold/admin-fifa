import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DataTableModule,
  ContextMenuModule,
  GrowlModule,
  ButtonModule,
  DialogModule,
  ConfirmDialogModule,
  ConfirmationService,
  DropdownModule,
  MessagesModule,
  PanelModule,
  CalendarModule,
  FileUploadModule
} from 'primeng/primeng';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AnneeAcademiqueComponent } from './components/annee-academique/annee-academique.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { SectionComponent } from './components/section/section.component';
import { LoginComponent } from './components/login/login.component';
import { NiveauComponent } from './components/niveau/niveau.component';
import { ClasseComponent } from './components/classe/classe.component';
import { ParentComponent } from './components/parent/parent.component';
import { EleveComponent } from './components/eleve/eleve.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { MatiereComponent } from './components/matiere/matiere.component';
import { ModuleComponent } from './components/module/module.component';
import { TrimestreComponent } from './components/trimestre/trimestre.component';
import { SequenceComponent } from './components/sequence/sequence.component';
import { ChargeComponent } from './components/charge/charge.component';
import { NoteMatiereComponent } from './components/note/matiere/matiere.component';

import { ConfigService } from './services/config.service';
import { NotificationService } from './services/notification.service';
import { AnneeAcademiqueService } from './services/annee-academique.service';
import { EtablissementService } from './services/etablissement.service';
import { SectionService } from './services/section.service';
import { UserService } from './services/user.service';
import { NiveauService } from './services/niveau.service';
import { AccountService } from './services/account.service';
import { ClasseService } from './services/classe.service';
import { InscriptionService } from './services/inscription.service';
import { AuthGuard } from './security/auth-guard.service';
import { MatiereService } from './services/matiere.service';
import { ModuleService } from './services/module.service';
import { TrimestreService } from './services/trimestre.service';
import { SequenceService } from './services/sequence.service';
import { NoteService } from './services/note.service';
import { ChargeService } from './services/charge.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    ContextMenuModule,
    GrowlModule,
    ConfirmDialogModule,
    ButtonModule,
    DialogModule,
    HttpModule,
    DropdownModule,
    MessagesModule,
    PanelModule,
    CalendarModule,
    FileUploadModule,
    MaterialModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AnneeAcademiqueComponent,
    EtablissementComponent,
    SectionComponent,
    LoginComponent,
    NiveauComponent,
    ClasseComponent,
    ParentComponent,
    EleveComponent,
    ModuleComponent,
    MatiereComponent,
    InscriptionComponent,
    TrimestreComponent,
    SequenceComponent,
    NoteMatiereComponent,
    ChargeComponent
  ],
  providers: [
    AnneeAcademiqueService,
    NotificationService,
    ConfirmationService,
    EtablissementService,
    ConfigService,
    SectionService,
    UserService,
    NiveauService,
    ClasseService,
    AccountService,
    InscriptionService,
    ModuleService,
    MatiereService,
    TrimestreService,
    SequenceService,
    NoteService,
    ChargeService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }