import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../models/select-item';
import { Niveau } from '../../models/niveau';
import { NiveauService } from '../../services/niveau.service';
import { SectionService } from '../../services/section.service';
import { MenuItem, ConfirmationService } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css']

})
export class NiveauComponent implements OnInit {

  selected: Niveau = new Niveau();
  selectedNiveau: Niveau;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  newNiveau: Niveau = new Niveau();
  loading: boolean;
  niveaus: Niveau[] = [];
  sections: SelectItem[] = [];
  
  constructor(
    private niveauService: NiveauService,
    private sectionService: SectionService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {
    notificationService.activeMenu();
     notificationService.removeSticky();
  }

  ngOnInit(): void {
    this.getNiveaus();
    this.getSections();
  }

  getNiveaus(): void {
    this.niveauService.getAll()
      .then(niveaus => this.niveaus = niveaus);
  }

  getSections(): void {
    this.sectionService.getAll()
      .then(ets => {
        this.sections = [];
        this.sections.push({ label: 'Choisir une section :', value: '' })
        for (let e of ets) {
          this.sections.push({ label: e.libele, value: e.id });
        }
      });
  }

  showDialogToAdd() {
    this.newNiveau = new Niveau();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: Niveau) {
   this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Niveau) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Niveau) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    this.niveauService.create(this.newNiveau)
      .then(niveau => {
        this.niveaus.push(niveau);
        this.newNiveau = new Niveau();
        this.notificationService.gSuccessC();
        this.displayAddDialog = false;
        f.resetForm();
      })
      .catch(error => {
         this.notificationService.gError('Création impossible',  error.json().message) });;
    
  }

  delete(selected: Niveau): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.libele + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.niveauService
          .delete(selected.id)
          .then(() => {
            this.niveaus = this.niveaus.filter(h => h !== selected);
            if (this.selectedNiveau === selected) { this.selectedNiveau = null; }
            this.selectedNiveau = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible',  error.json().message) });
      }
    });
  }

  update(): void {
    this.niveauService.update(this.selected)
    this.niveauService.update(this.selected)
      .then(() => {
        this.displayEditDialog = false;
        this.notificationService.gSuccessE();
        this.getNiveaus();//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible',  error.json().message);
        this.getNiveaus();//refresh list
      });

  }

  cancel(): void {
    this.newNiveau = new Niveau();
    this.selected = new Niveau();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getNiveaus();
  }



  close(): void {
    this.displayDetailDialog = false;
  }


}
