import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { MetadataService } from '../../../core/services/metadata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-books.component.html'
})
export class ManageBooksComponent implements OnInit {

  books: any[] = [];
  genres: any[] = []; // ✅ ADD THIS

  showForm = false;
  isEdit = false;

  bookData: any = {
    title: '',
    author: '',
    isbn: '',
    description: '',
    price: 0,
    image: '',
    genre: '', // will store genreId
    quantity: 0,
    discount: 0
  };

  constructor(
    private adminService: AdminService,
    private metadataService: MetadataService // ✅ ADD THIS
  ) {}

  ngOnInit() {
    this.loadBooks();
    this.loadGenres(); // ✅ LOAD GENRES
  }

  // ✅ LOAD BOOKS
  loadBooks() {
    this.adminService.getBooks().subscribe((res: any) => {
      this.books = res.books || res;
    });
  }

  // ✅ LOAD GENRES
  loadGenres() {
    this.metadataService.getGenres().subscribe((res: any) => {
      this.genres = res.genres || [];
    });
  }

  // ➕ Open Add Form
  openAddForm() {
    this.isEdit = false;
    this.bookData = {
      title: '',
      author: '',
      isbn: '',
      description: '',
      price: 0,
      image: '',
      genre: '',
      quantity: 0,
      discount: 0
    };
    this.showForm = true;
  }

  // ✏️ Edit
  editBook(book: any) {
    this.isEdit = true;

    // ✅ IMPORTANT: set genreId properly
    this.bookData = {
      ...book,
      genre: book.genre?.[0]?._id || '' // handle array
    };

    this.showForm = true;
  }

  // 💾 SAVE
  saveBook() {

    this.bookData.price = Number(this.bookData.price);
    this.bookData.quantity = Number(this.bookData.quantity || 0);
    this.bookData.discount = Number(this.bookData.discount || 0);

    // ✅ FIX: CONVERT genre → ARRAY
    const payload = {
      ...this.bookData,
      genre: this.bookData.genre ? [this.bookData.genre] : []
    };

    if (this.isEdit) {
      this.adminService.updateBook(this.bookData._id, payload)
        .subscribe(() => {
          this.closeForm();
          this.loadBooks();
        });
    } else {
      this.adminService.addBook(payload)
        .subscribe({
          next: () => {
            this.closeForm();
            this.loadBooks();
          },
          error: (err) => {
            console.log('CREATE ERROR:', err);
          }
        });
    }
  }

  // ❌ Delete
  deleteBook(id: string) {
    if (confirm('Delete this book?')) {
      this.adminService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  closeForm() {
    this.showForm = false;
  }

  // 📷 Image upload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.bookData.image = reader.result;
    };

    reader.readAsDataURL(file);
  }
}