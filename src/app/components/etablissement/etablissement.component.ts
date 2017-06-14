import { Component, OnInit } from '@angular/core';
import { Etablissement } from '../../models/etablissement';
import { EtablissementService } from '../../services/etablissement.service';
import { MenuItem } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']

})
export class EtablissementComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
  selected: Etablissement = new Etablissement();
  selectedEtablissement: Etablissement;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  newEtab: Etablissement = new Etablissement();
  loading: boolean;
  etabs: Etablissement[] = [];

  constructor(
    private etabService: EtablissementService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) { 
    notificationService.activeMenu();
     notificationService.removeSticky();
  }
  ngOnInit(): void {
    this.getEtabs();
  }

  getEtabs(): void {
    this.etabService.getAll()
      .then(etabs => this.etabs = etabs);
  }

  showDialogToAdd() {
    this.newEtab = new Etablissement();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: Etablissement) {
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Etablissement) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Etablissement) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    this.displayAddDialog = false;
    this.etabService.create(this.newEtab)
      .then(etabs => {
        this.etabs.push(etabs);
        this.newEtab = new Etablissement();
        this.notificationService.gSuccessC();
      })
      .catch(error => { this.notificationService.gError('Création impossible',  error.json().message) });;
    f.resetForm();
  }

  delete(selected: Etablissement): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.sigle + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.etabService
          .delete(selected.id)
          .then(() => {
            this.etabs = this.etabs.filter(h => h !== selected);
            if (this.selectedEtablissement === selected) { this.selectedEtablissement = null; }
            this.selectedEtablissement = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible',  error.json().message) });
      }
    });
  }

  update(): void {
    this.displayEditDialog = false;
    this.etabService.update(this.selected)
      .then(() => {
        this.notificationService.gSuccessE();
        this.getEtabs();//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible',  error.json().message);
        this.getEtabs();//refresh list
      });

  }

  cancel(): void {
    this.newEtab = new Etablissement();
    this.selected = new Etablissement();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getEtabs();
  }



  close(): void {
    this.displayDetailDialog = false;
  }


}
