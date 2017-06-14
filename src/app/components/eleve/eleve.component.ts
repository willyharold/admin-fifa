import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { AccountService } from '../../services/account.service';
import { MenuItem } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { SelectItem } from '../../models/select-item';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']

})
export class EleveComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
  selected: Utilisateur = new Utilisateur();
  selectedUser: Utilisateur;
  displayAddDialog: boolean;
  displayAddParentDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  newUser: Utilisateur = new Utilisateur();
  parent: Utilisateur = new Utilisateur();
  loading: boolean;
  users: Utilisateur[] = [];
  parents: SelectItem[] = [];

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {
    notificationService.activeMenu();
    notificationService.removeSticky();
  }
  ngOnInit(): void {
    this.getUsers();
    this.getParents();
  }

  getParents(): void {
    this.accountService.getParents()
      .then(res => {
        this.parents = [];
        this.parents.push({ label: 'Choisir son parent :', value: '' })
        for (let e of res) {
          this.parents.push({ label: e.nom + " " + e.telephone, value: e.id });
        }
      });
  }

  getUsers(): void {
    this.accountService.getEleves()
      .then(users => this.users = users);
  }

  showDialogToAdd() {
    this.newUser = new Utilisateur();
    this.displayAddDialog = true;
  }

  showDialogToAddParent() {
    this.parent = new Utilisateur();
    this.displayAddParentDialog = true;
  }

  showDialogToEdit(selected: Utilisateur) {
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Utilisateur) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Utilisateur) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    this.newUser.password = this.newUser.username;//le username est le password par defaut
    this.newUser.role = "ROLE_ELEVE";
    console.log("fffgfgff", this.newUser),
      this.accountService.create(this.newUser)
        .then(user => {
          this.users.push(user);
          this.newUser = new Utilisateur();
          this.notificationService.gSuccessC();
          this.displayAddDialog = false;
          f.resetForm();
        })
        .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }

  createParent(f): void {
    this.parent.password = this.parent.username;//le username est le password par defaut
    this.parent.role = "ROLE_PARENT";
    console.log("fffgfgff", this.parent),
      this.accountService.create(this.parent)
        .then(user => {
          this.parent = new Utilisateur();
          this.notificationService.gSuccessC();
          this.displayAddParentDialog = false;
          this.getParents();//on met la liste des parents a jour
          f.resetForm();
        })
        .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }

  delete(selected: Utilisateur): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.username + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.accountService
          .delete(selected.username)
          .then(() => {
            this.users = this.users.filter(h => h !== selected);
            if (this.selectedUser === selected) { this.selectedUser = null; }
            this.selectedUser = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible', error.json().message) });
      }
    });
  }

  update(): void {
    this.displayEditDialog = false;
    this.accountService.update(this.selected)
      .then(() => {
        this.notificationService.gSuccessE();
        this.getUsers();//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible', error.json().message);
        this.getUsers();//refresh list
      });

  }

  cancel(): void {
    this.newUser = new Utilisateur();
    this.selected = new Utilisateur();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getUsers();
  }


  cancelParent(): void {
    this.parent = new Utilisateur();
    this.displayAddParentDialog = false;
  }



  close(): void {
    this.displayDetailDialog = false;
  }



}
