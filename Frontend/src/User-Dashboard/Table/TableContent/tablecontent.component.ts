import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tablecontent',
  standalone: true,
  templateUrl: './tablecontent.component.html',
  styleUrls: ['./tablecontent.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TableContentComponent {
  @Input() selectedRow: any; // Receive selected row
  @Input() columns: string[] = []; // Receive columns from parent
  @Output() save = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  isRowSelected: boolean = false;

  ngOnChanges() {
    // Check if a row is selected
    this.isRowSelected = !!this.selectedRow;
  }

  onSave() {
    this.save.emit(this.selectedRow);
  }

  onCancel() {
    this.cancelEdit.emit();
  }

  onUpdate() {
    this.update.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
