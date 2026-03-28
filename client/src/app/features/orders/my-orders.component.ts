import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone:true,
  templateUrl: './my-orders.component.html',
    imports:[CommonModule]
})
export class MyOrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.http.get<any>('http://localhost:5000/api/orders/my')
      .subscribe(res => {
        this.orders = res.orders;
      });
  }
  deleteOrder(orderId: string) {
  this.http
    .delete(`http://localhost:5000/api/orders/${orderId}`)
    .subscribe({
      next: () => {
        // remove instantly from UI
        this.orders = this.orders.filter(o => o._id !== orderId);
      },
      error: (err) => {
        console.error(err);
        alert("Failed to delete order");
      }
    });
}
}