import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Note } from '../models/note';
import { ConfigService } from '../services/config.service';

@Injectable()
export class NoteService {
  private url = '';  // URL to web api
  constructor(
    private http: Http,
    private config: ConfigService,
  ) {
    this.url = config.getUrl() + "/note";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAll(): Promise<Note[]> {
    return this.http.get(this.url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Note[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<Note> {
    const url = `${this.url}/${id}`;
    return this.http.get(url, this.config.jwt())
      .toPromise()
      .then(response => response.json() as Note)
      .catch(this.handleError);
  }



  update(data: Note): Promise<Note> {
    const url = `${this.url}/update/${data.id}`;
    return this.http
      .put(url, JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: Note): Promise<Note> {
    return this.http
      .post(this.url + "/create", JSON.stringify(data), this.config.jwt())
      .toPromise()
      .then(res => res.json() as Note)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete(url, this.config.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  findByEleve(eleveId: number): Promise<Note[]> {
    const url = `${this.url}/eleve/${eleveId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Note[])
      .catch(this.handleError);
  }

  findByClasseEleveSequenceAnnee(classeId,eleveId,sequenceId,anneeId): Promise<Note[]> {
    const url = `${this.url}/classeelevesequenceannee/${classeId}/${eleveId}/${sequenceId}/${anneeId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Note[])
      .catch(this.handleError);
  }

  findByClasseSequenceAnnee(classeId,sequenceId,anneeId): Promise<Note[]> {
    const url = `${this.url}/classesequenceannee/${classeId}/${sequenceId}/${anneeId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Note[])
      .catch(this.handleError);
  }

  findByEleveSequenceMatiereAnnee(eleveId,sequenceId,matiereId): Promise<Note> {
    const url = `${this.url}/elevesequencematiere/${eleveId}/${sequenceId}/${matiereId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Note)
      .catch(this.handleError);
  }

  findBySequenceMatiere(sequenceId,matiereId): Promise<Note[]> {
    const url = `${this.url}/sequencematiere/${sequenceId}/${matiereId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Note[])
      .catch(this.handleError);
  }

  findByEleveClasseAnnee(eleveId,classeId,anneeId): Promise<Note[]> {
    const url = `${this.url}/eleveclasseannee/${eleveId}/${classeId}/${anneeId}`;
    return this.http
      .get(url, this.config.jwt())
      .toPromise()
      .then(res => res.json() as Note[])
      .catch(this.handleError);
  }



}


