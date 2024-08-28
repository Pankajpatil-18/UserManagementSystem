import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  standalone: true,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UserTableComponent {
  selectedTable: string = 'Student'; // Default to 'Student' table
  isEditing: boolean = false;

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
  }

  onSaveChanges() {
    this.isEditing = false;
    const alertBox = document.querySelector('.alert');
    if (alertBox) {
      alertBox.classList.add('show');
      setTimeout(() => {
        alertBox.classList.remove('show');
      }, 2000); // Hide after 2 seconds
    }
  }

  onCancelEdit() {
    this.isEditing = false;
    alert('Edit canceled!');
  }

  togglePermission(row: any, permission: keyof typeof row) {
    if (this.isEditing) {
      row[permission] = !row[permission];
    }
  }
}
