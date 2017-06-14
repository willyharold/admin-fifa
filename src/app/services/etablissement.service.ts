import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Etablissement } from '../models/etablissement';
import { ConfigService } from '../services/config.service';

@Injectable()
export class EtablissementService {
  private url = '';  // URL to web api
  constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url = config.getUrl() + "/etablissement";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAll(): Promise<Etablissement[]> {
    return this.http.get(this.url,this.config.jwt())
      .toPromise()
      .then(response => response.json() as Etablissement[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<Etablissement> {
    const url = `${this.url}/${id}`;
    return this.http.get(url,this.config.jwt())
      .toPromise()
      .then(response => response.json() as Etablissement)
      .catch(this.handleError);
  }



  update(data: Etablissement): Promise<Etablissement> {
    const url = `${this.url}/update/${data.id}`;
    return this.http
      .put(url, JSON.stringify(data),this.config.jwt())
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: Etablissement): Promise<Etablissement> {
    return this.http
      .post(this.url + "/create", JSON.stringify(data),this.config.jwt())
      .toPromise()
      .then(res => res.json() as Etablissement)
      .catch(this.handleError);
  }



  delete(id: number): Promise<void> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete(url,this.config.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}


