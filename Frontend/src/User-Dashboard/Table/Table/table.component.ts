// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface ColumnMetadata {
//   name: string;
//   type: string;
// }

// @Component({
//   selector: 'app-table',
//   standalone: true,
//   imports: [RouterModule, CommonModule,FormsModule], // Include RouterModule and CommonModule as imports
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent implements OnInit {
//   selectedTable: string = ''; // Default value
//   columns: ColumnMetadata[] = [];
//   tableData: any[] = [];
//   selectedRow: any = {};

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     // Get the selectedTable value from the query parameters
//     this.route.queryParams.subscribe(params => {
//       this.selectedTable = params['selectedTable'] || 'users'; // Fallback to 'users' if not provided
//       this.fetchTableData(this.selectedTable);
//     });
//   }

//   fetchTableData(tableName: string): void {
//     // Fetch or set static data based on selected table
//     if (tableName === 'users') {
//       this.columns = [
//         { name: 'id', type: 'number' },
//         { name: 'username', type: 'text' },
//         { name: 'email', type: 'text' }
//       ];
//       this.tableData = [
//         { id: 1, username: 'Alice', email: 'alice@example.com' },
//         { id: 2, username: 'Bob', email: 'bob@example.com' }
//       ];
//     } else if (tableName === 'products') {
//       this.columns = [
//         { name: 'id', type: 'number' },
//         { name: 'name', type: 'text' },
//         { name: 'price', type: 'number' }
//       ];
//       this.tableData = [
//         { id: 1, name: 'Product A', price: 100 },
//         { id: 2, name: 'Product B', price: 200 }
//       ];
//     } else if (tableName === 'orders') {
//       this.columns = [
//         { name: 'order_id', type: 'number' },
//         { name: 'customer_name', type: 'text' },
//         { name: 'order_date', type: 'date' }
//       ];
//       this.tableData = [
//         { order_id: 101, customer_name: 'John Doe', order_date: '2024-08-01' },
//         { order_id: 102, customer_name: 'Jane Smith', order_date: '2024-08-15' }
//       ];
//     }

//     this.initializeEmptyRow();
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

//     onRowSelect(row: any): void {
//         this.selectedRow = { ...row };
//       }
    
//       onSave(): void {
//         // Uncomment and modify this part for backend integration
//         /*
//         this.http.post(`/api/tables/${this.selectedTable}`, this.selectedRow).subscribe(response => {
//           console.log('Saved:', response);
//           this.fetchTableData(this.selectedTable); // Refresh data
//         });
//         */
    
//         // Static save logic
//         console.log('Save:', this.selectedRow);
//       }
    
//       onUpdate(): void {
//         // Uncomment and modify this part for backend integration
//         /*
//         this.http.put(`/api/tables/${this.selectedTable}/${this.selectedRow.id}`, this.selectedRow).subscribe(response => {
//           console.log('Updated:', response);
//           this.fetchTableData(this.selectedTable); // Refresh data
//         });
//         */
    
//         // Static update logic(TO DELETE)
//         if (this.selectedRow && 'id' in this.selectedRow) {
//           const index = this.tableData.findIndex(row => row.id === this.selectedRow.id);
      
//           if (index !== -1) {
//             // Update the row with the new data
//             this.tableData[index] = { ...this.selectedRow };
//             console.log('Updated:', this.selectedRow);
//           } else {
//             console.log('Row not found for update.');
//           }
//         } else {
//           console.log('Selected row does not have a unique identifier.');
//         }
//       }
    
//       //(TO DELETE)
//       isEqual(row1: any, row2: any): boolean {
//         // Adjust the comparison logic based on your unique key(s)
//         return JSON.stringify(row1) === JSON.stringify(row2);
//       }
    
//       onDelete(): void {
//         // Uncomment and modify this part for backend integration
//         /*
//         this.http.delete(`/api/tables/${this.selectedTable}/${this.selectedRow.id}`).subscribe(response => {
//           console.log('Deleted:', response);
//           this.fetchTableData(this.selectedTable); // Refresh data
//         });
//         */
    
//         // Static delete logic(To DELETE)
//         console.log('Delete:', this.selectedRow);
//         const index = this.tableData.findIndex(row => this.isEqual(row, this.selectedRow));
    
//         if (index !== -1) {
//           // Remove the row from the table data
//           this.tableData.splice(index, 1);
//           console.log('Deleted:', this.selectedRow);
//           this.initializeEmptyRow(); // Clear the form after deletion
//         } else {
//           console.log('Row not found for deletion.');
//         }
//       }
    
//       addNew(): void {
//         // Static add new logic
//         this.tableData.push({ ...this.selectedRow });
//         this.initializeEmptyRow(); // Clear the form after adding
//       }
    
//       onCancel(): void {
//         this.initializeEmptyRow(); // Clear the form on cancel
//       }
//       getInputType(type: string): string {
//             switch (type) {
//               case 'number':
//                 return 'number';
//               case 'text':
//                 return 'text';
//               case 'date':
//                 return 'date';
//               default:
//                 return 'text';
//             }
//           }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ColumnMetadata {
  name: string;
  type: string;
}

@Component({
  selector: 'app-table',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  selectedTable: string = ''; // Default value
  columns: ColumnMetadata[] = [];
  tableData: any[] = [];
  selectedRow: any = {};
  apiUrl = 'http://localhost:5245/api/Table'; // Replace with your API base URL

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the selectedTable value from the query parameters
    this.route.queryParams.subscribe(params => {
      this.selectedTable = params['selectedTable'] || 'users'; // Fallback to 'users' if not provided
      this.fetchTableData(this.selectedTable);
    });
  }

  fetchTableData(tableName: string): void {
    this.http.get<any[]>(`${this.apiUrl}/table-data?tableName=${tableName}`).subscribe(data => {
      // Update columns based on the first row of the data
      if (data.length > 0) {
        this.columns = Object.keys(data[0]).map(key => ({
          name: key,
          type: this.getColumnType(data[0][key])
        }));
        this.tableData = data;
        this.initializeEmptyRow();
      }
    });
  }

  getColumnType(value: any): string {
    if (typeof value === 'number') return 'number';
    if (value instanceof Date) return 'date';
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
    // Implement save logic with backend API
    this.http.post(`${this.apiUrl}/table-data`, this.selectedRow).subscribe(response => {
      console.log('Saved:', response);
      this.fetchTableData(this.selectedTable); // Refresh data
    });
  }

  onUpdate(): void {
    // Implement update logic with backend API
    if (this.selectedRow && 'id' in this.selectedRow) {
      this.http.put(`${this.apiUrl}/table-data/${this.selectedRow.id}`, this.selectedRow).subscribe(response => {
        console.log('Updated:', response);
        this.fetchTableData(this.selectedTable); // Refresh data
      });
    } else {
      console.log('Selected row does not have a unique identifier.');
    }
  }

  onDelete(): void {
    // Implement delete logic with backend API
    if (this.selectedRow && 'id' in this.selectedRow) {
      this.http.delete(`${this.apiUrl}/table-data/${this.selectedRow.id}`).subscribe(response => {
        console.log('Deleted:', response);
        this.fetchTableData(this.selectedTable); // Refresh data
      });
    } else {
      console.log('Selected row does not have a unique identifier.');
    }
  }

  addNew(): void {
    // Implement add new logic with backend API
    this.http.post(`${this.apiUrl}/table-data`, this.selectedRow).subscribe(response => {
      console.log('Added new row:', response);
      this.fetchTableData(this.selectedTable); // Refresh data
    });
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
}

