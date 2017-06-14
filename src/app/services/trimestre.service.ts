import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Trimestre } from '../models/trimestre';
import { ConfigService } from '../services/config.service';

@Injectable()
export class TrimestreService {
  private url = '';  // URL to web api
  constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url = config.getUrl() + "/trimestre";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAll(): Promise<Trimestre[]> {
    return this.http.get(this.url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Trimestre[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<Trimestre> {
    const url = `${this.url}/${id}`;
    return this.http.get(url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Trimestre)
      .catch(this.handleError);
  }



  update(data: Trimestre): Promise<Trimestre> {
    const url = `${this.url}/update/${data.id}`;
    return this.http
      .put(url, JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: Trimestre): Promise<Trimestre> {
    return this.http
      .post(this.url + "/create", JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(res => res.json() as Trimestre)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete(url, this.config.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  findByNiveau(niveauId: number): Promise<Trimestre[]> {
    const url = `${this.url}/niveau/${niveauId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Trimestre[])
      .catch(this.handleError);
  }

  findByClasse(classeId: number): Promise<Trimestre[]> {
    const url = `${this.url}/classe/${classeId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Trimestre[])
      .catch(this.handleError);
  }

}


