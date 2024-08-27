import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  userRequests = [
    { id: 1, user: 'John Doe', tableName: 'Users', requestType: 'Add', message: 'Request to add new user', status: 'Pending', date: new Date('2024-08-27') },
    { id: 2, user: 'Emily Davis', tableName: 'Orders', requestType: 'Edit', message: 'Request to update order details', status: 'Approved', date: new Date('2024-08-26') },
    { id: 3, user: 'Jane Smith', tableName: 'Products', requestType: 'Delete', message: 'Request to remove a product', status: 'Denied', date: new Date('2024-08-25') }
  ];

  newRequest = {
    id: 0,
    user: 'Current User',  // Assume this comes from the current logged-in user
    tableName: '',
    requestType: '',
    message: '',  // Added message field
    status: 'Pending',
    date: new Date()
  };

  submitRequest() {
    if (this.newRequest.tableName && this.newRequest.requestType && this.newRequest.message) {
      this.newRequest.id = this.userRequests.length + 1;
      this.newRequest.date = new Date();
      this.userRequests.push({ ...this.newRequest });
      // Reset the form
      this.newRequest.tableName = '';
      this.newRequest.requestType = '';
      this.newRequest.message = '';
    } else {
      alert('Please fill out all fields.');
    }
  }
}
