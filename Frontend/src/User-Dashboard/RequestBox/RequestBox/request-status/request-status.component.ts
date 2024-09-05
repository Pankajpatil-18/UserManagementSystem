
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from 'src/User-Dashboard/request.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent implements OnChanges {
  @Input() userRequests: any[] = [];
  userId: number = 0;

  constructor(private requestService: RequestService, private authService: AuthService,private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLoggedInUserRequests();
  }

  fetchLoggedInUserRequests(): void {
    const loggedInUserId = this.authService.getUserId(); // Use AuthService to get logged-in user ID
    if (loggedInUserId) {
      this.requestService.getUserRequests(loggedInUserId).subscribe(
        (requests: any[]) => {
          this.userRequests = requests; // Set the user requests in the table
        },
        (error) => {
          console.error('Error fetching user requests:', error);
        }
      );
    } else {
      console.error('No logged-in user ID found.');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userRequests']) {
      this.userRequests = changes['userRequests'].currentValue;
    }
  }
  trackByRequestId(index: number, request: any): number {
    return request.requestId;
  }
  
}
