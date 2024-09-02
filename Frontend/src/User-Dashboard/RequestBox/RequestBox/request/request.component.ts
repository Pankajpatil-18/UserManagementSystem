import { Component, EventEmitter, Output } from '@angular/core';
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
    // Reload user requests after a new request is submitted
    this.loadUserRequests();
  }

  goBack() {
    this.router.navigate(['/previous-page']); // Adjust the path as needed
  }
}
