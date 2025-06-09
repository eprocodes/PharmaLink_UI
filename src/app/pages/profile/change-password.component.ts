import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="container">
          <div class="profile-header">
            <div class="header-content">
              <div class="title-section">
                <button mat-icon-button (click)="onCancel()" class="back-button">
                  <mat-icon>arrow_back</mat-icon>
                </button>
                <div>
                  <h1>Change Password</h1>
                  <p class="subtitle">Update your account password</p>
                </div>
              </div>
            </div>
          </div>

          <mat-card class="password-form-card">
            <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
              <div class="form-fields">
                <mat-form-field appearance="outline">
                  <mat-label>Current Password</mat-label>
                  <input matInput type="password" formControlName="currentPassword" placeholder="Enter current password">
                  <mat-error *ngIf="passwordForm.get('currentPassword')?.hasError('required')">
                    Current password is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>New Password</mat-label>
                  <input matInput type="password" formControlName="newPassword" placeholder="Enter new password">
                  <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('required')">
                    New password is required
                  </mat-error>
                  <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('minlength')">
                    Password must be at least 8 characters long
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Confirm New Password</mat-label>
                  <input matInput type="password" formControlName="confirmPassword" placeholder="Confirm new password">
                  <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('required')">
                    Password confirmation is required
                  </mat-error>
                  <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('passwordMismatch')">
                    Passwords do not match
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-actions">
                <button mat-stroked-button type="button" (click)="onCancel()" class="cancel-button">
                  Cancel
                </button>
                <button 
                  mat-raised-button 
                  color="primary" 
                  type="submit" 
                  [disabled]="!passwordForm.valid"
                  [class.disabled-button]="!passwordForm.valid"
                  class="submit-button">
                  Update Password
                </button>
              </div>
            </form>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow-x: hidden;
    }

    .main-content {
      display: flex;
      padding-top: 64px;
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .content {
      flex: 1;
      margin-left: 200px;
      padding: 24px;
      width: calc(100% - 200px);
      box-sizing: border-box;
    }

    .container {
     max-width: 100%;
    padding-left: 60px;
      width: 100%;
    }

    .profile-header {
      margin-bottom: 24px;

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: 16px;

      h1 {
        font-size: 24px;
        color: #2C3E50;
        margin: 0 0 8px 0;
        font-weight: 500;
      }

      .subtitle {
        color: #666;
        margin: 0;
        font-size: 14px;
      }
    }

    .back-button {
      color: #666;
    }

    .password-form-card {
      padding: 24px;
      margin-bottom: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 24px;

      mat-form-field {
        width: 100%;
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;

      button {
        min-width: 120px;
        height: 40px;
      }

      .submit-button {
        background-color: #0B6E4F;
        color: white;

        &.disabled-button {
          background-color: rgba(0, 0, 0, 0.12) !important;
          color: rgba(0, 0, 0, 0.38);
        }

        &:not(.disabled-button):hover {
          background-color: #0A5940;
        }
      }

      .cancel-button {
        border: 1px solid rgba(0, 0, 0, 0.12);
        color: rgba(0, 0, 0, 0.87);
        background-color: transparent;

        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
      }
    }

    @media (max-width: 768px) {
      .content {
        margin-left: 0;
        width: 100%;
        padding: 16px;
      }

      .form-actions {
        flex-direction: column-reverse;
        
        button {
          width: 100%;
        }
      }
    }
  `]
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      // TODO: Implement password change logic
      this.router.navigate(['/profile']);
    }
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }
} 