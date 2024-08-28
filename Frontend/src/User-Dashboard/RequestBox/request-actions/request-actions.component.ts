import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestStatusComponent } from "../request-status/request-status.component";

@Component({
  selector: 'app-request-actions',
  standalone: true,
  imports: [CommonModule, FormsModule, RequestStatusComponent],
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
      this.newRequest.id = Math.floor(Math.random() * 1000);
      this.newRequest.date = new Date();
      this.requestSubmitted.emit({ ...this.newRequest });
      this.newRequest.tableName = '';
      this.newRequest.requestType = '';
      this.newRequest.message = '';
    } else {
      alert('Please fill out all fields.');
    }
  }
}
