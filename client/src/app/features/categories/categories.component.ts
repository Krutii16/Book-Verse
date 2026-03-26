import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { Genre } from '../../core/models/book.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  genres: Genre[] = [];  
  loading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        console.log('GENRES API:', res); 

        this.genres = res.genres || []; 
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
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