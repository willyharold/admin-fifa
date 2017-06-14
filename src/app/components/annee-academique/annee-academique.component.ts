import { Component, OnInit } from '@angular/core';
import { AnneeAcademique } from '../../models/annee-academique';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { MenuItem } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';



@Component({
  selector: 'annee',
  templateUrl: './annee-academique.component.html',
  styleUrls: ['./annee-academique.component.css']

})
export class AnneeAcademiqueComponent implements OnInit {
  selected: AnneeAcademique = new AnneeAcademique();
  selectedAnnee: AnneeAcademique;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  newAnnee: AnneeAcademique = new AnneeAcademique();
  loading: boolean;
  annees: AnneeAcademique[] = [];

  constructor(
    private anneeService: AnneeAcademiqueService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {
    notificationService.activeMenu();
     notificationService.removeSticky();
   }
  ngOnInit(): void {
    this.getAnnees();
  }

  getAnnees(): void {
    this.anneeService.getAll()
      .then(annees => this.annees = annees);
  }

  showDialogToAdd() {
    this.newAnnee = new AnneeAcademique();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: AnneeAcademique) {
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: AnneeAcademique) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: AnneeAcademique) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    this.displayAddDialog = false;
    this.anneeService.create(this.newAnnee)
      .then(annee => {
        this.annees.push(annee);
        this.newAnnee = new AnneeAcademique();
        this.notificationService.gSuccessC();
      })
      .catch(error => { this.notificationService.gError('Création impossible',  error.json().message) });;
    f.resetForm();
  }

  delete(selected: AnneeAcademique): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.libele + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.anneeService
          .delete(selected.id)
          .then(() => {
            this.annees = this.annees.filter(h => h !== selected);
            if (this.selectedAnnee === selected) { this.selectedAnnee = null; }
            this.selectedAnnee = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible',  error.json().message) });
      }
    });
  }

  update(): void {
    console.log("lll", this.selected)
    this.displayEditDialog = false;
    this.anneeService.update(this.selected)
      .then(() => {
        this.notificationService.gSuccessE();
        this.getAnnees();//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible', error.json().message);
        this.getAnnees();//refresh list
      });

  }

  cancel(): void {
    this.newAnnee = new AnneeAcademique();
    this.selected = new AnneeAcademique();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getAnnees();
  }



  close(): void {
    this.displayDetailDialog = false;
  }



}
