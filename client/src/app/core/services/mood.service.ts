import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({  providedIn: 'root'})
export class MoodService {
  private apiUrl = 'http://localhost:5000/api/moods';

  constructor(private http: HttpClient) {}

  getMoods() {
    return this.http.get<any>(this.apiUrl);
  }

  addMood(name: string) {
    return this.http.post(this.apiUrl, { name });
  }

  deleteMood(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}