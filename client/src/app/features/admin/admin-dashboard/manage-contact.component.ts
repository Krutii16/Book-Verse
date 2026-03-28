import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-contact.component.html'
})
export class ManageContactComponent implements OnInit {

  contacts: any[] = [];

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts() {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => {
        this.contacts = data;
      });
  }
}