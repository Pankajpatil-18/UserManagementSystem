// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports:[CommonModule,ReactiveFormsModule],
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignUpComponent {
//   signUpForm: FormGroup;

//   @Output() back = new EventEmitter<void>();

//   constructor(private fb: FormBuilder) {
//     this.signUpForm = this.fb.group({
//       firstName: ['', [Validators.required]],
//       lastName: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]
//     }, { validators: this.passwordMatchValidator });
//   }

//   passwordMatchValidator(form: FormGroup) {
//     return form.get('password')?.value === form.get('confirmPassword')?.value
//       ? null : { mismatch: true };
//   }

//   onSignUpSubmit() {
//     if (this.signUpForm.valid) {
//       // Handle sign-up logic here
//     }
//   }

//   onBack() {
//     this.back.emit(); // Emit event to parent component
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";

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

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
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
      console.log('First Name:', formValues.firstName);
      console.log('Last Name:', formValues.lastName);
      console.log('Email:', formValues.email);
      console.log('Password:', formValues.password);
      console.log('Confirm Password:', formValues.confirmPassword);
      this.router.navigate(['/login']);

      // Perform your signup logic here
    }
  }

  onBack() {
    this.back.emit();
    this.router.navigate(['/login']);
  }
}
