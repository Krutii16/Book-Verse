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
  limit = 100;
  totalBooks = 0;
  pages: number[] = [];

  loading = false;

  constructor(
    private bookService: BookService,
    private metadataService: MetadataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.metadataService.getGenres().subscribe();
    this.metadataService.genres$.subscribe(genres => {
      this.genres = genres;
    });

    this.route.queryParams.subscribe(params => {

      if (params['moods']) {
        const moods = params['moods'];
        const moodArray = Array.isArray(moods) ? moods : [moods];

        this.loading = true;

        this.bookService.filterBooks({ moods: moodArray }).subscribe((res: any) => {
          this.originalBooks = res.books || [];
          this.applyFilters();
          this.loading = false;
        });

        return;
      }

      if (params['genre']) {
        this.selectedGenre = params['genre'].toLowerCase();
        this.loadBooks();
        return;
      }

      this.route.params.subscribe(routeParams => {
        const genreId = routeParams['genreId'];

        if (genreId) {
          this.loadBooksByGenre(genreId);
        } else {
          this.loadBooks();
        }
      });

    });
  }

  loadBooks(): void {
    this.loading = true;

    this.bookService.getAllBooks().subscribe((res: any) => {
      this.originalBooks = res.books || [];
      this.applyFilters();
      this.loading = false;
    });
  }

  loadBooksByGenre(genreId: string): void {
    this.loading = true;

    this.bookService.getBooksByGenre(genreId).subscribe((res: any) => {
      this.originalBooks = res.books || [];
      this.applyFilters();
      this.loading = false;
    });
  }

  applyFilters(): void {
    let filtered = [...this.originalBooks];

    if (this.selectedGenre) {
      const selected = this.selectedGenre.toLowerCase().trim();

      filtered = filtered.filter((book: any) => {
        if (!book.genre) return false;

        if (Array.isArray(book.genre) && book.genre.length > 0) {
          if (book.genre[0].name) {
            return book.genre[0].name.toLowerCase().trim() === selected;
          }
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
}