import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableContentComponent } from "../TableContent/tablecontent.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, TableContentComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  tables = ['Students', 'Courses', 'Teachers']; // Example tables
  selectedTable: string | null = null;
  columns: string[] = [];

  tableData: any = {
    Students: [{ id: 1, name: 'John Doe', age: 20 }, { id: 2, name: 'Jane Doe', age: 22 }],
    Courses: [{ id: 1, title: 'Math', credits: 3 }, { id: 2, title: 'English', credits: 2 }],
    Teachers: [{ id: 1, name: 'Mr. Smith', subject: 'Math' }, { id: 2, name: 'Mrs. Johnson', subject: 'English' }]
  };

  @Output() rowSelected = new EventEmitter<any>();
  @Output() addClicked = new EventEmitter<void>();

  onTableSelect(event: Event) {
    this.selectedTable = (event.target as HTMLSelectElement).value;
    this.columns = this.selectedTable ? Object.keys(this.tableData[this.selectedTable][0]) : [];
  }

  onRowSelect(row: any) {
    this.rowSelected.emit(row);
  }

  addNew() {
    const newRow = this.columns.reduce((acc: any, col: string) => {
      acc[col] = '';
      return acc;
    }, {});
    this.rowSelected.emit(newRow);
    this.addClicked.emit();
  }

  
}
