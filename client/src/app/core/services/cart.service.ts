import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:5000/api/cart';

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private totalPriceSubject = new BehaviorSubject<number>(0);
  public totalPrice$ = this.totalPriceSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((response: any) => {
        this.cartItemsSubject.next(response.items || []);
        this.totalPriceSubject.next(response.totalPrice || 0);
      })
    );
  }

  addToCart(bookId: string, quantity: number = 1): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, {
      bookId,
      quantity
    }).pipe(
      tap(() => this.loadCart()) 
    );
  }
  removeFromCart(cartItemId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${cartItemId}`).pipe(
      tap(() => this.loadCart())
    );
  }

  updateCartItem(cartItemId: string, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${cartItemId}`, {
      quantity
    }).pipe(
      tap(() => this.loadCart())
    );
  }

  clearCart(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clear`, {}).pipe(
      tap(() => {
        this.cartItemsSubject.next([]);
        this.totalPriceSubject.next(0);
      })
    );
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getTotalPrice(): number {
    return this.totalPriceSubject.value;
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.length;
  }

  private loadCart(): void {
    this.getCart().subscribe({
      error: (err) => console.log('Cart load error:', err)
    });
  }
}