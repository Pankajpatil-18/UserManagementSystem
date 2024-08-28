import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Include CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userName = 'Gayatri';
  selectedTable: keyof typeof this.userPrivileges = 'Student'; 
  userPrivileges = {
    Student: ['Read', 'Write'],
    Employee: ['Read'],
  };

  constructor(private router: Router) {}

  logout() {
    console.log('Logout clicked');
  }

  onTableChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTable = target.value as keyof typeof this.userPrivileges;
    console.log('Selected table:', this.selectedTable);
    // TODO: Fetch privileges for the selected table from the backend
    // Uncomment the following line when backend integration is ready:
    // this.fetchPrivileges();
  }

  hasPrivilege(privilege: string): boolean {
    return this.userPrivileges[this.selectedTable].includes(privilege);
  }

  manageRecords() {
    console.log('Record Management clicked');
    this.router.navigate(['/table']);
  }

  manageRequests() {
    console.log('Request Management clicked');
    this.router.navigate(['/requestbox'])
  }

  // TODO: Uncomment and implement these methods when backend integration is ready
  // private fetchPrivileges(): void {
  //   this.privilegeService.getPrivileges(this.selectedTable).subscribe(privileges => {
  //     this.userPrivileges[this.selectedTable] = privileges;
  //   });
  // }
}
