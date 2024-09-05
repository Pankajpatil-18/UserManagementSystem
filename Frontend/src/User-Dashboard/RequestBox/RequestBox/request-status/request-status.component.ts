
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

  constructor(private requestService: RequestService, private authService: AuthService,private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userRequests']) {
      this.userRequests = changes['userRequests'].currentValue;
    }
    console.log(changes);
  }
  trackByRequestId(index: number, request: any): number {
    return request.requestId;
  }
  
}
