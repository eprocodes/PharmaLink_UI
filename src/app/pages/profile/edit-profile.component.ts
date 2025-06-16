import { Component, OnInit } from '@angular/core';
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
  selector: 'app-edit-profile',
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
                  <h1>Edit Profile</h1>
                  <p class="subtitle">Update your personal information</p>
                </div>
              </div>
            </div>
          </div>

          <mat-card class="edit-form-card">
            <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
              <div class="form-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Full Name</mat-label>
                  <input matInput formControlName="fullName" placeholder="Enter your full name">
                  <mat-error *ngIf="editForm.get('fullName')?.hasError('required')">
                    Full name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" placeholder="Enter your email">
                  <mat-error *ngIf="editForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="editForm.get('email')?.hasError('email')">
                    Please enter a valid email
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Phone</mat-label>
                  <input matInput formControlName="phone" placeholder="Enter your phone number">
                  <mat-error *ngIf="editForm.get('phone')?.hasError('required')">
                    Phone number is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Business Mobile (WhatsApp)</mat-label>
                  <input matInput formControlName="whatsapp" placeholder="Enter your WhatsApp number">
                  <mat-error *ngIf="editForm.get('whatsapp')?.hasError('required')">
                    WhatsApp number is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="location-field">
                  <mat-label>Location</mat-label>
                  <textarea matInput formControlName="location" 
                    placeholder="Enter your location" 
                    rows="3">
                  </textarea>
                  <mat-error *ngIf="editForm.get('location')?.hasError('required')">
                    Location is required
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-actions">
                <button mat-stroked-button type="button" (click)="onCancel()" class="cancel-button">
                  Cancel
                </button>
                <button mat-raised-button color="primary" type="submit" [disabled]="!editForm.valid">
                  Save Changes
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

    .edit-form-card {
      padding: 24px;
      margin-bottom: 24px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;

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

    .title-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .back-button {
      color: #666;
    }

    .location-field {
      grid-column: 1 / -1;  // Make location field span full width
    }

    textarea {
      min-height: 80px;  // Set minimum height for textarea
      resize: vertical;   // Allow vertical resizing
    }

    @media (max-width: 768px) {
      .content {
        margin-left: 0;
        width: 100%;
        padding: 16px;
      }

      .form-grid {
        grid-template-columns: 1fr;
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
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      fullName: ['John Doe', Validators.required],
      email: ['john.doe@pharmalink.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567', Validators.required],
      whatsapp: ['+1 (555) 987-6543', Validators.required],
      location: ['Main Branch', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      // TODO: Implement save logic
      this.router.navigate(['/profile']);
    }
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }
} 