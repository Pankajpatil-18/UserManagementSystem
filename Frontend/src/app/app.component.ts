// import { Component } from '@angular/core';
// import { LoginComponent } from "./auth/login/login.component";
// import { SignupComponent } from "./auth/signup/signup.component";
// import { FooterComponent } from "./footer/footer.component";
// import { HeaderComponent } from "./header/header.component";
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import {  UserTableComponent } from "../Admin-Dashboard/user-table/user-table.component";


// @Component({
//   selector: 'app-root',
//   standalone:true,
//   templateUrl: './app.component.html',
//   imports: [LoginComponent, SignupComponent, FooterComponent,
//      HeaderComponent, ReactiveFormsModule, CommonModule, UserComponent, UserTableComponent]
// })
// export class AppComponent {
//   isLogin: boolean = true; // Initially show login form
//   isLogged: boolean = false; // Initially not logged in

//   onSignIn() {
//     this.isLogin = false;
//     this.isLogged = true; // Show sign-up component
//   }

//   onBackToLogin() {
//     this.isLogin = true;
//     this.isLogged = false; // Show login component
//   }
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserTableComponent } from '../Admin-Dashboard/user-table/user-table.component';

import { RequestsTableComponent } from "../Admin-Dashboard/requests-table/requests-table.component";
import { NavbarComponent } from "../Admin-Dashboard/navbar/navbar.component";
import { TableComponentAd } from "../Admin-Dashboard/table/table.component";
import { RouterOutlet } from '@angular/router';
import { TableContentComponent } from 'src/User-Dashboard/Table/TableContent/tablecontent.component';
import { RequestStatusComponent } from 'src/User-Dashboard/RequestBox/RequestBox/request-status/request-status.component';
import { HomeComponent } from "../User-Dashboard/Home/home/home.component";
import { RequestComponent } from 'src/User-Dashboard/RequestBox/RequestBox/request/request.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,RouterOutlet, LoginComponent, SignupComponent, FooterComponent, HeaderComponent, ReactiveFormsModule, CommonModule, TableComponentAd, TableContentComponent, RequestStatusComponent, NavbarComponent, RequestsTableComponent, UserTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin: boolean = true; // Initially show login form
  toSign: boolean = false; // Initially not logged in
  isLogged:boolean=false;

  onSignIn() {
    this.isLogin = false;
    this.toSign = true; // Show sign-up component
  }

  onBackToLogin() {
    this.isLogin = true;
    this.toSign = false; // Show login component
  }
  onLogin(){
    this.isLogged=true;
    this.isLogin=false;
  }
}
