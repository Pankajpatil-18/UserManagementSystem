import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { emailValidator } from "./email-validator";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { HeaderComponent } from "src/app/header/header.component";
import { FooterComponent } from "src/app/footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false; // Control password visibility
  @Output() signIn = new EventEmitter<void>();
  @Output() isLogged = new EventEmitter<void>();
  isLoading = false; // Loading state


  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginType: ['user', Validators.required],
      email: ['', [Validators.required, Validators.email, emailValidator()]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggle password visibility
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formValues = this.loginForm.value;
      console.log('Login Type:', formValues.loginType);
      console.log('Email:', formValues.email);
      console.log('Password:', formValues.password);

      this.http.post<any>('http://localhost:5245/api/Auth/login', {
        email: formValues.email,
        password: formValues.password
      }).subscribe(
        response => {
          this.isLoading = false;
          console.log('Login successful', response);
          this.authService.setUserId(response.userId);
          this.authService.setUserName(response.userName);

          if (response.role === formValues.loginType.charAt(0).toUpperCase() + formValues.loginType.slice(1)) {
            if (response.role === 'Admin') {
              this.authService.login(formValues.password);
              this.router.navigate(['/user-management']);
            } else if (response.role === 'User') {
              this.authService.login(formValues.password);
              this.router.navigate(['/home']).then(() => {
                window.history.replaceState({}, '', '/home');
              });
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