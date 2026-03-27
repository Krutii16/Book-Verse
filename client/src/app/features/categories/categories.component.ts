import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ REQUIRED

import { CategoryService } from '../../core/services/category.service';
import { Genre, Book } from '../../core/models/book.model'; // ✅ FIXED

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ✅ FIXED
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {

  originalBooks: Book[] = [];
  books: Book[] = [];
  genres: Genre[] = [];

  loading = true;

  selectedGenre = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy = 'latest';

  page = 1;
  limit = 12;
  totalBooks = 0;
  pages: number[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {

    // ✅ Load genres
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        console.log('GENRES API:', res);
        this.genres = res.genres || [];
      },
      error: (err) => console.error(err)
    });

    // ✅ IMPORTANT: Load books
    this.categoryService.getBooks().subscribe({
      next: (res: any) => {
        console.log('BOOKS API:', res);
        this.originalBooks = res.books || [];
        this.applyFilters(); // apply filters after loading
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.originalBooks];

    // ✅ Genre filter
    if (this.selectedGenre) {
      const selected = this.selectedGenre.toLowerCase().trim();

      filtered = filtered.filter((book: Book) => {
        if (!book.genre) return false;

        if (Array.isArray(book.genre) && book.genre.length > 0) {
          return book.genre[0]?.name?.toLowerCase().trim() === selected;
        }

        return false;
      });
    }

    // ✅ Price filter
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

  getCategoryClass(index: number): string {
    const classes = [
      'category-blue',
      'category-green',
      'category-purple',
      'category-pink',
      'category-yellow',
      'category-teal',
      'category-orange',
      'category-indigo'
    ];
    return classes[index % classes.length];
  }
}