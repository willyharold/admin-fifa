import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class ConfigService {
  private url = 'http://localhost/legacy-fifa/web/app_dev.php/api/admin'; //92.243.17.72
  private baseurl = 'http://localhost/legacy-fifa/web/app_dev.php';
  private client_id = "3_5m4hvmqn54ow4c4gwo4co4scskgwococsgosk4woo0ssco00kw";
  private client_secret = '44w9ci8gmu2o40g8wskoskow4wk8cscskgck0wwccwsw40k000';
  private grant_type = 'password';

  getUrl(): string {
    return this.url;
  }

  getBaseUrl(): string {
    return this.baseurl;
  }

  getClientId(): string {
    return this.client_id;
  }

  getClientSecret(): string {
    return this.client_secret;
  }

  getGrantType(): string {
    return this.grant_type;
  }

  jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    } else {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      return new RequestOptions({ headers: headers });
    }
  }

}


