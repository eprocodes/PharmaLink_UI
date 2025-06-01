import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface CustomerOrder {
  orderId: string;
  date: string;
  medicines: string[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  type: 'delivery' | 'pickup';
}

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="customer-details">
          <!-- Customer Info Card -->
          <div class="info-card">
            <div class="card-header">
              <h2>Customer Information</h2>
              <button mat-flat-button color="primary">
                <mat-icon>edit</mat-icon>
                Edit Details
              </button>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Full Name</label>
                <p>John Doe</p>
              </div>
              <div class="info-item">
                <label>Email</label>
                <p>john.doe&#64;pharmalink.com</p>
              </div>
              <div class="info-item">
                <label>Mobile</label>
                <p>+1 234 567 8900</p>
              </div>
              <div class="info-item">
                <label>Address</label>
                <p>123 Pharmacy Street, Medical District, Health City, 12345</p>
              </div>
              <div class="info-item">
                <label>Registration Date</label>
                <p>Jan 15, 2024</p>
              </div>
              <div class="info-item">
                <label>Total Orders</label>
                <p>24</p>
              </div>
            </div>
          </div>

          <!-- Orders Table Section -->
          <div class="orders-section">
            <div class="section-header">
              <h2>Order History</h2>
              <button mat-flat-button color="primary" routerLink="/orders/new">
                <mat-icon>add</mat-icon>
                New Order
              </button>
            </div>

            <table mat-table [dataSource]="orders" class="orders-table" matSort>
              <!-- Order ID Column -->
              <ng-container matColumnDef="orderId">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Order ID</th>
                <td mat-cell *matCellDef="let order">{{order.orderId}}</td>
              </ng-container>

              <!-- Date Column -->
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
                <td mat-cell *matCellDef="let order">{{order.date}}</td>
              </ng-container>

              <!-- Medicines Column -->
              <ng-container matColumnDef="medicines">
                <th mat-header-cell *matHeaderCellDef>Medicines</th>
                <td mat-cell *matCellDef="let order">
                  <div class="medicines-list">
                    <mat-chip-listbox>
                      <mat-chip *ngFor="let medicine of order.medicines.slice(0, 2)">
                        {{medicine}}
                      </mat-chip>
                      <mat-chip *ngIf="order.medicines.length > 2">
                        +{{order.medicines.length - 2}} more
                      </mat-chip>
                    </mat-chip-listbox>
                  </div>
                </td>
              </ng-container>

              <!-- Total Column -->
              <ng-container matColumnDef="total">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Total</th>
                <td mat-cell *matCellDef="let order">\${{order.total.toFixed(2)}}</td>
              </ng-container>

              <!-- Type Column -->
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let order">
                  <span class="order-type" [class]="order.type">
                    {{order.type | titlecase}}
                  </span>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let order">
                  <span class="order-status" [class]="order.status">
                    {{order.status | titlecase}}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let order">
                  <button mat-icon-button [routerLink]="['/orders', order.orderId]">
                    <mat-icon>visibility</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 20]"
                         showFirstLastButtons
                         aria-label="Select page of orders">
            </mat-paginator>
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

    .customer-details {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .info-card {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        h2 {
          font-size: 18px;
          font-weight: 500;
          color: #2C3E50;
          margin: 0;
        }

        button {
          background-color: #0B6E4F;
          
          mat-icon {
            margin-right: 8px;
          }
        }
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;

      .info-item {
        label {
          display: block;
          font-size: 12px;
          color: #6B7280;
          margin-bottom: 4px;
          font-weight: 500;
        }

        p {
          margin: 0;
          font-size: 14px;
          color: #1F2937;
        }
      }
    }

    .orders-section {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        h2 {
          font-size: 18px;
          font-weight: 500;
          color: #2C3E50;
          margin: 0;
        }

        button {
          background-color: #0B6E4F;
          
          mat-icon {
            margin-right: 8px;
          }
        }
      }
    }

    .orders-table {
      width: 100%;
      background: white;
      margin-bottom: 16px;

      .mat-mdc-header-cell {
        color: #4B5563;
        font-weight: 500;
        font-size: 12px;
      }

      .mat-mdc-cell {
        color: #1F2937;
        font-size: 13px;
      }
    }

    .medicines-list {
      .mat-mdc-chip {
        font-size: 12px;
        height: 24px;
      }
    }

    .order-status, .order-type {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .order-status {
      &.pending {
        background-color: #FEF3C7;
        color: #92400E;
      }

      &.processing {
        background-color: #DBEAFE;
        color: #1E40AF;
      }

      &.delivered {
        background-color: #D1FAE5;
        color: #065F46;
      }

      &.cancelled {
        background-color: #FEE2E2;
        color: #991B1B;
      }
    }

    .order-type {
      &.delivery {
        background-color: #F3E8FF;
        color: #6B21A8;
      }

      &.pickup {
        background-color: #E0E7FF;
        color: #3730A3;
      }
    }
  `]
})
export class CustomerDetailsComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'date', 'medicines', 'total', 'type', 'status', 'actions'];
  
  // Sample data - replace with actual data from your service
  orders: CustomerOrder[] = [
    {
      orderId: 'ORD-001',
      date: '2024-01-20',
      medicines: ['Amoxicillin 500mg', 'Paracetamol 650mg', 'Vitamin C'],
      total: 45.99,
      status: 'delivered',
      type: 'delivery'
    },
    {
      orderId: 'ORD-002',
      date: '2024-01-18',
      medicines: ['Ibuprofen 400mg', 'Cetirizine'],
      total: 25.50,
      status: 'processing',
      type: 'pickup'
    },
    {
      orderId: 'ORD-003',
      date: '2024-01-15',
      medicines: ['Omeprazole 20mg'],
      total: 15.99,
      status: 'pending',
      type: 'delivery'
    }
  ];

  ngOnInit() {
    // TODO: Load customer details and orders from your service
  }
} 