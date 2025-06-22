import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class NewPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Get token from query params
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        // Redirect to forgot password if no token
        this.router.navigate(['/forgot-password']);
      }
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  getErrorMessage(controlName: string): string {
    const control = this.resetForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName === 'password' ? 'Password' : 'Confirm password'} is required`;
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (this.resetForm.hasError('mismatch') && controlName === 'confirmPassword') {
      return 'Passwords do not match';
    }
    return '';
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Password reset with token:', this.token);
        console.log('New password:', this.resetForm.value.password);
        this.isLoading = false;
        this.router.navigate(['/login']);
      }, 1500);
    }
  }
} 