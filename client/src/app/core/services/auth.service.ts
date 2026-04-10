import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  // ✅ REGISTER
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);

        // 🔥 SAVE USER
        localStorage.setItem('user', JSON.stringify(response.user));

        this.userSubject.next(response.user);
      })
    );
  }

  // ✅ LOGIN
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);

        // 🔥 SAVE USER
        localStorage.setItem('user', JSON.stringify(response.user));

        this.userSubject.next(response.user);
      })
    );
  }

  // ✅ LOGOUT
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');   // 🔥 clear user too
    this.userSubject.next(null);
  }

  // ✅ TOKEN
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ GET CURRENT USER FROM API
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      tap((response: any) => {
        this.userSubject.next(response.user);

        // 🔥 KEEP UPDATED
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  // ✅ AUTH CHECK
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ✅ ADMIN CHECK
  isAdmin(): boolean {
    const user = this.userSubject.value;
    return user?.isAdmin || false;
  }

  // ✅ LOAD USER ON REFRESH
  private loadUser(): void {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }

    if (this.isAuthenticated()) {
      this.getCurrentUser().subscribe();
    }
  }

  // ✅ GET USER VALUE (VERY IMPORTANT 🔥)
  getCurrentUserValue(): User | null {
    return this.userSubject.value;
  }

  // ✅ FIXED HEADERS
  getHeaders() {
    const token = localStorage.getItem(this.tokenKey);  // 🔥 FIXED
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
}