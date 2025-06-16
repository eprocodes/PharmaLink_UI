import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orderCount: number;
  createdAt: Date;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="container">
          <h2 class="section-title">Our Customers</h2>
          <p class="section-description">
            Find and manage your pharmacy customers quickly. View detailed information and status at a glance.
          </p>
          
          <div class="search-section">
            <div class="search-actions">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Global Customer Search</mat-label>
                <input matInput 
                      placeholder="Search by name, ID, email, or phone" 
                      [(ngModel)]="searchQuery" 
                      (keyup)="onSearch()">
                <mat-icon matSuffix class="search-icon">search</mat-icon>
              </mat-form-field>
              <button mat-flat-button color="primary" class="add-customer-btn" routerLink="/customers/new">
                <mat-icon>add</mat-icon>
                Add New Customer
              </button>
            </div>

            <!-- Search Results or Latest Customers -->
            <div class="search-results" *ngIf="displayedCustomers.length > 0">
              <div class="results-header">
                <h2>{{searchQuery ? 'Search Results' : 'Latest Customers'}}</h2>
                <span class="results-count" *ngIf="searchQuery">{{displayedCustomers.length}} results found</span>
              </div>
              <div class="customer-list">
                <div class="customer-card" 
                     *ngFor="let customer of displayedCustomers"
                     [routerLink]="['/customers', customer.id]">
                  <div class="card-header">
                    <h3>{{customer.name}}</h3>
                    <span class="order-count">
                      {{customer.orderCount}} Orders
                    </span>
                  </div>
                  <div class="card-content">
                    <p><mat-icon>fingerprint</mat-icon> {{customer.id}}</p>
                    <p><mat-icon>email</mat-icon> {{customer.email}}</p>
                    <p *ngIf="customer.phone"><mat-icon>phone</mat-icon> {{customer.phone}}</p>
                    <p class="created-date"><mat-icon>event</mat-icon> Created {{customer.createdAt | date:'mediumDate'}}</p>
                  </div>
                  <div class="card-actions">
                    <span class="view-details">
                      <mat-icon>visibility</mat-icon>
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Results Message -->
            <div class="no-results" *ngIf="searchQuery && !displayedCustomers.length">
              <mat-icon>search_off</mat-icon>
              <p>No customers found matching "{{searchQuery}}"</p>
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
      margin-left: 250px;
      padding: 24px;
      width: calc(100% - 250px);
      box-sizing: border-box;
    }

    .container {
      max-width: 100%;
      padding-left: 10px;
      width: 100%;
    }

    .section-title {
      color: #2C3E50;
      font-size: 24px;
      font-weight: 500;
      margin: 0 0 12px 0;
      text-align: left;
    }

    .section-description {
      color: #666;
      font-size: 14px;
      line-height: 1.5;
      margin: 0 0 24px 0;
      text-align: left;
      max-width: 800px;
    }

    .search-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-top: 24px;
    }

    .search-actions {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .search-field {
      width: 600px;
      
      ::ng-deep {
        .mat-mdc-form-field-flex {
          background-color: white;
        }

        .mat-mdc-text-field-wrapper {
          background-color: white;
        }
      }
    }

    .add-customer-btn {
      height: 56px;
      padding: 0 24px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 4px;
      white-space: nowrap;
      background-color: #0B6E4F;
      transition: background-color 0.2s ease;
    }

    .add-customer-btn:hover {
      background-color: #095a41;
    }

    .add-customer-btn mat-icon {
      margin-right: 8px;
      font-size: 20px;
    }

    .search-icon {
      color: #0B6E4F;
    }

    .results-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 100%;
      margin: 0 auto 16px;
      text-align: left;
    }

    .results-count {
      color: #666;
      font-size: 14px;
    }

    .customer-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
      max-width: 100%;
      margin: 0 auto;
    }

    .customer-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
      text-align: left;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
      position: relative;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);

        .card-actions {
          opacity: 1;
        }
      }
    }

    .card-header {
      padding: 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h3 {
      margin: 0;
      color: #0B6E4F;
      font-size: 18px;
    }

    .card-content {
      padding: 16px;
      padding-bottom: 48px;
    }

    .card-content p {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      color: #666;
    }

    .card-content mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #0B6E4F;
    }

    .order-count {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      background: #0B6E4F;
      color: white;
    }

    .no-results {
      text-align: center;
      padding: 48px 0;
      color: #666;
    }

    .no-results mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    .created-date {
      margin-top: 8px;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #eee;
      padding-top: 8px;
    }

    .created-date mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .card-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 12px 16px;
      background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.9), #fff);
      opacity: 0;
      transition: opacity 0.2s ease;
      text-align: center;

      .view-details {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: #0B6E4F;
        font-size: 14px;
        font-weight: 500;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
    }
  `]
})
export class CustomersComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Customer[] = [];
  displayedCustomers: Customer[] = [];

  // Sample customer data with realistic information and order counts
  private customers: Customer[] = [
    { 
      id: 'PH001',
      name: 'John Smith Pharmacy',
      email: 'john.smith@healthpharm.com',
      phone: '+1 (555) 123-4567',
      orderCount: 42,
      createdAt: new Date('2024-03-10')
    },
    {
      id: 'PH002',
      name: 'MediCare Plus',
      email: 'contact@medicareplus.com',
      phone: '+1 (555) 234-5678',
      orderCount: 28,
      createdAt: new Date('2024-03-09')
    },
    {
      id: 'PH003',
      name: 'Wellness Pharmaceuticals',
      email: 'info@wellnesspharm.com',
      phone: '+1 (555) 345-6789',
      orderCount: 35,
      createdAt: new Date('2024-03-08')
    },
    {
      id: 'PH004',
      name: 'City Health Supplies',
      email: 'orders@cityhealthsupplies.com',
      phone: '+1 (555) 456-7890',
      orderCount: 15,
      createdAt: new Date('2024-03-07')
    },
    {
      id: 'PH005',
      name: 'Community Care Pharmacy',
      email: 'support@communitycare.com',
      phone: '+1 (555) 567-8901',
      orderCount: 56,
      createdAt: new Date('2024-03-06')
    },
    {
      id: 'PH006',
      name: 'Global Medical Solutions',
      email: 'sales@globalmedsolutions.com',
      phone: '+1 (555) 678-9012',
      orderCount: 31,
      createdAt: new Date('2024-03-05')
    }
  ];

  ngOnInit() {
    // Show latest customers by default
    this.displayedCustomers = this.getLatestCustomers();
  }

  private getLatestCustomers(): Customer[] {
    return [...this.customers]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 6);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.displayedCustomers = this.customers.filter(customer => 
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (customer.phone && customer.phone.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    } else {
      this.displayedCustomers = this.getLatestCustomers();
    }
  }
} 