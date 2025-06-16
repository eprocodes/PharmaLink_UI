import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

@Component({
  selector: 'app-notification-broadcast',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="container">
          <div class="page-header">
            <h1>Notification Broadcast</h1>
            <p class="subtitle">Send notifications to multiple customers at once</p>
          </div>

          <mat-card class="broadcast-card">
            <form [formGroup]="broadcastForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Select Customers</mat-label>
                <mat-select formControlName="customers" multiple>
                  <mat-option [value]="'all'">Select All</mat-option>
                  <mat-option *ngFor="let customer of customers" [value]="customer.id">
                    {{customer.name}}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="broadcastForm.get('customers')?.hasError('required')">
                  Please select at least one customer
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Title</mat-label>
                <input matInput formControlName="title" placeholder="Enter notification title">
                <mat-error *ngIf="broadcastForm.get('title')?.hasError('required')">
                  Title is required
                </mat-error>
                <mat-error *ngIf="broadcastForm.get('title')?.hasError('maxlength')">
                  Title cannot exceed 100 characters
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Message</mat-label>
                <textarea matInput formControlName="message" 
                          placeholder="Enter your message here"
                          rows="4"></textarea>
                <mat-error *ngIf="broadcastForm.get('message')?.hasError('required')">
                  Message is required
                </mat-error>
                <mat-error *ngIf="broadcastForm.get('message')?.hasError('maxlength')">
                  Message cannot exceed 500 characters
                </mat-error>
              </mat-form-field>

              <button mat-flat-button color="primary" type="submit" 
                      [disabled]="broadcastForm.invalid || isLoading"
                      class="submit-button">
                <span *ngIf="!isLoading">Send Notification</span>
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
              </button>
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
      min-height: calc(100vh - 64px);
      background-color: #f8f9fa;
    }

    .content {
      flex: 1;
      margin-left: 245px;
      margin-top: 55px;
      padding: 25px 25px 25px 35px;
      box-sizing: border-box;
      max-width: calc(100vw - 245px);
      transition: margin-left 0.3s ease, max-width 0.3s ease;

      :host-context(.sidebar-collapsed) & {
        margin-left: 55px;
        max-width: calc(100vw - 55px);
      }
    }

    .container {
      max-width: 100%;
      width: 100%;
    }

    .page-header {
      margin-bottom: 24px;

      h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 500;
        color: #2C3E50;
      }

      .subtitle {
        margin: 4px 0 0;
        color: #666;
        font-size: 14px;
      }
    }

    .broadcast-card {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .form-field {
        width: 100%;
      }

      .submit-button {
        height: 44px;
        background-color: #0B6E4F;
        color: white;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        &:disabled {
          background-color: rgba(0, 0, 0, 0.12);
        }

        mat-spinner {
          margin: 0 8px;
        }
      }
    }

    @media (max-width: 768px) {
      .content {
        margin-left: 0;
        max-width: 100vw;
        padding: 16px;
      }

      .container {
        padding-left: 0;
      }
    }
  `]
})
export class NotificationBroadcastComponent implements OnInit {
  broadcastForm: FormGroup;
  isLoading = false;
  customers: Customer[] = [
    { id: 1, name: 'John Smith Pharmacy', email: 'john.smith@healthpharm.com', phone: '+1 (555) 123-4567' },
    { id: 2, name: 'MediCare Plus', email: 'contact@medicareplus.com', phone: '+1 (555) 234-5678' },
    { id: 3, name: 'Wellness Pharmaceuticals', email: 'info@wellnesspharm.com', phone: '+1 (555) 345-6789' },
    { id: 4, name: 'City Health Supplies', email: 'orders@cityhealthsupplies.com', phone: '+1 (555) 456-7890' },
    { id: 5, name: 'Community Care Pharmacy', email: 'support@communitycare.com', phone: '+1 (555) 567-8901' }
  ];

  constructor(private fb: FormBuilder) {
    this.broadcastForm = this.fb.group({
      customers: [[], [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit() {
    // Here you would typically load customers from your service
  }

  onSubmit() {
    if (this.broadcastForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Broadcasting message:', {
          customers: this.broadcastForm.value.customers,
          title: this.broadcastForm.value.title,
          message: this.broadcastForm.value.message
        });
        this.isLoading = false;
        this.broadcastForm.reset();
      }, 1500);
    }
  }
} 