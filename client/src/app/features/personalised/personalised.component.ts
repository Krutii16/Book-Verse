import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../core/models/book.model';
import {filter} from 'rxjs'
@Component({
  selector: 'app-personalised',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './personalised.component.html'
})
export class PersonalisedComponent {

  searchKeyword: string = '';
  searchResults: Book[] = [];
  showDropdown: boolean = false;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  // 🔍 Search while typing
  search(): void {

    if (!this.searchKeyword.trim()) {
      this.searchResults = [];
      this.showDropdown = false;
      return;
    }

    this.bookService.searchBooks(this.searchKeyword).subscribe({
      next: (res: any) => {
        this.searchResults = res.books || [];
        this.showDropdown = true;
      },
      error: () => {
        this.searchResults = [];
        this.showDropdown = false;
      }
    });
  }

  // Navigate to book
 goToBook(id: string) {
  this.showDropdown = false;
  this.searchKeyword = '';
  this.searchResults = [];

  this.router.navigate(['/books', id]).then(() => {
    this.showDropdown = false;
  });
}
ngOnInit(){
this.router.events
    .pipe(
      filter((event: any) => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.showDropdown = false;
      this.searchResults = [];
    });
  }
}
