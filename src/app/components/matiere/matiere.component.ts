import { Component, OnInit } from '@angular/core';
import { Matiere } from '../../models/matiere';
import { Module } from '../../models/module';
import { MatiereService } from '../../services/matiere.service';
import { ModuleService } from '../../services/module.service';
import { ConfigService } from '../../services/config.service';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { ClasseService } from '../../services/classe.service';
import { SectionService } from '../../services/section.service';
import { MenuItem } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { SelectItem } from '../../models/select-item';

@Component({
  selector: 'matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']

})
export class MatiereComponent implements OnInit {
  selected: Matiere = new Matiere();
  selectedMat: Matiere;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  displayImportDialog: boolean;
  newMat: Matiere = new Matiere();
  loading: boolean;
  matieres: Matiere[] = [];
  annees: SelectItem[] = [];
  classes: SelectItem[] = [];
  sections: SelectItem[] = [];
  modules: SelectItem[] = [];
  sectionId: number;
  classeId: number;
  anneeId: number;
  uploadedFiles: any[] = [];


  constructor(
    private configService: ConfigService,
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private anneeService: AnneeAcademiqueService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private sectionService: SectionService,
    private moduleService: ModuleService
  ) {
    notificationService.activeMenu();
    notificationService.removeSticky();
  }
  ngOnInit(): void {
    this.getMatieres();
    this.getAnnees();
    this.getSections();
  }


  getClassesBySection(): void {
    this.classeService.findBySection(this.sectionId)
      .then(res => {
        this.classes = [];
        this.classes.push({ label: 'Choisir une classe :', value: '' })
        for (let e of res) {
          this.classes.push({ label: e.niveau.libele + " " + e.serie + "  section " + e.niveau.section.libele, value: e.id });
        }
      });
  }

  getModulesByClasse(): void {
    this.moduleService.findByClasseAnnee(this.classeId, this.anneeId)
      .then(res => {
        //console.log('result',res);
        this.modules = [];
        this.modules.push({ label: 'Choisir un module :', value: '' })
        for (let e of res) {
          this.modules.push({ label: e.code, value: e.id });
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


  getMatieres(): void {
    this.matiereService.getAll()
      .then(mats => {
        this.matieres = mats
      });
  }

  showDialogToAdd() {
    this.newMat = new Matiere();
    this.displayAddDialog = true;
  }

  showDialogImport() {
    this.newMat = new Matiere();
    this.sectionId = null;
    this.classes = [];
    this.displayImportDialog = true;
  }

  showDialogToEdit(selected: Matiere) {
    this.sectionId = selected.module.classe.niveau.section.id;
    this.classeId = selected.module.classe.id;
    this.anneeId = selected.module.annee.id;
    this.getClassesBySection();
    this.getModulesByClasse();
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Matiere) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Matiere) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    console.log("fffgfgff", this.newMat),
      this.newMat.module.annee.id = this.anneeId;
    this.matiereService.create(this.newMat)
      .then(result => {
        this.matieres.push(result);
        this.newMat = new Matiere();
        this.notificationService.gSuccessC();
        this.displayAddDialog = false;
        this.getMatieres;
        f.resetForm();
      })
      .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }


  delete(selected: Matiere): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.code + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.matiereService
          .delete(selected.id)
          .then(() => {
            this.matieres = this.matieres.filter(h => h !== selected);
            if (this.selectedMat === selected) { this.selectedMat = null; }
            this.selectedMat = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible', error.json().message) });
      }
    });
  }

  update(): void {
    this.selected.module.annee.id = this.anneeId;
    this.displayEditDialog = false;
    this.matiereService.update(this.selected)
      .then(() => {
        this.notificationService.gSuccessE();
        this.getMatieres;//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible', error.json().message);
        this.getMatieres;//refresh list
      });

  }

  cancel(): void {
    this.newMat = new Matiere();
    this.selected = new Matiere();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getMatieres;
  }




  close(): void {
    this.displayDetailDialog = false;
  }


  onUpload(event) {
    for (let file of event.files) {
      console.log('file', file)
      this.uploadedFiles.push(file);
    }

    console.log('result', event.xhr)

    if (event.xhr) {
      this.notificationService.removeSticky();
      console.log('retour', event)
      this.displayImportDialog = false;
      this.getMatieres;
      var successjson = event.xhr.response;
      var succestext = JSON.parse(successjson)
      this.notificationService.gSuccess("Importation faite avec succès", succestext.message);
    }

  }


  onError(event) {
    console.log('error', event.xhr)
    this.notificationService.activeSticky();
    var errorjson = event.xhr.response;
    var errortext = JSON.parse(errorjson)
    this.notificationService.gError("Erreur d'importation", errortext.message);

  }



  onBeforeSend(event) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      event.xhcurrentUser.tokenr.setRequestHeader("Authorization", "Bearer " + currentUser.token);
    }
  }

  onSectionChange(event) {
    this.classes = [];
    this.modules = [];
    this.getClassesBySection();
  }

  onAnneeChange(event) {
    this.classes = [];
    this.modules = [];
    this.getSections();
  }


  onClasseChange(event) {
    this.modules = [];
    this.getModulesByClasse();
  }

  getUploadUrl() {
    this.newMat.module.annee.id = this.anneeId;
    return this.matiereService.getUploadUrl(this.newMat);
  }

}
