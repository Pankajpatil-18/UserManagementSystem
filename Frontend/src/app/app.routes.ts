
import {RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TableComponent } from 'src/User-Dashboard/Table/Table/table.component';
import { TableContentComponent } from 'src/User-Dashboard/Table/TableContent/tablecontent.component';
import { RequestActionsComponent } from 'src/User-Dashboard/RequestBox/request-actions/request-actions.component';
import { RequestStatusComponent } from 'src/User-Dashboard/RequestBox/request-status/request-status.component';
import { TableComponentAd } from 'src/Admin-Dashboard/table/table.component';
import { RequestsTableComponent } from 'src/Admin-Dashboard/requests-table/requests-table.component';
import { UserTableComponent } from 'src/Admin-Dashboard/user-table/user-table.component';
import { NavbarComponent } from 'src/Admin-Dashboard/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from 'src/User-Dashboard/Home/home/home.component';
import { RequestComponent } from 'src/User-Dashboard/RequestBox/request/request.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'table', component: TableComponent },
  { path: 'table-content', component: TableContentComponent },
  { path: 'requestbox' ,component:RequestActionsComponent},
  { path: 'requeststatuslist',component:RequestStatusComponent},
  { path: 'user-management', component: UserTableComponent },
  { path: 'request-management', component: RequestsTableComponent },
  { path: 'tableAd', component: TableComponentAd },
  { path: 'navbar' ,component:NavbarComponent},
  { path: 'home' ,component:HomeComponent},
  { path: 'request' ,component:RequestComponent},
  { path: '**', redirectTo: 'login' } 
];
