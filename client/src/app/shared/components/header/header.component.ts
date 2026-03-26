import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router,NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { BookService } from '../../../core/services/book.service';
import { User, CartItem } from '../../../core/models/book.model';
import {filter} from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;
  cartItems$ = this.cartService.cartItems$;
  searchQuery = '';
  showSearchResults = false;
  searchResults: any[] = [];

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private bookService: BookService,
    private router:Router
  ) {}
isAdmin = false;
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
    this.isAdmin = user?.name === 'admin';
  });
    this.cartService.getCart().subscribe();
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.showSearchResults = false;
      this.searchResults = [];
      this.searchQuery = '';
    });
  }

  search(): void {
    if (!this.searchQuery.trim()) {
      this.showSearchResults = false;
      return;
    }

    this.bookService.searchBooks(this.searchQuery).subscribe((response: any) => {
      this.searchResults = response.books;
      this.showSearchResults = true;
    });
  }

  logout(): void {
    this.authService.logout();
  }
  goToBook(id: string): void {
  this.showSearchResults = false;
  this.searchResults = [];
  this.searchQuery = '';

  this.router.navigate(['/books', id]);
}
}
