

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-user-table',
  standalone: true,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class UserTableComponent {
  selectedTable: string = 'Student'; // Default to 'Student' table
  isEditing: boolean = false;
  backupTableData: any[] = []; // To store a backup copy of the current data

  // Sample data
  tables = {
    Student: [
      { id: 1, name: 'Aditi', email: 'aditi@example.com', canInsert: false, canUpdate: false, canDelete: false },
      { id: 2, name: 'Gayatri', email: 'gayatri@example.com', canInsert: false, canUpdate: false, canDelete: false },
    ],
    Employee: [
      { id: 3, name: 'Shekhar', email: 'shekhar@example.com', canInsert: false, canUpdate: false, canDelete: false },
      { id: 4, name: 'Pankaj', email: 'pankaj@example.com', canInsert: false, canUpdate: false, canDelete: false },
    ],
  };

  get currentTableData() {
    return this.tables[this.selectedTable as keyof typeof this.tables];
  }

  onEdit() {
    this.isEditing = true;
    // Make a deep copy of the current table data for backup
    this.backupTableData = JSON.parse(JSON.stringify(this.currentTableData));
  }

  onSaveChanges() {
    this.isEditing = false;
    this.showAlert('Your changes are saved!');
  }

  onCancelEdit() {
    this.isEditing = false;
    // Restore the backup data
    this.tables[this.selectedTable as keyof typeof this.tables] = JSON.parse(JSON.stringify(this.backupTableData));
    // Hide the alert box if it's shown
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
      }, 2000); // Hide after 2 seconds
    }
  }
}
