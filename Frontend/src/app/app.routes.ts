import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Auth Components
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

// User Dashboard Components
import { TableComponent } from 'src/User-Dashboard/Table/Table/table.component';
import { TableContentComponent } from 'src/User-Dashboard/Table/TableContent/tablecontent.component';
import { RequestActionsComponent } from 'src/User-Dashboard/RequestBox/RequestBox/request-actions/request-actions.component';
import { RequestStatusComponent } from 'src/User-Dashboard/RequestBox/RequestBox/request-status/request-status.component';
import { HomeComponent } from 'src/User-Dashboard/Home/home/home.component';
import { RequestComponent } from 'src/User-Dashboard/RequestBox/RequestBox/request/request.component';

// Admin Dashboard Components
import { TableComponentAd } from 'src/Admin-Dashboard/table/table.component';
import { RequestsTableComponent } from 'src/Admin-Dashboard/requests-table/requests-table.component';
import { UserTableComponent } from 'src/Admin-Dashboard/user-table/user-table.component';
import { NavbarComponent } from 'src/Admin-Dashboard/navbar/navbar.component';

// Auth Guard (if you want to restrict access to certain routes)
import { AuthGuard } from './auth.guard';// Ensure you have this guard implemented

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },

  { path: 'signup', component: SignupComponent },
  
  // User Routes
  { path: 'table', component: TableComponent, canActivate: [AuthGuard] },
  { path: 'table-content', component: TableContentComponent, canActivate: [AuthGuard] },
  { path: 'requestbox', component: RequestActionsComponent, canActivate: [AuthGuard] },
  { path: 'requeststatuslist', component: RequestStatusComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },

  // Admin Routes
  { path: 'user-management', component: UserTableComponent, canActivate: [AuthGuard] },
  { path: 'request-management', component: RequestsTableComponent, canActivate: [AuthGuard] },
  { path: 'tableAd', component: TableComponentAd, canActivate: [AuthGuard] },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },

  // Wildcard route for handling undefined routes
  { path: '**', redirectTo: 'login' }
];
