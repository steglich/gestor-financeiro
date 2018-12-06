import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = `api/categories`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handError),
      map(this.jsonDataToCategories)
    );
  }

  getByCategory(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handError),
      map(this.jsonDataToCategory)
    );
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handError),
      map(this.jsonDataToCategory)
    );
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category['id']}`;
    return this.http.put(url, category).pipe(
      catchError(this.handError),
      map(() => category)
    );
  }

  delete(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handError),
      map(() => null)
    );
  }

  private jsonDataToCategories(jsonData: Category[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));
    return categories;
  }

  private jsonDataToCategory(jsonData: Category): Category {
    return jsonData as Category;
  }

  private handError(error: any[]): Observable<any> {
    console.log(`ERRO NA REQUISIÇÃO DE CATEGORIA => `, error);
    return throwError(error);
  }
}
