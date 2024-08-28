import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestActionsComponent } from "../request-actions/request-actions.component";
import { RequestStatusComponent } from "../request-status/request-status.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RequestActionsComponent, RequestStatusComponent],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  userRequests: any[] = [];

  constructor(private router: Router) {
    // Static data for demonstration purposes
    this.userRequests = [];
    
  }

  handleRequestSubmitted(newRequest: any) {
    this.userRequests.push(newRequest);
  }

  // // Uncomment this section and remove the static data in the constructor once the backend is ready
  // ngOnInit() {
  //   this.apiService.getUserRequests().subscribe(response => {
  //     this.userRequests = response;
  //   }, error => {
  //     console.error('Failed to load user requests', error);
  //   });
  // }

  // handleRequestSubmitted(newRequest: any) {
  //   this.apiService.submitRequest(newRequest).subscribe(response => {
  //     this.userRequests.push(response);
  //   }, error => {
  //     console.error('Failed to submit request', error);
  //   });
  // }

  goBack() {
    // Implement navigation logic here (e.g., navigate to the previous page)
    // For example, using Angular's Router:
    // this.router.navigate(['/previous-route']);
    console.log('Back button clicked');
    this.router.navigate(['/home']);
  }

}
