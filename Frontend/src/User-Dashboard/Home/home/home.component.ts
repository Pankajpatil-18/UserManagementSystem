
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MyService } from 'src/User-Dashboard/my-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName = 'Gayatri';
  selectedTable: string = 'users'; // Default selection
  tables: any = []; // Tables to be fetched from API

  constructor(private router: Router, private myService: MyService) {}

  ngOnInit(): void {
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
    this.router.navigate(['/table'], { queryParams: { selectedTable: this.selectedTable } });
  }

  manageRequests() {
    console.log('Request Management clicked');
    this.router.navigate(['/request']);
  }
  // hasPrivilege(privilege: string): boolean {
  //   return this.userPrivileges[this.selectedTable]?.includes(privilege) ?? false;
  // }
}


