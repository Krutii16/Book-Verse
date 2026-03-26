import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }
getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  //  Books CRUD
  getBooks() {
  return this.http.get<any[]>('http://localhost:5000/api/admin/books');
}

  addBook(book: any) {
    return this.http.post(`${this.apiUrl}/books`, book, this.getHeaders());
  }

  updateBook(id: string, book: any) {
    return this.http.put(`${this.apiUrl}/books/${id}`, book, this.getHeaders());
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.apiUrl}/books/${id}`, this.getHeaders());
  }
 getCategories(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:5000/api/genres');
}
}