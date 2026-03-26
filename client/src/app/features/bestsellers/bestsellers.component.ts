import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../core/models/book.model';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold mb-12">Bestselling Books</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let book of books" [routerLink]="['/books', book._id]" class="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <img *ngIf="book.image" [src]="book.image" [alt]="book.title" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
              <h3 class="font-bold truncate">{{ book.title }}</h3>
              <p class="text-gray-600 text-sm">by {{ book.author }}</p>
              <div class="flex justify-between items-center mt-3">
               <span class="text-xl font-bold text-blue-600">₹{{ book.price }}</span>

                <span class="text-yellow-500">★ {{ book.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BestsellersComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

 ngOnInit(): void {
  this.bookService.getAllBooks().subscribe((res: any) => {
    const allBooks = res.books || res;

    this.books = allBooks
      .filter((b: any) => b.rating >= 4)
      .sort((a: any, b: any) => b.rating - a.rating);
  });
}
}
