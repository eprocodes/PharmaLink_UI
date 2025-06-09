import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="page-header">
          <div class="header-left">
            <button mat-icon-button class="back-button" routerLink="/customers">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="header-content">
              <h1>New Customer</h1>
              <p>Add a new pharmacy customer to your network</p>
            </div>
          </div>
        </div>

        <div class="form-container">
          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
            <div class="form-grid">
              <mat-form-field appearance="outline">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="fullName" placeholder="Enter customer's full name">
                <mat-error *ngIf="customerForm.get('fullName')?.hasError('required')">
                  Full name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mobile Number</mat-label>
                <input matInput formControlName="mobile" placeholder="Enter mobile number">
                <mat-error *ngIf="customerForm.get('mobile')?.hasError('required')">
                  Mobile number is required
                </mat-error>
                <mat-error *ngIf="customerForm.get('mobile')?.hasError('pattern')">
                  Please enter a valid mobile number
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput formControlName="email" placeholder="Enter email address">
                <mat-error *ngIf="customerForm.get('email')?.hasError('email')">
                  Please enter a valid email address
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Address</mat-label>
                <textarea matInput formControlName="address" placeholder="Enter address" rows="3"></textarea>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" routerLink="/customers" class="cancel-button">Cancel</button>
              <button mat-flat-button color="primary" type="submit" [disabled]="!customerForm.valid">
                Create Customer
              </button>
            </div>
          </form>
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
      min-height: calc(100vh - 64px);
      background-color: #f8f9fa;
    }

    .content {
      flex: 1;
      margin-left: 254px;
      padding: 24px;
      box-sizing: border-box;
      max-width: calc(100vw - 254px);
      overflow-x: hidden;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      .header-left {
        display: flex;
        align-items: center;
        gap: 16px;

        .back-button {
          padding: 0;
          width: 40px;
          height: 40px;
          line-height: 40px;
          color: rgba(0, 0, 0, 0.54);
          border-radius: 50%;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;

          mat-icon {
            font-size: 24px;
            width: 24px;
            height: 24px;
            line-height: 24px;
          }

          &:hover {
            background-color: #F5F5F5;
          }
        }

        .header-content {
          h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 500;
            color: #2C3E50;
          }

          p {
            margin: 4px 0 0 0;
            color: #666;
            font-size: 14px;
          }
        }
      }
    }

    .form-container {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      .full-width {
        grid-column: 1 / -1;
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;

      button {
        min-width: 120px;
        height: 40px;
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

    ::ng-deep {
      .mat-mdc-form-field {
        width: 100%;

        .mat-mdc-text-field-wrapper {
          background-color: #f9fafb;
        }

        .mat-mdc-form-field-flex {
          background-color: #f9fafb;
          min-height: 56px !important;
        }

        .mat-mdc-form-field-infix {
          padding-top: 16px !important;
          padding-bottom: 16px !important;
          min-height: unset;
        }

        .mdc-text-field--outlined {
          --mdc-outlined-text-field-container-height: 56px;
        }

        .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix {
          padding-top: 16px;
          padding-bottom: 16px;
          min-height: 56px;
          display: flex;
          align-items: center;
        }

        .mat-mdc-input-element {
          margin-top: 0;
          margin-bottom: 0;
          height: 24px;
          line-height: 24px;
        }

        .mdc-floating-label {
          top: 50%;
          transform: translateY(-50%);
        }

        .mdc-floating-label--float-above {
          transform: translateY(-130%) scale(0.75);
        }

        textarea {
          resize: none;
          margin: 0 !important;
          height: 24px !important;
          min-height: 24px !important;
          padding: 0 !important;

          &[rows="3"] {
            height: 72px !important;
            min-height: 72px !important;
          }
        }
      }
    }
  `]
})
export class NewCustomerComponent {
  customerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.email]],
      address: ['']
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log('Form submitted:', this.customerForm.value);
      // TODO: Implement API call to create customer
    }
  }
} 