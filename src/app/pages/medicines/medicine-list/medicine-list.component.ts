import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface Medicine {
  id: number;
  name: string;
  genericName: string;
  category: string;
  manufacturer: string;
  unitPrice: number;
  stockQuantity: number;
}

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
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
        <div class="container">
          <h2 class="section-title">Medicine Inventory</h2>
          <p class="section-description">
            Manage your medicine inventory and view all registered medicines. Track stock levels and pricing at a glance.
          </p>

          <div class="search-section">
            <div class="search-actions">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Search medicines</mat-label>
                <input 
                  matInput 
                  [(ngModel)]="searchText" 
                  (keyup)="applyFilter($event)"
                  placeholder="Search by name, category, or manufacturer">
                <mat-icon matSuffix class="search-icon">search</mat-icon>
              </mat-form-field>
              <button mat-flat-button color="primary" class="add-medicine-btn" routerLink="/medicines/new">
                <mat-icon>add</mat-icon>
                Add New Medicine
              </button>
            </div>

            <div class="table-container">
              <table mat-table [dataSource]="dataSource" matSort>
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                  <td mat-cell *matCellDef="let medicine">{{medicine.name}}</td>
                </ng-container>

                <ng-container matColumnDef="genericName">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header>Generic Name</th>
                  <td mat-cell *matCellDef="let medicine">{{medicine.genericName}}</td>
                </ng-container>

                <ng-container matColumnDef="category">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header>Category</th>
                  <td mat-cell *matCellDef="let medicine">{{medicine.category}}</td>
                </ng-container>

                <ng-container matColumnDef="manufacturer">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header>Manufacturer</th>
                  <td mat-cell *matCellDef="let medicine">{{medicine.manufacturer}}</td>
                </ng-container>

                <ng-container matColumnDef="unitPrice">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header>Unit Price</th>
                  <td mat-cell *matCellDef="let medicine">₱{{medicine.unitPrice.toFixed(2)}}</td>
                </ng-container>

                <ng-container matColumnDef="stockQuantity">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header>Stock</th>
                  <td mat-cell *matCellDef="let medicine" [ngClass]="{'low-stock': medicine.stockQuantity < 10}">
                    {{medicine.stockQuantity}}
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef>Actions</th>
                  <td mat-cell *matCellDef="let medicine">
                    <button mat-icon-button color="primary" (click)="editMedicine(medicine)">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteMedicine(medicine)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                <tr class="mat-row" *matNoDataRow>
                  <td class="mat-cell" colspan="7">
                    No medicines found matching the search "{{searchText}}"
                  </td>
                </tr>
              </table>

              <mat-paginator 
                [pageSizeOptions]="[10, 25, 50, 100]"
                showFirstLastButtons>
              </mat-paginator>
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
      margin-left: 250px;
      padding: 24px;
      box-sizing: border-box;
      max-width: calc(100vw - 250px);
      overflow-x: hidden;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
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
    }

    .search-actions {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .search-field {
      width: 600px;
      
      ::ng-deep {
        .mat-mdc-form-field-flex {
          background-color: #f9fafb;
        }

        .mat-mdc-text-field-wrapper {
          background-color: #f9fafb;
        }
      }
    }

    .add-medicine-btn {
      height: 56px;
      padding: 0 24px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 4px;
      white-space: nowrap;
      background-color: #0B6E4F;
      transition: background-color 0.2s ease;

      mat-icon {
        margin-right: 8px;
        font-size: 20px;
      }

      &:hover {
        background-color: #095a41;
      }
    }

    .search-icon {
      color: #0B6E4F;
    }

    .table-container {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    table {
      width: 100%;
    }

    .mat-mdc-row:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }

    .mat-mdc-header-cell {
      background-color: #f8f9fa;
      color: #2C3E50;
      font-weight: 500;
      padding: 16px;
    }

    .mat-mdc-cell {
      padding: 16px;
    }

    .low-stock {
      color: #dc3545;
      font-weight: 500;
    }

    .mat-mdc-paginator {
      border-top: 1px solid #eee;
    }

    ::ng-deep {
      .mat-mdc-form-field {
        .mat-mdc-text-field-wrapper {
          background-color: #f9fafb;
        }

        .mat-mdc-form-field-flex {
          background-color: #f9fafb;
        }
      }
    }
  `]
})
export class MedicineListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'genericName', 'category', 'manufacturer', 'unitPrice', 'stockQuantity', 'actions'];
  dataSource: any;
  searchText: string = '';

  // Sample data - Replace with actual API call
  medicines: Medicine[] = [
    {
      id: 1,
      name: 'Amoxicillin',
      genericName: 'Amoxicillin Trihydrate',
      category: 'Antibiotics',
      manufacturer: 'PharmaCorp',
      unitPrice: 15.50,
      stockQuantity: 150
    },
    {
      id: 2,
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      category: 'Analgesics',
      manufacturer: 'MediPharm',
      unitPrice: 5.75,
      stockQuantity: 8
    },
    {
      id: 3,
      name: 'Metformin',
      genericName: 'Metformin HCl',
      category: 'Antidiabetics',
      manufacturer: 'DiabeCare',
      unitPrice: 12.25,
      stockQuantity: 85
    }
  ];

  ngOnInit() {
    this.dataSource = this.medicines;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource = this.medicines.filter(medicine => 
      medicine.name.toLowerCase().includes(filterValue) ||
      medicine.category.toLowerCase().includes(filterValue) ||
      medicine.manufacturer.toLowerCase().includes(filterValue)
    );
  }

  editMedicine(medicine: Medicine) {
    console.log('Edit medicine:', medicine);
    // TODO: Implement edit functionality
  }

  deleteMedicine(medicine: Medicine) {
    console.log('Delete medicine:', medicine);
    // TODO: Implement delete functionality
  }
} 