import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    MatDividerModule,
    RouterModule
  ],
  template: `
    <header class="app-header">
      <div class="header-left">
        <img src="assets/images/pharamalink-logo-transparent-1.PNG" alt="PharmaLink Logo" class="logo">
      </div>
      <div class="header-right">
        <a routerLink="/orders/new" class="action-link">
          <i class="fas fa-file-medical"></i>
          <span>New Order</span>
        </a>
        <a routerLink="/tickets/new" class="action-link">
          <i class="fas fa-ticket-alt"></i>
          <span>Open Ticket</span>
        </a>
        <button mat-button [matMenuTriggerFor]="userMenu" class="user-profile-btn">
          <i class="fas fa-user-circle"></i>
          <span class="username">John Doe</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <mat-menu #userMenu="matMenu" class="user-menu">
          <button mat-menu-item>
            <i class="fas fa-user"></i>
            <span>Profile</span>
          </button>
          <button mat-menu-item>
            <i class="fas fa-cog"></i>
            <span>Settings</span>
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
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .header-left {
      .logo {
        height: 45px;
        width: auto;
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
      padding: 8px 12px;
      color: #0B6E4F;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      border-radius: 4px;
      transition: all 0.2s ease;

      i {
        font-size: 14px;
      }

      &:hover {
        background: #ecfdf5;
      }
    }

    .user-profile-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
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
      }
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
  `]
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // TODO: Implement proper logout logic (clear session, tokens, etc.)
    this.router.navigate(['/login']);
  }
} 