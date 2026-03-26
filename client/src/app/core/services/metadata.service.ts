import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Genre, Mood } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private genresUrl = 'http://localhost:5000/api/genres';
  private moodsUrl = 'http://localhost:5000/api/moods';
  private keywordsUrl = 'http://localhost:5000/api/keywords';

  private genresSubject = new BehaviorSubject<Genre[]>([]);
  public genres$ = this.genresSubject.asObservable();

  private moodsSubject = new BehaviorSubject<Mood[]>([]);
  public moods$ = this.moodsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadGenres();
    this.loadMoods();
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.genresUrl}`).pipe(
      tap((response: any) => this.genresSubject.next(response.genres))
    );
  }

  getMoods(): Observable<any> {
    return this.http.get<any>(`${this.moodsUrl}`).pipe(
      tap((response: any) => this.moodsSubject.next(response.moods))
    );
  }

  getKeywords(): Observable<any> {
    return this.http.get<any>(`${this.keywordsUrl}`);
  }

  createGenre(name: string, description?: string): Observable<any> {
    return this.http.post<any>(`${this.genresUrl}`, { name, description }).pipe(
      tap(() => this.loadGenres())
    );
  }

  createMood(name: string, description?: string, icon?: string): Observable<any> {
    return this.http.post<any>(`${this.moodsUrl}`, { name, description, icon }).pipe(
      tap(() => this.loadMoods())
    );
  }

  createKeyword(name: string, category?: string): Observable<any> {
    return this.http.post<any>(`${this.keywordsUrl}`, { name, category });
  }

  updateGenre(id: string, name: string, description?: string): Observable<any> {
    return this.http.put<any>(`${this.genresUrl}/${id}`, { name, description }).pipe(
      tap(() => this.loadGenres())
    );
  }

  updateMood(id: string, name: string, description?: string, icon?: string): Observable<any> {
    return this.http.put<any>(`${this.moodsUrl}/${id}`, { name, description, icon }).pipe(
      tap(() => this.loadMoods())
    );
  }

  deleteGenre(id: string): Observable<any> {
    return this.http.delete<any>(`${this.genresUrl}/${id}`).pipe(
      tap(() => this.loadGenres())
    );
  }

  deleteMood(id: string): Observable<any> {
    return this.http.delete<any>(`${this.moodsUrl}/${id}`).pipe(
      tap(() => this.loadMoods())
    );
  }

  deleteKeyword(id: string): Observable<any> {
    return this.http.delete<any>(`${this.keywordsUrl}/${id}`);
  }

  private loadGenres(): void {
    this.getGenres().subscribe();
  }

  private loadMoods(): void {
    this.getMoods().subscribe();
  }
}
