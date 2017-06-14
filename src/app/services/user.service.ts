import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Utilisateur } from '../models/utilisateur';
import { ConfigService } from '../services/config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
  private url = '';  // URL to web api

  private loginUser: Utilisateur;
  constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url = config.getBaseUrl();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  private headers = new Headers({ 'Content-Type': 'application/json' });

  private getAuthHeaders(token) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    return new RequestOptions({ headers: headers });
  }


  getLoginUser(): Utilisateur {
    return this.loginUser;
  }

  setLoginUser(user: Utilisateur): void {
    this.loginUser = user;
  }


  /* editProfile(): Promise<Utilisateur> {
     const url = `${this.url}/update/${data.id}`;
     console.log("bbbbbbb",url)
     return this.http
       .put(url, JSON.stringify(data), { headers: this.headers })
       .toPromise()
       .then(() => data)
       .catch(this.handleError);
   }*/

  login(user: Utilisateur): Promise<any> {
    user.client_id = this.config.getClientId();
    user.client_secret = this.config.getClientSecret();
    user.grant_type = this.config.getGrantType();
    return this.http
      .post(this.url + "/oauth/v2/token", JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(result => {
        let authres = result.json();
        if (authres && authres.access_token) {
          this.http.get(this.url + "/api/profile", this.getAuthHeaders(authres.access_token)).toPromise()
            .then(res => {
              let user = res.json();
              let curentUser = new Utilisateur;
              curentUser.email = user.email;
              curentUser.username = user.username;
              curentUser.token = authres.access_token;
              localStorage.setItem('currentUser', JSON.stringify(curentUser));
            })
            .catch(this.handleError);
        }
      })
      .catch(this.handleError);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }



}


