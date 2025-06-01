import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="form-section">
          <h2 class="section-title">New Customer</h2>
          <p class="section-description">
            Add a new pharmacy customer to your network. Fill in the required information below.
          </p>

          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()" class="customer-form">
            <div class="form-row">
              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Full Name</mat-label>
                  <input matInput formControlName="fullName" placeholder="Enter customer's full name">
                  <mat-error *ngIf="customerForm.get('fullName')?.hasError('required')">
                    Full name is required
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-group">
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
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Email Address</mat-label>
                  <input matInput formControlName="email" placeholder="Enter email address">
                  <mat-error *ngIf="customerForm.get('email')?.hasError('email')">
                    Please enter a valid email address
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Address</mat-label>
                  <textarea matInput formControlName="address" placeholder="Enter address" rows="1"></textarea>
                </mat-form-field>
              </div>
            </div>

            <div class="form-actions">
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
      padding: 16px;
      box-sizing: border-box;
      max-width: calc(100vw - 254px);
      overflow-x: hidden;
    }

    .form-section {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin: 0;
      width: 100%;
    }

    .section-title {
      color: #2C3E50;
      font-size: 18px;
      font-weight: 500;
      margin: 0 0 4px 0;
    }

    .section-description {
      color: #666;
      font-size: 13px;
      line-height: 1.4;
      margin: 0 0 16px 0;
    }

    .customer-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 100%;
    }

    .form-row {
      display: flex;
      gap: 20px;
      width: 100%;
      
      .form-group {
        flex: 1;
        min-width: 0;
      }
    }

    .form-group {
      mat-form-field {
        width: 100%;
      }
    }

    .form-actions {
      margin-top: 8px;
      
      button {
        height: 36px;
        min-width: 140px;
        padding: 0 20px;
        font-size: 14px;
        background-color: #0B6E4F;
        border-radius: 4px;

        &:disabled {
          background-color: #e5e7eb;
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
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
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