import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from 'src/User-Dashboard/my-service.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-request-actions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-actions.component.html',
  styleUrls: ['./request-actions.component.css']
})
export class RequestActionsComponent {
  selectedPermission: string = '';
  tables: string[] = []; // Tables to be fetched from API
  userName: string | null = null; // User's name
  selectedTable: string = ''; // Default selection
  tablePrivileges: { [key: string]: boolean } = {};
  permissions: string[] = ['Read', 'Write', 'Update', 'Delete'];

  newRequest = {
    tableName: '',
    requestType: '',
    message: ''
  };

  @Output() requestSubmitted = new EventEmitter<any>();

  constructor(private router: Router, private myService: MyService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.myService.getTableNames().subscribe({
      next: (tables: string[]) => {
        console.log('Received table names:', tables);
        this.tables = tables;
        // Set default selection if tables are available
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
    this.requestSubmitted.emit(this.newRequest);
    this.newRequest = { tableName: '', requestType: '', message: '' }; // Reset form
  }
}
