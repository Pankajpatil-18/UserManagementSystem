
import {Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TableComponent } from 'src/User-Dashboard/Table/Table/table.component';
import { TableContentComponent } from 'src/User-Dashboard/Table/TableContent/tablecontent.component';
import { RequestActionsComponent } from 'src/User-Dashboard/RequestBox/request-actions/request-actions.component';
import { RequestStatusComponent } from 'src/User-Dashboard/RequestBox/request-status/request-status.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'table', component: TableComponent },
  { path: 'table-content', component: TableContentComponent },
  { path: 'requestbox' ,component:RequestActionsComponent},
  { path: 'requeststatuslist',component:RequestStatusComponent},
  { path: '**', redirectTo: 'login' } // Wildcard route for 404
];

