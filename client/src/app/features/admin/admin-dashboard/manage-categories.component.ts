import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-categories.component.html'
})
export class ManageCategoriesComponent implements OnInit {

  categories: any[] = [];
  newCategory = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

 loadCategories() {
  this.categoryService.getCategories().subscribe({
    next: (res: any) => {
      console.log('API RESPONSE:', res);

      this.categories = res.genres || res.categories || res.data || res || [];

      console.log('FINAL ARRAY:', this.categories);
    },
    error: (err) => {
      console.error(err);
      this.categories = [];
    }
  });
}
  addCategory() {
    if (!this.newCategory.trim()) return;

    this.categoryService.addCategory(this.newCategory).subscribe({
      next: () => {
        this.newCategory = '';
        this.loadCategories();
      },
      error: (err) => console.error(err)
    });
  }

  deleteCategory(id: string) {
    if (confirm('Delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (err) => console.error(err)
      });
    }
  }
}