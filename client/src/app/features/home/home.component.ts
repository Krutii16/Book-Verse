import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { MetadataService } from '../../core/services/metadata.service';
import { Book, Genre, Mood } from '../../core/models/book.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredBooks: Book[] = [];
  bestsellers: Book[] = [];
  genres: Genre[] = [];
  moods: Mood[] = [];
  loading = true;

  constructor(
    private bookService: BookService,
    private metadataService: MetadataService,
    private router: Router   
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        this.featuredBooks = response?.books?.slice(0, 6) ?? [];
      },
      error: (err) => {
        console.error('Featured Books Error:', err);
        this.featuredBooks = [];
      }
    });

    this.bookService.getBestsellers().subscribe({
      next: (response: any) => {
        this.bestsellers = response?.books?.slice(0, 6) ?? [];
      },
      error: (err) => {
        console.error('Bestsellers Error:', err);
        this.bestsellers = [];
      }
    });

    this.metadataService.getGenres().subscribe();
    this.metadataService.getMoods().subscribe();

    this.metadataService.genres$.subscribe((genres: Genre[]) => {
      this.genres = genres;
      this.loading = false;
    });

    this.metadataService.moods$.subscribe((moods: Mood[]) => {
      this.moods = moods;
    });
  }

  // ================
  //  NAVIGATION FIX
  // ================

  goToGenre(genre: Genre): void {
    this.router.navigate(['/books'], {
    queryParams: {
      genre: genre._id   
    }
  });
  }

  goToMood(mood: Mood): void {
    this.router.navigate(['/books'], {
      queryParams: { mood: mood.name }
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