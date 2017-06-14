import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Classe } from '../models/classe';
import { ConfigService } from '../services/config.service';

@Injectable()
export class ClasseService {
  private url = '';
 constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url = config.getUrl() + "/classe";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAll(): Promise<Classe[]> {
    return this.http.get(this.url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Classe[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<Classe> {
    const url = `${this.url}/${id}`;
    return this.http.get(url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Classe)
      .catch(this.handleError);
  }



  update(data: Classe): Promise<Classe> {
    const url = `${this.url}/update/${data.id}`;
    return this.http
      .put(url, JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: Classe): Promise<Classe> {
    return this.http
      .post(this.url + "/create", JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(res => res.json() as Classe)
      .catch(this.handleError);
  }


  findBySection(sectionId: number): Promise<Classe[]> {
    const url = `${this.url}/section/${sectionId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Classe[])
      .catch(this.handleError);
  }



  delete(id: number): Promise<void> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete(url, this.config.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}


