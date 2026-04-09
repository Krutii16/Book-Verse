import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  shippingAddress = '';
  paymentMethod = 'Credit Card';
  cartTotal = 0;
  loading = false;
  orderPlaced = false;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.totalPrice$.subscribe(total => {
      this.cartTotal = total;
    });
  }

  placeOrder(): void {
    if (!this.shippingAddress.trim()) {
      alert('Please enter a shipping address');
      return;
    }

    this.loading = true;
    this.orderService.createOrder(this.shippingAddress, this.paymentMethod).subscribe({
      next: (response) => {
        this.orderPlaced = true;
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        alert('Error placing order: ' + (err.error.error || 'Unknown error'));
        this.loading = false;
      }
    });
  }

  getTotal(): number {
    //const shipping = 10;
    //const tax = this.cartTotal * 0.1;
    return this.cartTotal //+ shipping + tax;
  } 
}
