import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private apiUrl = 'http://localhost:5000/api/genres';

  constructor(private http: HttpClient) {}

  // ✅ GET ALL GENRES
  getGenres(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // ✅ ADD NEW GENRE (ADMIN)
  addGenre(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // ✅ UPDATE GENRE
  updateGenre(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // ✅ DELETE GENRE
  deleteGenre(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}