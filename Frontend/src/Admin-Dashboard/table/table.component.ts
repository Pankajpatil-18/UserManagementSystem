import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyService } from 'src/my-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";

interface ColumnMetadata {
  name: string;
  type: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponentAd implements OnInit {
  selectedTable: string = 'Student'; 
  columns: ColumnMetadata[] = [];
  tableData: any[] = [];
  selectedRow: any = {};
  apiUrl = 'http://localhost:5245/api/Table'; // API base URL
  curUserId = this.authService.getUserId(); // Get the current user ID
  tablesName:any=[];

  constructor(private route: ActivatedRoute, private http: HttpClient, private myService: MyService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTableName();
    this.fetchTableData(this.selectedTable);
  }
  loadTableName(){
    this.myService.getTableNames().subscribe({
      next: (tables: string[]) => {
        console.log('Received table names:', tables); // Log received tables
        this.tablesName = tables;
      },
      error: (error) => {
        console.error('Error fetching table names:', error); // Log full error object
        // Additional handling, if needed
      },
      complete: () => {
        console.log('Completed fetching table names.');
      }
    });
    console.log(this.tablesName);
  }

  onTableChange(event: any) {
    const target = event.target as HTMLSelectElement;
    this.selectedTable = target.value;
    this.columns = []; // Clear columns before fetching new data
    this.fetchTableData(this.selectedTable); // Fetch data for the new table
  }

  fetchTableData(tableName: string): void {
    this.http.get<any[]>(`${this.apiUrl}/table-data?tableName=${tableName}`).subscribe({
      next: (data) => {
        if (data.length > 0) {
          // Set columns based on the first data row
          this.columns = Object.keys(data[0]).map(key => ({
            name: key,
            type: this.getColumnType(data[0][key]),
          }));
        } else {
          // No data, set columns based on the table schema
          this.fetchTableSchema(tableName);
        }
        this.tableData = data;
        this.initializeEmptyRow();
      },
      error: (error) => {
        console.error('Error fetching table data:', error);
        this.columns = [];
        this.tableData = [];
        this.initializeEmptyRow();
      }
    });
  }

  fetchTableSchema(tableName: string): void {
    this.http.get<any[]>(`${this.apiUrl}/table-schema?tableName=${tableName}`).subscribe({
      next: (schema) => {
        this.columns = schema.map((column: any) => ({
          name: column.name,
          type: column.type,
        }));
        this.initializeEmptyRow();
      },
      error: (error) => {
        console.error('Error fetching table schema:', error);
        this.columns = [];
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
  }
  onUpdate(): void {
    
    if (this.selectedRow) {
      const idField = this.myService.getIdFieldNameToValidate(this.selectedRow);
      console.log('ID Field Name:', idField); // Check what this returns
      console.log('Selected Row:', this.selectedRow);
  
      if (idField && this.selectedRow[idField] !== undefined) {
        const url = `${this.apiUrl}/update?tableName=${encodeURIComponent(this.selectedTable)}&primaryKeyColumn=${encodeURIComponent(idField)}&id=${encodeURIComponent(this.selectedRow[idField])}`;
        const updateData = { ...this.selectedRow };
        delete updateData[idField]; // Remove ID field from the body
  
        this.http.put(url, updateData).subscribe({
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
        alert('Selected row does not have a valid ID.');
      }
    }
  }
  
  onDelete(): void {
    if (this.selectedRow) {
      const idField = this.myService.getIdFieldNameToValidate(this.selectedRow);
      console.log('ID Field Name:', idField); // Check what this returns
      console.log('Selected Row:', this.selectedRow);
  
      if (idField && this.selectedRow[idField] !== undefined) {
        const url = `${this.apiUrl}/delete?tableName=${encodeURIComponent(this.selectedTable)}&primaryKeyColumn=${encodeURIComponent(idField)}&id=${encodeURIComponent(this.selectedRow[idField])}`;
        console.log('Delete URL:', url);
  
        this.http.delete(url).subscribe({
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
        alert('Selected row does not have a valid ID.');
      }
    }
  }
  
  addTableData(): void {
        // Prepare the request URL with query parameters for tableName and columns
        const url = `${this.apiUrl}/add?tableName=${encodeURIComponent(this.selectedTable)}&columns=${encodeURIComponent(this.columns.map(col => col.name).join(','))}`;
    
        // Create the request body with values as a JSON object
        const requestBody = this.columns.reduce((obj:any, col) => {
          obj[col.name] = this.selectedRow[col.name];
          return obj;
        }, {});
    
        console.log('Request URL:', url); // Log to inspect the URL
        console.log('Request Body:', requestBody); // Log to inspect the payload
    
        this.http.post(url, requestBody).subscribe({
          next: (response) => {
            console.log('Added new row:', response);
            this.fetchTableData(this.selectedTable);
          },
          error: (error) => {
            console.error('Error adding new row:', error);
            alert('Failed to add new row. Please check the console for more details.');
          }
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
