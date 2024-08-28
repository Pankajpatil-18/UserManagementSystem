import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-actions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-actions.component.html',
  styleUrls: ['./request-actions.component.css']
})
export class RequestActionsComponent {

  @Output() requestSubmitted = new EventEmitter<any>();

  newRequest = {
    id: 0,
    user: 'Current User',
    tableName: '',
    requestType: '',
    message: '',
    status: 'Pending',
    date: new Date()
  };

  submitRequest() {
    if (this.newRequest.tableName && this.newRequest.requestType && this.newRequest.message) {
      // Assign a random ID and current date for the static data
      this.newRequest.id = Math.floor(Math.random() * 1000);
      this.newRequest.date = new Date();

      // Emit the request to parent component
      this.requestSubmitted.emit({ ...this.newRequest });

      // Reset the form fields
      this.newRequest.tableName = '';
      this.newRequest.requestType = '';
      this.newRequest.message = '';
      
      // // Uncomment this section and remove the static data above once the backend is ready
      // this.apiService.submitRequest(this.newRequest).subscribe(response => {
      //   // Handle response from backend
      //   this.requestSubmitted.emit(response);
      //   // Reset form after successful submission
      //   this.newRequest = { id: 0, user: 'Current User', tableName: '', requestType: '', message: '', status: 'Pending', date: new Date() };
      // }, error => {
      //   // Handle error
      //   console.error('Request submission failed', error);
      // });
      
    } else {
      alert('Please fill out all fields.');
    }
  }
}
