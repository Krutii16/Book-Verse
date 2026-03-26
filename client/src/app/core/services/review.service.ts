import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000/api/reviews';

  constructor(private http: HttpClient) {}

  createReview(bookId: string, rating: number, comment: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { bookId, rating, comment });
  }

  getReviewsByBook(bookId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book/${bookId}`);
  }

  getReviewsByUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  addReview(bookId: string, data: any) {
  return this.http.post(`http://localhost:5000/api/reviews/${bookId}`, data);
}
}
