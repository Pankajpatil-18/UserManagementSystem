import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from 'src/my-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-request-actions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-actions.component.html',
  styleUrls: ['./request-actions.component.css']
})
export class RequestActionsComponent implements OnInit {
  selectedPermission: string = '';
  tables: string[] = [];
  userName: string | null = null;
  selectedTable: string = '';
  tablePrivileges: { [key: string]: boolean } = {};
  permissions: string[] = ['Read', 'Write', 'Update', 'Delete'];

  newRequest = {
    tableName: '',
    requestType: '',
    message: '',
    
  };

  @Output() requestSubmitted = new EventEmitter<any>();

  constructor(
    private router: Router,
    private myService: MyService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName(); // Fetch the username
    this.myService.getTableNames().subscribe({
      next: (tables: string[]) => {
        this.tables = tables;
        if (tables.length > 0) {
          this.selectedTable = tables[0];
          this.fetchTablePrivileges();
        }
      },
      error: (error) => {
        console.error('Error fetching table names:', error);
      }
    });
  }

  onTableChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTable = target.value;
    console.log('Selected table:', this.selectedTable);
    this.fetchTablePrivileges();
  }
  
  fetchTablePrivileges(): void {
    const userId = this.authService.getUserId();
    if (userId && this.selectedTable) {
      this.myService.getTablePrivileges(userId, this.selectedTable).subscribe({
        next: (privileges) => {
          this.tablePrivileges = privileges;
        },
        error: (error) => console.error('Error fetching table privileges:', error)
      });
    } else {
      console.error('User ID or selected table not found.');
    }
  }

  onPermissionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedPermission = target.value;
    const privilegeKey = `can${target.value}`;

    if (this.hasPrivilege(privilegeKey)) {
      alert(`You already have ${target.value} permission`);
    }
  }

  hasPrivilege(privilege: string): boolean {
    return this.tablePrivileges[privilege] ?? false;
  }

  submitRequest(): void {
    if (this.selectedTable && this.selectedPermission && this.newRequest.message && !this.hasPrivilege("can"+this.selectedPermission)) {
      this.newRequest.tableName = this.selectedTable;
      this.newRequest.requestType = this.selectedPermission;
       // Include username in the request

      this.postRequestToServer();
    } else {
      if(!(this.selectedTable && this.selectedPermission && this.newRequest.message)){
        alert('Please fill out all required fields.');
      }
      else if(this.hasPrivilege("can"+this.selectedPermission)){
          alert(`You already have ${this.selectedPermission} permission`);
      }
    }
  }

  postRequestToServer(): void {
    const userId = this.authService.getUserId();
    const userName = this.authService.getUserName(); // Make sure this returns a non-null value
  
    console.log(userName);
    if (!userName) {
      alert('User name is missing.');
      return;
    }
  
    const url = 'http://localhost:5245/api/Request/submit';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    const requestBody = {
      userId: userId,
      tableName: this.newRequest.tableName,
      requestType: this.newRequest.requestType,
      message: this.newRequest.message,
      userName: userName, // Ensure userName is included
      status: 'Pending',
      date: new Date().toISOString()
    };
  
    this.http.post(url, requestBody, { headers }).subscribe({
      next: (response) => {
        console.log('Request submitted successfully:', response);
        alert('Request submitted successfully.');
        this.newRequest = { tableName: '', requestType: '', message: '' }; // Reset form
        this.requestSubmitted.emit(requestBody);
      },
      error: (error) => {
        console.error('Error submitting request:', error);
        alert('Failed to submit request.');
      }
    });
  }
  
}
