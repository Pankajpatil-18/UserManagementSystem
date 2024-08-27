import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestActionsComponent } from "../request-actions/request-actions.component";
import { RequestStatusComponent } from "../request-status/request-status.component";

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RequestActionsComponent, RequestStatusComponent],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  userRequests: any[] = [];

  handleRequestSubmitted(newRequest: any) {
    this.userRequests.push(newRequest);
  }
}
