import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, RadioControlValueAccessor, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
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

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginType: ['user', Validators.required], // Default value 'user'
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      console.log('Login Type:', formValues.loginType);
      console.log('Email:', formValues.email);
      console.log('Password:', formValues.password);
      

      if(formValues.loginType==="user"){
        this.isLogged.emit();
        this.router.navigate(['/table']);
      }
      if(formValues.loginType==='admin'){
        this.isLogged.emit();
        this.router.navigate(['/user-management']);
      }

      // Perform your login logic here
    }
  }

  
  onSignIn(){
        this.signIn.emit();
        this.router.navigate(['/signup']);
        
  }
}
