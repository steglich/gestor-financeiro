import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { EntryModel } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = `api/categories`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<EntryModel[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handError),
      map(this.jsonDataToEntries)
    );
  }

  getById(id: number): Observable<EntryModel> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handError),
      map(this.jsonDataToEntry)
    );
  }

  create(entry: EntryModel): Observable<EntryModel> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handError),
      map(this.jsonDataToEntry)
    );
  }

  update(entry: EntryModel): Observable<EntryModel> {
    const url = `${this.apiPath}/${entry['id']}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handError),
      map(() => entry)
    );
  }

  delete(id: number): Observable<EntryModel> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handError),
      map(() => null)
    );
  }

  private jsonDataToEntries(jsonData: EntryModel[]): EntryModel[] {
    const categories: EntryModel[] = [];
    jsonData.forEach(element => categories.push(element as EntryModel));
    return categories;
  }

  private jsonDataToEntry(jsonData: EntryModel): EntryModel {
    return jsonData as EntryModel;
  }

  private handError(error: any[]): Observable<any> {
    console.log(`ERRO NA REQUISIÇÃO => `, error);
    return throwError(error);
  }
}
