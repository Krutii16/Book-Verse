import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:5000/api/books';

  constructor(private http: HttpClient) {}

  getAllBooks() {
     return this.http.get(`http://localhost:5000/api/books?limit=100`);
  }

  getBooksByGenre(genreId: string) {
    return this.http.get(`${this.apiUrl}/genre/${genreId}`);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getFeaturedBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/featured`);
  }

  getBestsellers() {
    return this.http.get(`${this.apiUrl}/bestsellers?limit=6`);
  }

  searchBooks(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  filterBooks(filters: any): Observable<any> {
    let params = new HttpParams();

    if (filters.genre) {
      const genres = Array.isArray(filters.genre) ? filters.genre : [filters.genre];
      genres.forEach((g: string) => {
        params = params.append('genre', g);
      });
    }

    if (filters.moods) {
      const moods = Array.isArray(filters.moods) ? filters.moods : [filters.moods];
      moods.forEach((m: string) => {
        params = params.append('moods', m);
      });
    }

    if (filters.minPrice) params = params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.page) params = params.set('page', filters.page);
    if (filters.limit) params = params.set('limit', filters.limit);

    return this.http.get<any>(`${this.apiUrl}/filter`, { params });
  }

  createBook(book: Book): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, book);
  }

  updateBook(id: string, book: Partial<Book>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}