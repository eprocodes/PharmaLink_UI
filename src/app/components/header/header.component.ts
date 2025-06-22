import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { SearchService, SearchResult } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <header class="header">
      <div class="header-left">
        <a routerLink="/home" class="logo">
          <img src="assets/images/pharamalink-logo-transparent-1.PNG" alt="PharmaLink Logo">
        </a>
      </div>

      <div class="search-container">
        <div class="search-bar" [class.active]="showResults">
          <i class="fas fa-search search-icon"></i>
          <input 
            type="text" 
            placeholder="Search customers, medicines, orders..." 
            [(ngModel)]="searchQuery"
            (input)="onSearchInput()"
            (focus)="showResults = true"
            (blur)="onSearchBlur()"
          >
          <button class="clear-btn" *ngIf="searchQuery" (click)="clearSearch()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="search-results" *ngIf="showResults && (searchResults.length > 0 || isSearching)">
          <div class="search-loading" *ngIf="isSearching">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Searching...</span>
          </div>
          
          <div class="result-group" *ngFor="let group of groupedResults | keyvalue">
            <div class="group-header">{{ group.key }}</div>
            <a *ngFor="let result of group.value" 
               [routerLink]="result.link"
               class="result-item"
               (click)="onResultClick()">
              <i [class]="getResultIcon(result.type)"></i>
              <div class="result-content">
                <div class="result-title">{{ result.title }}</div>
                <div class="result-description">{{ result.description }}</div>
              </div>
            </a>
          </div>

          <div class="no-results" *ngIf="!isSearching && searchResults.length === 0">
            <i class="fas fa-search"></i>
            <span>No results found</span>
          </div>
        </div>
      </div>

      <div class="header-right">
        <a routerLink="/notification/broadcast" class="action-link">
          <i class="fas fa-bullhorn"></i>
          <span class="color-gray">Notification Broadcast</span>
        </a>
        <a routerLink="/tickets/open" class="action-link">
          <i class="fas fa-ticket-alt"></i>
          <span class="color-gray">Open Ticket</span>
        </a>
        <button mat-button [matMenuTriggerFor]="userMenu" class="user-profile-btn">
          <i class="fas fa-user-circle"></i>
          <span class="username">John Doe</span>
          <i class="fas fa-chevron-down"></i>
        </button>

        <mat-menu #userMenu="matMenu" class="user-menu">
          <button mat-menu-item routerLink="/profile">
            <i class="fas fa-user"></i>
            <span>Profile</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="logout()">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: white;
      display: flex;
      align-items: center;
      padding: 0 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      justify-content: space-between;
    }

    .header-left {
      display: flex;
      align-items: center;
      width: 254px;
    }

    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      
      img {
        height: 40px;
        width: auto;
      }
    }

    .search-container {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      max-width: 600px;
      margin: 0 24px;
    }

    .search-bar {
      position: relative;
      width: 100%;
      max-width: 500px;
      display: flex;
      align-items: center;
      background: #f8f9fa;
      border: 1px solid transparent;
      border-radius: 12px;
      padding: 8px 16px;
      transition: all 0.2s ease;
      height:42px;

      &.active {
        background: white;
        border-color: #0B6E4F;
        box-shadow: 0 2px 8px rgba(11, 110, 79, 0.1);
      }

      &:focus-within {
        background: white;
        border-color: #0B6E4F;
        box-shadow: 0 2px 8px rgba(11, 110, 79, 0.1);
      }

      .search-icon {
        color: #666;
        font-size: 16px;
        margin-right: 12px;
        transition: color 0.2s ease;
      }

      &:focus-within .search-icon {
        color: #0B6E4F;
      }

      input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 14px;
        color: #2C3E50;
        outline: none;
        padding: 0;
        font-weight: 400;

        &::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }
      }

      .clear-btn {
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
        margin-left: 8px;

        &:hover {
          background: #f1f5f9;
          color: #2C3E50;
        }

        i {
          font-size: 12px;
        }
      }

      &:hover {
        background: #f1f5f9;
      }
    }

    .search-results {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-height: 400px;
      overflow-y: auto;
      z-index: 1000;

      .search-loading {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 16px;
        color: #666;

        i {
          font-size: 16px;
        }
      }

      .result-group {
        .group-header {
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 500;
          color: #666;
          text-transform: uppercase;
          background: #f8f9fa;
        }

        .result-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          text-decoration: none;
          color: #2C3E50;
          transition: background-color 0.2s;

          &:hover {
            background: #f8f9fa;
          }

          i {
            font-size: 16px;
            color: #0B6E4F;
            margin-top: 2px;
          }

          .result-content {
            flex: 1;

            .result-title {
              font-weight: 500;
              margin-bottom: 2px;
            }

            .result-description {
              font-size: 12px;
              color: #666;
            }
          }
        }
      }

      .no-results {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 24px 16px;
        color: #666;
        text-align: center;
        justify-content: center;

        i {
          font-size: 16px;
        }
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .action-link {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.2s ease;
      color: #0B6E4F;

      &:hover {
        background: rgba(11, 110, 79, 0.1);
      }

      i {
        font-size: 16px;
      }

      span {
        font-size: 14px;
      }
    }

    .user-profile-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: transparent;
      color: #374151;
      font-size: 14px;
      transition: all 0.2s ease;

      &:hover {
        background: #f9fafb;
      }

      i {
        font-size: 16px;
        
        &.fa-user-circle {
          font-size: 20px;
          color: #0B6E4F;
        }
        
        &.fa-chevron-down {
          font-size: 12px;
          color: #6b7280;
        }
      }

      .username {
        font-weight: 500;
        padding: 0 5px;
      }
    }

    ::ng-deep .mat-mdc-menu-panel {
      margin-top: 15px;
      margin-left: 10px;
    }

    ::ng-deep .user-menu {
      .mat-mdc-menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #374151;
        font-size: 14px;

        i {
          font-size: 16px;
          width: 20px;
          color: #6b7280;
        }

        &:hover {
          background: #f9fafb;
        }
      }
    }

    .color-gray {
      color: #666;
    }

    @media (max-width: 768px) {
      .header {
        padding: 0 16px;
      }

      .header-left {
        width: auto;
      }

      .search-container {
        display: none;
      }

      .action-link span {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchResults: SearchResult[] = [];
  isSearching = false;
  showResults = false;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      if (query) {
        this.searchService.search(query).subscribe(results => {
          this.searchResults = results;
        });
      } else {
        this.searchResults = [];
      }
    });

    this.searchService.getIsSearching().pipe(
      takeUntil(this.destroy$)
    ).subscribe(isSearching => {
      this.isSearching = isSearching;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  onSearchBlur() {
    // Delay hiding results to allow for clicking on results
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  onResultClick() {
    this.showResults = false;
    this.searchQuery = '';
    this.searchResults = [];
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.searchService.clearSearch();
  }

  getResultIcon(type: string): string {
    const icons = {
      customer: 'fas fa-users',
      medicine: 'fas fa-pills',
      order: 'fas fa-shopping-cart',
      ticket: 'fas fa-ticket-alt'
    };
    return icons[type as keyof typeof icons] || 'fas fa-file';
  }

  get groupedResults() {
    return this.searchResults.reduce((groups, result) => {
      const type = result.type.charAt(0).toUpperCase() + result.type.slice(1) + 's';
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(result);
      return groups;
    }, {} as Record<string, SearchResult[]>);
  }

  logout() {
    // Implement logout functionality
    console.log('Logging out...');
  }
} 