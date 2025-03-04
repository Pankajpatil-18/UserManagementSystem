import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent {

  @Input() userRequests: any[] = [];

  constructor() {
    // Static data for demonstration purposes
    this.userRequests = [
      {
        id: 1,
        user: 'John Doe',
        tableName: 'Users',
        requestType: 'Add',
        message: 'Request to add a new user.',
        status: 'Pending',
        date: new Date('2024-08-28')
      },
      {
        id: 2,
        user: 'Jane Smith',
        tableName: 'Orders',
        requestType: 'Edit',
        message: 'Request to edit an order.',
        status: 'Approved',
        date: new Date('2024-08-27')
      },
      {
        id: 3,
        user: 'Alice Johnson',
        tableName: 'Products',
        requestType: 'Delete',
        message: 'Request to delete a product.',
        status: 'Denied',
        date: new Date('2024-08-26')
      }
    ];
  }

  // // Uncomment this section and remove the static data above once the backend is ready
  // ngOnInit() {
  //   this.apiService.getUserRequests().subscribe(response => {
  //     this.userRequests = response;
  //   }, error => {
  //     console.error('Failed to load user requests', error);
  //   });
  // }
}
