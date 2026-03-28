import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-orders.component.html'
})
export class ManageOrdersComponent implements OnInit {

  orders: any[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;

    this.http.get<any>('http://localhost:5000/api/orders/admin/all')
      .subscribe({
        next: (data) => {
          this.orders = data?.orders || data || [];
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load orders';
          this.loading = false;
        }
      });
  }

  updateStatus(orderId: string, status: string) {
    this.http.put(`http://localhost:5000/api/orders/${orderId}`, { status })
      .subscribe(() => {
        this.fetchOrders();
      });
  }
}