import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';  // Uncomment this when ready for backend integration
// import { Observable } from 'rxjs';  // Uncomment this when ready for backend integration


interface Request {
  id: number;
  user: string;
  permissions: {
    read: boolean;
    update: boolean;
    delete: boolean;
    write: boolean;
  };
  requestType: string;
  status: string;
  date: string;
  table: string; // Add table field to identify which table the request belongs to
}

@Component({
  selector: 'app-requests-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.css']
})
export class RequestsTableComponent implements OnInit {
  selectedTable: string = 'Table1'; // Default selection
  tables: string[] = []; // Will be populated with data from backend

  // Static data for requests with 'Read' permission set to true by default
  requests: Request[] = [
    { id: 1, user: 'John Doe', permissions: { read: true, update: false, delete: false, write: false }, requestType: 'Update', status: 'Pending', date: new Date().toISOString(), table: 'Table1' },
    { id: 2, user: 'Emily Davis', permissions: { read: true, update: false, delete: false, write: false }, requestType: 'Delete', status: 'Pending', date: new Date().toISOString(), table: 'Table1' },
    { id: 3, user: 'Jane Smith', permissions: { read: true, update: true, delete: true, write: true }, requestType: 'Read', status: 'Approved', date: new Date().toISOString(), table: 'Table2' }
  ];

  filteredRequests: Request[] = [];

  // Uncomment this when ready for backend integration
  // constructor(private http: HttpClient) {
  //   this.loadTables();
  //   this.loadRequests();
  // }

  // Uncomment and implement this method to load table data from the backend
  // loadTables(): void {
  //   this.http.get<string[]>('your-backend-api-endpoint/tables')
  //     .subscribe(data => {
  //       this.tables = data;
  //       this.filterRequests();
  //     });
  // }

  // Uncomment and implement this method to load requests data from the backend
  // loadRequests(): void {
  //   this.http.get<Request[]>('your-backend-api-endpoint/requests')
  //     .subscribe(data => {
  //       this.requests = data;
  //       this.filterRequests();
  //     });
  // }

  ngOnInit(): void {
    // Initialize tables with static data for now
    this.tables = ['Table1', 'Table2', 'Table3']; // Static data for tables
    this.filterRequests();
  }

  onTableChange(): void {
    this.filterRequests();
  }

  filterRequests(): void {
    this.filteredRequests = this.requests.filter(request => request.table === this.selectedTable);
  }

  approveRequest(request: Request): void {
    request.status = 'Approved';
    this.updatePermissions(request, true);
    this.filterRequests(); // Update the filtered requests after approval
    // Send the updated status to the backend
    // this.saveRequestChanges(request);
  }

  denyRequest(request: Request): void {
    request.status = 'Denied';
    this.updatePermissions(request, false);
    this.filterRequests(); // Update the filtered requests after denial
    // Send the updated status to the backend
    // this.saveRequestChanges(request);
  }

  removeRequest(requestId: number): void {
    this.requests = this.requests.filter(request => request.id !== requestId);
    this.filterRequests(); // Update the filtered requests after removal
    // Optionally, send a request to the backend to remove the request
    // this.http.delete(`your-backend-api-endpoint/requests/${requestId}`).subscribe();
  }

  updatePermissions(request: Request, approve: boolean): void {
    if (approve) {
      switch (request.requestType) {
        case 'Read':
          request.permissions.read = true;
          break;
        case 'Update':
          request.permissions.update = true;
          break;
        case 'Delete':
          request.permissions.delete = true;
          break;
        case 'Write':
          request.permissions.write = true;
          break;
      }
    }
  }
}

