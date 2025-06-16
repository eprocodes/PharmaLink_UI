import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface Order {
  orderId: string;
  customerName: string;
  date: string;
  medicines: string[];
  total: number;
  status: 'delivered' | 'canceled';
  type: 'delivery' | 'pickup';
  reminderStatus: 'yes' | 'pending';
  reminderDueDate?: string;
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="page-header">
          <div class="header-content">
            <h1>Orders</h1>
            <p>Manage and track all orders</p>
          </div>
          <button mat-flat-button color="primary" routerLink="/orders/new">
            <mat-icon>add</mat-icon>
            New Order
          </button>
        </div>

        <div class="filters-container">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search orders</mat-label>
            <input matInput (keyup)="applyFilter($event)" placeholder="Search by order ID, medicines..." #searchInput>
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Customer</mat-label>
            <input matInput [(ngModel)]="customerFilter" (ngModelChange)="applyFilters()" placeholder="Filter by customer name">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="statusFilter" (ngModelChange)="applyFilters()">
              <mat-option value="">All</mat-option>
              <mat-option value="delivered">Delivered</mat-option>
              <mat-option value="canceled">Canceled</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="table-container mat-elevation-z2">
          <table mat-table [dataSource]="dataSource" matSort class="orders-table">
            <!-- Order ID Column -->
            <ng-container matColumnDef="orderId">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Order ID</th>
              <td mat-cell *matCellDef="let order">{{order.orderId}}</td>
            </ng-container>

            <!-- Customer Column -->
            <ng-container matColumnDef="customerName">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Customer</th>
              <td mat-cell *matCellDef="let order">{{order.customerName}}</td>
            </ng-container>

            <!-- Date Column -->
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
              <td mat-cell *matCellDef="let order">{{order.date | date:'mediumDate'}}</td>
            </ng-container>

            <!-- Medicines Column -->
            <ng-container matColumnDef="medicines">
              <th mat-header-cell *matHeaderCellDef>Medicines</th>
              <td mat-cell *matCellDef="let order">
                {{order.medicines.join(', ')}}
              </td>
            </ng-container>

            <!-- Total Column -->
            <ng-container matColumnDef="total">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Total</th>
              <td mat-cell *matCellDef="let order">{{order.total | currency}}</td>
            </ng-container>

            <!-- Type Column -->
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let order">
                <mat-chip [class]="order.type">
                  {{order.type | titlecase}}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let order">
                <mat-chip [class]="order.status">
                  {{order.status | titlecase}}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Reminder Status Column -->
            <ng-container matColumnDef="reminderStatus">
              <th mat-header-cell *matHeaderCellDef>Reminder</th>
              <td mat-cell *matCellDef="let order">
                <mat-chip [class]="order.reminderStatus">
                  <ng-container *ngIf="order.reminderStatus === 'yes'">
                    Sent
                  </ng-container>
                  <ng-container *ngIf="order.reminderStatus === 'pending'">
                    Due {{order.reminderDueDate | date:'shortDate'}}
                  </ng-container>
                </mat-chip>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let order">
                <button mat-icon-button [routerLink]="['/orders', order.orderId]" matTooltip="View Order Details">
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

            <!-- Row shown when no matching data -->
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" colspan="9">
                <div class="no-data-message">
                  <mat-icon>search_off</mat-icon>
                  <p>No orders found matching the search criteria</p>
                </div>
              </td>
            </tr>
          </table>

          <mat-paginator [pageSizeOptions]="[10, 25, 50]"
                       showFirstLastButtons
                       aria-label="Select page of orders">
          </mat-paginator>
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

      button {
        height: 36px;
        padding: 0 16px;
        background-color: #0B6E4F;

        mat-icon {
          margin-right: 8px;
        }
      }
    }

    .filters-container {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);

      mat-form-field {
        flex: 1;
        min-width: 200px;

        ::ng-deep {
          .mat-mdc-text-field-wrapper {
            background-color: #f9fafb;
          }
        }
      }

      .search-field {
        flex: 2;
      }
    }

    .table-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }

    .orders-table {
      width: 100%;

      .mat-mdc-row {
        &:hover {
          background: #f8f9fa;
        }
      }

      .mat-mdc-cell {
        color: #374151;
        font-size: 14px;
      }

      .mat-mdc-header-cell {
        background: #f8f9fa;
        color: #6b7280;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .no-data-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px;
      color: #6b7280;

      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
      }

      p {
        margin: 0;
        font-size: 14px;
      }
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
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId', 
    'customerName', 
    'date', 
    'medicines', 
    'total', 
    'type', 
    'status',
    'reminderStatus', 
    'actions'
  ];
  dataSource!: MatTableDataSource<Order>;
  customerFilter: string = '';
  statusFilter: string = '';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchInput') searchInput!: any;

  // Sample data - replace with actual data from your service
  orders: Order[] = [
    {
      orderId: 'ORD-001',
      customerName: 'John Doe',
      date: '2024-01-20',
      medicines: ['Amoxicillin 500mg', 'Paracetamol 650mg'],
      total: 45.99,
      status: 'delivered',
      type: 'delivery',
      reminderStatus: 'yes'
    },
    {
      orderId: 'ORD-002',
      customerName: 'Jane Smith',
      date: '2024-01-18',
      medicines: ['Ibuprofen 400mg', 'Cetirizine'],
      total: 25.50,
      status: 'delivered',
      type: 'pickup',
      reminderStatus: 'pending',
      reminderDueDate: '2024-02-20'
    },
    {
      orderId: 'ORD-003',
      customerName: 'Robert Johnson',
      date: '2024-01-15',
      medicines: ['Omeprazole 20mg'],
      total: 15.99,
      status: 'canceled',
      type: 'delivery',
      reminderStatus: 'yes'
    }
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupCustomFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilters() {
    this.dataSource.filter = JSON.stringify({
      customer: this.customerFilter.toLowerCase(),
      status: this.statusFilter.toLowerCase()
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private setupCustomFilter() {
    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      try {
        const filterObj = JSON.parse(filter);
        const customerMatch = !filterObj.customer || data.customerName.toLowerCase().includes(filterObj.customer);
        const statusMatch = !filterObj.status || data.status === filterObj.status;
        return customerMatch && statusMatch;
      } catch {
        // If filter is not JSON (regular search), search all fields
        const searchStr = filter.toLowerCase();
        return data.orderId.toLowerCase().includes(searchStr) ||
               data.customerName.toLowerCase().includes(searchStr) ||
               data.medicines.some(med => med.toLowerCase().includes(searchStr)) ||
               data.status.toLowerCase().includes(searchStr) ||
               data.type.toLowerCase().includes(searchStr);
      }
    };
  }
}
