import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  medicines: {
    name: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'delivered' | 'canceled';
  type: 'delivery' | 'pickup';
  reminderStatus: 'yes' | 'pending';
  reminderDueDate?: string;
  deliveryAddress?: string;
  specialInstructions?: string;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
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
            <button mat-icon-button routerLink="/orders/list">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="header-content">
              <h1>Order Details</h1>
              <p>Order {{order?.orderId}}</p>
            </div>
          </div>
          <div class="header-actions">
            <button mat-stroked-button color="warn" *ngIf="order?.status !== 'canceled'">
              <mat-icon>cancel</mat-icon>
              Cancel Order
            </button>
            <button mat-flat-button color="primary" *ngIf="order?.reminderStatus === 'pending'">
              <mat-icon>send</mat-icon>
              Send Reminder
            </button>
          </div>
        </div>

        <div class="details-grid" *ngIf="order">
          <!-- Order Status Section -->
          <div class="detail-card status-card">
            <div class="card-header">
              <h2>Order Status</h2>
            </div>
            <div class="status-content">
              <mat-chip [class]="order.status">
                {{order.status | titlecase}}
              </mat-chip>
              <mat-chip [class]="order.type">
                {{order.type | titlecase}}
              </mat-chip>
              <mat-chip [class]="order.reminderStatus">
                <ng-container *ngIf="order.reminderStatus === 'yes'">
                  Reminder Sent
                </ng-container>
                <ng-container *ngIf="order.reminderStatus === 'pending'">
                  Reminder Due {{order.reminderDueDate | date:'shortDate'}}
                </ng-container>
              </mat-chip>
              <p class="date">Ordered on {{order.date | date:'medium'}}</p>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="detail-card">
            <div class="card-header">
              <h2>Customer Information</h2>
            </div>
            <div class="card-content">
              <div class="info-group">
                <label>Name</label>
                <p>{{order.customerName}}</p>
              </div>
              <div class="info-group">
                <label>Email</label>
                <p>{{order.customerEmail}}</p>
              </div>
              <div class="info-group">
                <label>Phone</label>
                <p>{{order.customerPhone}}</p>
              </div>
              <div class="info-group" *ngIf="order.type === 'delivery'">
                <label>Delivery Address</label>
                <p>{{order.deliveryAddress}}</p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="detail-card full-width">
            <div class="card-header">
              <h2>Order Items</h2>
            </div>
            <div class="medicines-list">
              <div class="medicine-item header">
                <span class="name">Medicine</span>
                <span class="quantity">Quantity</span>
                <span class="price">Price</span>
                <span class="total">Total</span>
              </div>
              <mat-divider></mat-divider>
              <div class="medicine-item" *ngFor="let medicine of order.medicines">
                <span class="name">{{medicine.name}}</span>
                <span class="quantity">{{medicine.quantity}}</span>
                <span class="price">{{medicine.price | currency}}</span>
                <span class="total">{{medicine.price * medicine.quantity | currency}}</span>
              </div>
              <mat-divider></mat-divider>
              <div class="order-summary">
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span>{{order.subtotal | currency}}</span>
                </div>
                <div class="summary-row" *ngIf="order.type === 'delivery'">
                  <span>Delivery Fee</span>
                  <span>{{order.deliveryFee | currency}}</span>
                </div>
                <div class="summary-row total">
                  <span>Total</span>
                  <span>{{order.total | currency}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Special Instructions -->
          <div class="detail-card" *ngIf="order.specialInstructions">
            <div class="card-header">
              <h2>Special Instructions</h2>
            </div>
            <div class="card-content">
              <p class="instructions">{{order.specialInstructions}}</p>
            </div>
          </div>
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
        gap: 12px;

        button {
          color: #6b7280;
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

      .header-actions {
        display: flex;
        gap: 12px;

        button {
          mat-icon {
            margin-right: 8px;
          }
        }
      }
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .detail-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;

      &.full-width {
        grid-column: 1 / -1;
      }

      .card-header {
        padding: 16px 20px;
        border-bottom: 1px solid #e5e7eb;

        h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: #2C3E50;
        }
      }

      .card-content {
        padding: 20px;
      }
    }

    .status-card {
      .status-content {
        padding: 20px;
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;

        .date {
          width: 100%;
          margin: 8px 0 0 0;
          color: #6b7280;
          font-size: 14px;
        }
      }
    }

    .info-group {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      label {
        display: block;
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 4px;
      }

      p {
        margin: 0;
        color: #2C3E50;
        font-size: 14px;
      }
    }

    .medicines-list {
      .medicine-item {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        padding: 12px 20px;
        font-size: 14px;
        align-items: center;

        &.header {
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .name {
          color: #2C3E50;
        }

        .quantity {
          text-align: center;
          color: #6b7280;
        }

        .price, .total {
          text-align: right;
          color: #2C3E50;
        }
      }
    }

    .order-summary {
      padding: 20px;
      background: #f8f9fa;
      margin-top: 16px;

      .summary-row {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;

        &.total {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-weight: 500;
          color: #2C3E50;
        }
      }
    }

    .instructions {
      margin: 0;
      font-size: 14px;
      color: #2C3E50;
      line-height: 1.5;
    }

    mat-chip {
      font-size: 12px;
      height: 24px;
      
      &.delivered {
        background-color: #E8F5E9;
        color: #2E7D32;
      }
      
      &.canceled {
        background-color: #FFEBEE;
        color: #C62828;
      }

      &.delivery {
        background-color: #E3F2FD;
        color: #1976D2;
      }
      
      &.pickup {
        background-color: #E1F5FE;
        color: #0288D1;
      }

      &.yes {
        background-color: #E8F5E9;
        color: #2E7D32;
      }

      &.pending {
        background-color: #FFF3E0;
        color: #E65100;
      }
    }
  `]
})
export class OrderDetailsComponent implements OnInit {
  order: OrderDetails | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO: Replace with actual API call
    this.order = {
      orderId: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+1 (555) 123-4567',
      date: '2024-01-20T10:30:00',
      medicines: [
        {
          name: 'Amoxicillin 500mg',
          quantity: 2,
          price: 15.99
        },
        {
          name: 'Paracetamol 650mg',
          quantity: 1,
          price: 8.99
        }
      ],
      subtotal: 40.97,
      deliveryFee: 5.00,
      total: 45.99,
      status: 'delivered',
      type: 'delivery',
      reminderStatus: 'pending',
      reminderDueDate: '2024-02-20',
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      specialInstructions: 'Please call when arriving at the delivery location.'
    };
  }
} 