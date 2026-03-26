import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';
import { ReviewService } from '../../../core/services/review.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Book, Review } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  reviews: Review[] = [];
  quantity = 1;
  newRating = 5;
  newComment = '';
  loading = true;
  user$ = this.authService.user$;
  Math = Math;


  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
    public cartService: CartService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadBook(params['id']);
    });
  }

  loadBook(id: string): void {
    this.bookService.getBookById(id).subscribe((response: any) => {
      this.book = response.book;
      this.loadReviews(id);
      this.loading = false;
    });
  }

  loadReviews(bookId: string): void {
    this.reviewService.getReviewsByBook(bookId).subscribe((response: any) => {
      this.reviews = response.reviews;
    });
  }

  addToCart(): void {
  if (!this.book || !this.book._id) return;

  if (this.book.quantity > 0) {
    this.cartService.addToCart(this.book._id, this.quantity).subscribe(() => {

      // reduce stock
      this.book!.quantity -= this.quantity;

      // update stock status
      if (this.book!.quantity <= 0) {
        this.book!.inStock = false;
      }
    });
  }
}

  submitReview(): void {
    if (this.book && this.authService.isAuthenticated()) {
      this.reviewService.createReview(this.book._id!, this.newRating, this.newComment).subscribe(() => {
        this.newRating = 5;
        this.newComment = '';
        this.loadReviews(this.book!._id!);
      });
    }
  }
  
}
