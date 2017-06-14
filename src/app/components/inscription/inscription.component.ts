import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { Inscription } from '../../models/inscription';
import { AccountService } from '../../services/account.service';
import { InscriptionService } from '../../services/inscription.service';
import { ConfigService } from '../../services/config.service';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { ClasseService } from '../../services/classe.service';
import { SectionService } from '../../services/section.service';
import { MenuItem } from 'primeng/primeng';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { SelectItem } from '../../models/select-item';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']

})
export class InscriptionComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
  selected: Inscription = new Inscription();
  selectedInsc: Inscription;
  displayAddDialog: boolean;
  displayAddParentDialog: boolean;
  displayAddEleveDialog: boolean;
  displayEditDialog: boolean;
  displayDetailDialog: boolean;
  displayViewDialog: boolean;
  displayImportDialog: boolean;
  newInsc: Inscription = new Inscription();
  parent: Utilisateur = new Utilisateur();
  eleve: Utilisateur = new Utilisateur();
  loading: boolean;
  inscs: Inscription[] = [];
  parents: SelectItem[] = [];
  eleves: SelectItem[] = [];
  annees: SelectItem[] = [];
  classes: SelectItem[] = [];
  sections: SelectItem[] = [];
  sectionId: number;
  uploadedFiles: any[] = [];


  constructor(
    private configService: ConfigService,
    private accountService: AccountService,
    public inscService: InscriptionService,
    private classeService: ClasseService,
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
    this.getInscrs();
    this.getParents();
    this.getEleves();
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

  getEleves(): void {
    this.accountService.getEleves()
      .then(res => {
        this.eleves = [];
        this.eleves.push({ label: 'Choisir un élève :', value: '' })
        for (let e of res) {
          this.eleves.push({ label: e.nom + " " + e.prenom + " " + e.matricule, value: e.id });
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


  getInscrs(): void {
    this.inscService.getAll()
      .then(inscs => {
        this.inscs = inscs
        console.log('insccccccc', this.inscs)

      });
  }

  showDialogToAdd() {
    this.newInsc = new Inscription();
    this.displayAddDialog = true;
  }

  showDialogToAddParent() {
    this.parent = new Utilisateur();
    this.displayAddParentDialog = true;
  }

  showDialogToAddEleve() {
    this.eleve = new Utilisateur();
    this.displayAddEleveDialog = true;
  }

  showDialogImport() {
    this.newInsc = new Inscription();
    this.sectionId = null;
    this.classes = [];
    this.displayImportDialog = true;
  }

  showDialogToEdit(selected: Inscription) {
    this.selected = selected;
    this.displayEditDialog = true;
  }

  showDialogDetails(selected: Inscription) {
    this.selected = selected;
    this.displayDetailDialog = true;
  }

  showDialogToView(selected: Inscription) {
    this.selected = selected;
    this.displayAddDialog = true;
  }

  create(f): void {
    console.log("fffgfgff", this.newInsc),
      this.inscService.create(this.newInsc)
        .then(user => {
          this.inscs.push(user);
          this.newInsc = new Inscription();
          this.notificationService.gSuccessC();
          this.displayAddDialog = false;
          this.getInscrs();
          f.resetForm();
        })
        .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }

  createParent(f): void {
    this.parent.password = this.parent.username;//le username est le password par defaut
    this.parent.role = "ROLE_PARENT";
    console.log("parent", this.parent),
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

  createEleve(f): void {
    this.eleve.password = this.eleve.username;//le username est le password par defaut
    this.eleve.role = "ROLE_ELEVE";
    console.log("eleve", this.eleve),
      this.accountService.create(this.eleve)
        .then(user => {
          this.eleve = new Utilisateur();
          this.notificationService.gSuccessC();
          this.displayAddEleveDialog = false;
          this.getEleves();//on met la liste des parents a jour
          f.resetForm();
        })
        .catch(error => { this.notificationService.gError('Création impossible', error.json().message) });;
  }

  delete(selected: Inscription): void {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer ' + selected.eleve.nom + ' ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.inscService
          .delete(selected.id)
          .then(() => {
            this.inscs = this.inscs.filter(h => h !== selected);
            if (this.selectedInsc === selected) { this.selectedInsc = null; }
            this.selectedInsc = null;
            this.notificationService.gSuccessD();
          })
          .catch(error => { this.notificationService.gError('Suppression impossible', error.json().message) });
      }
    });
  }

  update(): void {
    this.displayEditDialog = false;
    this.inscService.update(this.selected)
      .then(() => {
        this.notificationService.gSuccessE();
        this.getInscrs();//refresh list
      })
      .catch(error => {
        this.notificationService.gError('Mise à jour impossible', error.json().message);
        this.getInscrs();//refresh list
      });

  }

  cancel(): void {
    this.newInsc = new Inscription();
    this.selected = new Inscription();
    this.displayAddDialog = false;
    this.displayEditDialog = false;
    this.displayViewDialog = false;
    this.getInscrs;
  }


  cancelParent(): void {
    this.parent = new Utilisateur();
    this.displayAddParentDialog = false;
  }

  cancelEleve(): void {
    this.eleve = new Utilisateur();
    this.displayAddEleveDialog = false;
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
      //console.log('retour', event)
      this.displayImportDialog = false;
      this.getInscrs();
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

  onChange(event) {
    this.getClassesBySection();
  }

  getUploadUrl() {
    return this.inscService.getUploadUrl(this.newInsc);
  }

}
