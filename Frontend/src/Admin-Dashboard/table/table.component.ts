import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { TableComponent } from 'src/User-Dashboard/Table/Table/table.component';

@Component({
  selector: 'app-tableAd',
  standalone: true,
  imports: [CommonModule, NavbarComponent,TableComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponentAd {

}
