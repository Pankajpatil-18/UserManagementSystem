
import {Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TableComponent } from 'src/User-Dashboard/Table/Table/table.component';
import { TableContentComponent } from 'src/User-Dashboard/Table/TableContent/tablecontent.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'table', component: TableComponent },
  { path: 'table-content', component: TableContentComponent },
  { path: '**', redirectTo: 'login' } // Wildcard route for 404
];

