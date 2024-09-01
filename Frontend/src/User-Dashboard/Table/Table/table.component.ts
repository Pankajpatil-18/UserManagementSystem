// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// interface ColumnMetadata {
//   name: string;
//   type: string;
// }

// @Component({
//   selector: 'app-table',
//   standalone:true,
//   imports:[CommonModule,FormsModule],
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })

// export class TableComponent implements OnInit {
//   selectedTable: string = ''; // Default value
//   columns: ColumnMetadata[] = [];
//   tableData: any[] = [];
//   selectedRow: any = {};
//   apiUrl = 'http://localhost:5245/api/Table'; // Replace with your API base URL

//   constructor(private route: ActivatedRoute, private http: HttpClient) {}

//   ngOnInit(): void {
//     // Get the selectedTable value from the query parameters
//     this.route.queryParams.subscribe(params => {
//       this.selectedTable = params['selectedTable'] || 'Student'; // Fallback to 'users' if not provided
//       this.fetchTableData(this.selectedTable);
//       console.log("Iske badd");
//       this.columns.forEach( i=> {
//         console.log("OK then"+i.type);
        
//       });
//     });
//   }

//   fetchTableData(tableName: string): void {
//     this.http.get<any[]>(`${this.apiUrl}/table-data?tableName=${tableName}`).subscribe(data => {
//       // Update columns based on the first row of the data
//       if (data.length > 0) {
//         this.columns = Object.keys(data[0]).map(key => ({
//           name: key,
//           type: this.getColumnType(data[0][key]),
//         }));
//         this.tableData = data;
//         this.initializeEmptyRow();
//       }
//     });
//   }

//   getColumnType(value: any): string {
//     if (typeof value === 'number') return 'number';
//     if (value instanceof Date) return 'date';
//     return 'text';
//   }

//   initializeEmptyRow(): void {
//     this.selectedRow = this.columns.reduce((acc: any, column) => {
//       acc[column.name] = this.getDefaultValueForType(column.type);
//       return acc;
//     }, {});
//   }

//   getDefaultValueForType(type: string): any {
//     switch (type) {
//       case 'number':
//         return 0;
//       case 'text':
//         return '';
//       case 'date':
//         return new Date().toISOString().substring(0, 10);
//       default:
//         return '';
//     }
//   }

//   onRowSelect(row: any): void {
//     this.selectedRow = { ...row };
//   }

//   onSave(): void {
//     // Implement save logic with backend API
//     this.http.post(`${this.apiUrl}/table-data`, this.selectedRow).subscribe(response => {
//       console.log('Saved:', response);
//       this.fetchTableData(this.selectedTable); // Refresh data
//     });
//   }

//   onUpdate(): void {
//     // Implement update logic with backend API
//     if (this.selectedRow && 'id' in this.selectedRow) {
//       this.http.put(`${this.apiUrl}/table-data/${this.selectedRow.id}`, this.selectedRow).subscribe(response => {
//         console.log('Updated:', response);
//         this.fetchTableData(this.selectedTable); // Refresh data
//       });
//     } else {
//       console.log('Selected row does not have a unique identifier.');
//     }
//   }

//   onDelete(): void {
//     // Implement delete logic with backend API
//     if (this.selectedRow && 'id' in this.selectedRow) {
//       this.http.delete(`${this.apiUrl}/table-data/${this.selectedRow.id}`).subscribe(response => {
//         console.log('Deleted:', response);
//         this.fetchTableData(this.selectedTable); // Refresh data
//       });
//     } else {
//       console.log('Selected row does not have a unique identifier.');
//     }
//   }

//   addNew(): void {
//     // Implement add new logic with backend API
//     this.http.post(`${this.apiUrl}/table-data`, this.selectedRow).subscribe(response => {
//       console.log('Added new row:', response);
//       this.fetchTableData(this.selectedTable); // Refresh data
//     });
//   }

//   onCancel(): void {
//     this.initializeEmptyRow(); // Clear the form on cancel
//   }

//   getInputType(type: string): string {
    

//     switch (type) {
//       case 'number':
//         return 'number';
//       case 'text':
//         return 'text';
//       case 'date':
//         return 'date';
//       default:
//         return 'text';
//     }
//   }
// }

// src/app/table/table.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyService } from 'src/User-Dashboard/my-service.service';
import { AuthService } from 'src/app/auth/auth.service';

interface ColumnMetadata {
  name: string;
  type: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  selectedTable: string = ''; 
  columns: ColumnMetadata[] = [];
  tableData: any[] = [];
  selectedRow: any = {};
  tablePrivileges: any = {}; // Object to hold privileges
  apiUrl = 'http://localhost:5245/api/Table'; // API base URL
  curUserId = this.authService.getUserId(); // Get the current user ID

