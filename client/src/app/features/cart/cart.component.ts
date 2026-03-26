import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/book.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  loading = true;
  Math = Math;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(() => {
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
      });
      this.cartService.totalPrice$.subscribe(price => {
        this.totalPrice = price;
      });
      this.loading = false;
    });
  }

  updateQuantity(cartItemId: string, newQuantity: number): void {
    if (newQuantity > 0) {
      this.cartService.updateCartItem(cartItemId, newQuantity).subscribe();
    }
  }

  removeItem(cartItemId: string): void {
    this.cartService.removeFromCart(cartItemId).subscribe();
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart().subscribe();
    }
  }

  checkout(): void {
    // Navigate to checkout
  }
}
