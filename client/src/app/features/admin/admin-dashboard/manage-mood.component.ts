import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoodService } from '../../../core/services/mood.service';

@Component({
  selector: 'app-manage-moods',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-moods.component.html'
})
export class ManageMoodsComponent implements OnInit {

  moods: any[] = [];
  newMood = '';

  constructor(private moodService: MoodService) {}

  ngOnInit(): void {
    this.loadMoods();
  }

  loadMoods() {
    this.moodService.getMoods().subscribe((res: any) => {
      console.log(res);
      this.moods = res.moods || res;   // handles both formats
    });
  }

  addMood() {
    if (!this.newMood.trim()) return;

    this.moodService.addMood(this.newMood).subscribe(() => {
      this.newMood = '';
      this.loadMoods();
    });
  }

  deleteMood(id: string) {
    if (confirm('Delete this mood?')) {
      this.moodService.deleteMood(id).subscribe(() => {
        this.loadMoods();
      });
    }
  }
}