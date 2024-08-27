import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  tables = ['Students', 'Courses', 'Teachers']; // Example tables
  selectedTable: string ="";
  columns: string[] = [];
  selectedRow: any; // To hold the selected row data
  isRowSelected: boolean = false; // To track if a row is selected
  errorMessage: string = ''; // New property for error messages


  tableData: any = {
    Students: [{ id: 1, name: 'John Doe', age: 20 }, { id: 2, name: 'Jane Doe', age: 22 }],
    Courses: [{ id: 1, title: 'Math', credits: 3 }, { id: 2, title: 'English', credits: 2 }],
    Teachers: [{ id: 1, name: 'Mr. Smith', subject: 'Math' }, { id: 2, name: 'Mrs. Johnson', subject: 'English' }]
  };

  @Output() rowSelected = new EventEmitter<any>();
  @Output() addClicked = new EventEmitter<void>();

  onTableSelect(event: Event) {
    this.selectedTable = (event.target as HTMLSelectElement).value;
    this.columns = Object.keys(this.tableData[this.selectedTable][0]);
    this.selectedRow = null;
    this.isRowSelected = false;
  }

  onRowSelect(row: any) {
    this.selectedRow = { ...row }; // Create a copy of the selected row to avoid direct mutations
    this.isRowSelected = true; // Mark row as selected
    this.rowSelected.emit(row);
  }

  addNew() {
    const newRow = this.columns.reduce((acc: any, col: string) => {
      acc[col] = '';
      return acc;
    }, {});
    this.selectedRow = newRow;
    this.isRowSelected = true; // Allow editing of the new row
    this.rowSelected.emit(newRow);
    this.addClicked.emit();
  }

  // Event handlers for row editing
  onSave() {
    if (this.selectedRow) {
      // Implement logic to save the updated row back to the tableData
      const index = this.tableData[this.selectedTable].findIndex((row: any) => row.id === this.selectedRow.id);
      if (index > -1) {
        this.tableData[this.selectedTable][index] = { ...this.selectedRow };
      } else {
        // If it's a new row (no ID or new ID)
        this.selectedRow.id = this.tableData[this.selectedTable].length + 1; // Generate a new ID
        this.tableData[this.selectedTable].push(this.selectedRow);
      }
      this.resetSelection();
    }
  }

  onCancel() {
    // Reset the selected row and form
    this.resetSelection();
  }

  onUpdate() {
    if (this.validateRow()) {
      // Your logic to update the row goes here
      this.errorMessage = ''; // Clear error if validation passes
    } else {
      this.errorMessage = 'The entered ID does not exist in the table.';
    }
  }
  validateRow(): boolean {
    if (!this.selectedRow) return false;

    // Check if the ID exists in the current table data
    const idExists = this.tableData[this.selectedTable].some((row: { id: any; }) => row.id === this.selectedRow.id);
    return idExists;
  }

  onDelete() {
    // Delete the selected row from the tableData
    if (this.selectedRow) {
      this.tableData[this.selectedTable] = this.tableData[this.selectedTable].filter((row: any) => row.id !== this.selectedRow.id);
      this.resetSelection();
    }
  }

  resetSelection() {
    this.selectedRow = null;
    this.isRowSelected = false;
    this.errorMessage = '';
  }
}
