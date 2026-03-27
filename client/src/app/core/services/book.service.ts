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

  // Get all books
 getAllBooks() {
  return this.http.get('/api/books');
}

getBooksByGenre(genreId: string) {
  return this.http.get(`/api/books/genre/${genreId}`);
}

  // Get book by ID
  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Featured
  getFeaturedBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/featured`);
  }

  // Bestsellers
  getBestsellers() {
  return this.http.get('/api/books/bestsellers');
}
  // Search
  searchBooks(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  // Filter
  filterBooks(filters: any): Observable<any> {
    let params = new HttpParams();

    if (filters.genre) params = params.set('genre', filters.genre);
    if (filters.minPrice) params = params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.page) params = params.set('page', filters.page);
    if (filters.limit) params = params.set('limit', filters.limit);

    return this.http.get<any>(`${this.apiUrl}/filter`, { params });
  }
  // mood
  getBooksByMood(mood: string): Observable<any> {
    const params = new HttpParams().set('moods', mood);
    return this.http.get<any>(`${this.apiUrl}/filter`, { params });
  }

  // Create
  createBook(book: Book): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, book);
  }

  // Update
  updateBook(id: string, book: Partial<Book>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book);
  }

  // Delete
  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}