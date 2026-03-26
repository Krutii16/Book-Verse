import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
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
  showForm = false;
  isEdit = false;

  bookData: any = {
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

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.adminService.getBooks().subscribe(res => {
      this.books = res;
    });
  }

  // ➕ Open Add Form
  openAddForm() {
    this.isEdit = false;
    this.bookData = {};
    this.showForm = true;
    
  }

  //  Edit
  editBook(book: any) {
    this.isEdit = true;
    this.bookData = { ...book };
    this.showForm = true;
  }

  saveBook() {

  this.bookData.price = Number(this.bookData.price);
  this.bookData.quantity = Number(this.bookData.quantity || 0);
  this.bookData.discount = Number(this.bookData.discount || 0);

  if (this.isEdit) {
    this.adminService.updateBook(this.bookData._id, this.bookData)
      .subscribe(() => {
        this.closeForm();
        this.loadBooks();
      });
  } else {
    this.adminService.addBook(this.bookData)
      .subscribe({
        next: () => {
          this.closeForm();
          this.loadBooks();
        },
        error: (err) => {
          console.log(err); 
        }
      });
  }
}

  //  Delete
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

  //  Image upload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.bookData.image = reader.result;
    };

    reader.readAsDataURL(file);
  }
}