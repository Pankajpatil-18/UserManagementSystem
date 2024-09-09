
// src/app/table/table.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyService } from 'src/my-service.service';
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
    if (!this.hasPrivilege('canUpdate')) {
      alert('You do not have permission to update records.');
    } else {
        if (this.tablePrivileges.canUpdate && this.selectedRow) {
          // Determine the dynamic ID property
          const idField = this.myService.getIdFieldName(this.selectedRow);
          if (idField && this.selectedRow[idField] !== undefined) {
            // Construct the URL with query parameters
            const url = `${this.apiUrl}/update?tableName=${encodeURIComponent(this.selectedTable)}&primaryKeyColumn=${encodeURIComponent(idField)}&id=${encodeURIComponent(this.selectedRow[idField])}`;
            
            // Prepare the body with the updated data
            const updateData = { ...this.selectedRow };
            delete updateData[idField]; // Remove the ID field from the body
            
            this.http.put(url, updateData).subscribe({
              next: (response) => {
                console.log('Updated:', response);
                this.fetchTableData(this.selectedTable); // Refresh the table data
              },
              error: (error) => {
                console.error('Error updating record:', error);
                alert('Failed to update record. Please try again.');
              }
            });
          } else {
            alert('Selected row does not have a valid ID.');
          }
        } else {
          alert('You do not have permission to update records.');
        }
      }
    
  }
  
  onDelete(): void {
    if (!this.hasPrivilege('canDelete')) {
      alert('You do not have permission to delete records.');
    } else {
      if (this.tablePrivileges.canDelete && this.selectedRow) {
        // Determine the dynamic ID property
        const idField = this.myService.getIdFieldNameToValidate(this.selectedRow);
        if (idField && this.selectedRow[idField] !== undefined) {
          // Construct the URL with query parameters
          const url = `${this.apiUrl}/delete?tableName=${encodeURIComponent(this.selectedTable)}&primaryKeyColumn=${encodeURIComponent(idField)}&id=${encodeURIComponent(this.selectedRow[idField])}`;
          console.log(url);
          this.http.delete(url).subscribe({
            next: (response) => {
              console.log('Deleted:', response);
              this.fetchTableData(this.selectedTable); // Refresh the table data
            },
            error: (error) => {
              console.error('Error deleting record:', error);
              alert('Failed to delete record. Please try again.');
            }
          });
        } else {
          alert('Selected row does not have a valid ID.');
        }
      } else {
        alert('You do not have permission to delete records.');
      }
    }
  }
  
  addTableData(): void {
    if (!this.hasPrivilege('canWrite')) {
      alert('You do not have permission to add new records.');
    } else {
      if (this.tablePrivileges.canWrite) {
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
          }
        });
      } else {
        alert('You do not have permission to add new records.');
      }
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
