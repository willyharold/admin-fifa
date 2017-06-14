import { Component, OnInit } from '@angular/core';
import { Trimestre } from '../../models/trimestre';
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
  selector: 'trimestre',
  templateUrl: './trimestre.component.html',
  styleUrls: ['./trimestre.component.css']

})
export class TrimestreComponent implements OnInit {
  selected: Trimestre = new Trimestre();
  selectedTrim: Trimestre;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  displayImportDialog: boolean;
  newTrim: Trimestre = new Trimestre();
  loading: boolean;
  trimestres: Trimestre[] = [];
  sections: SelectItem[] = [];
  niveaux: SelectItem[] = [];
  sectionId: number;
  niveauId: number;
  uploadedFiles: any[] = [];


  constructor(
    private configService: ConfigService,
    private niveauService: NiveauService,
    private trimestreService: TrimestreService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private sectionService: SectionService,
  ) {
    notificationService.activeMenu();
    notificationService.removeSticky();
  }
  ngOnInit(): void {
    this.getTrimestres();
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

  getTrimestres(): void {
    this.trimestreService.getAll()
      .then(mats => {
        this.trimestres = mats
      });
  }

  showDialogToAdd() {
    this.newTrim = new Trimestre();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: Trimestre) {
    this.sectionId = selected.niveau.section.id;
    this.getNiveauxBySection();
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Trimestre) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }



  create(f): void {
    // console.log("fffgfgff", this.newMat),
    this.trimestreService.create(this.newTrim)
      .then(result => {
        this.trimestres.push(result);
        this.newTrim = new Trimestre();
        this.notificationService.gSuccessC();
        this.displayAddDialog = false;
        this.getTrimestres;
        f.resetForm();
      })
      .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }


  delete(selected: Trimestre): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.libele + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.trimestreService
          .delete(selected.id)
          .then(() => {
            this.trimestres = this.trimestres.filter(h => h !== selected);
            if (this.selectedTrim === selected) { this.selectedTrim = null; }
            this.selectedTrim = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible', error.json().message) });
      }
    });
  }

  update(): void {
    this.displayEditDialog = false;
    this.trimestreService.update(this.selected)
      .then(() => {
        this.notificationService.gSuccessE();
        this.getTrimestres;//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible', error.json().message);
        this.getTrimestres;//refresh list
      });

  }

  cancel(): void {
    this.newTrim = new Trimestre();
    this.selected = new Trimestre();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getTrimestres;
  }

  close(): void {
    this.displayDetailDialog = false;
  }

  onSectionChange(event) {
    this.niveaux = [];
    this.getNiveauxBySection();
  }

}
