import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-medicine',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    HeaderComponent,
    SidebarComponent,
    RouterModule
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="page-header">
          <div class="header-left">
            <button mat-icon-button class="back-button" routerLink="/medicines/list">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="header-content">
              <h1>Add New Medicine</h1>
              <p>Add a new medicine to your inventory by filling out the details below.</p>
            </div>
          </div>
        </div>

        <div class="form-container">
          <form [formGroup]="medicineForm" (ngSubmit)="onSubmit()" class="medicine-form">
            <div class="form-row">
              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Medicine Name</mat-label>
                  <input matInput formControlName="name" placeholder="Enter medicine name">
                  <mat-error *ngIf="medicineForm.get('name')?.hasError('required')">
                    Medicine name is required
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Generic Name</mat-label>
                  <input matInput formControlName="genericName" placeholder="Enter generic name">
                  <mat-error *ngIf="medicineForm.get('genericName')?.hasError('required')">
                    Generic name is required
                  </mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Category</mat-label>
                  <mat-select formControlName="category">
                    <mat-option value="antibiotics">Antibiotics</mat-option>
                    <mat-option value="analgesics">Analgesics</mat-option>
                    <mat-option value="antidiabetics">Antidiabetics</mat-option>
                    <mat-option value="antihypertensives">Antihypertensives</mat-option>
                    <mat-option value="antihistamines">Antihistamines</mat-option>
                  </mat-select>
                  <mat-error *ngIf="medicineForm.get('category')?.hasError('required')">
                    Category is required
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Manufacturer</mat-label>
                  <input matInput formControlName="manufacturer" placeholder="Enter manufacturer name">
                  <mat-error *ngIf="medicineForm.get('manufacturer')?.hasError('required')">
                    Manufacturer is required
                  </mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Unit Price</mat-label>
                  <input matInput type="number" formControlName="unitPrice" placeholder="Enter unit price">
                  <mat-error *ngIf="medicineForm.get('unitPrice')?.hasError('required')">
                    Unit price is required
                  </mat-error>
                  <mat-error *ngIf="medicineForm.get('unitPrice')?.hasError('min')">
                    Unit price must be greater than 0
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Stock Quantity</mat-label>
                  <input matInput type="number" formControlName="stockQuantity" placeholder="Enter stock quantity">
                  <mat-error *ngIf="medicineForm.get('stockQuantity')?.hasError('required')">
                    Stock quantity is required
                  </mat-error>
                  <mat-error *ngIf="medicineForm.get('stockQuantity')?.hasError('min')">
                    Stock quantity must be greater than 0
                  </mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <mat-form-field appearance="outline">
                  <mat-label>Description</mat-label>
                  <textarea matInput formControlName="description" placeholder="Enter medicine description" rows="3"></textarea>
                </mat-form-field>
              </div>
            </div>

            <div class="form-actions">
              <button mat-stroked-button type="button" routerLink="/medicines/list" class="cancel-button">
                Cancel
              </button>
              <button mat-flat-button color="primary" type="submit" [disabled]="!medicineForm.valid">
                Add Medicine
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

    .form-container {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .form-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin: 0;
      width: 100%;
    }

    .section-title {
      color: #2C3E50;
      font-size: 24px;
      font-weight: 500;
      margin: 0 0 8px 0;
    }

    .section-description {
      color: #666;
      font-size: 14px;
      line-height: 1.5;
      margin: 0 0 24px 0;
    }

    .medicine-form {
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

      .form-group.full-width {
        flex: 2;
      }

      & + .form-row {
        margin-top: 16px;
      }
    }

    .form-group {
      mat-form-field {
        width: 100%;
      }
    }

    .form-actions {
      margin-top: 24px;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      
      button {
        height: 40px;
        min-width: 140px;
        padding: 0 20px;
        font-size: 14px;
        border-radius: 4px;
      }

      .cancel-button {
        color: #666;
        border-color: #ddd;
      }

      .mat-flat-button[color="primary"] {
        background-color: #0B6E4F;

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

          &[rows="3"] {
            height: 72px !important;
            min-height: 72px !important;
          }
        }
      }
    }
  `]
})
export class NewMedicineComponent {
  medicineForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.medicineForm = this.fb.group({
      name: ['', Validators.required],
      genericName: ['', Validators.required],
      category: ['', Validators.required],
      manufacturer: ['', Validators.required],
      unitPrice: ['', [Validators.required, Validators.min(0.01)]],
      stockQuantity: ['', [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.medicineForm.valid) {
      console.log('Medicine form submitted:', this.medicineForm.value);
      // TODO: Implement API call to create medicine
    }
  }
} 