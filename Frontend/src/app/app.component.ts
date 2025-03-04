import { Component } from '@angular/core';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../User-Dashboard/Table/Table/table.component";
import { TableContentComponent } from "../User-Dashboard/Table/TableContent/tablecontent.component";
import { RouterOutlet } from '@angular/router';
import { RequestStatusComponent } from 'src/User-Dashboard/RequestBox/request-status/request-status.component';
import { HomeComponent } from "../User-Dashboard/Home/home/home.component";
import { RequestComponent } from 'src/User-Dashboard/RequestBox/request/request.component';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  imports: [RequestComponent,RouterOutlet, LoginComponent, SignupComponent, FooterComponent, HeaderComponent, ReactiveFormsModule, CommonModule, TableComponent, TableContentComponent, RequestStatusComponent, HomeComponent],
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
