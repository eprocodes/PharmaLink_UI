import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-edit-customer',
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
            <button mat-icon-button class="back-button" [routerLink]="['..']">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="header-content">
              <h1>Edit Customer</h1>
              <p>Update customer information</p>
            </div>
          </div>
        </div>

        <div class="edit-form-container">
          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
            <div class="form-grid">
              <mat-form-field appearance="outline">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="fullName" placeholder="Enter full name">
                <mat-error *ngIf="customerForm.get('fullName')?.hasError('required')">
                  Full name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" placeholder="Enter email" type="email">
                <mat-error *ngIf="customerForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="customerForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mobile</mat-label>
                <input matInput formControlName="mobile" placeholder="Enter mobile number">
                <mat-error *ngIf="customerForm.get('mobile')?.hasError('required')">
                  Mobile number is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Address</mat-label>
                <textarea matInput formControlName="address" placeholder="Enter address" rows="3"></textarea>
                <mat-error *ngIf="customerForm.get('address')?.hasError('required')">
                  Address is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" [routerLink]="['..']">Cancel</button>
              <button mat-flat-button color="primary" type="submit" [disabled]="!customerForm.valid">
                Save Changes
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
      
      min-height: calc(100vh - 64px);
      background-color: #f8f9fa;
    }

    .content {
      flex: 1;
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

    .edit-form-container {
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
      }
    }

    :host ::ng-deep {
      .mat-mdc-form-field {
        width: 100%;
      }
    }
  `]
})
export class EditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get the customer ID from the route parameters
    this.route.params.subscribe(params => {
      this.customerId = params['id'];
      // TODO: Load customer data using the ID and populate form
      this.customerForm.patchValue({
        fullName: 'John Doe',
        email: 'john.doe@pharmalink.com',
        mobile: '+1 234 567 8900',
        address: '123 Pharmacy Street, Medical District, Health City, 12345'
      });
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log('Form submitted:', this.customerForm.value);
      // TODO: Implement save functionality
    }
  }
} 