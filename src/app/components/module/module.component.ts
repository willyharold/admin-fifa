import { Component, OnInit } from '@angular/core';
import { Module } from '../../models/module';
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
  selector: 'module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']

})
export class ModuleComponent implements OnInit {
  selected: Module = new Module();
  selectedMod: Module;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  newMod: Module = new Module();
  loading: boolean;
  modules: Module[] = [];
  annees: SelectItem[] = [];
  classes: SelectItem[] = [];
  sections: SelectItem[] = [];
  sectionId: number;

  constructor(
    private configService: ConfigService,
    private classeService: ClasseService,
    private moduleService: ModuleService,
    private anneeService: AnneeAcademiqueService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private sectionService: SectionService
  ) {
    notificationService.activeMenu();
    notificationService.removeSticky();
  }
  ngOnInit(): void {
    this.getAnnees();
    this.getModules();
    this.getClasses();
    this.getSections();
  }

  getClasses(): void {
    this.classeService.getAll()
      .then(res => {
        this.classes = [];
        this.classes.push({ label: 'Choisir une classe :', value: '' })
        for (let e of res) {
          this.classes.push({ label: e.niveau.libele + " " + e.serie + "  section " + e.niveau.section.libele, value: e.id });
        }
      });
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


  getModules(): void {
    this.moduleService.getAll()
      .then(mats => {
        this.modules = mats
      });
  }

  showDialogToAdd() {
    this.newMod = new Module();
    this.displayAddDialog = true;
  }



  showDialogToEdit(selected: Module) {
    this.sectionId = this.selected.classe.niveau.section.id;
    this.getClassesBySection();
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Module) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Module) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    console.log("fffgfgff", this.newMod),
      this.moduleService.create(this.newMod)
        .then(result => {
          this.modules.push(result);
          this.newMod = new Module();
          this.notificationService.gSuccessC();
          this.displayAddDialog = false;
          this.getModules;
          f.resetForm();
        })
        .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }


  delete(selected: Module): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.code + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.moduleService
          .delete(selected.id)
          .then(() => {
            this.modules = this.modules.filter(h => h !== selected);
            if (this.selectedMod === selected) { this.selectedMod = null; }
            this.selectedMod = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible', error.json().message) });
      }
    });
  }

  update(): void {
    this.displayEditDialog = false;
    this.moduleService.update(this.selected)
      .then(() => {
        this.notificationService.gSuccessE();
        this.getModules;//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible', error.json().message);
        this.getModules;//refresh list
      });

  }

  cancel(): void {
    this.newMod = new Module();
    this.selected = new Module();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getModules;
  }




  close(): void {
    this.displayDetailDialog = false;
  }



}
