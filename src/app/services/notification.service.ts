import { Message } from 'primeng/primeng';
import { Injectable } from '@angular/core';


@Injectable()
export class NotificationService {
  msgs: Message[];
  growl: Message[];
  enableMenu = true;
  sticky = false;


getSticky(): boolean {
    return this.sticky;
  }

  getGrowl(): Message {
    return this.growl;
  }


  getMessage(): Message {
    return this.msgs;
  }

  activeSticky() {
    this.sticky = true;
  }

  removeSticky() {
    this.sticky = false;
  }

  activeMenu() {
    this.enableMenu = true;
  }

  disableMenu() {
    this.enableMenu = false;
  }



  gSuccess(title: string, message: string): void {
    this.growl = [];
    this.growl.push({ severity: 'success', summary: title, detail: message });
  }

  gSuccessC(): void {
    this.growl = [];
    this.growl.push({ severity: 'success', summary: '', detail: "Le contenu a été enregistré." });
  }

  gErrorG(): void {
    this.growl = [];
    this.growl.push({ severity: 'error', summary: 'Suppression impossible', detail: "Il est utilisé dans d'autres contenus." });
  }

  gSuccessE(): void {
    this.growl = [];
    this.growl.push({ severity: 'success', summary: '', detail: "Le contenu a été modifié." });
  }

  gSuccessD(): void {
    this.growl = [];
    this.growl.push({ severity: 'success', summary: '', detail: "Le contenu a été suprimé." });
  }

  gInfo(title: string, message: string): void {
    this.growl = [];
    this.growl.push({ severity: 'info', summary: title, detail: message });
  }


  gWarn(title: string, message: string): void {
    this.growl = [];
    this.growl.push({ severity: 'warn', summary: title, detail: message });
  }

  gError(title: string, message: string): void {
    this.growl = [];
    this.growl.push({ severity: 'error', summary: title, detail: message });
  }

  gErrorD(): void {
    this.growl = [];
    this.growl.push({ severity: 'error', summary: '', detail: "Erreur lors de l'opération." });
  }


  mError(title: string, message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: title, detail: message });
  }


}


