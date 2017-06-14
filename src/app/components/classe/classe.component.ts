import { Component, OnInit } from '@angular/core';
import { Classe } from '../../models/classe';
import { SelectItem } from '../../models/select-item';
import { Niveau } from '../../models/niveau';
import { ClasseService } from '../../services/classe.service';
import { NiveauService } from '../../services/niveau.service';
import { MenuItem, ConfirmationService } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']

})
export class ClasseComponent implements OnInit {

  selected: Classe = new Classe();
  selectedClasse: Classe;
  displayAddDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  newClasse: Classe = new Classe();
  loading: boolean;
  classes: Classe[] = [];
  niveaus: SelectItem[] = [];
  
  constructor(
    private classeService: ClasseService,
    private niveauService: NiveauService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {
    notificationService.activeMenu();
    notificationService.removeSticky();
  }

  ngOnInit(): void {
    this.getClasses();
    this.getNiveaux();
  }

  getClasses(): void {
    this.classeService.getAll()
      .then(classes => this.classes = classes);
  }

  getNiveaux(): void {
    this.niveauService.getAll()
      .then(ets => {
        this.niveaus = [];
        this.niveaus.push({ label: 'Choisir un établissement :', value: '' })
        for (let e of ets) {
          this.niveaus.push({ label: e.libele, value: e.id });
        }
      });
  }

  showDialogToAdd() {
    this.newClasse = new Classe();
    this.displayAddDialog = true;
  }

  showDialogToEdit(selected: Classe) {
   this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Classe) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Classe) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    this.classeService.create(this.newClasse)
      .then(classe => {
        this.classes.push(classe);
        this.newClasse = new Classe();
        this.notificationService.gSuccessC();
        this.displayAddDialog = false;
      })
      .catch(error => { this.notificationService.gError('Création impossible',  error.json().message) });;
    f.resetForm();
  }

  delete(selected: Classe): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.serie + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.classeService
          .delete(selected.id)
          .then(() => {
            this.classes = this.classes.filter(h => h !== selected);
            if (this.selectedClasse === selected) { this.selectedClasse = null; }
            this.selectedClasse = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible',  error.json().message) });
      }
    });
  }

  update(): void {
    this.classeService.update(this.selected)
    this.classeService.update(this.selected)
      .then(() => {
        this.displayEditDialog = false;
        this.notificationService.gSuccessE();
        this.getClasses();//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible',  error.json().message);
        this.getClasses();//refresh list
      });

  }

  cancel(): void {
    this.newClasse = new Classe();
    this.selected = new Classe();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getClasses();
  }



  close(): void {
    this.displayDetailDialog = false;
  }


}
