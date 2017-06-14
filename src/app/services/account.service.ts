import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Utilisateur } from '../models/utilisateur';
import { ConfigService } from '../services/config.service';

@Injectable()
export class AccountService {
  private url = '';  // URL to web api
  constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url=config.getUrl()+"/user";
   }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

 
  getParents(): Promise<Utilisateur[]> {
    return this.http.get(this.url+'/parent', this.config.jwt())
      .toPromise()
      .then(response => response.json() as Utilisateur[])
      .catch(this.handleError);
  }

   getEleves(): Promise<Utilisateur[]> {
    return this.http.get(this.url+'/eleve', this.config.jwt())
      .toPromise()
      .then(response => response.json() as Utilisateur[])
      .catch(this.handleError);
  }

getElevesByClasseAnnee(classeId,anneeId): Promise<Utilisateur[]> {
   const url = `${this.url}/eleveclasseannee/${classeId}/${anneeId}`;
    return this.http.get(url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Utilisateur[])
      .catch(this.handleError);
  } 

  getAll(): Promise<Utilisateur[]> {
    return this.http.get(this.url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Utilisateur[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<Utilisateur> {
    const url = `${this.url}/${id}`;
    return this.http.get(url,this.config.jwt())
      .toPromise()
      .then(response => response.json() as Utilisateur)
      .catch(this.handleError);
  }



  update(data: Utilisateur): Promise<Utilisateur> {
    const url = `${this.url}/update/${data.id}`;
    return this.http
      .put(url, JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: Utilisateur): Promise<Utilisateur> {
    return this.http
      .post(this.url+"/create", JSON.stringify(data),this.config.jwt())
      .toPromise()
      .then(res => res.json() as Utilisateur)
      .catch(this.handleError);
  }



  delete(username: string): Promise<void> {
    const url = `${this.url}/delete/${username}`;
    return this.http.delete(url,this.config.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}


