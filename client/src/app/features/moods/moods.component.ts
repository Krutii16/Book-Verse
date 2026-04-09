import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MetadataService } from '../../core/services/metadata.service';
import { Mood } from '../../core/models/book.model';

@Component({
  selector: 'app-moods',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold mb-12">Find Books by Mood</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div *ngFor="let mood of moods" [routerLink]="['/books']" [queryParams]="{ moods: mood._id }" class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer text-center">
            <div class="text-6xl mb-4">{{ mood.icon }}</div>
            <h3 class="text-2xl font-bold text-blue-600">{{ mood.name }}</h3>
            <p class="text-gray-600 mt-2 text-sm">{{ mood.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MoodsComponent implements OnInit {
  moods: Mood[] = [];

  constructor(private metadataService: MetadataService) {}

  ngOnInit(): void {
    this.metadataService.getMoods().subscribe();
    this.metadataService.moods$.subscribe(moods => {
      this.moods = moods;
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
