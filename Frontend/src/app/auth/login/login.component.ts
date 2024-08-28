import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule,RouterLink],
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
      this.isLogged.emit();
      this.router.navigate(['/table'])

      // Perform your login logic here
    }
  }

  
  onSignIn(){
        this.signIn.emit();
        this.router.navigate(['/signup']);
        
  }
}
