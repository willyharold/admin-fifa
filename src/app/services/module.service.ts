import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Module } from '../models/module';
import { ConfigService } from '../services/config.service';

@Injectable()
export class ModuleService {
  private url = '';  // URL to web api
  constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url = config.getUrl() + "/module";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAll(): Promise<Module[]> {
    return this.http.get(this.url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Module[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<Module> {
    const url = `${this.url}/${id}`;
    return this.http.get(url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Module)
      .catch(this.handleError);
  }

  update(data: Module): Promise<Module> {
    const url = `${this.url}/update/${data.id}`;
    return this.http
      .put(url, JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: Module): Promise<Module> {
    return this.http
      .post(this.url + "/create", JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(res => res.json() as Module)
      .catch(this.handleError);
  }



  delete(id: number): Promise<void> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete(url, this.config.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


findByClasseAnnee(classeId: number,anneeId: number): Promise<Module[]> {
    const url = `${this.url}/classeannee/${classeId}/${anneeId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Module[])
      .catch(this.handleError);
  }




}


