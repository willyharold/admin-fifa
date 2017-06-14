import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AnneeAcademique } from '../models/annee-academique';
import { ConfigService } from '../services/config.service';

@Injectable()
export class AnneeAcademiqueService {
  private url = '';  // URL to web api
  constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url=config.getUrl()+"/anneescolaire";
   }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

 
  getAll(): Promise<AnneeAcademique[]> {
    return this.http.get(this.url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as AnneeAcademique[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<AnneeAcademique> {
    const url = `${this.url}/${id}`;
    return this.http.get(url,this.config.jwt())
      .toPromise()
      .then(response => response.json() as AnneeAcademique)
      .catch(this.handleError);
  }



  update(data: AnneeAcademique): Promise<AnneeAcademique> {
    const url = `${this.url}/update/${data.id}`;
    return this.http
      .put(url, JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: AnneeAcademique): Promise<AnneeAcademique> {
    return this.http
      .post(this.url+"/create", JSON.stringify(data),this.config.jwt())
      .toPromise()
      .then(res => res.json() as AnneeAcademique)
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


