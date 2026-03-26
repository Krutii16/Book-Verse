import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/services/book.service';
import { MetadataService } from '../../core/services/metadata.service';
import { Book, Genre } from '../../core/models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  originalBooks: Book[] = [];
  genres: Genre[] = [];

  selectedGenre = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  sortBy = 'latest';

  page = 1;
  limit = 12;
  totalBooks = 0;
  pages: number[] = [];

  loading = false;

  constructor(
    private bookService: BookService,
    private metadataService: MetadataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Load genres for filter dropdown
    this.metadataService.getGenres().subscribe();
    this.metadataService.genres$.subscribe(genres => {
      this.genres = genres;
    });

    // Listen for category click (?genre=...)
    this.route.queryParams.subscribe(params => {
      this.selectedGenre = params['genre'] || '';

      if (params['moods']) {
        this.loadBooksByMood(params['moods']);
      } else {
        this.loadBooks();
      }
    });
  }

  // ✅ MAIN LOAD FUNCTION (FIXED)
  loadBooks(): void {
    this.loading = true;

    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        console.log('ALL BOOKS:', res);

        this.originalBooks = res.books || [];

        let filtered = [...this.originalBooks];

        // ✅ FILTER BY GENRE
       if (this.selectedGenre) {
  const selected = this.selectedGenre.toLowerCase().trim();

  filtered = filtered.filter((book: any) => {
    if (!book.genre) return false;

    // If genre is OBJECT (Mongo populate case)
    if (typeof book.genre === 'object' && book.genre.name) {
      return book.genre.name.toLowerCase() === selected;
    }

    if (typeof book.genre === 'string') {
      return book.genre.toLowerCase() === selected;
    }

    return false;
  });
  
}


        // ✅ PRICE FILTER
        if (this.minPrice !== null) {
          filtered = filtered.filter(b => b.price >= this.minPrice!);
        }

        if (this.maxPrice !== null) {
          filtered = filtered.filter(b => b.price <= this.maxPrice!);
        }

        this.totalBooks = filtered.length;

        // ✅ PAGINATION SLICE
        const start = (this.page - 1) * this.limit;
        const end = start + this.limit;
        this.books = filtered.slice(start, end);

        this.generatePages(filtered.length);
        this.applySorting();

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.books = [];
        this.loading = false;
      }
    });
  }

  // ✅ MOOD FILTER
  loadBooksByMood(mood: string): void {
    this.loading = true;

    this.bookService.getBooksByMood(mood).subscribe({
      next: (res: any) => {
        this.originalBooks = res.books || [];
        this.totalBooks = this.originalBooks.length;

        const start = (this.page - 1) * this.limit;
        const end = start + this.limit;
        this.books = this.originalBooks.slice(start, end);

        this.generatePages(this.totalBooks);
        this.applySorting();

        this.loading = false;
      },
      error: () => {
        this.books = [];
        this.loading = false;
      }
    });
  }

  // ✅ SORTING
  applySorting(): void {
    switch (this.sortBy) {

      case 'price-asc':
        this.books.sort((a, b) => a.price - b.price);
        break;

      case 'price-desc':
        this.books.sort((a, b) => b.price - a.price);
        break;

      case 'rating':
        this.books.sort((a, b) => b.rating - a.rating);
        break;

      case 'latest':
      default:
        this.books.sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime()
        );
        break;
    }
  }

  sortBooks(): void {
    this.loadBooks(); // reload with sorting
  }

  // ✅ PAGINATION
  generatePages(total: number): void {
    const totalPages = Math.ceil(total / this.limit);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  changePage(pageNum: number): void {
    this.page = pageNum;
    this.loadBooks();
  }

  // ✅ FILTER BUTTON
  filterBooks(): void {
    this.page = 1;
    this.loadBooks();
  }

  // ✅ RESET
  resetFilters(): void {
    this.selectedGenre = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.page = 1;
    this.loadBooks();
  }
}