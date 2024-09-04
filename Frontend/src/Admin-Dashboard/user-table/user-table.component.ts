import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";
import { MyService } from 'src/User-Dashboard/my-service.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class UserTableComponent implements OnInit {
  selectedTable: string = 'Student'; // Default to 'Student' table
  isEditing: boolean = false;
  backupTableData: any[] = []; // To store a backup copy of the current data
  tables: any = {}; // Initialize tables as an empty object
  apiUrl: string = 'http://localhost:5245/api'; // Base API URL

  constructor(private http: HttpClient,private myService :MyService) {
    this.loadTableData(this.selectedTable);
  }

  ngOnInit() {
    this.loadTableName();
    this.loadTableData(this.selectedTable);
  }

  loadTableName(){
    this.myService.getTableNames().subscribe({
      next: (tables: string[]) => {
        console.log('Received table names:', tables); // Log received tables
        this.tables = tables;
      },
      error: (error) => {
        console.error('Error fetching table names:', error); // Log full error object
        // Additional handling, if needed
      },
      complete: () => {
        console.log('Completed fetching table names.');
      }
    });
  }

  loadTableData(tableName: string) {
    this.http.get<any[]>(`${this.apiUrl}/UserControllers/GetUsersPrivileges?tableName=${tableName}`).subscribe({
      next: (data) => {
        // Map the API response to the format you need
        this.tables[tableName] = data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          canInsert: !!user.canInsert,
          canUpdate: !!user.canUpdate,
          canDelete: !!user.canDelete,
        }));
      },
      error: (error) => {
        console.error('Error loading table data:', error);
      }
    });
  }
  onTableChange(event: any) {
    const target = event.target as HTMLSelectElement;
    this.selectedTable = target.value;
    this.loadTableData(this.selectedTable);
  }

  get currentTableData() {
    return this.tables[this.selectedTable as keyof typeof this.tables] || [];
  }

  onEdit() {
    this.isEditing = true;
    this.backupTableData = JSON.parse(JSON.stringify(this.currentTableData));
  }

  onSaveChanges() {
    this.isEditing = false;
    this.showAlert('Your changes are saved!');
    // Make a POST request to save changes here
    // this.http.post(this.apiUrl, this.currentTableData).subscribe(/* handle response */);
  }

  onCancelEdit() {
    this.isEditing = false;
    this.tables[this.selectedTable as keyof typeof this.tables] = JSON.parse(JSON.stringify(this.backupTableData));
    const alertBox = document.querySelector('.alert');
    if (alertBox) {
      alertBox.classList.remove('show');
    }
  }

  togglePermission(row: any, permission: keyof typeof row) {
    if (this.isEditing) {
      row[permission] = !row[permission];
    }
  }

  private showAlert(message: string) {
    const alertBox = document.querySelector('.alert');
    if (alertBox) {
      alertBox.textContent = message;
      alertBox.classList.add('show');
      setTimeout(() => {
        alertBox.classList.remove('show');
      }, 2000);
    }
  }
}
