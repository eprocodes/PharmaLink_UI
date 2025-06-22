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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    SidebarComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="container">
          <!-- Date Filters -->
          <div class="filter-row">
            <form [formGroup]="filterForm" (ngSubmit)="applyDateFilter()">
              <mat-form-field appearance="outline">
                <mat-label>From Date</mat-label>
                <input matInput [matDatepicker]="startPicker" formControlName="startDate">
                <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                <mat-datepicker #startPicker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>To Date</mat-label>
                <input matInput [matDatepicker]="endPicker" formControlName="endDate">
                <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                <mat-datepicker #endPicker></mat-datepicker>
              </mat-form-field>

              <div class="filter-actions">
                <button mat-raised-button color="primary" type="submit">
                  Apply
                </button>
                <button mat-stroked-button type="button" (click)="resetFilter()">
                  Reset
                </button>
              </div>
            </form>
          </div>

          <!-- Stats Cards -->
          <div class="stats-container">
            <div class="stat-card">
              <div class="stat-icon customers">
                <mat-icon>people</mat-icon>
              </div>
              <div class="stat-details">
                <h3>Total Customers</h3>
                <p>156</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon pickup">
                <mat-icon>store</mat-icon>
              </div>
              <div class="stat-details">
                <h3>Total Picked Up Orders</h3>
                <p>1,245</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon delivery">
                <mat-icon>local_shipping</mat-icon>
              </div>
              <div class="stat-details">
                <h3>Total Delivery Orders</h3>
                <p>Coming Soon</p>
              </div>
            </div>
          </div>

          <!-- Charts Grid -->
          <div class="charts-grid">
            <!-- Customer Growth Chart -->
            <div class="chart-container">
              <h2>Customer Growth</h2>
              <div class="chart-wrapper">
                <ngx-charts-line-chart
                  [results]="customerGrowthData"
                  [xAxis]="true"
                  [yAxis]="true"
                  [legend]="false"
                  [showXAxisLabel]="true"
                  [showYAxisLabel]="true"
                  [xAxisLabel]="'Month'"
                  [yAxisLabel]="'Customers'"
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

            <!-- Pickup vs Delivery Chart -->
            <div class="chart-container">
              <h2>Pickup vs Delivery Orders</h2>
              <div class="chart-wrapper">
                <ngx-charts-pie-chart
                  [results]="orderComparisonPieData"
                  [legend]="false"
                  [labels]="true"
                  [doughnut]="false"
                  [scheme]="orderComparisonColorScheme"
                  [gradient]="false"
                  [tooltipDisabled]="false">
                </ngx-charts-pie-chart>
              </div>
            </div>

            <!-- Delivery Trends Chart (Coming Soon) -->
            <div class="chart-container coming-soon">
              <h2>Delivery Trends</h2>
              <div class="coming-soon-content">
                <mat-icon>local_shipping</mat-icon>
                <h3>Coming Soon!</h3>
                <p>Detailed delivery analytics and trends will be available soon.</p>
              </div>
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
      
      min-height: 100vh;
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
      padding-top:10px;
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
      background-color: #0B6E4F;
    }

    .stat-icon.pickup {
      background-color: #2196F3;
    }

    .stat-icon.delivery {
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

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 32px;

      .chart-container {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        height: 400px;

        &:last-child {
          grid-column: 1 / -1;
          height: 300px;
        }

        &.coming-soon {
          .coming-soon-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: calc(100% - 60px);
            text-align: center;
            color: #666;

            mat-icon {
              font-size: 48px;
              width: 48px;
              height: 48px;
              margin-bottom: 16px;
              color: #0B6E4F;
            }

            h3 {
              font-size: 20px;
              margin: 0 0 8px 0;
              color: #2C3E50;
            }

            p {
              font-size: 14px;
              margin: 0;
              max-width: 400px;
            }
          }
        }

        h2 {
          font-size: 18px;
          color: #2C3E50;
          margin: 0 0 24px 0;
          font-weight: 500;
        }
      }
    }

    .chart-wrapper {
      height: calc(100% - 42px);
      width: 100%;
      position: relative;
    }

    ::ng-deep {
      .ngx-charts {
        float: none !important;
      }
      .ngx-charts-outer {
        width: 100% !important;
      }
    }

    .filter-row {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);

      form {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
      }

      mat-form-field {
        flex: 0 1 250px;
        margin: 0;

        ::ng-deep .mat-mdc-form-field-bottom-align {
          height: 0;
        }
      }
    }

    .filter-actions {
      display: flex;
      gap: 12px;
      align-items: center;

      button {
        height: 56px;
        min-width: 100px;
        margin: 0;
        padding: 0 16px;
      }
    }

    @media (max-width: 768px) {
      .filter-row {
        form {
          flex-direction: column;
          align-items: stretch;
        }

        mat-form-field {
          flex: 1 1 auto;
          width: 100%;
        }

        .filter-actions {
          flex-direction: row;
          justify-content: flex-end;
          width: 100%;
          margin-top: 8px;
        }
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  filterForm: FormGroup;
  originalCustomerGrowthData: any[];
  originalOrderComparisonPieData: any[];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null]
    });

    // Store original data
    this.originalCustomerGrowthData = this.customerGrowthData;
    this.originalOrderComparisonPieData = this.orderComparisonPieData;
  }

  applyDateFilter() {
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;

    if (!startDate || !endDate) {
      return;
    }

    // Filter customer growth data
    this.customerGrowthData = this.filterDataByDateRange(
      this.originalCustomerGrowthData,
      startDate,
      endDate
    );

    // For pie chart, we don't need to filter by date as it shows total numbers
    // But you might want to add date filtering logic here if needed
  }

  resetFilter() {
    this.filterForm.reset();
    this.customerGrowthData = [...this.originalCustomerGrowthData];
    this.orderComparisonPieData = [...this.originalOrderComparisonPieData];
  }

  filterDataByDateRange(data: any[], startDate: Date, endDate: Date) {
    return data.map(item => ({
      ...item,
      series: item.series.filter((point: any) => {
        const pointDate = this.getDateFromMonth(point.name);
        return pointDate >= startDate && pointDate <= endDate;
      })
    }));
  }

  getDateFromMonth(monthStr: string): Date {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = months.indexOf(monthStr);
    return new Date(2024, monthIndex, 1);
  }

  // Customer Growth Data
  customerGrowthData = [
    {
      name: 'Total Customers',
      series: [
        { name: 'Jan', value: 120 },
        { name: 'Feb', value: 132 },
        { name: 'Mar', value: 141 },
        { name: 'Apr', value: 148 },
        { name: 'May', value: 152 },
        { name: 'Jun', value: 156 }
      ]
    }
  ];

  // Order Comparison Pie Data
  orderComparisonPieData = [
    {
      name: 'Pickup Orders',
      value: 1245
    },
    {
      name: 'Delivery Orders',
      value: 892
    }
  ];

  // Color Schemes
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0B6E4F']
  };

  orderComparisonColorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3', '#FF9800']
  };

  ngOnInit() {
    // Any initialization logic
  }
}
