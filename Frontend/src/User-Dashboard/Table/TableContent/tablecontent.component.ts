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
  @Input() selectedRow: any; // Add @Input() to receive data
  @Input() columns: string[] = []; // Use this to get columns
  isRowSelected: boolean = false;

  @Output() save = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

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

  // Method to detect row selection
  ngOnChanges() {
    if (this.selectedRow) {
      this.isRowSelected = true;
    } else {
      this.isRowSelected = false;
    }
  }
}
