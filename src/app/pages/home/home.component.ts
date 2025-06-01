import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="container">
          <!-- Stats Cards -->
          <div class="stats-container">
            <div class="stat-card">
              <div class="stat-icon customers">
                <mat-icon>people</mat-icon>
              </div>
              <div class="stat-details">
                <h3>Total Customers</h3>
                <p>{{totalCustomers}}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon sales">
                <mat-icon>shopping_cart</mat-icon>
              </div>
              <div class="stat-details">
                <h3>Total Sales</h3>
                <p>{{totalSales}}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon orders">
                <mat-icon>local_shipping</mat-icon>
              </div>
              <div class="stat-details">
                <h3>Active Orders</h3>
                <p>{{activeOrders}}</p>
              </div>
            </div>
          </div>

          <!-- Sales Chart -->
          <div class="chart-container">
            <h2>Sales Overview</h2>
            <div class="chart-wrapper">
              <ngx-charts-line-chart
                [results]="salesData"
                [xAxis]="true"
                [yAxis]="true"
                [legend]="false"
                [showXAxisLabel]="true"
                [showYAxisLabel]="true"
                [xAxisLabel]="'Month'"
                [yAxisLabel]="'Sales'"
                [scheme]="colorScheme"
                [autoScale]="true"
                [timeline]="false"
                [animations]="true"
                [roundDomains]="true"
                [tooltipDisabled]="false"
                [gradient]="false"
                [showGridLines]="true">
              </ngx-charts-line-chart>
            </div>
          </div>

          <!-- Customers Table -->
          <div class="table-container">
            <div class="table-header">
              <h2>Recent Customers</h2>
              <button mat-raised-button color="primary" (click)="openAddCustomerDialog()">
                <mat-icon>add</mat-icon>
                Add Customer
              </button>
            </div>

            <mat-form-field>
              <mat-label>Filter</mat-label>
              <input matInput (keyup)="applyFilter($event)" placeholder="Type to filter" #input>
            </mat-form-field>

            <table mat-table [dataSource]="dataSource" matSort>
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
                <td mat-cell *matCellDef="let row"> {{row.id}} </td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
                <td mat-cell *matCellDef="let row"> {{row.name}} </td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
                <td mat-cell *matCellDef="let row"> {{row.email}} </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                <td mat-cell *matCellDef="let row">
                  <span class="status-badge" [class.active]="row.status === 'Active'">
                    {{row.status}}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let row">
                  <button mat-icon-button [matMenuTriggerFor]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="editCustomer(row)">
                      <mat-icon>edit</mat-icon>
                      <span>Edit</span>
                    </button>
                    <button mat-menu-item (click)="viewDetails(row)">
                      <mat-icon>visibility</mat-icon>
                      <span>View Details</span>
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of customers"></mat-paginator>
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
      padding-top: 64px; /* Space for header */
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .content {
      flex: 1;
      margin-left: 250px; /* Space for sidebar */
      padding: 24px;
      width: calc(100% - 250px); /* Account for sidebar */
      box-sizing: border-box;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
      width: 100%;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      height: 100px;
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon.customers {
      background-color: var(--primary-color, #0B6E4F);
    }

    .stat-icon.sales {
      background-color: #2196F3;
    }

    .stat-icon.orders {
      background-color: #FF9800;
    }

    .stat-icon mat-icon {
      color: white;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .stat-details {
      flex: 1;
    }

    .stat-details h3 {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
      white-space: nowrap;
    }

    .stat-details p {
      font-size: 28px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .chart-container {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      width: 100%;
      box-sizing: border-box;
      height: auto;
      min-height: 450px;
    }

    .chart-wrapper {
      height: 400px;
      width: 100%;
      position: relative;
    }

    .chart-container h2 {
      font-size: 20px;
      color: #333;
      margin-bottom: 24px;
      font-weight: 500;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .table-header h2 {
      font-size: 20px;
      color: #333;
      margin: 0;
      font-weight: 500;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      background-color: #ffebee;
      color: #f44336;
      display: inline-block;
    }

    .status-badge.active {
      background-color: #e8f5e9;
      color: #4caf50;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }

    .mat-mdc-header-cell {
      font-weight: 600;
      color: #666;
      padding: 12px 16px;
    }

    .mat-mdc-cell {
      padding: 12px 16px;
    }

    mat-paginator {
      margin-top: 16px;
      border-top: 1px solid #eee;
    }

    ::ng-deep {
      .ngx-charts {
        float: none !important;
      }
      .ngx-charts-outer {
        width: 100% !important;
      }
      .tick text {
        font-size: 12px;
        color: #666;
      }
      .gridline-path {
        stroke: #eee;
        stroke-width: 1;
      }
      .line-series .line {
        stroke-width: 2;
      }
      .line-highlight {
        display: none;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  // Stats
  totalCustomers: number = 156;
  totalSales: number = 2489;
  activeOrders: number = 13;

  // Table
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'actions'];
  dataSource!: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Chart
  salesData: any[] = [
    {
      name: 'Sales',
      series: [
        { name: 'Jan', value: 1200 },
        { name: 'Feb', value: 900 },
        { name: 'Mar', value: 1500 },
        { name: 'Apr', value: 1800 },
        { name: 'May', value: 1200 },
        { name: 'Jun', value: 2000 }
      ]
    }
  ];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0B6E4F']
  };

  customers: Customer[] = [
    { id: '1', name: 'John Smith', email: 'john@example.com', status: 'Active' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active' },
    { id: '3', name: 'Michael Davis', email: 'michael@example.com', status: 'Inactive' },
    { id: '4', name: 'Emma Wilson', email: 'emma@example.com', status: 'Active' },
    { id: '5', name: 'Tom Brown', email: 'tom@example.com', status: 'Active' },
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.customers);
  }

  ngOnInit(): void {
    // Initialize the table data
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddCustomerDialog() {
    // TODO: Implement add customer dialog
    console.log('Open add customer dialog');
  }

  editCustomer(customer: Customer) {
    // TODO: Implement edit customer
    console.log('Edit customer:', customer);
  }

  viewDetails(customer: Customer) {
    // TODO: Implement view customer details
    console.log('View customer details:', customer);
  }
}
