import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-requests-table',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.css']
})
export class RequestsTableComponent {
  requests = [
    { id: 1, user: 'John Doe', requestType: 'Change Role to Admin', status: 'Pending', date: new Date('2024-08-27') },
    { id: 2, user: 'Emily Davis', requestType: 'Delete Account', status: 'Pending', date: new Date('2024-08-27') },
    { id: 3, user: 'Jane Smith', requestType: 'Update Email', status: 'Approved', date: new Date('2024-08-26') }
  ];

  approveRequest(id: number) {
    // Logic to approve the request
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.status = 'Approved';
    }
  }

  denyRequest(id: number) {
    // Logic to deny the request
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.status = 'Denied';
    }
  }

  viewRequest(id: number) {
    // Logic to view request details
    alert(`Viewing details for request ID: ${id}`);
  }

}
