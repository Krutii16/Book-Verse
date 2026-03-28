import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(shippingAddress: string, paymentMethod: string = 'Credit Card'): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { shippingAddress, paymentMethod });
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/all`);
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status });
  }
  getMyOrders() {
  return this.http.get<any>('http://localhost:5000/api/orders/my');
}
}
