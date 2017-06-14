import { Component, OnInit } from '@angular/core';
import { Section } from '../../models/section';
import { SelectItem } from '../../models/select-item';
import { Etablissement } from '../../models/etablissement';
import { SectionService } from '../../services/section.service';
import { EtablissementService } from '../../services/etablissement.service';
import { MenuItem, ConfirmationService } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']

})
export class SectionComponent implements OnInit {

  selected: Section = new Section();
  selectedSection: Section;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  newSection: Section = new Section();
  loading: boolean;
  sections: Section[] = [];
  etabs: SelectItem[] = [];
  
  constructor(
    private sectionService: SectionService,
    private etabService: EtablissementService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {
    notificationService.activeMenu();
     notificationService.removeSticky();
  }

  ngOnInit(): void {
    this.getSections();
    this.getEtabs();
  }

  getSections(): void {
    this.sectionService.getAll()
      .then(sections => this.sections = sections);
  }

  getEtabs(): void {
    this.etabService.getAll()
      .then(ets => {
        this.etabs = [];
        this.etabs.push({ label: 'Choisir un établissement :', value: '' })
        for (let e of ets) {
          this.etabs.push({ label: e.sigle, value: e.id });
        }
      });
  }

  showDialogToAdd() {
    this.newSection = new Section();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: Section) {
   this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Section) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Section) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    this.sectionService.create(this.newSection)
      .then(section => {
        f.resetForm();
        this.sections.push(section);
        this.newSection = new Section();
        this.notificationService.gSuccessC();
        this.displayAddDialog = false;
      })
      .catch(error => { this.notificationService.gError('Création impossible',  error.json().message) });;
   
  }

  delete(selected: Section): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.libele + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.sectionService
          .delete(selected.id)
          .then(() => {
            this.sections = this.sections.filter(h => h !== selected);
            if (this.selectedSection === selected) { this.selectedSection = null; }
            this.selectedSection = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible',  error.json().message) });
      }
    });
  }

  update(): void {
    this.sectionService.update(this.selected)
    this.sectionService.update(this.selected)
      .then(() => {
        this.displayEditDialog = false;
        this.notificationService.gSuccessE();
        this.getSections();//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible',  error.json().message);
        this.getSections();//refresh list
      });

  }

  cancel(): void {
    this.newSection = new Section();
    this.selected = new Section();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getSections();
  }



  close(): void {
    this.displayDetailDialog = false;
  }


}
