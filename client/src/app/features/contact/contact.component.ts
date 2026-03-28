import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">Contact Us</h1>
        <div class="bg-white rounded-lg shadow-lg p-8">
          <form (ngSubmit)="submitForm()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name</label>
              <input type="text" [(ngModel)]="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input type="email" [(ngModel)]="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Message</label>
              <textarea [(ngModel)]="message" name="message" rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit" class="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  submitForm(): void {
  const data = {
    name: this.name,
    email: this.email,
    message: this.message
  };

  fetch('http://localhost:5000/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    alert('Message sent successfully!');
    this.name = '';
    this.email = '';
    this.message = '';
  })
  .catch(() => {
    alert('Error sending message');
  });
}
}
