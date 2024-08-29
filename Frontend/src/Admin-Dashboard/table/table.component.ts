import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
// Import HttpClient if you're planning to use backend logic
// import { HttpClient } from '@angular/common/http';

interface ColumnMetadata {
  name: string;
  type: string;
}

@Component({
  selector: 'app-table',
  standalone:true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponentAd implements OnInit {
  tables: string[] = ['users', 'products', 'orders'];
  selectedTable: string = '';
  columns: ColumnMetadata[] = [];
  tableData: any[] = [];
  selectedRow: any = {};
  


  constructor(
    // private http: HttpClient // Uncomment this when using backend
  ) {}
  ngOnInit(): void {
    // Select the first table by default
    
    console.log("From Table "+this.selectedTable);
    this.fetchTableData(this.selectedTable);
  }

  fetchTableData(tableName: string): void {
    // Uncomment and modify this part for backend integration
    /*
    this.http.get<any>(`/api/tables/${tableName}`).subscribe(response => {
      this.columns = response.columns;
      this.tableData = response.data;
      this.initializeEmptyRow();
    });
    */

    // Static data setup based on selected table
    if (tableName === 'users') {
      this.columns = [
        { name: 'id', type: 'number' },
        { name: 'username', type: 'text' },
        { name: 'email', type: 'text' }
      ];
      this.tableData = [
        { id: 1, username: 'Alice', email: 'alice@example.com' },
        { id: 2, username: 'Bob', email: 'bob@example.com' }
      ];
    } else if (tableName === 'products') {
      this.columns = [
        { name: 'id', type: 'number' },
        { name: 'name', type: 'text' },
        { name: 'price', type: 'number' }
      ];
      this.tableData = [
        { id: 1, name: 'Product A', price: 100 },
        { id: 2, name: 'Product B', price: 200 }
      ];
    } else if (tableName === 'orders') {
      this.columns = [
        { name: 'order_id', type: 'number' },
        { name: 'customer_name', type: 'text' },
        { name: 'order_date', type: 'date' }
      ];
      this.tableData = [
        { order_id: 101, customer_name: 'John Doe', order_date: '2024-08-01' },
        { order_id: 102, customer_name: 'Jane Smith', order_date: '2024-08-15' }
      ];
    }

    // Initialize the edit form with empty fields
    this.initializeEmptyRow();
  }

  initializeEmptyRow(): void {
    this.selectedRow = this.columns.reduce((acc:any, column) => {
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
        return new Date().toISOString().substring(0, 10); // YYYY-MM-DD format
      default:
        return '';
    }
  }

  onTableSelect(event: Event): void {
    this.selectedTable = (event.target as HTMLSelectElement).value;
    this.fetchTableData(this.selectedTable);
  }

  onRowSelect(row: any): void {
    this.selectedRow = { ...row };
  }

  onSave(): void {
    // Uncomment and modify this part for backend integration
    /*
    this.http.post(`/api/tables/${this.selectedTable}`, this.selectedRow).subscribe(response => {
      console.log('Saved:', response);
      this.fetchTableData(this.selectedTable); // Refresh data
    });
    */

    // Static save logic
    console.log('Save:', this.selectedRow);
  }

  onUpdate(): void {
    // Uncomment and modify this part for backend integration
    /*
    this.http.put(`/api/tables/${this.selectedTable}/${this.selectedRow.id}`, this.selectedRow).subscribe(response => {
      console.log('Updated:', response);
      this.fetchTableData(this.selectedTable); // Refresh data
    });
    */

    // Static update logic(TO DELETE)
    if (this.selectedRow && 'id' in this.selectedRow) {
      const index = this.tableData.findIndex(row => row.id === this.selectedRow.id);
  
      if (index !== -1) {
        // Update the row with the new data
        this.tableData[index] = { ...this.selectedRow };
        console.log('Updated:', this.selectedRow);
      } else {
        console.log('Row not found for update.');
      }
    } else {
      console.log('Selected row does not have a unique identifier.');
    }
  }

  //(TO DELETE)
  isEqual(row1: any, row2: any): boolean {
    // Adjust the comparison logic based on your unique key(s)
    return JSON.stringify(row1) === JSON.stringify(row2);
  }

  onDelete(): void {
    // Uncomment and modify this part for backend integration
    /*
    this.http.delete(`/api/tables/${this.selectedTable}/${this.selectedRow.id}`).subscribe(response => {
      console.log('Deleted:', response);
      this.fetchTableData(this.selectedTable); // Refresh data
    });
    */

    // Static delete logic(To DELETE)
    console.log('Delete:', this.selectedRow);
    const index = this.tableData.findIndex(row => this.isEqual(row, this.selectedRow));

    if (index !== -1) {
      // Remove the row from the table data
      this.tableData.splice(index, 1);
      console.log('Deleted:', this.selectedRow);
      this.initializeEmptyRow(); // Clear the form after deletion
    } else {
      console.log('Row not found for deletion.');
    }
  }

  addNew(): void {
    // Static add new logic
    this.tableData.push({ ...this.selectedRow });
    this.initializeEmptyRow(); // Clear the form after adding
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
