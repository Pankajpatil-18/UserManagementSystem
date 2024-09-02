import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from 'src/User-Dashboard/request.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-request-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent {
  @Input() userRequests: any[] = [];

  // constructor(private requestService: RequestService, private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.loadUserRequests();
  // }

  // handleRequestSubmitted(request: any) {
  //   this.loadUserRequests(); // Refresh the list of requests after a new one is submitted
  // }

  // private loadUserRequests() {
  //   const userId = this.authService.getUserId();
  //   this.requestService.getUserRequests(userId).subscribe(requests => {
  //     this.userRequests = requests;
  //   });
  // }
}
