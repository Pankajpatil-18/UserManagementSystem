import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";

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
  apiUrl: string = 'http://localhost:5245/api/UserControllers/GetUsersPrivileges'; // Base API URL

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTableData(this.selectedTable);
  }

  loadTableData(tableName: string) {
    this.http.get<any[]>(`${this.apiUrl}?tableName=${tableName}`).subscribe({
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
