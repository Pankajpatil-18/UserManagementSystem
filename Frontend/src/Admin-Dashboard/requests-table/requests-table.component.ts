import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Request } from 'src/Models/Request.model';


@Component({
  selector: 'app-requests-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.css']
})
export class RequestsTableComponent implements OnInit {
  selectedTable: string = 'Employee'; // Set default or first table name
  tables: string[] = [];
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  message: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTables();
    this.loadRequests();
  }

  loadTables(): void {
    this.http.get<string[]>('http://localhost:5245/api/Table/table-names')
      .subscribe({
        next: (data) => {
          console.log('Tables loaded:', data);
          if (data) {
            this.tables = data;
            this.loadRequests(); // Load requests after tables are loaded
          } else {
            this.message = 'No tables found.';
          }
        },
        error: (error) => {
          console.error('Error loading tables:', error);
          this.message = 'Failed to load tables';
        }
      });
  }
  loadRequests(): void {
    if (this.selectedTable) {
      this.http.get<Request[]>(`http://localhost:5245/api/Request/requestsWithPermission?tableName=${this.selectedTable}`)
        .subscribe({
          next: (data) => {
            console.log('Requests loaded:', data);
            if (data && data.length > 0) {
              this.requests = data;
              this.filterRequests(); // Filter requests after they are loaded
            } else {
              this.message = `No requests found for the table: ${this.selectedTable}.`;
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error loading requests:', error);
            if (error.status === 404) {
              this.message = `No requests found for the table: ${this.selectedTable}.`;
            } else {
              this.message = 'Failed to load requests.';
            }
          }
        });
    } else {
      this.message = 'No table selected';
    }
  }
  

  onTableChange(): void {
    this.loadRequests(); // Reload requests when table selection changes
  }

  filterRequests(): void {
    this.filteredRequests = this.requests.filter(request => request.tableName === this.selectedTable);
  }

  approveRequest(request: Request): void {
    this.http.put(`http://localhost:5245/api/Request/approve/${request.requestId}`, null)
      .subscribe({
        next: (data) => {
          request.status = 'Approved';
          this.updatePermissions(request, true);
          this.filterRequests();
          this.loadRequests();
          this.message = `Request ID ${request.requestId} approved.`;
        },
        error: (error) => {
          console.error('Error approving request:', error);
          this.message = 'Failed to approve request.';
        }
      });
      
  }
  

  denyRequest(request: Request): void {
    this.http.put(`http://localhost:5245/api/Request/deny/${request.requestId}`, null)
      .subscribe({
        next: (data) => {
          console.log('Request denied:', data);
          request.status = 'Denied';
          this.filterRequests();
          this.message = `Request ID ${request.requestId} denied.`;
        },
        error: (error) => {
          console.error('Error denying request:', error);
          this.message = 'Failed to deny request.';
        }
      });
  }

  // Function to remove the request from the frontend
removeRequestFromFrontend(requestId: number): void {
  console.log(`Removing request with ID ${requestId} from frontend.`);
  
  // Remove the request from the requests and filteredRequests arrays
  this.requests = this.requests.filter(request => request.requestId !== requestId);
  this.filteredRequests = this.filteredRequests.filter(request => request.requestId !== requestId);
  
  // Ensure Angular detects the change and updates the DOM
  this.filteredRequests = [...this.filteredRequests];
  
  // After removing from frontend, call the backend deletion method
  this.removeRequest(requestId);
}

  removeRequest(requestId: number): void {
    console.log(`Removing request with ID: ${requestId}`);
    this.http.delete(`http://localhost:5245/api/Request/delete/${requestId}`).subscribe({
      next: () => {
        console.log(`Request with ID ${requestId} removed successfully.`);
        
        // Remove the request from the requests and filteredRequests arrays
        this.requests = this.requests.filter(request => request.requestId !== requestId);
        this.filteredRequests = this.filteredRequests.filter(request => request.requestId !== requestId);
        
        // Ensure Angular detects the change and updates the DOM
        this.filteredRequests = [...this.filteredRequests];
        
        this.message = `Request ID ${requestId} removed.`;
      },
      error: (error) => {
        console.error('Error removing request:', error);
        this.message = 'Failed to remove request';
      }
    });
  }

  updatePermissions(request: Request, approve: boolean): void {
    if (approve) {
      switch (request.requestType) {
        case 'canRead':
          request.canRead = true;
          break;
        case 'canUpdate':
          request.canUpdate = true;
          break;
        case 'canDelete':
          request.canDelete = true;
          break;
        case 'canWrite':
          request.canWrite = true;
          break;
      }
    }
  }

  saveRequestChanges(request: Request): void {
    this.http.put(`http://localhost:5245/api/Request/${request.requestId}`, request)
      .subscribe({
        error: (error) => {
          console.error('Error saving request changes:', error);
          this.message = 'Failed to save request changes';
        }
      });
  }
}
