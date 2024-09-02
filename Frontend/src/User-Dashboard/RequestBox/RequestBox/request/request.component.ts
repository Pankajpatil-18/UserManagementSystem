import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestActionsComponent } from "../request-actions/request-actions.component";
import { RequestStatusComponent } from "../request-status/request-status.component";
import { Router } from '@angular/router';
import { RequestService } from 'src/User-Dashboard/request.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RequestActionsComponent, RequestStatusComponent],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  userRequests: any[] = [];

  constructor(private requestService: RequestService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserRequests();
  }

  loadUserRequests() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.requestService.getUserRequests(userId).subscribe(requests => {
        this.userRequests = requests;
      }, error => {
        console.error('Error loading user requests:', error);
      });
    } else {
      console.error('User ID is not available.');
    }
  }

  handleRequestSubmitted(request: any) {
    // Optionally, you can save the request data to the backend here
    // For demonstration, we just add it to the local list
    this.userRequests.push({
      requestId: Math.random().toString(36).substr(2, 9), // Generate a mock ID
      userId: this.authService.getUserId(), // Replace with actual user ID
      ...request,
      status: 'Pending',
      date: new Date()
    });
  }

  goBack() {
    this.router.navigate(['/previous-page']); // Adjust the path as needed
  }
}
