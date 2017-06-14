import { Component, OnInit } from '@angular/core';
import { Note } from '../../../models/note';
import { Utilisateur } from '../../../models/utilisateur';
import { NoteService } from '../../../services/note.service';
import { TrimestreService } from '../../../services/trimestre.service';
import { SequenceService } from '../../../services/sequence.service';
import { AnneeAcademiqueService } from '../../../services/annee-academique.service';
import { MatiereService } from '../../../services/matiere.service';
import { AccountService } from '../../../services/account.service';
import { ClasseService } from '../../../services/classe.service';
import { NiveauService } from '../../../services/niveau.service';
import { ConfigService } from '../../../services/config.service';
import { SectionService } from '../../../services/section.service';
import { MenuItem } from 'primeng/primeng';
import { NotificationService } from '../../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { SelectItem } from '../../../models/select-item';

@Component({
  selector: 'note-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']

})
export class NoteMatiereComponent implements OnInit {
  selected: Note = new Note();
  selectedNote: Note;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayImportDialog: boolean;
  newNote: Note = new Note();
  loading: boolean;
  notes: Note[] = [];
  sections: SelectItem[] = [];
  annees: SelectItem[] = [];
  trimestres: SelectItem[] = [];
  classes: SelectItem[] = [];
  sequences: SelectItem[] = [];
  matieres: SelectItem[] = [];
  eleves: SelectItem[] = [];
  sectionId: number;
  anneeId: number;
  classeId: number;
  trimestreId: number;
  sequenceId: number;
  eleveId: number;
  matiereId: number;
  uploadedFiles: any[] = [];


  constructor(
    private configService: ConfigService,
    private niveauService: NiveauService,
    private anneeService: AnneeAcademiqueService,
    private classeService: ClasseService,
    private trimestreService: TrimestreService,
    private sequenceService: SequenceService,
    private matiereService: MatiereService,
    private noteService: NoteService,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private sectionService: SectionService,
  ) {
    notificationService.activeMenu();
    notificationService.removeSticky();
  }
  ngOnInit(): void {
    this.getAnnees();
    this.getSections();
  }


  getClassesBySection(): void {
    this.classeService.findBySection(this.sectionId)
      .then(res => {
        this.classes = [];
        this.classes.push({ label: 'Choisir la classe :', value: '' })
        for (let e of res) {
          this.classes.push({ label: e.niveau.libele + ' ' + e.serie, value: e.id });
        }
      });
  }

  getTrimestresByClasse(): void {
    this.trimestreService.findByClasse(this.classeId)
      .then(res => {
        this.trimestres = [];
        this.trimestres.push({ label: 'Choisir le trimestre :', value: '' })
        for (let e of res) {
          this.trimestres.push({ label: e.libele, value: e.id });
        }
      });
  }

  getSequencesByTrimestre(): void {
    this.sequenceService.findByTrimestre(this.trimestreId)
      .then(res => {
        this.sequences = [];
        this.sequences.push({ label: 'Choisir une séquence :', value: '' })
        for (let e of res) {
          this.sequences.push({ label: e.libele, value: e.id });
        }
      });
  }

  getMatieres(): void {
    this.matiereService.findByClasseAnnee(this.classeId, this.anneeId)
      .then(res => {
        this.matieres = [];
        this.matieres.push({ label: 'Choisir une matière :', value: '' })
        for (let e of res) {
          this.matieres.push({ label: e.module.code + " " + e.libele, value: e.id });
        }
      });
  }

  getSections(): void {
    this.sectionService.getAll()
      .then(res => {
        this.sections = [];
        this.sections.push({ label: 'Choisir une section :', value: '' })
        for (let e of res) {
          this.sections.push({ label: "section " + e.libele, value: e.id });
        }
      });
  }


  getAnnees(): void {
    this.anneeService.getAll()
      .then(res => {
        this.annees = [];
        this.annees.push({ label: 'Choisir une année :', value: '' })
        for (let e of res) {
          this.annees.push({ label: e.libele, value: e.id });
        }
      });
  }



  getNotes(): void {
    this.noteService.findBySequenceMatiere(this.sequenceId, this.matiereId)
      .then(mats => {
        this.notes = mats
      });
  }

  getEleves(): void {
    this.accountService.getElevesByClasseAnnee(this.classeId, this.anneeId)
      .then(res => {
        console.log('rrrrrrrrr',res)
        this.eleves = [];
        this.eleves.push({ label: 'Choisir un élève :', value: '' })
        for (let e of res) {
          this.eleves.push({ label: e.nom+' '+e.prenom+' '+e.matricule, value: e.id });
        }
      });
  }

  showDialogToAdd() {
    this.newNote = new Note();
    this.getEleves();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: Note) {
    this.selected = selected;
    this.displayEditDialog = true;
  }


  create(f): void {
    // console.log("fffgfgff", this.newMat),
    this.newNote.sequence.id = this.sequenceId;
    this.newNote.eleve.id = this.eleveId;
    this.newNote.matiere.id = this.matiereId;
    this.noteService.create(this.newNote)
      .then(result => {
        this.notes.push(result);
        this.newNote = new Note();
        this.notificationService.gSuccessC();
        this.displayAddDialog = false;
        this.getNotes;
        f.resetForm();
      })
      .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }

  filter(f): void {
        this.getNotes();
        this.notificationService.gSuccess('','les notes sont affichées')
   }


  delete(selected: Note): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer la note de ' + selected.eleve.nom + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.noteService
          .delete(selected.id)
          .then(() => {
            this.notes = this.notes.filter(h => h !== selected);
            if (this.selectedNote === selected) { this.selectedNote = null; }
            this.selectedNote = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible', error.json().message) });
      }
    });
  }

  update(): void {
    this.displayEditDialog = false;
    this.noteService.update(this.selected)
      .then(() => {
        //this.Notes=[];
        this.getNotes;//refresh list
        this.notificationService.gSuccessE();
      })
      .catch(error => {
        this.getNotes;//refresh list
        this.notificationService.gError('Mise à jour impossible', error.json().message);
      });

  }

  cancel(): void {
    this.newNote = new Note();
    this.selected = new Note();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.getNotes;
  }

  onAnneeChange(event) {
    this.matieres = [];
    if (this.classeId) {
      this.getMatieres();
    }
  }

  onSectionChange(event) {
    this.classes = [];
    this.trimestres = [];
    this.sequences = [];
    this.matieres = [];
    this.getClassesBySection();
  }

  onClasseChange(event) {
    this.trimestres = [];
    this.sequences = [];
    this.matieres = [];
    this.getTrimestresByClasse();
  }

  onTrimestreChange(event) {
    this.sequences = [];
    this.matieres = [];
    this.getSequencesByTrimestre();
  }

  onSequenceChange(event) {
    this.matieres = [];
    this.getMatieres();
  }



}
