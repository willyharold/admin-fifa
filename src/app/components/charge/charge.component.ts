import { Component, OnInit } from '@angular/core';
import { Charge } from '../../models/charge';
import { ChargeService } from '../../services/charge.service';
import { MenuItem } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']

})
export class ChargeComponent implements OnInit {

  selected: Charge = new Charge();
  selectedCharge: Charge;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  newCharge: Charge = new Charge();
  loading: boolean;
  charges: Charge[] = [];

  constructor(
    private chargeService: ChargeService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) { 
    notificationService.activeMenu();
     notificationService.removeSticky();
  }
  ngOnInit(): void {
    this.getCharges();
  }

  getCharges(): void {
    this.chargeService.getAll()
      .then(etabs => this.charges = etabs);
  }

  showDialogToAdd() {
    this.newCharge = new Charge();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: Charge) {
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Charge) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Charge) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    this.displayAddDialog = false;
    this.chargeService.create(this.newCharge)
      .then(etabs => {
        this.charges.push(etabs);
        this.newCharge = new Charge();
        this.notificationService.gSuccessC();
      })
      .catch(error => { this.notificationService.gError('Création impossible',  error.json().message) });;
    f.resetForm();
  }

  delete(selected: Charge): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.recompense1 + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.chargeService
          .delete(selected.id)
          .then(() => {
            this.charges = this.charges.filter(h => h !== selected);
            if (this.selectedCharge === selected) { this.selectedCharge = null; }
            this.selectedCharge = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible',  error.json().message) });
      }
    });
  }

  update(): void {
    this.displayEditDialog = false;
    this.chargeService.update(this.selected)
      .then(() => {
        this.notificationService.gSuccessE();
        this.getCharges();//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible',  error.json().message);
        this.getCharges();//refresh list
      });

  }

  cancel(): void {
    this.newCharge = new Charge();
    this.selected = new Charge();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getCharges();
  }



  close(): void {
    this.displayDetailDialog = false;
  }


}
