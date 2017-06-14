import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Utilisateur } from '../../models/utilisateur';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  loading = false;
  user: Utilisateur = new Utilisateur;
  returnUrl: string;

  constructor(
    public notificationService: NotificationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    notificationService.disableMenu();
  }

  ngOnInit() {
    // reset login status
    this.userService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  doLogin(f): void {
    this.loading = true;
    this.userService.login(this.user)
      .then(() => {
        this.router.navigate([this.returnUrl]);
      })
      .catch(error => {
        this.notificationService.mError("Erreur d'authentification", 'Paramètres de connection incorrects');
        this.loading = false;
      });;
    f.resetForm();
  }



}
