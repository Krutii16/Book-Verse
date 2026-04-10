import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { OrderService } from '../../core/services/order.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  shippingAddress = '';
  paymentMethod = 'Razorpay';
  cartTotal = 0;
  loading = false;
  orderPlaced = false;
  cartItems: any[] = [];

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartService.totalPrice$.subscribe(total => {
      this.cartTotal = total;
    });

    // ✅ get cart items
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal(): number {
    return this.cartTotal;
  }

  proceedToCheckout(): void {

    if (!this.shippingAddress.trim()) {
      alert('Please enter a shipping address');
      return;
    }

    if (!this.cartItems || this.cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    this.loading = true;

    // ✅ STEP 1: Create Razorpay order
    this.http.post("http://localhost:5000/api/payment/create-order", {
      amount: this.cartTotal
    }).subscribe((order: any) => {

      const options = {
        key: "rzp_test_SbOqXCtvFC0WnH",
        amount: order.amount,
        currency: "INR",
        name: "Book Store",
        description: "Order Payment",
        order_id: order.id,

        handler: (response: any) => {

          // ✅ Get logged user
          const user = this.authService.getCurrentUserValue();
          const userId = user?.id || user?._id;

          // ✅ Prepare order items properly
          const books = this.cartItems.map(item => ({
            bookId: item.book?._id,
            quantity: item.quantity,
            price: item.book?.price || item.price || 0
          }));
console.log("CART ITEMS 👉", this.cartItems);
console.log("BOOKS SENT 👉", books);
          // ✅ STEP 2: Verify + Save order
          this.http.post("http://localhost:5000/api/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,

            userId: userId,
            books:books,
            totalPrice: this.cartTotal,
            shippingAddress: this.shippingAddress,
            status: "confirmed"   // ✅ important
          }).subscribe(() => {

            this.orderPlaced = true;
            this.loading = false;

            // ✅ clear cart AFTER success
            this.cartService.clearCart();

            setTimeout(() => {
              this.router.navigate(['/my-orders']);
            }, 2000);
          });
        },

        modal: {
          ondismiss: () => {
            this.loading = false;
          }
        },

        prefill: {
          name: "Customer",
          email: "test@email.com",
          contact: "9999999999"
        },

        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();

    }, (error) => {
      console.error("VERIFY ERROR:", error); // 🔥 THIS WILL SHOW REAL ISSUE
      console.error("Order creation failed", error);
      this.loading = false;
    });
  }
}