import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:5000/api/genres'; 

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
getGenres() {
  return this.http.get<any>('http://localhost:5000/api/books/genres');
}
getBooks() {
  return this.http.get('/api/books'); 
}
  addCategory(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}