import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, RadioControlValueAccessor, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { emailValidator } from './email-validator';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  @Output() signIn = new EventEmitter<void>();
  @Output() isLogged=new EventEmitter<void>();
  isLoading = false; // Loading state

  constructor(private fb: FormBuilder,private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginType: ['user', Validators.required], // Default value 'user'
      email: ['', [Validators.required, Validators.email,emailValidator()]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formValues = this.loginForm.value;
      console.log('Login Type:', formValues.loginType);
      console.log('Email:', formValues.email);
      console.log('Password:', formValues.password);

      // API call to backend
      this.http.post<any>('http://localhost:5245/api/Auth/login', {
        email: formValues.email,
        password: formValues.password
      }).subscribe(
        response => {
          this.isLoading = false;
          console.log('Login successful', response);

          // Check if the backend role matches the selected login type
          if (response.role === formValues.loginType.charAt(0).toUpperCase() + formValues.loginType.slice(1)) {
            if (response.role === 'Admin') {
              this.router.navigate(['/user-management']);
            } else if (response.role === 'User') {
              this.router.navigate(['/home']);
            }
            this.isLogged.emit();
          } else {
            alert('The role returned by the server does not match the selected login type.');
          }
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Login failed', error);
          alert('Login failed: ' + (error.error.message || 'An unknown error occurred'));
        }
      );
  
    }
  }
    

  onSignIn() {
    this.signIn.emit();
    this.router.navigate(['/signup']);
  }
}

