import { Component, OnInit } from '@angular/core';
import { Sequence } from '../../models/sequence';
import { SequenceService } from '../../services/sequence.service';
import { TrimestreService } from '../../services/trimestre.service';
import { NiveauService } from '../../services/niveau.service';
import { ConfigService } from '../../services/config.service';
import { SectionService } from '../../services/section.service';
import { MenuItem } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { SelectItem } from '../../models/select-item';

@Component({
  selector: 'sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']

})
export class SequenceComponent implements OnInit {
  selected: Sequence = new Sequence();
  selectedSeq: Sequence;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  displayImportDialog: boolean;
  newSeq: Sequence = new Sequence();
  loading: boolean;
  sequences: Sequence[] = [];
  sections: SelectItem[] = [];
  niveaux: SelectItem[] = [];
  trimestres: SelectItem[] = [];
  sectionId: number;
  niveauId: number;
  uploadedFiles: any[] = [];


  constructor(
    private configService: ConfigService,
    private niveauService: NiveauService,
    private trimestreService: TrimestreService,
    private sequenceService: SequenceService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private sectionService: SectionService,
  ) {
    notificationService.activeMenu();
    notificationService.removeSticky();
  }
  ngOnInit(): void {
    this.getSequences();
    this.getSections();
  }


  getNiveauxBySection(): void {
    this.niveauService.findBySection(this.sectionId)
      .then(res => {
        this.niveaux = [];
        this.niveaux.push({ label: 'Choisir le niveau :', value: '' })
        for (let e of res) {
          this.niveaux.push({ label: e.libele, value: e.id });
        }
      });
  }

  getTrimestresByNiveau(): void {
    this.trimestreService.findByNiveau(this.niveauId)
      .then(res => {
        this.trimestres = [];
        this.trimestres.push({ label: 'Choisir le trimestre :', value: '' })
        for (let e of res) {
          this.trimestres.push({ label: e.libele, value: e.id });
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

  getSequences(): void {
    this.sequenceService.getAll()
      .then(mats => {
        this.sequences = mats
      });
  }

  showDialogToAdd() {
    this.newSeq = new Sequence();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: Sequence) {
    this.sectionId = selected.trimestre.niveau.section.id;
    this.niveauId = selected.trimestre.niveau.id;
    this.getNiveauxBySection();
    this.getTrimestresByNiveau();
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Sequence) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }



  create(f): void {
    // console.log("fffgfgff", this.newMat),
    this.sequenceService.create(this.newSeq)
      .then(result => {
        this.sequences.push(result);
        this.newSeq = new Sequence();
        this.notificationService.gSuccessC();
        this.displayAddDialog = false;
        this.getSequences;
        f.resetForm();
      })
      .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }


  delete(selected: Sequence): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.libele + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.sequenceService
          .delete(selected.id)
          .then(() => {
            this.sequences = this.sequences.filter(h => h !== selected);
            if (this.selectedSeq === selected) { this.selectedSeq = null; }
            this.selectedSeq = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible', error.json().message) });
      }
    });
  }

  update(): void {
    this.displayEditDialog = false;
    this.sequenceService.update(this.selected)
      .then(() => {
        //this.sequences=[];
        this.getSequences;//refresh list
        this.notificationService.gSuccessE();
      })
      .catch(error => {
        this.getSequences;//refresh list
        this.notificationService.gError('Mise à jour impossible', error.json().message);
      });

  }

  cancel(): void {
    this.newSeq = new Sequence();
    this.selected = new Sequence();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getSequences;
  }

  close(): void {
    this.displayDetailDialog = false;
  }

  onSectionChange(event) {
    this.niveaux = [];
    this.trimestres = [];
    this.getNiveauxBySection();
  }

  onNiveauChange(event) {
    this.trimestres = [];
    this.getTrimestresByNiveau();
  }

}