  constructor(private route: ActivatedRoute, private http: HttpClient, private myService: MyService, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTable = params['selectedTable'] || 'Student'; // Default to 'Student' if not provided
      this.fetchTableData(this.selectedTable);
      this.fetchUserPrivileges(); // Fetch user privileges
    });
  }

  fetchTableData(tableName: string): void {
    this.http.get<any[]>(`${this.apiUrl}/table-data?tableName=${tableName}`).subscribe(data => {
      if (data.length > 0) {
        this.columns = Object.keys(data[0]).map(key => ({
          name: key,
          type: this.getColumnType(data[0][key]),
        }));
        this.tableData = data;
        this.initializeEmptyRow();
      }
    });
  }

  fetchUserPrivileges(): void {
    this.myService.getTablePrivileges(this.curUserId, this.selectedTable).subscribe({
      next: (privileges) => {
        this.tablePrivileges = privileges;
      },
      error: (error) => {
        console.error('Failed to fetch user privileges:', error);
        alert('Failed to load user privileges. Some actions may be restricted.');
      }
    });
  }

  getColumnType(value: any): string {
    if (!isNaN(Date.parse(value)) && typeof value === 'string' && value.includes('-')) {
      return 'date';
    }
    if (typeof value === 'number') return 'number';
    return 'text';
  }

  initializeEmptyRow(): void {
    this.selectedRow = this.columns.reduce((acc: any, column) => {
      acc[column.name] = this.getDefaultValueForType(column.type);
      return acc;
    }, {});
  }

  getDefaultValueForType(type: string): any {
    switch (type) {
      case 'number':
        return 0;
      case 'text':
        return '';
      case 'date':
        return new Date().toISOString().substring(0, 10);
      default:
        return '';
    }
  }

  onRowSelect(row: any): void {
    this.selectedRow = { ...row };
  }

  onSave(): void {
    if (this.tablePrivileges.canWrite) {
      this.http.post(`${this.apiUrl}/table-data`, this.selectedRow).subscribe({
        next: (response) => {
          console.log('Saved:', response);
          this.fetchTableData(this.selectedTable);
        },
        error: (error) => {
          console.error('Error saving record:', error);
          alert('Failed to save record. Please try again.');
        }
      });
    } else {
      alert('You do not have permission to save records.');
    }
  }

  onUpdate(): void {
    if (this.tablePrivileges.canUpdate && this.selectedRow && 'id' in this.selectedRow) {
      this.http.put(`${this.apiUrl}/table-data/${this.selectedRow.id}`, this.selectedRow).subscribe({
        next: (response) => {
          console.log('Updated:', response);
          this.fetchTableData(this.selectedTable);
        },
        error: (error) => {
          console.error('Error updating record:', error);
          alert('Failed to update record. Please try again.');
        }
      });
    } else {
      alert('You do not have permission to update records.');
    }
  }

  onDelete(): void {
    if (this.tablePrivileges.canDelete && this.selectedRow && 'id' in this.selectedRow) {
      this.http.delete(`${this.apiUrl}/table-data/${this.selectedRow.id}`).subscribe({
        next: (response) => {
          console.log('Deleted:', response);
          this.fetchTableData(this.selectedTable);
        },
        error: (error) => {
          console.error('Error deleting record:', error);
          alert('Failed to delete record. Please try again.');
        }
      });
    } else {
      alert('You do not have permission to delete records.');
    }
  }

  addTableData(): void {
    if (this.tablePrivileges.canWrite) {
      const requestBody = {
        tableName: this.selectedTable, // Ensure this is correct
        columns: this.columns.map(col => col.name), // Ensure this matches what backend expects
        values: this.columns.map(col => this.selectedRow[col.name]) // Ensure this is accurate
      };
  
      console.log('Request Body:', requestBody); // Log to inspect the payload
  
      this.http.post(`${this.apiUrl}/add`, requestBody).subscribe({
        next: (response) => {
          console.log('Added new row:', response);
          this.fetchTableData(this.selectedTable);
        },
        error: (error) => {
          console.error('Error adding new row:', error);
          alert('Failed to add new row. Please check the console for more details.');
        }
      });
    } else {
      alert('You do not have permission to add new records.');
    }
  }
  

  onCancel(): void {
    this.initializeEmptyRow(); // Clear the form on cancel
  }

  getInputType(type: string): string {
    switch (type) {
      case 'number':
        return 'number';
      case 'text':
        return 'text';
      case 'date':
        return 'date';
      default:
        return 'text';
    }
  }

  hasPrivilege(action: string): boolean {
    return this.tablePrivileges && this.tablePrivileges[action];
  }
}
