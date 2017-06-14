import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Sequence } from '../models/sequence';
import { ConfigService } from '../services/config.service';

@Injectable()
export class SequenceService {
  private url = '';  // URL to web api
  constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url = config.getUrl() + "/sequence";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAll(): Promise<Sequence[]> {
    return this.http.get(this.url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Sequence[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<Sequence> {
    const url = `${this.url}/${id}`;
    return this.http.get(url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Sequence)
      .catch(this.handleError);
  }



  update(data: Sequence): Promise<Sequence> {
    const url = `${this.url}/update/${data.id}`;
    return this.http
      .put(url, JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: Sequence): Promise<Sequence> {
    return this.http
      .post(this.url + "/create", JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(res => res.json() as Sequence)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete(url, this.config.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  findByNiveau(niveauId: number): Promise<Sequence[]> {
    const url = `${this.url}/niveau/${niveauId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Sequence[])
      .catch(this.handleError);
  }

  findByTrimestre(trimestreId: number): Promise<Sequence[]> {
    const url = `${this.url}/trimestre/${trimestreId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Sequence[])
      .catch(this.handleError);
  }

}


