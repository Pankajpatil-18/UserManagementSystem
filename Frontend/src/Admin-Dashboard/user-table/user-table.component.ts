import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";
import { MyService } from 'src/my-service.service';
import { User } from 'src/Models/User.Model';
 
@Component({
  selector: 'app-user-table',
  standalone: true,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class UserTableComponent implements OnInit {
  selectedTable: string = 'Student'; // Default to 'Student' table
  backupTableData: any[] = []; // To store a backup copy of the current data
  tables: any = {}; // Initialize tables as an empty object
  apiUrl: string = 'http://localhost:5245/api'; // Base API URL
  editingUserId: number | null = null; // Track the ID of the user currently being edited
 
  constructor(private http: HttpClient, private myService: MyService) {
    this.loadTableData(this.selectedTable);
  }
 
  ngOnInit() {
    this.loadTableName();
    this.loadTableData(this.selectedTable);
  }
 
  loadTableName() {
    this.myService.getTableNames().subscribe({
      next: (tables: string[]) => {
        console.log('Received table names:', tables);
        this.tables = tables;
      },
      error: (error) => {
        console.error('Error fetching table names:', error);
      }
    });
  }
 
  loadTableData(tableName: string) {
    this.http.get<any[]>(`${this.apiUrl}/UserControllers/GetUsersPrivileges?tableName=${tableName}`).subscribe({
      next: (data) => {
        this.tables[tableName] = data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          canInsert: !!user.canInsert,
          canUpdate: !!user.canUpdate,
          canDelete: !!user.canDelete,
          isEditing: false // Add an 'isEditing' flag for each user
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
 
  onEdit(user: any) {
    // Set the selected user as being edited
    this.editingUserId = user.id;
    this.backupTableData = JSON.parse(JSON.stringify(this.currentTableData));
   
    // Enable editing mode for the selected user only
    this.currentTableData.forEach((u: { isEditing: boolean; id: any; }) => u.isEditing = u.id === user.id);
  }
 
  onSaveChanges(user: any) {
    if (this.editingUserId !== user.id) return; // Only save if this is the currently edited user
 
    user.isEditing = false; // Turn off editing mode for this user
    this.showAlert('Your changes are being saved!');
 
    const payload = {
      userId: user.id,
      tableName: this.selectedTable,
      canInsert: user.canInsert ?? false,
      canUpdate: user.canUpdate ?? false,
      canDelete: user.canDelete ?? false
    };
 
    this.http.post(`${this.apiUrl}/UserControllers/UpdateUserPermissions`, payload, { responseType: 'text' }).subscribe({
      next: () => {
        console.log(`Successfully updated permissions for user ${user.id}`);
        this.editingUserId = null; // Clear the editing state after saving
      },
      error: (error) => {
        console.error(`Error updating permissions for user ${user.id}:`, error);
      }
    });
  }
 
  onCancelEdit(user: any) {
    if (this.editingUserId !== user.id) return; // Only cancel if this is the currently edited user
 
    user.isEditing = false; // Cancel editing for the specific user
    // Restore original data for the canceled user
    const index = this.currentTableData.findIndex((u: { id: any; }) => u.id === user.id);
    this.currentTableData[index] = this.backupTableData[index];
    this.editingUserId = null; // Clear the editing state
  }
 
  togglePermission(row: any, permission: keyof typeof row) {
    if (row.isEditing) {
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
 