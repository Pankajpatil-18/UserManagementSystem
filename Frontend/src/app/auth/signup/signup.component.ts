import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { HttpClient } from '@angular/common/http';  // Import HttpClient

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  @Output() back = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}  // Inject HttpClient

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['User']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onSignUpSubmit() {
    if (this.signUpForm.valid) {
        const formValues = this.signUpForm.value;

        // API call to backend
        this.http.post('http://localhost:5245/api/Auth/signup', {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
            role: formValues.role
            
        }).subscribe({
            next: (response) => {
                console.log('Signup successful', response);
                alert('Signup successful');
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error('Signup failed', error);
                alert('Signup failed: ' + error.error.message);
            }
        });
    }
  }

  onBack() {
    this.back.emit();
    this.router.navigate(['/login']);
  }
}

