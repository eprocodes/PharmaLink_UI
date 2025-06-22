import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface OrderMedicine {
  medicineId: string;
  quantity: number;
}

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
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
            <button mat-icon-button class="back-button" routerLink="/orders/list">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="header-content">
              <h1>New Order</h1>
              <p>Create a new order by selecting a customer and adding medicines</p>
            </div>
          </div>
        </div>

        <div class="form-container">
          <form [formGroup]="orderForm" (ngSubmit)="onSubmit()" class="order-form">
            <div class="form-row">
              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Select Customer</mat-label>
                  <mat-select formControlName="customerId">
                    <mat-option value="1">Customer 1</mat-option>
                    <mat-option value="2">Customer 2</mat-option>
                  </mat-select>
                  <mat-error *ngIf="orderForm.get('customerId')?.hasError('required')">
                    Please select a customer
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Select Medicines</mat-label>
                  <mat-select formControlName="medicines" multiple>
                    <mat-option value="1">Medicine 1</mat-option>
                    <mat-option value="2">Medicine 2</mat-option>
                    <mat-option value="3">Medicine 3</mat-option>
                    <mat-option value="4">Medicine 4</mat-option>
                  </mat-select>
                  <mat-error *ngIf="orderForm.get('medicines')?.hasError('required')">
                    Please select at least one medicine
                  </mat-error>
                </mat-form-field>
              </div>
            </div>

            <div formArrayName="medicineQuantities" class="medicine-quantities" *ngIf="medicineQuantities.length > 0">
              <div class="quantities-header">
                <h3>Medicine Quantities</h3>
              </div>
              <div *ngFor="let quantity of medicineQuantities.controls; let i = index" [formGroupName]="i" class="quantity-row">
                <mat-form-field appearance="outline">
                  <mat-label>Medicine {{i + 1}} Quantity</mat-label>
                  <input matInput type="number" formControlName="quantity" placeholder="Enter quantity">
                  <mat-error *ngIf="quantity.get('quantity')?.hasError('required')">
                    Quantity is required
                  </mat-error>
                  <mat-error *ngIf="quantity.get('quantity')?.hasError('min')">
                    Quantity must be greater than 0
                  </mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="form-row delivery-options">
              <mat-radio-group formControlName="deliveryType" class="delivery-type">
                <mat-radio-button value="pickup">Pickup</mat-radio-button>
                <mat-radio-button value="delivery">Delivery</mat-radio-button>
              </mat-radio-group>
            </div>

            <div class="form-row" *ngIf="orderForm.get('deliveryType')?.value === 'delivery'">
              <div class="form-group">
                <mat-form-field appearance="outline">
                  <mat-label>Delivery Address</mat-label>
                  <textarea matInput formControlName="deliveryAddress" placeholder="Enter delivery address" rows="1"></textarea>
                  <mat-error *ngIf="orderForm.get('deliveryAddress')?.hasError('required')">
                    Delivery address is required for delivery orders
                  </mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <mat-form-field appearance="outline">
                  <mat-label>Special Instructions</mat-label>
                  <textarea matInput formControlName="specialInstructions" placeholder="Enter any special instructions" rows="2"></textarea>
                </mat-form-field>
              </div>
            </div>

            <div class="order-summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>$0.00</span>
              </div>
              <div class="summary-row" *ngIf="orderForm.get('deliveryType')?.value === 'delivery'">
                <span>Delivery Fee:</span>
                <span>$0.00</span>
              </div>
              <div class="summary-row total">
                <span>Total:</span>
                <span>$0.00</span>
              </div>
            </div>

            <div class="form-actions">
              <button mat-button type="button" routerLink="/orders/list" class="cancel-button">
                Cancel
              </button>
              <button mat-flat-button color="primary" type="submit" [disabled]="!orderForm.valid">
                Create Order
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

    .order-form {
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

    .order-summary {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 4px;
      margin-top: 16px;

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
        color: #666;

        &.total {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-weight: 500;
          color: #2C3E50;
        }
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

          &[rows="2"] {
            height: 48px !important;
            min-height: 48px !important;
          }
        }
      }
    }

    .medicine-quantities {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 12px;
      margin-bottom: 12px;
      background: #f9fafb;
      padding: 16px;
      border-radius: 4px;

      .quantities-header {
        h3 {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin: 0 0 8px 0;
        }
      }
    }

    .quantity-row {
      display: flex;
      gap: 16px;
      align-items: center;

      mat-form-field {
        flex: 1;
      }
    }

    .delivery-options {
      margin: 8px 0;
    }

    .delivery-type {
      display: flex;
      gap: 24px;
      
      .mat-radio-button {
        font-size: 14px;
      }
    }

    ::ng-deep {
      .mat-radio-button.mat-accent {
        .mat-radio-outer-circle {
          border-color: #0B6E4F;
        }
        
        &.mat-radio-checked .mat-radio-outer-circle {
          border-color: #0B6E4F;
        }
        
        .mat-radio-inner-circle {
          background-color: #0B6E4F;
        }
        
        .mat-radio-ripple .mat-ripple-element {
          background-color: rgba(11, 110, 79, 0.26);
        }
      }
    }
  `]
})
export class NewOrderComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      medicines: [[], [Validators.required, Validators.minLength(1)]],
      medicineQuantities: this.fb.array([]),
      deliveryType: ['pickup', Validators.required],
      deliveryAddress: [''],
      specialInstructions: ['']
    });

    // Subscribe to changes in the medicines selection
    this.orderForm.get('medicines')?.valueChanges.subscribe(selectedMedicines => {
      this.updateMedicineQuantities(selectedMedicines);
    });

    // Subscribe to delivery type changes
    this.orderForm.get('deliveryType')?.valueChanges.subscribe(type => {
      const deliveryAddressControl = this.orderForm.get('deliveryAddress');
      if (type === 'delivery') {
        deliveryAddressControl?.setValidators([Validators.required]);
      } else {
        deliveryAddressControl?.clearValidators();
        deliveryAddressControl?.setValue('');
      }
      deliveryAddressControl?.updateValueAndValidity();
    });
  }

  get medicineQuantities() {
    return this.orderForm.get('medicineQuantities') as FormArray;
  }

  private updateMedicineQuantities(selectedMedicines: string[]) {
    // Clear existing quantities
    while (this.medicineQuantities.length) {
      this.medicineQuantities.removeAt(0);
    }

    // Add quantity controls for each selected medicine
    selectedMedicines.forEach(() => {
      this.medicineQuantities.push(
        this.fb.group({
          quantity: [1, [Validators.required, Validators.min(1)]]
        })
      );
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const orderData = {
        customerId: formValue.customerId,
        medicines: formValue.medicines.map((medicineId: string, index: number) => ({
          medicineId,
          quantity: formValue.medicineQuantities[index].quantity
        })),
        deliveryType: formValue.deliveryType,
        deliveryAddress: formValue.deliveryType === 'delivery' ? formValue.deliveryAddress : null,
        specialInstructions: formValue.specialInstructions
      };
      console.log('Order submitted:', orderData);
      // TODO: Implement API call to create order
    }
  }
}
