import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Include CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
togglePrivilege(_t22: string) {
throw new Error('Method not implemented.');
}
oneMoreAction() {
throw new Error('Method not implemented.');
}
anotherAction() {
throw new Error('Method not implemented.');
}
  userName = 'Gayatri';
  selectedTable: keyof typeof this.userPrivileges = 'Student'; 
  userPrivileges = {
    Student: ['Read', 'Write'],
    Employee: ['Read'],
  };

  logout() {
    console.log('Logout clicked');
  }

  onTableChange(selectedTable: keyof typeof this.userPrivileges) {
    this.selectedTable = selectedTable;
    console.log('Selected table:', selectedTable);
  }

  hasPrivilege(privilege: string): boolean {
    return this.userPrivileges[this.selectedTable].includes(privilege);
  }

  manageRecords() {
    console.log('Record Management clicked');
  }

  manageRequests() {
    console.log('Request Management clicked');
  }
}
