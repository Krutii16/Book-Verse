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

    // Load genres
    this.metadataService.getGenres().subscribe();
    this.metadataService.genres$.subscribe(genres => {
      this.genres = genres;
    });

    // Listen for route params (category click)
    this.route.params.subscribe(params => {
      const genreId = params['genreId'];

      if (genreId) {
        this.loadBooksByGenre(genreId);
      } else {
        this.loadBooks();
      }
    });

    // Mood filter
    this.route.queryParams.subscribe(params => {
      if (params['moods']) {
        this.loadBooksByMood(params['moods']);
      }
    });
  }

  // Load all books
  loadBooks(): void {
    this.loading = true;

    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.originalBooks = res.books || [];
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.books = [];
        this.loading = false;
      }
    });
  }

  // Load books by genre from backend
  loadBooksByGenre(genreId: string): void {
    this.loading = true;

    this.bookService.getBooksByGenre(genreId).subscribe({
      next: (res: any) => {
        this.originalBooks = res.books || [];
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.books = [];
        this.loading = false;
      }
    });
  }

  // Mood filter
  loadBooksByMood(mood: string): void {
    this.loading = true;

    this.bookService.getBooksByMood(mood).subscribe({
      next: (res: any) => {
        this.originalBooks = res.books || [];
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.books = [];
        this.loading = false;
      }
    });
  }

  // Apply filters + pagination + sorting
  applyFilters(): void {
    let filtered = [...this.originalBooks];

    if (this.selectedGenre) {
      const selected = this.selectedGenre.toLowerCase().trim();

      filtered = filtered.filter((book: any) => {
        if (!book.genre) return false;

        if (typeof book.genre === 'string') {
          return book.genre.toLowerCase().trim() === selected;
        }

        if (book.genre.name) {
          return book.genre.name.toLowerCase().trim() === selected;
        }

        return false;
      });
    }

    if (this.minPrice !== null) {
      filtered = filtered.filter(b => b.price >= this.minPrice!);
    }

    if (this.maxPrice !== null) {
      filtered = filtered.filter(b => b.price <= this.maxPrice!);
    }

    this.totalBooks = filtered.length;

    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    this.books = filtered.slice(start, end);

    this.generatePages(filtered.length);
    this.applySorting();
  }

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
      default:
        this.books.sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime()
        );
    }
  }

  generatePages(total: number): void {
    const totalPages = Math.ceil(total / this.limit);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  changePage(pageNum: number): void {
    this.page = pageNum;
    this.applyFilters();
  }

  filterBooks(): void {
    this.page = 1;
    this.applyFilters();
  }

  resetFilters(): void {
    this.selectedGenre = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.page = 1;
    this.applyFilters();
  }
}