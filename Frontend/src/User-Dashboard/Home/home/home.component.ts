import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule], // Include RouterModule and CommonModule as imports
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userName = 'Gayatri';
  selectedTable: string = 'users'; // Default selection
  userPrivileges :any= {
        users: ['Read', 'Write'],
        products: ['Read'],
        orders:['Read']
      };

  constructor(private router: Router) {}

  logout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }

  onTableChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTable = target.value;
    console.log('Selected table:', this.selectedTable);
  }

  manageRecords() {
    console.log('Record Management clicked');
    // Navigate to TableComponent with selectedTable as a query parameter
    this.router.navigate(['/table'], { queryParams: { selectedTable: this.selectedTable } });
  }

  manageRequests() {
    console.log('Request Management clicked');
    this.router.navigate(['/request']);
  }
  hasPrivilege(privilege: string): boolean {
        return this.userPrivileges[this.selectedTable].includes(privilege);
    }
}

